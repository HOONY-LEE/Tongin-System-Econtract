import React from "react";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Line, Text } from "react-konva";

const Wrapper = styled.div`
  background-color: white;
  outline: 1px solid #e4e4e4;
  display: flex;
  justify-content: center;
  border-radius: 0.6vw;
  align-items: center;
  width: 75vw;
  height: 106.065vw;
`;
const Container = styled.div`
  outline: 1px solid red;
  width: 84%;
  height: 92%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.div`
  width: 100%;
  height: 7%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 3.4vw;
`;
const LogoImg = styled.div`
  outline: 1px solid red;
  border-radius: 0.4vw;
  width: 20vw;
  height: 5vw;
  font-size: 3vw;
`;

const TopTable = styled.table`
  text-align: center;
  font-size: 2vw;
  width: 100%;
  border-top: 0.15vw solid black;
  height: 4%;
  border-bottom: 0.15vw solid black;
`;
const TopTr = styled.tr<{
  width?: string;
  borderRight?: string;
  borderLeft?: string;
}>`
  /* outline: 4px solid green; */
  border-right: ${(props) => (props.borderRight ? props.borderRight : "")};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TopTdTitle = styled.td<{
  width?: string;
  borderRight?: string;
  borderLeft?: string;
}>`
  font-size: 1.5vw;
  background-color: #f4f4f4;
  width: ${(props) => (props.width ? props.width : "10vw")};
  height: 4vw;
  display: flex;
  align-items: center;
  font-weight: 500;
  justify-content: center;
  border-right: ${(props) =>
    props.borderRight ? props.borderRight : "0.1vw solid black"};
  border-left: ${(props) => (props.borderLeft ? props.borderLeft : "")};
`;
const TopTd = styled.td<{
  width?: string;
  borderRight?: string;
  borderLeft?: string;
}>`
  font-size: 1.5vw;
  border-right: ${(props) => (props.borderRight ? props.borderRight : "")};
  border-left: ${(props) => (props.borderLeft ? props.borderLeft : "")};
  width: ${(props) => (props.width ? props.width : "10vw")};
  display: flex;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  height: 4vw;
`;
const SubTitle = styled.div`
  font-weight: 600;
  margin: 1.3vw auto 0.6vw 0vw;
  font-size: 1.7;
`;

const ApplyInfoTable = styled.table`
  text-align: center;
  border-top: 0.15vw solid black;
  font-size: 1.3vw;
  width: 100%;
  height: 4%;
`;
const ApplyInfoTr = styled.tr<{
  width?: string;
}>`
  /* outline: 4px solid green; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.15vw solid #e4e4e4;
`;
const ApplyInfoTdTitle = styled.td<{
  width?: string;
  borderRight?: string;
  borderLeft?: string;
}>`
  background-color: #f4f4f4;
  width: ${(props) => (props.width ? props.width : "8vw")};
  height: 4vw;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.3vw;
  justify-content: center;
  border-right: ${(props) =>
    props.borderRight ? props.borderRight : "0.1vw solid #e4e4e4"};
  border-left: ${(props) => (props.borderLeft ? props.borderLeft : "")};
`;
const ApplyInfoTd = styled.td<{
  width?: string;
  borderRight?: string;
  borderLeft?: string;
}>`
  width: ${(props) => (props.width ? props.width : "12vw")};
  display: flex;
  font-weight: 500;
  align-items: center;
  border-right: ${(props) => (props.borderRight ? props.borderRight : "")};
  justify-content: center;
  font-size: 1.3vw;
  height: 4vw;
`;
const MemoBox = styled.div`
  width: 100%;
  outline: 1px solid green;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const MemoRound = styled.div`
  width: 90%;
  outline: 0.3vw solid #ebebeb;
  height: 90%;
  border-radius: 1vw;
`;
const BottomComponent = styled.div`
  display: flex;
  outline: 1px solid green;
  width: 100%;
  height: 50%;
