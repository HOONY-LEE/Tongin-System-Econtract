import { useEffect, useState } from "react";
import styled, { css } from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`;
const RoomNameBox = styled.div`
  height: 3.2vw;
  border-bottom: 0.16vw solid black;
  display: flex;
  flex-direction: column;
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const RoomName = styled.div`
  height: 56%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3vw;
  font-weight: 700;
  border-bottom: 0.1vw solid black;
`;

const ColumnNameBox = styled.div`
  height: 54%;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 1.3vw;
  font-weight: 300;
  background-color: #f4f4f4;
`;

const ArticleBox = styled.div<{ index: number }>`
  height: 2vw;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 1.3vw;
  font-weight: 400;
  border-bottom: 0.1vw solid gray;
  ${(props) =>
    props.index % 2 &&
    css`
      background-color: #f4f4f4;
    `}
`;

const TotalBox = styled.div<{ index: number }>`
  height: 2vw;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 1.3vw;
  font-weight: 600;
  ${(props) =>
    props.index % 2 &&
    css`
      background-color: #f4f4f4;
    `}
`;

const ColumnName = styled.div`
  width: 36%;
  height: 100%;
  display: flex;
  font-weight: 600;
  font-size: 1.2vw;
  justify-content: center;
  align-items: center;
  border-right: 0.1vw solid black;
`;

const ColumnName2 = styled.div`
  width: 32%;
  height: 100%;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2vw;
  border-right: 0.1vw solid black;
`;
const ColumnName3 = styled.div`
  width: 36%;
  height: 100%;
  font-weight: 600;
  display: flex;
  font-size: 1vw;
  justify-content: center;
  align-items: center;
  border-right: 0.1vw solid black;
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
        <RoomName>{articleData.locationName.substring(0, 13)}</RoomName>
        <ColumnNameBox>
          <ColumnName>메모</ColumnName>
          <ColumnName2>CBM</ColumnName2>
          <ColumnName2>처리</ColumnName2>
        </ColumnNameBox>
      </RoomNameBox>
      <ContentsBox>
        {articleData.articleData.map((item: any, index: number) => {
          return (
            <ArticleBox index={index} key={index}>
              <ColumnName3>
                {item.article.cbm === 0 &&
                item.article.articleRemark.length === 0
                  ? ""
                  : item.article.articleRemark.substring(0, 10)}
              </ColumnName3>

              <ColumnName2>
                {item.article.cbm === 0 &&
                item.article.articleRemark.length === 0
                  ? ""
                  : item.article.cbm}
              </ColumnName2>

              <ColumnName2>
                {item.article.cbm === 0 &&
                item.article.articleRemark.length === 0
                  ? ""
                  : carryType[item.article.carryType].status}
              </ColumnName2>
            </ArticleBox>
          );
        })}
      </ContentsBox>
      {articleData.articleData.length === 16 ? (
        <>
          <ArticleBox index={articleData.articleData.length}>
            <ColumnName></ColumnName>
            <ColumnName2></ColumnName2>
            <ColumnName2></ColumnName2>
          </ArticleBox>
          <TotalBox index={articleData.articleData.length + 1}>
            <ColumnName></ColumnName>
            <ColumnName2>{totalCbm === 0 ? "" : totalCbm}</ColumnName2>
            <ColumnName2></ColumnName2>
          </TotalBox>
        </>
      ) : (
        <TotalBox index={articleData.articleData.length}>
          <ColumnName></ColumnName>
          <ColumnName2>{totalCbm === 0 ? "" : totalCbm}</ColumnName2>
          <ColumnName2></ColumnName2>
        </TotalBox>
      )}
    </Wrapper>
  );
}
