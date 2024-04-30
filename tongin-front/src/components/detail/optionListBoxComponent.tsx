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
  font-weight: 700;
`;

const ActivatedArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-top: 1vh;
  padding-bottom: 1vh;
`;

export default function OptionListBoxComponent(props: any) {
  const { optionData, setOptionData, title, isSelected, setIsSelected } = props;
  const [isChecked, setIsChecked] = useState(isSelected);
  const onClickCheck = () => {
    setIsChecked(!isChecked);
  };

  const setOptionItemSelected = (index: number, flag: boolean) => {
    setOptionData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.ServiceList[index].selected = flag;
      return updatedData;
    });
  };

  const setOptionItemPrice = (index: number, price: number) => {
    setOptionData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.ServiceList[index].optionPayment = price;
      return updatedData;
    });
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
          alt="checkBox"
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
                index={index}
                item={item}
                isSelected={item.selected}
                setIsSelected={setOptionItemSelected}
                setOptionData={setOptionData}
                optionData={optionData}
              ></OptionItemComponent>
            );
          })}
        </ActivatedArea>
      )}
    </Wrapper>
  );
}
