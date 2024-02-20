import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { Image } from "../common/image";

const SelectBox = styled.div<{
  $show?: boolean;
}>`
  position: relative;
  width: 9vw;
  height: 4.7vw;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 0.2vw solid #f0f0f0;
  border-radius: 0.4vw;
  background-color: #ffffff;
  align-self: center;
  border: ${(props) => (props.$show ? "0.3vw solid #ff7f3b" : "none")};

  /* box-shadow: 0 0.5vh 0.5vh rgba(0, 0, 0, 0.01),
    0 0.5vh 0.5vh rgba(0, 0, 0, 0.003); */
  cursor: pointer;
`;
const Label = styled.label`
  display: flex;
  justify-content: space-around;
  font-size: 1.7vw;
  align-items: center;
  width: 88%;
  text-align: center;
`;
const SelectOptions = styled.ul<{
  $show?: boolean;
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
  outline: ${(props) => (props.$show ? "0.3vw solid #ff7f3b" : "none")};
  border-radius: 0.4vw;
  background-color: #fdfdfd;
  color: #222222;
  :hover {
    background-color: #ff7f3b;
  }
`;
const Option = styled.ul`
  font-size: 1.7vw;
  padding: 1vw 0.5vw;
  height: 4vw;

  &:hover {
    background-color: #ff7f3b;
    color: #ffffff;
  }
`;
const MethodSelectBoxComponent = (props: any) => {
  const { method, setCurrentProductList, roomId, articleId } = props;

  const data = [
    { status: "운반", statusCode: 0 },
    { status: "폐기", statusCode: 1 },
    { status: "하역", statusCode: 2 },
    { status: "경유", statusCode: 3 },
    { status: "방치", statusCode: 4 },
  ];

  const [currentValue, setCurrentValue] = useState<string>(
    data[method ? method : 0].status
  );
  const [showOptions, setShowOptions] = useState(false);

  const handleOnChangeSelectValue = (e: any) => {
    const value = e.target.value;
    setCurrentValue(data[value].status);
    setCurrentProductList((prev: any) => {
      const updatedList = [...prev];
      updatedList[roomId].ArticleDefaultLocation[articleId].article.method =
        value;
      return updatedList;
    });
  };

  return (
    <SelectBox
      onClick={() => setShowOptions((prev) => !prev)}
      $show={showOptions}
    >
      <Label>
        {currentValue}
        <Image
          src="/icon/triangle.png"
          alt="로고 이미지"
          width={"1.1vw"}
          height={"0.8vw"}
        />
      </Label>

      <SelectOptions $show={showOptions}>
        {data.map((item, index) => (
          <Option key={index}>
            <li value={item.statusCode} onClick={handleOnChangeSelectValue}>
              {item.status}
            </li>
          </Option>
        ))}
      </SelectOptions>
    </SelectBox>
  );
};
export default MethodSelectBoxComponent;
