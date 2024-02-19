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
  height: 9vw;
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
  font-size: 1.4vw;
  font-weight: 400;
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
  height: 78%;
  background-color: #ff7f3b;
  border-radius: 0.4vw;
  margin-right: 1vw;
`;

const InputNumber = styled.p`
  display: flex;
  justify-content: end;
  align-items: center;
  color: white;
  font-size: 2.6vw;
  font-weight: 400;
  width: 70%;
`;

export default function ProductComponent(props: any) {
  const { currentProductList, setCurrentProductList } = props;
  const [movingCBM, setMovingCBM] = useState<number>(0);
  const [discardCBM, setDiscardCBM] = useState<number>(0);
  const [totalCBM, setTotalCBM] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const calculateTotalCBM = (currentProductList: any) => {
    let movingSum = 0;
    let discardSum = 0;
    let totalSum = 0;

    currentProductList.forEach((item: any) => {
      const articleList = item.ArticleDefaultLocation;
      articleList.forEach((article: any) => {
        // 운반, 경유는 이사물량으로 합계
        if (article.article.method == 0 || article.article.method == 3) {
          movingSum += article.article.cbm;

          // 폐기, 하역은 폐기물량으로 합계
        } else if (article.article.method == 1 || article.article.method == 2) {
          discardSum += article.article.cbm;
        }
        // 방치는 계산 안함
      });
    });
    // 전체 물량 = 이사물량 + 폐기물량
    totalSum = movingSum + discardSum;

    setMovingCBM(movingSum);
    setDiscardCBM(discardSum);
    setTotalCBM(totalSum);
  };
  useEffect(() => {
    calculateTotalCBM(currentProductList);
  }, [currentProductList]);

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