`;
const EstimateTable = styled.table`
  text-align: center;
  border-top: 0.15vw solid black;
  outline: 1px solid black;
  font-size: 1.3vw;
  width: 100%;
  height: 100%;
`;
// FirstPage 컴포넌트 정의
const FirstPage = (props: any) => {
  const {
    priceDataList,
    articleDataList,
    optionData,
    lines,
    drawingData,
    setLines,
  } = props;
  const divRef = useRef<any>(null);
  const stageRef = useRef<any>(null);
  const handleMouseDown = (e: any) => {
    const pos = stageRef.current?.getPointerPosition();
    if (pos) {
      setLines([
        ...lines,
        {
          points: [pos.x, pos.y],
        },
      ]);
    }
  };
  const data = () => {
    console.log(
      "priceDataList",
      priceDataList,
      "articleDataList",
      articleDataList,
      "optionData",
      optionData,
      "lines",
      lines,
      "drawingData",
      drawingData
    );
  };

  return (
    <Wrapper className="firstPageBox">
      <Container>
        <Header>
          <LogoImg onClick={data}>logo</LogoImg>
          <HeaderTitle>계약서 • 견적서</HeaderTitle>
        </Header>
        <TopTable>
          <TopTr>
            <TopTdTitle>dddd</TopTdTitle>
            <TopTd>dddd</TopTd>
            <TopTdTitle borderLeft={"0.1vw solid black"}>dddd</TopTdTitle>
            <TopTd>dddd</TopTd>
            <TopTdTitle borderLeft={"0.1vw solid black"}>dddd</TopTdTitle>
            <TopTd>dddd</TopTd>
          </TopTr>
        </TopTable>
        <SubTitle>신청 정보</SubTitle>
        <ApplyInfoTable>
          <ApplyInfoTr>
            <ApplyInfoTdTitle>d</ApplyInfoTdTitle>
            <ApplyInfoTd>dd</ApplyInfoTd>
            <ApplyInfoTdTitle>d</ApplyInfoTdTitle>
            <ApplyInfoTd borderRight={"0.1vw solid #e4e4e4"}>dd</ApplyInfoTd>
            <ApplyInfoTd>dd</ApplyInfoTd>
          </ApplyInfoTr>
          <ApplyInfoTr>
            <ApplyInfoTdTitle>d</ApplyInfoTdTitle>
            <ApplyInfoTd>dd</ApplyInfoTd>
            <ApplyInfoTdTitle>d</ApplyInfoTdTitle>
            <ApplyInfoTd borderRight={"0.1vw solid #e4e4e4"}>1</ApplyInfoTd>
            <ApplyInfoTd>dd</ApplyInfoTd>
          </ApplyInfoTr>
        </ApplyInfoTable>
        <SubTitle>신청 날짜</SubTitle>
        <ApplyInfoTable>
          <ApplyInfoTr>
            <ApplyInfoTdTitle>견적일</ApplyInfoTdTitle>
            <ApplyInfoTd>2024.00.00</ApplyInfoTd>
            <ApplyInfoTdTitle>계약일</ApplyInfoTdTitle>
            <ApplyInfoTd>2024.00.00</ApplyInfoTd>
            <ApplyInfoTdTitle>포장일</ApplyInfoTdTitle>
            <ApplyInfoTd borderRight={"0.1vw solid #e4e4e4"}>
              2024.00.00
            </ApplyInfoTd>
          </ApplyInfoTr>
          <ApplyInfoTr>
            <ApplyInfoTdTitle>견적일</ApplyInfoTdTitle>
            <ApplyInfoTd>2024.00.00</ApplyInfoTd>
            <ApplyInfoTdTitle>계약일</ApplyInfoTdTitle>
            <ApplyInfoTd>2024.00.00</ApplyInfoTd>
            <ApplyInfoTdTitle></ApplyInfoTdTitle>
            <ApplyInfoTd borderRight={"0.1vw solid #e4e4e4"}></ApplyInfoTd>
          </ApplyInfoTr>
        </ApplyInfoTable>

        <SubTitle>리빙서비스</SubTitle>
        <ApplyInfoTable>
          {/* 탈취살균서비스 */}
          {optionData.livingService.deodorizationService.selected && (
            <ApplyInfoTr>
              <ApplyInfoTd width={"26%"}>
                {optionData.livingService.deodorizationService.serviceName}
              </ApplyInfoTd>
              <ApplyInfoTdTitle width={"12%"}>일시</ApplyInfoTdTitle>
              <ApplyInfoTd width={"17%"}>
                {
                  optionData.livingService.deodorizationService
                    .serviceRequestDate
                }
              </ApplyInfoTd>
              <ApplyInfoTdTitle width={"12%"}>금액</ApplyInfoTdTitle>
              <ApplyInfoTd width={"18%"} borderRight={"0.1vw solid #e4e4e4"}>
                {optionData.livingService.deodorizationService.servicePayment} ₩
              </ApplyInfoTd>
              <ApplyInfoTd width={"14%"}>온라인결제</ApplyInfoTd>
            </ApplyInfoTr>
          )}

          {/* "입주청소서비스" */}
          {optionData.livingService.movingCleaningService.selected && (
            <ApplyInfoTr>
              <ApplyInfoTd width={"26%"}>
                {optionData.livingService.movingCleaningService.serviceName}
              </ApplyInfoTd>
              <ApplyInfoTdTitle width={"12%"}>일시</ApplyInfoTdTitle>
              <ApplyInfoTd width={"17%"}>
                {
                  optionData.livingService.movingCleaningService
                    .serviceRequestDate
                }
              </ApplyInfoTd>
              <ApplyInfoTdTitle width={"12%"}>금액</ApplyInfoTdTitle>
              <ApplyInfoTd width={"18%"} borderRight={"0.1vw solid #e4e4e4"}>
                {optionData.livingService.movingCleaningService.servicePayment}
                {"₩"}
              </ApplyInfoTd>
              <ApplyInfoTd width={"14%"}>온라인결제</ApplyInfoTd>
            </ApplyInfoTr>
          )}

          {/* "정리수납서비스" */}
          {optionData.livingService.organizationStorageService.selected && (
            <ApplyInfoTr>
              <ApplyInfoTd width={"26%"}>
                {
                  optionData.livingService.organizationStorageService
                    .serviceName
                }
              </ApplyInfoTd>
              <ApplyInfoTdTitle width={"12%"}>일시</ApplyInfoTdTitle>
              <ApplyInfoTd width={"17%"}>
                {
                  optionData.livingService.organizationStorageService
                    .serviceRequestDate
                }
              </ApplyInfoTd>
              <ApplyInfoTdTitle width={"12%"}>금액</ApplyInfoTdTitle>
              <ApplyInfoTd width={"18%"} borderRight={"0.1vw solid #e4e4e4"}>
                {
                  optionData.livingService.organizationStorageService
                    .servicePayment
                }
                {" ₩ "}
              </ApplyInfoTd>
              <ApplyInfoTd width={"14%"}>온라인결제</ApplyInfoTd>
            </ApplyInfoTr>
          )}
        </ApplyInfoTable>
        <BottomComponent>
          <MemoBox>
            <MemoRound ref={divRef}>
              {"memo"}
              <Stage
                onMouseDown={handleMouseDown}
                ref={stageRef}
                width={100}
                height={100}
                stroke={""}
              >
                <Layer>
                  {drawingData.map((line: any, i: any) => (
                    <Line
                      key={i}
                      points={line.points}
                      stroke={line.stroke}
                      strokeWidth={line.strokeWidth}
                      tension={0.8}
                      lineCap="round"
                    />
                  ))}
                </Layer>
              </Stage>
            </MemoRound>
          </MemoBox>
          <EstimateTable></EstimateTable>
        </BottomComponent>
      </Container>
    </Wrapper>
  );
};
export default FirstPage;
