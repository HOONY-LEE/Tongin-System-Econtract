import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { Image } from "../common/image";
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
const DetailEditSelectBoxComponent = (props: any) => {
  const data = [
    { status: "접수완료", statusCode: "11" },
    { status: "상담토스", statusCode: "12" },
    { status: "상담승인", statusCode: "13" },
    { status: "상담완료", statusCode: "14" },
    { status: "상담반려", statusCode: "19" },
    { status: "계약미승인", statusCode: "21" },
    { status: "계약", statusCode: "22" },
    { status: "작업토스", statusCode: "31" },
    { status: "작업승인", statusCode: "32" },
    { status: "작업반려", statusCode: "39" },
    { status: "취소", statusCode: "CA" },
    { status: "완료", statusCode: "41" },
  ];

  const [currentValue, setCurrentValue] = useState<any>(data[0].status);
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
              value={item.statusCode}
              onClick={handleOnChangeSelectValue}
            >
              {item.status}
            </li>
          </Option>
        ))}
      </SelectOptions>
    </SelectBox>
  );
};
export default DetailEditSelectBoxComponent;
