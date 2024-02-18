import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { Image } from "./image";
const SelectBox = styled.div`
  position: relative;
  width: 10vw;
  height: 4vw;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 0.2vw solid #f0f0f0;
  border-radius: 0.4vw;
  background-color: #ffffff;
  align-self: center;
  /* box-shadow: 0 0.5vh 0.5vh rgba(0, 0, 0, 0.01),
    0 0.5vh 0.5vh rgba(0, 0, 0, 0.003); */
  cursor: pointer;
`;
const Label = styled.label`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-left: 4px;
  align-items: center;
  width: 8vw;
  text-align: center;
  /* outline: 1px solid red; */
`;
const SelectOptions = styled.ul<{
  show?: boolean;
}>`
  position: absolute;
  list-style: none;
  top: 4.5vw;
  left: 0;
  width: 100%;
  overflow: hidden;
  text-align: center;
  /* height: 4vw; */
  max-height: ${(props) => (props.show ? "none" : "0")};
  padding: 0;
  outline: ${(props) => (props.show ? "0.2vw solid #ff7f3b" : "none")};
  border-radius: 0.4vw;
  background-color: #fdfdfd;
  color: #222222;
  :hover {
    background-color: #ff7f3b;
  }
`;
const Option = styled.li`
  font-size: 14px;
  padding: 1vw 0.5vw;
  height: 4vw;

  &:hover {
    background-color: #ff7f3b;
    color: #ffffff;
  }
`;
const SelectBoxComponent = (props: any) => {
  const data = [
    { option: "1번", content: "ddd" },
    { option: "2번", content: "rrr" },
    { option: "3번", content: "ttt" },
  ];

  const [currentValue, setCurrentValue] = useState<any>(data[0].option);
  const [showOptions, setShowOptions] = useState(false);
  const { show } = props;
  const handleOnChangeSelectValue = (e: any) => {
    const { innerText } = e.target;
    setCurrentValue(innerText);
  };

  return (
    <SelectBox onClick={() => setShowOptions((prev) => !prev)}>
      <Label>
        {currentValue}{" "}
        <Image
          src="/icon/triangle.png"
          alt="로고 이미지"
          width={"1.2vw"}
          height={"1.2vw"}
        />
      </Label>

      <SelectOptions show={showOptions}>
        {data.map((item, index) => (
          <Option>
            <li
              key={index}
              value={item.content}
              onClick={handleOnChangeSelectValue}
            >
              {item.option}
            </li>
          </Option>
        ))}
      </SelectOptions>
    </SelectBox>
  );
};
export default SelectBoxComponent;
