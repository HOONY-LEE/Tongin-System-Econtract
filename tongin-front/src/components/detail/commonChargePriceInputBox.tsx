import styled from "styled-components";
import { useState } from "react";
import PriceCalculatorComponent from "../common/priceCalculatorComponent";
import OptionPriceCalculatorComponent from "../common/optionPriceCalculatorComponent";
import ChargePriceCalculatorComponent from "../common/chargePriceCalculatorComponent";
import CommonPriceCalculatorComponent from "../common/commonPriceCalculatorComponent";

const InputArea = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 28vw;
  height: 3vh;
`;

const InputCBMBox = styled.div`
  display: flex;
  justify-content: center;
  width: 26vw;
  height: 100%;
  background-color: white;
  border-radius: 0.4vw;
  margin-right: 0.8vw;
  border: 0.2vw solid #777777;
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
  width: 80%;
`;

const SubText = styled.p`
  font-size: 1.6vw;
  font-weight: 400;
  height: 3vw;
  display: flex;
  align-items: end;
`;

export default function CommonChargePriceInputBox(props: any) {
  const { inputValue, setInputValue, title, id } = props;
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
        <InputCBMNumber>{inputValue.toLocaleString()}</InputCBMNumber>
      </InputCBMBox>
      <SubText>원</SubText>
      {isModalOpen && (
        <CommonPriceCalculatorComponent
          title={`[${title}] 입력창`}
          unit={"원"}
          onClose={handleCloseModal}
          optionType={title}
          inputValue={inputValue}
          setInputValue={setInputValue}
          id={id}
        />
      )}
    </InputArea>
  );
}
