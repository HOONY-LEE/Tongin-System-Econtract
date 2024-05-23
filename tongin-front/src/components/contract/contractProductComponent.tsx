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
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  border-bottom: 0.1vw solid black;
`;

const ColumnNameBox = styled.div`
  height: 1vw;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 8px;
  font-weight: 300;
  background-color: #f4f4f4;
`;

const ArticleBox = styled.div<{ index: number }>`
  height: 1.9vw;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 10px;
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
  font-size: 10px;
  font-weight: 600;
  ${(props) =>
    props.index % 2 &&
    css`
      background-color: #f4f4f4;
    `}
`;

const ColumnName = styled.div`
  width: 32%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 0.1vw solid black;
`;

// const ColumnName2 = styled.div`
//   width: 10vw;
//   height: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

const ColumnName3 = styled.div`
  width: 36%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 8px;
  text-align: center;
`;

const ColumnName2 = styled.div`
  width: 36%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 7px;
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
          <ColumnName>수량</ColumnName>
          <ColumnName>CBM</ColumnName>
          <ColumnName3>처리방법</ColumnName3>
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
              {item.article.articleNameEng === "Etc" ? (
                <ColumnName2>
                  {item.article.cbm === 0 && item.article.amount === 0
                    ? ""
                    : item.article.articleRemark.substring(0, 12)}
                </ColumnName2>
              ) : (
                <ColumnName3>
                  {item.article.cbm === 0 && item.article.amount === 0
                    ? ""
                    : carryType[item.article.carryType].status}
                </ColumnName3>
              )}
            </ArticleBox>
          );
        })}
      </ContentsBox>
      <TotalBox index={articleData.articleData.length}>
        <ColumnName>{totalQuantity === 0 ? "" : totalQuantity}</ColumnName>
        <ColumnName>{totalCbm === 0 ? "" : totalCbm}</ColumnName>
        <ColumnName3></ColumnName3>
      </TotalBox>
    </Wrapper>
  );
}
