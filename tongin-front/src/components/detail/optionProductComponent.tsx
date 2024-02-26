import styled from "styled-components";
import MultiSelectComponent from "../common/multiSelectComponent";
import { useState } from "react";
import PriceInputBox from "./priceInputBox";
import OptionPriceInputBox from "./optionPriceInputBox";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.4vw;
  padding-top: 1vw;
  padding-bottom: 1vw;
`;

const OptionItem = styled.div`
  width: 100%;
  height: 8vw;
  border-radius: 0.4vw;
  display: flex;
  outline: 0.1vw solid #b1b1b1;
  margin-bottom: 1vw;
`;

const NameBox = styled.div`
  width: 24%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2vw;
`;

const SelectBox = styled.div`
  width: 32%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PriceBox = styled.div`
  width: 44%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function OptionProductComponent(props: any) {
  const { optionServiceList, setOptionServiceList } = props;
  console.log("optionServiceList>>>");
  console.log(optionServiceList);
  return (
    <Wrapper>
      {optionServiceList.map((item: any) => {
        return (
          <OptionItem key={item.id}>
            <NameBox>{item.optionName}</NameBox>
            <SelectBox>
              <MultiSelectComponent
                optionList={[
                  { id: 0, name: "분해", isSelected: item.decomposition },
                  { id: 1, name: "설치", isSelected: item.installation },
                ]}
                setOptionList={setOptionServiceList}
                optionType={item.optionType - 1}
              ></MultiSelectComponent>
            </SelectBox>
            <PriceBox>
              <OptionPriceInputBox
                inputValue={item.optionPayment}
                setInputValue={setOptionServiceList}
                optionType={item.optionType - 1}
              ></OptionPriceInputBox>
            </PriceBox>
          </OptionItem>
        );
      })}
    </Wrapper>
  );
}
