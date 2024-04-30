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

const ActivatedArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 100%;
  height: 4vh;
`;

const PriceInputArea = styled.div`
  display: flex;
  width: 30vw;
`;

export default function OptionBoxComponent(props: any) {
  const {
    ladderTruckData,
    setLadderTruckData,
    title,
    isSelected,
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
            <CommonChargePriceInputBox
              inputValue={ladderTruckData.servicePayment}
              setInputValue={setLadderTruckServicePayment}
              title={title}
              id={0}
            ></CommonChargePriceInputBox>
          </PriceInputArea>
        </ActivatedArea>
      )}
    </Wrapper>
  );
}
