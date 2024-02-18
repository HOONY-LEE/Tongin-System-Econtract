import styled from "styled-components";
import { ClassNames, DayPicker } from "react-day-picker";
import { useState } from "react";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import styles from "react-day-picker/dist/style.module.css";
import CustomButton from "../common/customButton";
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2); /* 배경을 약간 어둡게 만듭니다. */
  z-index: 9998; /* 모달보다 아래에 위치하도록 설정합니다. */
`;

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 35vw;
  height: 42vw;
  background-color: white;
  border-radius: 0.8vw;
`;
const Today = styled.div`
  background-color: #ff7f3b;
`;
const BtnBox = styled.div`
  margin-bottom: 2vw;
  width: 70%;
  display: flex;
  justify-content: space-between;
  /* outline: 1px solid red; */
`;
const DateModalComponent = (props: any) => {
  const today = new Date();
  const { dateValueInput, onClose, deteValueDelete, style } = props;
  const [selectedDay, setSelectedDay] = useState<Date | undefined>();
  const handleComplete = (data: any) => {
    if (data) {
      //더블 클릭 시 데이터 없음으로 에러나기때문에 분기처리
      dateValueInput(data);
      setSelectedDay(data);
    }
  };

  return (
    <>
      <Backdrop />
      <Wrapper>
        <DayPicker
          mode="single"
          styles={{
            caption: { color: "#ff7f3b" },
            head_cell: {
              width: "100px",
            },
          }}
          modifiersStyles={{
            width: { width: "100%" },
          }}
          onSelect={handleComplete}
          selected={selectedDay}
          locale={ko}
        ></DayPicker>

        <BtnBox>
          <CustomButton
            width={"12vw"}
            height={"3vw"}
            text={`날짜 삭제`}
            size={"1.8vw"}
            radius={"0.6vw"}
            $bgColor={"#ffffff"}
            $outline={"0.15vw solid #dcdcdc"}
            color={"#333333"}
            onClick={deteValueDelete}
          ></CustomButton>
          <CustomButton
            width={"12vw"}
            height={"3vw"}
            text={`확인`}
            size={"1.8vw"}
            radius={"0.6vw"}
            onClick={onClose}
          ></CustomButton>
        </BtnBox>
      </Wrapper>
    </>
  );
};

export default DateModalComponent;
