import styled, { css } from "styled-components";
import { Image } from "./image";
import { useEffect, useState } from "react";

const Wrapper = styled.div`
  width: 19vw;
  height: 4.8vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DecreaseBtn = styled.div<{
  $isActivate?: boolean;
}>`
  width: 4.8vw;
  height: 4.8vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #d9d9d9;
  border-radius: 0.4vw;

  ${(props) =>
    props.$isActivate &&
    css`
      background-color: #ff7f3b;
    `}
`;
const InputBtn = styled.div`
  width: 8.2vw;
  height: 4.8vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 0.4vw;
`;

const InputText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7vw;
  font-size: 2.6vw;
  font-weight: 500;
`;

const IncreaseBtn = styled.div`
  width: 4.8vw;
  height: 4.8vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff7f3b;
  border-radius: 0.4vw;
`;

export default function QuantityComponent(props: any) {
  const {
    quantity,
    setCurrentProductList,
    articleId,
    roomId,
    totalQuantity,
    totalCBM,
    setTotalQuantity,
    setTotalCBM,
  } = props;
  const [isActivate, setIsActivate] = useState<boolean>(false);
  const [inputData, setInputData] = useState<number>(quantity);

  const decreaseNum = () => {
    if (!isActivate) return;
    if (inputData > 0) {
      setInputData(inputData - 1);
    }
  };

  useEffect(() => {
    if (inputData > 0) {
      setIsActivate(true);
    } else {
      setIsActivate(false);
    }
    setCurrentProductList((prev: any) => {
      const updatedList = [...prev];
      updatedList[roomId].articleData[articleId].article.amount = inputData;
      return updatedList;
    });
  }, [inputData]);

  return (
    <>
      <Wrapper>
        <DecreaseBtn onClick={decreaseNum} $isActivate={isActivate}>
          <Image
            src="/icon/minus_icon.png"
            width={"3vw"}
            height={"1.4w"}
          ></Image>
        </DecreaseBtn>
        <InputBtn>
          <InputText>{inputData}</InputText>
        </InputBtn>
        <IncreaseBtn onClick={() => setInputData(inputData + 1)}>
          <Image src="/icon/plus_icon.png" width={"4vw"} height={"4vw"}></Image>
        </IncreaseBtn>
      </Wrapper>
    </>
  );
}
