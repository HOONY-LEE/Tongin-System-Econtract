import { useState } from "react";
import styled, { css } from "styled-components";
import RoomSizeBox from "./roomSizeBox";
import PriceInputBox from "./priceInputBox";

const Wrarpper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const SelectListBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 6vw;
`;

const SelectList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 54vw;
  height: 6vw;
`;

const DescriptionBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 3vw;
`;

const SelectBox = styled.div<{
  width?: string;
  $itemCount?: string;
  $isSelected?: boolean;
}>`
  width: ${(props) => (props.$itemCount ? props.$itemCount : "24vw")};
  height: 5vw;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.2vw;
  font-weight: 400;
  border-radius: 0.4vw;
  &:hover {
    cursor: pointer;
  }
  ${(props) =>
    props.$isSelected &&
    css`
      background-color: #ff7f3b;
      color: white;
    `}
`;

export default function CleaningSelectComponent(props: any) {
  const { optionList, selectedValue, setSelectedValue } = props;
  const [description, setDescription] = useState("");

  const selectOptionHandle = (id: number) => {
    setDescription(optionList[id].description);
    setSelectedValue((prev: any) => {
      const updatedData = { ...prev };
      updatedData.serviceType = id;
      return updatedData;
    });
  };

  return (
    <Wrarpper>
      <SelectListBox>
        <SelectList>
          {optionList.map((item: any, index: number) => {
            return (
              <SelectBox
                onClick={(e) => selectOptionHandle(item.id)}
                $itemCount={`${94 / optionList.length}%`}
                key={index}
                $isSelected={item.id === selectedValue.serviceType}
              >
                {item.name}
              </SelectBox>
            );
          })}
        </SelectList>
        <PriceInputBox
          inputValue={selectedValue.servicePayment}
          setInputValue={setSelectedValue}
        ></PriceInputBox>
      </SelectListBox>
      <DescriptionBox>{description}</DescriptionBox>
    </Wrarpper>
  );
}
