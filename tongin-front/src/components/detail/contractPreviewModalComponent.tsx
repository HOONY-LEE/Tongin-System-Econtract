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
  justify-content: start;
  width: 90vw;
  height: 90vh;
  background-color: white;
  border-radius: 0.8vw;
`;

const TopArea = styled.div`
  width: 86vw;
  height: 6vw;
  display: flex;
`;

const LeftArea = styled.div`
  width: 37%;
  height: 100%;
  display: flex;
`;

const MidArea = styled.div`
  width: 26%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: end;
`;
const RightArea = styled.div`
  width: 37%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: end;
`;

const ContractArea = styled.div`
  margin-top: 2vw;
  width: 86vw;
  height: 82vh;
  background-color: #e6e6e6;
`;

const CloseBtn = styled.div`
  width: 8vw;
  height: 4vw;
  background-color: #ff7f3b;
  border-radius: 0.4vw;
  font-size: 1.6vw;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  &&:hover {
    cursor: pointer;
  }
`;

const PrevBox = styled.div`
  width: 5vw;
  height: 5vw;
  background-color: #ff7f3b;
  border-radius: 0.4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  &&:hover {
    cursor: pointer;
  }
`;

const NumBox = styled.div`
  width: 10vw;
  height: 5vw;
  background-color: #e7e7e7;
  border-radius: 0.4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.4vw;
  font-weight: 600;
`;

const NextBox = styled.div`
  width: 5vw;
  height: 5vw;
  background-color: #ff7f3b;
  border-radius: 0.4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  &&:hover {
    cursor: pointer;
  }
`;
const ContractPreviewModalComponent = (props: any) => {
  const { onClose } = props;

  return (
    <>
      <Backdrop />
      <Wrapper>
        <TopArea>
          <LeftArea></LeftArea>
          <MidArea>
            <PrevBox></PrevBox>
            <NumBox>{1}</NumBox>
            <NextBox></NextBox>
          </MidArea>
          <RightArea>
            <CloseBtn onClick={onClose}>닫기</CloseBtn>
          </RightArea>
        </TopArea>
        <ContractArea></ContractArea>
      </Wrapper>
    </>
  );
};

export default ContractPreviewModalComponent;
