import styled from "styled-components";
import { ClassNames, DayPicker } from "react-day-picker";
import { useState, useRef, useEffect } from "react";
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
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  /* outline: 1px solid red; */
`;
const ReactDayPick = styled(DayPicker)`
  * {
    --rdp-cell-size: 4vw;
    --rdp-caption-font-size: 2vw;
    --rdp-accent-color: #ff7f3b;
    --rdp-background-color: #ff7f3b;
    /* Switch to dark colors for dark themes */
    --rdp-accent-color-dark: #ff7f3b;
    --rdp-background-color-dark: #ff7f3b;
    /* Outline border for focused elements */
    --rdp-outline: 0.2vw solid var(--rdp-accent-color);
    /* Outline border for focused and selected elements */
    --rdp-outline-selected: 0.2vw solid #dbdbdb;
  }
`;
const DateModalComponent = (props: any) => {
  const today = new Date();
  const { dateValueInput, onClose, deteValueDelete, style } = props;
  const [selectedDay, setSelectedDay] = useState<Date | undefined>();
  const divRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState<any>({
    width: 0,
    height: 0,
  });
  const handleComplete = (data: any) => {
    if (data) {
      //더블 클릭 시 데이터 없음으로 에러나기때문에 분기처리
      dateValueInput(data);
      setSelectedDay(data);
    }
  };
  useEffect(() => {
    console.log(divRef);
    if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
      setDimensions({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
      });
    }
  }, []);
  return (
    <>
      <Backdrop />
      <Wrapper ref={divRef} style={{ transform: "translate(1.2)" }}>
        <ReactDayPick
          mode="single"
          styles={{
            caption: { color: "#ff7f3b" },
            head_cell: {
              width: "100vw",
            },
          }}
          modifiersStyles={{
            width: dimensions.width,
            day_selected: { color: "#e30000" },
          }}
          onSelect={handleComplete}
          selected={selectedDay}
          locale={ko}
        ></ReactDayPick>

        <BtnBox>
          <CustomButton
            width={"13vw"}
            height={"3.5vw"}
            text={`날짜 삭제`}
            size={"1.8vw"}
            radius={"0.4vw"}
            $bgColor={"#ffffff"}
            $outline={"0.15vw solid #dcdcdc"}
            color={"#333333"}
            onClick={deteValueDelete}
          ></CustomButton>
          <CustomButton
            width={"13vw"}
            height={"3.5vw"}
            text={`확인`}
            size={"1.8vw"}
            radius={"0.4vw"}
            onClick={onClose}
          ></CustomButton>
        </BtnBox>
      </Wrapper>
    </>
  );
};

export default DateModalComponent;
