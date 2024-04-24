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
  width: 50vw;
  height: 60vw;
  background-color: white;
  border-radius: 0.8vw;
`;

const ModalWrapper = styled.div`
  width: 76%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const DateWrapper = styled.div`
  width: 100%;
  height: 50vw;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const BtnBox = styled.div`
  margin-bottom: 2vw;
  width: 100%;
  display: flex;
  justify-content: space-between;
  /* outline: 1px solid red; */
`;
const ReactDayPick = styled(DayPicker)`
  * {
    --rdp-cell-size: 5.4vw;
    --rdp-caption-font-size: 3vw;
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
  /* 조정되는 부분 */
  .rdp-caption {
    font-size: 2.2vw; /* 월 폰트 크기 */
  }

  .rdp-head_cell {
    font-size: 2.2vw; /* 요일 폰트 크기 */
  }

  .rdp-day {
    font-size: 2.2vw; /* 날짜 폰트 크기 */
  }

  /* 선택된 날짜 스타일 조정 */
  .rdp-day_selected {
    background-color: #ff7f3b;
    color: white;
    font-size: 2vw;
  }
`;
const DateModalComponent = (props: any) => {
  const { dateValueInput, onClose, deteValueDelete, value } = props;

  console.log("value>>>");
  console.log(value);
  // 날짜 문자열에서 `Date` 객체로 변환
  const getDateFromValue = (value: string): Date => {
    const year = parseInt(value.slice(0, 4), 10);
    const month = parseInt(value.slice(4, 6), 10) - 1; // 월은 0부터 시작
    const day = parseInt(value.slice(6, 8), 10);
    return new Date(year, month, day);
  };
  const initialDate = getDateFromValue(value); // 초기 날짜

  const [selectedDay, setSelectedDay] = useState<Date | undefined>(initialDate);
  const divRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState<any>({
    width: 0,
    height: 0,
  });

  // `value`가 변경될 때마다 `selectedDay` 업데이트
  useEffect(() => {
    setSelectedDay(getDateFromValue(value));
  }, [value]);

  const handleComplete = (data: any) => {
    if (data) {
      //더블 클릭 시 데이터 없음으로 에러나기때문에 분기처리
      console.log("data>>>>>");
      console.log(data);
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
        <ModalWrapper>
          <DateWrapper>
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
              onSelect={handleComplete} // 선택 핸들러
              selected={selectedDay} // 선택된 날짜 표시
              locale={ko}
            ></ReactDayPick>
          </DateWrapper>

          <BtnBox>
            <CustomButton
              width={"16vw"}
              height={"4vw"}
              text={`날짜 삭제`}
              size={"1.8vw"}
              radius={"0.4vw"}
              $bgColor={"#ffffff"}
              $border={"0.15vw solid #dcdcdc"}
              color={"#333333"}
              onClick={deteValueDelete}
            ></CustomButton>
            <CustomButton
              width={"18vw"}
              height={"4vw"}
              text={`확인`}
              size={"1.8vw"}
              radius={"0.4vw"}
              onClick={onClose}
            ></CustomButton>
          </BtnBox>
        </ModalWrapper>
      </Wrapper>
    </>
  );
};

export default DateModalComponent;
