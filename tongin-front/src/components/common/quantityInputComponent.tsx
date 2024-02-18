import styled from "styled-components";
import { Image } from "./image";
import { useState, useRef, useEffect } from "react";
import CalculatorComponent from "./calculatorComponent";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 14vw;
  height: 5vw;
`;

const InputBtn = styled.div`
  width: 9vw;
  height: 4.8vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d9;
  border-radius: 0.4vw;
`;

const InputText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6vw;
  font-size: 2.6vw;
  font-weight: 500;
`;

export default function QuantityInputComponent(props: any) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState("0");
  // 모달 열기 핸들러
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Wrapper>
        <InputBtn onClick={handleOpenModal}>
          <InputText>{inputValue}</InputText>
          <Image
            src="/icon/triangle.png"
            width={"1.1vw"}
            height={"0.8vw"}
          ></Image>
        </InputBtn>
        {/* <Subtitle>{subtitle}</Subtitle> */}
      </Wrapper>
      {isModalOpen && (
        <CalculatorComponent
          onClose={handleCloseModal}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      )}
    </>
  );
}
