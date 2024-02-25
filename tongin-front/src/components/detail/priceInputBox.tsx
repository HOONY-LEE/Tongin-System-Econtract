import styled from "styled-components";
import { useState } from "react";
import PriceCalculatorComponent from "./../common/priceCalculatorComponent";

const InputArea = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 20vw;
  height: 5vw;
`;

const InputCBMBox = styled.div`
  display: flex;
  justify-content: center;
  width: 18vw;
  height: 100%;
  background-color: #f4f4f4;
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
  width: 88%;
`;

const SubText = styled.p`
  font-size: 1.6vw;
  font-weight: 400;
  height: 3vw;
  display: flex;
  align-items: end;
`;

export default function PriceInputBox(props: any) {
  const { inputValue, setInputValue } = props;
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
      <SubText>원</SubText>
      {isModalOpen && (
        <PriceCalculatorComponent
          title={`[금액] 입력창`}
          unit={"원"}
          onClose={handleCloseModal}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      )}
    </InputArea>
  );
}
