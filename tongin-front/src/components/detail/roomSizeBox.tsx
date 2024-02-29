import styled from "styled-components";
import RoomSizeCalculatorComponent from "../common/roomSizeCalculatorComponent.tsx";
import { useState } from "react";

const InputArea = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 14vw;
  height: 5vw;
  margin-right: 3vw;
`;

const InputCBMBox = styled.div`
  display: flex;
  justify-content: center;
  width: 10vw;
  height: 100%;
  /* background-color: #f4f4f4; */
  border: 0.2vw solid #dbdbdb;
  border-radius: 0.6vw;
  margin-right: 0.8vw;
  &:hover {
    cursor: pointer;
  }
`;

const InputCBMNumber = styled.p`
  display: flex;
  justify-content: end;
  align-items: center;
  color: black;
  font-size: 2.2vw;
  font-weight: 400;
  width: 70%;
`;

const SubText = styled.p`
  font-size: 1.6vw;
  font-weight: 400;
  height: 3vw;
  display: flex;
  align-items: end;
`;

export default function RoomSizeBox(props: any) {
  const { inputValue, setInputValue } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // 모달 열기 핸들러
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <InputArea>
      <InputCBMBox
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <InputCBMNumber>{inputValue}</InputCBMNumber>
      </InputCBMBox>
      <SubText>평</SubText>
      {isModalOpen && (
        <RoomSizeCalculatorComponent
          title={`[평수] 입력창`}
          unit={"평"}
          onClose={handleCloseModal}
          roomSize={inputValue}
          setRoomSize={setInputValue}
        />
      )}
    </InputArea>
  );
}
