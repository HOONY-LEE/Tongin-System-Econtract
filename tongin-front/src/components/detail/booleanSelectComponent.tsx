import { useState } from "react";
import styled from "styled-components";

const AddressArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  /* outline: 1px solid red; */
  /* background-color: red; */
`;

const AddressBox = styled.div<{ $isSelected: boolean }>`
  width: 4vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.2vw solid #aaaaaa;
  border-radius: 0.6vw;
  font-size: 1.8vw;
  font-weight: 500;
  background-color: ${(props) => (props.$isSelected ? "#ff7f3b" : "#ffffff")};
  color: ${(props) => (props.$isSelected ? "#ffffff" : "#000000")};
  border: ${(props) =>
    props.$isSelected ? "0.2vw solid #ff7f3b" : "0.2vw solid #aaaaaa"};
  &:hover {
    cursor: pointer;
  }
`;

export default function BooleanSelectComponent(props: any) {
  const { isAfter, setIsAfter } = props;

  const onClickCheck = (data: boolean) => {
    setIsAfter(data);
  };

  return (
    <>
      <AddressArea>
        <AddressBox $isSelected={!isAfter} onClick={() => onClickCheck(false)}>
          전
        </AddressBox>
        <AddressBox $isSelected={isAfter} onClick={() => onClickCheck(true)}>
          후
        </AddressBox>
      </AddressArea>
    </>
  );
}
