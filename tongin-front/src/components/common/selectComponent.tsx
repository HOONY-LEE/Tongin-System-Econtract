import { useState } from "react";
import styled, { css } from "styled-components";

const SelectList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 6vw;
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
  border: 0.2vw solid #a3a3a3;
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

export default function SelectComponent(props: any) {
  const { optionList, selectedValue, setSelectedValue } = props;

  const selectOptionHandle = (id: number) => {
    setSelectedValue((prev: any) => {
      const updatedData = { ...prev };
      updatedData.transportationMethod = id;
      return updatedData;
    });
  };

  return (
    <SelectList>
      {optionList.map((item: any, index: number) => {
        return (
          <SelectBox
            onClick={(e) => selectOptionHandle(item.id)}
            $itemCount={`${94 / optionList.length}%`}
            key={index}
            $isSelected={item.id === selectedValue}
          >
            {item.name}
          </SelectBox>
        );
      })}
    </SelectList>
  );
}
