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
  const { optionList, setOptionList } = props;

  const selectOptionHandle = (index: number) => {
    setOptionList((prev: any) => {
      const updatedList = [...prev];
      updatedList[index].isSelected = !updatedList[index].isSelected;

      return updatedList;
    });
  };

  return (
    <SelectList>
      {optionList.map((item: any, index: number) => {
        return (
          <SelectBox
            onClick={(e) => selectOptionHandle(index)}
            $itemCount={`${94 / optionList.length}%`}
            key={index}
            $isSelected={item.isSelected}
          >
            {item.name}
          </SelectBox>
        );
      })}
    </SelectList>
  );
}
