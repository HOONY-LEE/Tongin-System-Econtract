import styled from "styled-components";
import { Image } from "../common/image";
import { useEffect, useState } from "react";
import CommonChargePriceInputBox from "./commonChargePriceInputBox";
import DropdownComponent from "../common/dropdownComponent";
import { format } from "date-fns";
import DateModalComponent from "./dateModalComponent";
import OptionItemComponent from "./optionItemComponent";

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
  font-weight: 500;
`;

const ActivatedArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  outline: 0.1vw solid red;
`;

const CategoryInputBox = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 0.4vw;
  outline: 0.2vw solid #494949;
  border: none;
  border-radius: 0.4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2vw;
  padding-left: 2vw;
`;

export default function OptionListBoxComponent(props: any) {
  const { optionData, setOptionData, title, isSelected, setIsSelected } = props;
  const [isChecked, setIsChecked] = useState(isSelected);
  const onClickCheck = () => {
    setIsChecked(!isChecked);
  };

  useEffect(() => {
    setOptionData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.selected = isChecked;
      return updatedData;
    });
    setIsSelected(isChecked);
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
          {optionData.ServiceList.map((item: any, index: number) => {
            return (
              <OptionItemComponent
                key={index}
                item={item}
              ></OptionItemComponent>
            );
          })}
        </ActivatedArea>
      )}
    </Wrapper>
  );
}
