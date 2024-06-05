import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { Image } from "./image";

const SelectBox = styled.div<{
  $show?: boolean;
  $border?: string;
  selectedColor?: string;
}>`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.4vw;
  background-color: #ffffff;
  align-self: center;
  border: ${(props) =>
    props.$show
      ? props.selectedColor
        ? `0.3vw solid ${props.selectedColor}`
        : "0.3vw solid #ff7f3b"
      : props.$border
      ? props.$border
      : "0.2vw solid #aaaaaa"};
  cursor: pointer;
`;
const Label = styled.label`
  display: flex;
  justify-content: space-around;
  font-size: 2vw;
  align-items: center;
  width: 80%;
  text-align: center;
`;
const SelectOptions = styled.ul<{
  $show?: boolean;
  selectedColor?: string;
}>`
  z-index: 9997;
  position: absolute;
  list-style: none;
  top: 5.1vw;
  left: 0;
  width: 100%;
  overflow: hidden;
  text-align: center;
  /* height: 4vw; */
  max-height: ${(props) => (props.$show ? "none" : "0")};
  padding: 0;
  outline: ${(props) =>
    props.$show
      ? props.selectedColor
        ? `0.3vw solid ${props.selectedColor}`
        : "0.3vw solid #ff7f3b"
      : "none"};
  border-radius: 0.2vw;
  background-color: #fdfdfd;
  color: #222222;
  /* :hover {
    background-color: #ff7f3b;
    color: #ffffff;
  } */
  box-shadow: 0 1vw 1vw rgba(0, 0, 0, 0.2), 0 0.5vh 0.5vh rgba(0, 0, 0, 0.003);
`;
const Option = styled.ul<{
  index: number;
  selected: number;
  selectedColor: string;
}>`
  font-size: 2vw;
  padding: 1vw 0.5vw;
  height: 3vh;
  background-color: ${(props) =>
    props.index === props.selected
      ? props.selectedColor
        ? props.selectedColor
        : "#ff7f3b"
      : "#ffffff"};
  color: ${(props) => (props.index === props.selected ? "#ffffff" : "#000000")};
  &:hover {
    background-color: ${(props) =>
      props.selectedColor ? props.selectedColor : "#ff7f3b"};
    color: #ffffff;
  }
`;
const DropdownComponent = (props: any) => {
  const {
    selected,
    setSelected,
    dropdownList,
    border,
    selectedColor,
    itemIndex,
  } = props;

  const [showOptions, setShowOptions] = useState(false);

  const handleOnChangeSelectValue = (e: any, id: number) => {
    if (itemIndex) {
      setSelected(id, itemIndex);
    } else {
      alert("인덱스 없음");
      setSelected(id);
    }
  };

  return (
    <SelectBox
      onClick={() => setShowOptions((prev) => !prev)}
      $show={showOptions}
      $border={border}
      selectedColor={selectedColor}
    >
      <Label>{dropdownList[selected]?.status}</Label>
      <Image
        src="/icon/triangle.png"
        alt="삼각형이미지"
        width={"1.1vw"}
        height={"0.8vw"}
      />

      <SelectOptions $show={showOptions} selectedColor={selectedColor}>
        {dropdownList.map((item: any, index: number) => (
          <Option
            selected={selected}
            key={index}
            selectedColor={selectedColor}
            index={index}
            onClick={(e) => handleOnChangeSelectValue(e, item.id)}
          >
            <li value={item?.id}>{item?.status}</li>
          </Option>
        ))}
      </SelectOptions>
    </SelectBox>
  );
};
export default DropdownComponent;
