import styled from "styled-components";
import API from "../../API/API";
import { useEffect, useState } from "react";
import { Image } from "../common/image";
import RoomItemComponent from "./roomItemComponent";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* background-color: #6020201d; */
`;

const TotalBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 8vw;
  border-bottom-left-radius: 0.6vw;
  border-bottom-right-radius: 0.6vw;
  box-shadow: 1px 1px 3vw 1vw #dddddd35;
`;

const RoomListBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top: 1vw;
  margin-bottom: 2vw;
`;

const TotalAMountBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20vw;
  height: 6vw;
`;

const CBMBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 14vw;
  height: 7vw;
  outline: 1px;
`;

const Title = styled.p`
  font-size: 2.4vw;
  font-weight: 600;
  height: 4vw;
  display: flex;
  align-items: center;
  margin-right: 0.4vw;
`;
const Subtitle = styled.p`
  font-size: 1.2vw;
  font-weight: 300;
  height: 3vw;
  display: flex;
  align-items: end;
`;

const SubText = styled.p`
  font-size: 1.2vw;
  font-weight: 300;
  height: 2vw;
  display: flex;
  align-items: center;
`;

const InputArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5vw;
  margin-left: 2vw;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  width: 8vw;
  height: 80%;
  background-color: #ff7f3b;
  border-radius: 0.4vw;
  margin-right: 1vw;
`;

const InputNumber = styled.p`
  display: flex;
  justify-content: end;
  align-items: center;
  color: white;
  font-size: 3vw;
  font-weight: 400;
  width: 70%;
`;

export default function ProductComponent(props: any) {
  const { currentProductList, setCurrentProductList } = props;
  const [movingCBM, setMovingCBM] = useState<number>(0);
  const [discardCBM, setDiscardCBM] = useState<number>(0);
  const [totalCBM, setTotalCBM] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  return (
    <>
      <Wrapper>
        <TotalBox>
          <TotalAMountBox>
            <Title>물량 합계</Title>
            <Subtitle>/Total Amount</Subtitle>
          </TotalAMountBox>
          <CBMBox>
            <SubText>이사/운반</SubText>
            <InputArea>
              <InputBox>
                <InputNumber>{movingCBM}</InputNumber>
              </InputBox>
              <SubText>CBM</SubText>
            </InputArea>
          </CBMBox>
          <CBMBox>
            <SubText>폐기/하역</SubText>
            <InputArea>
              <InputBox>
                <InputNumber>{discardCBM}</InputNumber>
              </InputBox>
              <SubText>CBM</SubText>
            </InputArea>
          </CBMBox>
          <CBMBox>
            <SubText>전체물량</SubText>
            <InputArea>
              <InputBox>
                <InputNumber>{totalCBM}</InputNumber>
              </InputBox>
              <SubText>CBM</SubText>
            </InputArea>
          </CBMBox>
        </TotalBox>
        <RoomListBox>
          {currentProductList.map((item: any, index: number) => {
            return (
              <RoomItemComponent
                key={index + 1}
                index={index + 1}
                roomItem={item}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                currentProductList={currentProductList}
                setCurrentProductList={setCurrentProductList}
              ></RoomItemComponent>
            );
          })}
        </RoomListBox>
      </Wrapper>
    </>
  );
}
