import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const RoomNameBox = styled.div`
  height: 4vw;
  border-bottom: 0.16vw solid black;
  display: flex;
  flex-direction: column;
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const RoomName = styled.div`
  height: 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2vw;
  border-bottom: 0.1vw solid black;
`;

const ColumnNameBox = styled.div`
  height: 1.6vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.8vw;
  font-weight: 300;
  background-color: #f4f4f4;
`;

const ArticleBox = styled.div<{ index: number }>`
  height: 1.9vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1vw;
  font-weight: 400;
  border-bottom: 0.1vw solid gray;
  ${(props) =>
    props.index % 2 &&
    css`
      background-color: #f4f4f4;
    `}
`;

const TotalBox = styled.div<{ index: number }>`
  height: 1.9vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1vw;
  font-weight: 600;
  ${(props) =>
    props.index % 2 &&
    css`
      background-color: #f4f4f4;
    `}
`;

const ColumnName = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 0.1vw solid black;
`;

const ColumnName2 = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function ContractProductComponent(props: any) {
  const { articleData } = props;

  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalCbm, setTotalCbm] = useState(0);

  const carryType = [
    { status: "운반", statusCode: 0 },
    { status: "폐기", statusCode: 1 },
    { status: "하역", statusCode: 2 },
    { status: "경유", statusCode: 3 },
    { status: "방치", statusCode: 4 },
  ];

  useEffect(() => {
    let quantity = 0;
    let cbm = 0;
    articleData.articleData.forEach((item: any) => {
      quantity += item.article.amount;
      cbm += item.article.cbm;
    });
    setTotalQuantity(quantity);
    setTotalCbm(cbm);
  }, []);

  return (
    <Wrapper>
      <RoomNameBox>
        <RoomName>{articleData.locationName}</RoomName>
        <ColumnNameBox>
          <ColumnName>수량</ColumnName>
          <ColumnName>CBM</ColumnName>
          <ColumnName2>처리방법</ColumnName2>
        </ColumnNameBox>
      </RoomNameBox>
      <ContentsBox>
        {articleData.articleData.map((item: any, index: number) => {
          return (
            <ArticleBox index={index} key={index}>
              <ColumnName>
                {item.article.cbm === 0 && item.article.amount === 0
                  ? ""
                  : item.article.amount}
              </ColumnName>
              <ColumnName>
                {item.article.cbm === 0 && item.article.amount === 0
                  ? ""
                  : item.article.cbm}
              </ColumnName>
              <ColumnName2>
                {item.article.cbm === 0 && item.article.amount === 0
                  ? ""
                  : carryType[item.article.carryType].status}
              </ColumnName2>
            </ArticleBox>
          );
        })}
      </ContentsBox>
      {articleData.articleData.length === 15 ? (
        <>
          <ArticleBox index={articleData.articleData.length}>
            <ColumnName></ColumnName>
            <ColumnName></ColumnName>
            <ColumnName2></ColumnName2>
          </ArticleBox>
          <TotalBox index={articleData.articleData.length + 1}>
            <ColumnName>{totalQuantity === 0 ? "" : totalQuantity}</ColumnName>
            <ColumnName>{totalCbm === 0 ? "" : totalCbm}</ColumnName>
            <ColumnName2></ColumnName2>
          </TotalBox>
        </>
      ) : (
        <TotalBox index={articleData.articleData.length}>
          <ColumnName>{totalQuantity === 0 ? "" : totalQuantity}</ColumnName>
          <ColumnName>{totalCbm === 0 ? "" : totalCbm}</ColumnName>
          <ColumnName2></ColumnName2>
        </TotalBox>
      )}
    </Wrapper>
  );
}
