import styled from "styled-components";
import { Image } from "../common/image";
import { useEffect, useState } from "react";
import CommonChargePriceInputBox from "./commonChargePriceInputBox";

const Wrapper = styled.div``;

const CheckedOptionTitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3vh;
`;

const Title = styled.div`
  margin-left: 1vw;
  display: flex;
  align-items: center;
  font-size: 2.4vw;
  font-weight: 700;
`;
const SubTitle = styled.div`
  margin-left: 1vw;
  display: flex;
  align-items: center;
  font-size: 2.2vw;
  font-weight: 700;
  margin: 0vw 0vw 1vw 0vw;
`;
const ActivatedArea = styled.div`
  display: flex;
  /* flex-direction: column; */
  justify-content: start;
  align-items: start;
  width: 100%;
  height: 4vh;
  margin: 1vw 0;
`;

const PriceInputArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 30vw;
`;

export default function OptionBoxComponent(props: any) {
  const {
    ladderTruckData,
    setLadderTruckData,
    title,
    isSelected,
    beforeLadderTruckData,
    setBeforeLadderTruckData,
    afterLadderTruckData,
    setAfterLadderTruckData,
    setIsSelected,
  } = props;
  const [isChecked, setIsChecked] = useState(isSelected);

  const onClickCheck = () => {
    setIsChecked(!isChecked);
  };

  const setLadderTruckServicePayment = (newValue: number) => {
    setLadderTruckData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.servicePayment = newValue;
      return updatedData;
    });
  };
  const setBeforeLadderTruckServicePayment = (newValue: number) => {
    setBeforeLadderTruckData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.servicePayment = newValue;
      return updatedData;
    });
  };
  const setAfterLadderTruckServicePayment = (newValue: number) => {
    setAfterLadderTruckData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.servicePayment = newValue;
      return updatedData;
    });
  };

  useEffect(() => {
    if (!isChecked) {
      setLadderTruckData((prev: any) => {
        const updatedData = { ...prev };
        updatedData.servicePayment = 0;
        return updatedData;
      });
    }

    setLadderTruckData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.selected = isChecked;
      return updatedData;
    });

    setBeforeLadderTruckData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.selected = isChecked;
      return updatedData;
    });

    setAfterLadderTruckData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.selected = isChecked;
      return updatedData;
    });
  }, [isChecked]);

  return (
    <Wrapper>
      <CheckedOptionTitle onClick={onClickCheck}>
        <Image
          src={`/icon/${isChecked ? "checked" : "unchecked"}.png`}
          alt="체크박스"
          width={"3.4vw"}
          height={"3.4vw"}
        />
        <Title>{title}</Title>
      </CheckedOptionTitle>
      {isChecked && (
        <ActivatedArea>
          <PriceInputArea>
            <SubTitle>사다리차 비용(전)</SubTitle>
            <CommonChargePriceInputBox
              inputValue={beforeLadderTruckData.servicePayment}
              setInputValue={setBeforeLadderTruckServicePayment}
              title={title}
              id={0}
            ></CommonChargePriceInputBox>
          </PriceInputArea>
          <PriceInputArea>
            <SubTitle>사다리차 비용(후)</SubTitle>
            <CommonChargePriceInputBox
              inputValue={afterLadderTruckData.servicePayment}
              setInputValue={setAfterLadderTruckServicePayment}
              title={title}
              id={1}
            ></CommonChargePriceInputBox>
          </PriceInputArea>
        </ActivatedArea>
      )}
    </Wrapper>
  );
}
