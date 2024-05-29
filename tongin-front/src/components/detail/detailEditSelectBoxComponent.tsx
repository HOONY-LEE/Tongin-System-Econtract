import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { Image } from "../common/image";
import { isTemplateExpression } from "typescript";

const SelectBox = styled.div<{
  $show?: boolean;
}>`
  position: relative;
  width: 14vw;
  height: 5vw;
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
  top: 5.3vw;
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
const DetailEditSelectBoxComponent = (props: any) => {
  const {
    setStatusCode,
    statusCode,
    setStatus,
    onSelectStatus,
    setFinishContract,
    setCompletionContract,
  } = props;
  const data = [
    { status: "접수완료", statusCode: "11" },
    { status: "상담토스", statusCode: "12" },
    { status: "상담승인", statusCode: "13" },
    { status: "상담완료", statusCode: "14" },
    { status: "상담반려", statusCode: "19" },
    { status: "계약미승인", statusCode: "21" },
    { status: "계약", statusCode: "22" },
    // { status: "작업토스", statusCode: "31" },
    // { status: "작업승인", statusCode: "32" },
    // { status: "작업반려", statusCode: "39" },
    { status: "취소", statusCode: "CA" },
    // { status: "완료", statusCode: "41" },
  ];

  const [currentValue, setCurrentValue] = useState<any>(
    data.filter((item) => item.statusCode === statusCode)[0]?.status
  );

  const [showOptions, setShowOptions] = useState(false);

  const handleOnChangeSelectValue = (index: number, item: any) => {
    if (item.statusCode === "22") {
      // 계약상태
      setFinishContract(true);
      setCompletionContract(true);
    } else if (item.statusCode === "41") {
      setCompletionContract(true);
    } else {
      setFinishContract(false);
      setCompletionContract(false);
    }
    setCurrentValue(item.status);
    setStatus(item.status);
    // setStatusCode((prev: any) => {
    //   const updatedList = [...prev];
    //   // updatedList[roomId].articleData[articleId].article.carryType = statusCode;
    //   // return updatedList;
    // });
    setStatusCode(item.statusCode);
    onSelectStatus();
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
          <Option
            key={index}
            onClick={(e) => handleOnChangeSelectValue(index, item)}
          >
            <li value={item.statusCode}>
              {item.status}
              {/* {index} */}
            </li>
          </Option>
        ))}
      </SelectOptions>
    </SelectBox>
  );
};
export default DetailEditSelectBoxComponent;
