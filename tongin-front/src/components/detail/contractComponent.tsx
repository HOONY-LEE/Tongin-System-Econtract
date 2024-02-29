import styled from "styled-components";
import OptionPriceInputBox from "./optionPriceInputBox";
import { useEffect, useState } from "react";
import ChargeListComponent from "./chargeListComponent";

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-radius: 0 0 0.7vw 0.7vw;
  background-color: white;
  box-shadow: 0 0.5vh 0.5vh rgba(0, 0, 0, 0.01),
    0 0.5vh 0.5vh rgba(0, 0, 0, 0.003);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 84vw;
  height: 100%;
  margin-top: 3vw;
  margin-bottom: 3vw;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ButtonArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 9vw;
`;

const PreviewBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.4vw;
  font-weight: 500;
  width: 39vw;
  height: 6vw;
  border-radius: 0.6vw;
  border: 0.2vw solid black;
  &&:hover {
    cursor: pointer;
  }
`;

const ExportBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.4vw;
  font-weight: 500;
  color: white;
  width: 39vw;
  height: 6vw;
  border-radius: 0.6vw;
  background-color: #ff7f3b;
  &&:hover {
    cursor: pointer;
  }
`;

const CBMArea = styled.div`
  background-color: #f4f4f4;
  width: 100%;
  height: 7vw;
  border-radius: 0.6vw;
  display: flex;
  justify-content: space-around;
`;

const CBMBox = styled.div`
  width: 40%;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const Title = styled.p`
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 2.4vw;
  font-weight: 500;
`;

const Subtitle = styled.p`
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 1.6vw;
  margin-top: 1vw;
`;

const PriceBox = styled.div`
  margin-left: 6vw;
  margin-right: 1vw;
  width: 12vw;
  height: 5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.4vw;
  /* border: 0.2vw solid black; */
  background-color: white;
  font-size: 2.4vw;
`;

const ChargeListArea = styled.div`
  margin-top: 2vw;
  outline: 0.1vw solid red;
  width: 100%;
  height: 90vw;
  display: flex;
`;

export default function ContractComponent(props: any) {
  const { detailData, articleDataList, optionData } = props;

  const [movingCBM, setMovingCBM] = useState<number>(0);
  const [discardCBM, setDiscardCBM] = useState<number>(0);

  const calculateTotalCBM = (articleDataList: any) => {
    let movingSum = 0;
    let discardSum = 0;

    articleDataList.forEach((item: any) => {
      const articleData = item.articleData;
      articleData.forEach((article: any) => {
        // 운반, 경유는 이사물량으로 합계
        if (article.article.carryType == 0 || article.article.carryType == 3) {
          movingSum += article.article.cbm;

          // 폐기, 하역은 폐기물량으로 합계
        } else if (
          article.article.carryType === 1 ||
          article.article.carryType === 2
        ) {
          discardSum += article.article.cbm;
        }
        // 방치는 계산 안함
      });
    });

    setMovingCBM(movingSum);
    setDiscardCBM(discardSum);
  };
  useEffect(() => {
    calculateTotalCBM(articleDataList);
  }, [articleDataList]);

  return (
    <ContentBox>
      <Wrapper>
        <InputArea>
          <CBMArea>
            <CBMBox>
              <Title>이사물량</Title>
              {/* <Subtitle>/Moving Quantity</Subtitle> */}
              <PriceBox>{movingCBM}</PriceBox>
              <Subtitle>CBM</Subtitle>
            </CBMBox>
            <CBMBox>
              <Title>폐기물량</Title>
              {/* <Subtitle>/Discard Quantity</Subtitle> */}
              <PriceBox>{discardCBM}</PriceBox>
              <Subtitle>CBM</Subtitle>
            </CBMBox>
          </CBMArea>
          <ChargeListArea>
            <ChargeListComponent></ChargeListComponent>
          </ChargeListArea>
        </InputArea>
        <ButtonArea>
          <PreviewBtn>견적서 미리보기</PreviewBtn>
          <ExportBtn>견적서 내보내기</ExportBtn>
        </ButtonArea>
      </Wrapper>
    </ContentBox>
  );
}
