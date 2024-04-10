import React from "react";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import DrawingViewPanel from "./detailDrawingPanelComponent";
import DetailDrawView from "./dtailDrawView";
import API from "../../API/API";
import { Image } from "../common/image";

const Wrapper = styled.div`
  background-color: white;
  outline: 1px solid #e4e4e4;
  display: flex;
  justify-content: center;
  border-radius: 0.6vw;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const Container = styled.div`
  /* outline: 1px solid red; */
  width: 88%;
  height: 94%;
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
  $width?: string;
  borderRight?: string;
  borderLeft?: string;
}>`
  font-size: 1.5vw;
  background-color: #f4f4f4;
  width: ${(props) => (props.$width ? props.$width : "10vw")};
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
  $width?: string;
  borderRight?: string;
  borderLeft?: string;
}>`
  font-size: 1.5vw;
  border-right: ${(props) => (props.borderRight ? props.borderRight : "")};
  border-left: ${(props) => (props.borderLeft ? props.borderLeft : "")};
  width: ${(props) => (props.$width ? props.$width : "10vw")};
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
  $width?: string;
}>`
  /* outline: 4px solid green; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.15vw solid #e4e4e4;
`;
const ApplyInfoTdTitle = styled.td<{
  $width?: string;
  borderRight?: string;
  borderLeft?: string;
}>`
  background-color: #f4f4f4;
  width: ${(props) => (props.$width ? props.$width : "8vw")};
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
  $width?: string;
  borderRight?: string;
  borderLeft?: string;
}>`
  width: ${(props) => (props.$width ? props.$width : "12vw")};
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
  /* outline: 1px solid green; */
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
  /* outline: 1px solid green; */
  width: 100%;
  height: 50%;
`;
const EstimateContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
`;
const EstimateTable = styled.table`
  text-align: center;
  border-top: 0.15vw solid black;
  /* outline: 1px solid black; */
  font-size: 1.3vw;
  width: 100%;
  height: 100%;
`;
const EstimateTr = styled.tr<{
  $width?: string;
  $borderBottom?: string;
}>`
  /* outline: 4px solid green; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.05vw solid
    ${(props) => (props.$borderBottom ? props.$borderBottom : "#e4e4e4")};
`;
const EstimateTitle = styled.td<{
  $width?: string;
  borderRight?: string;
  borderLeft?: string;
  $borderBottom?: string;
  $height?: string;
}>`
  text-align: start;
  background-color: #f4f4f4;
  width: ${(props) => (props.$width ? props.$width : "8vw")};
  height: ${(props) => (props.$height ? props.$height : "3.4vw")};
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.3vw;
  justify-content: center;
  border-right: ${(props) =>
    props.borderRight ? props.borderRight : "0.1vw solid #e4e4e4"};
  border-left: ${(props) => (props.borderLeft ? props.borderLeft : "")};
  border-bottom: 0.05vw solid
    ${(props) => (props.$borderBottom ? props.$borderBottom : "#e4e4e4")};
`;
const EstimateTd = styled.td<{
  $width?: string;
  borderRight?: string;
  borderLeft?: string;
  $borderBottom?: string;
  $height?: string;
}>`
  /* outline: 1px solid red; */
  background-color: #ffffff;
  width: ${(props) => (props.$width ? props.$width : "100%")};
  height: ${(props) => (props.$height ? props.$height : "3.4vw")};
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.3vw;
  justify-content: center;
  border-right: ${(props) =>
    props.borderRight ? props.borderRight : "0.1vw solid #e4e4e4"};
  border-left: ${(props) => (props.borderLeft ? props.borderLeft : "")};
  border-bottom: 0.05vw solid
    ${(props) => (props.$borderBottom ? props.$borderBottom : "#e4e4e4")};
  text-align: end;
`;
const TotalTitle = styled.td<{
  $width?: string;
  borderRight?: string;
  borderLeft?: string;
  $borderBottom?: string;
  $height?: string;
}>`
  width: ${(props) => (props.$width ? props.$width : "8vw")};
  height: ${(props) => (props.$height ? props.$height : "3.4vw")};
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.3vw;
  justify-content: center;

  border-bottom: 0.15vw solid
    ${(props) => (props.$borderBottom ? props.$borderBottom : "#e4e4e4")};
`;
// FirstPage 컴포넌트 정의
const FirstPage = (props: any) => {
  const {
    priceDataList,
    articleDataList,
    optionData,
    lines,
    reNum,
    drawingData,
    detailData,
    setLines,
    setDrawingData,
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
      "detailData",
      detailData,
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
  const getDrawingData = async () => {
    const response = await API.get(`receipt/memo/${reNum}`);
    if (response.status === 200) {
      console.log(response);
      const result = response.data.receiptMemoData;
      setDrawingData(result);
      console.log("불러오기성공", result);
    } else {
      console.log("Fail to getDrawingData()");
    }
  };
  useEffect(() => {
    data();
    getDrawingData();
    setDrawingData([...lines]);
    console.log("wd", drawingData);
  }, []);

  return (
    <Wrapper className="firstPageBox">
      <Container>
        <Header>
          <LogoImg onClick={data}>
            <Image
              src="/icon/tonginLogo.png"
              width={"100%"}
              height={"100%"}
            ></Image>
          </LogoImg>
          <HeaderTitle>계약서 • 견적서</HeaderTitle>
        </Header>
        <TopTable>
          <TopTr>
            <TopTdTitle $width={"8vw"}>고객명</TopTdTitle>
            <TopTd>{detailData.name}</TopTd>
            <TopTdTitle borderLeft={"0.1vw solid black"}>이사종류</TopTdTitle>
            <TopTd>{detailData.movingType}</TopTd>
            <TopTdTitle borderLeft={"0.1vw solid black"}>전화번호</TopTdTitle>
            <TopTd $width={"15vw"}>{detailData.contact}</TopTd>
          </TopTr>
        </TopTable>
        <SubTitle>신청 정보</SubTitle>
        <ApplyInfoTable>
          <ApplyInfoTr>
            <ApplyInfoTdTitle $width={"18%"}>이사 전 주소</ApplyInfoTdTitle>
            <ApplyInfoTd $width={"56%"}>
              {detailData.preAddress}
              {detailData.preAddressDetail}
            </ApplyInfoTd>
            <ApplyInfoTdTitle $width={"18%"}>작업조건 (전)</ApplyInfoTdTitle>
            <ApplyInfoTd $width={"14%"} borderRight={"0.1vw solid #e4e4e4"}>
              {optionData.beforeWorkCondition.transportationMethod}
            </ApplyInfoTd>
            <ApplyInfoTd $width={"14%"}>
              {optionData.beforeWorkCondition.pyeong}
            </ApplyInfoTd>
          </ApplyInfoTr>
          <ApplyInfoTr>
            <ApplyInfoTdTitle $width={"18%"}>이사 후 주소</ApplyInfoTdTitle>
            <ApplyInfoTd $width={"56%"}>
              {detailData.afterAddress}
              {detailData.afterAddressDetail}
            </ApplyInfoTd>
            <ApplyInfoTdTitle $width={"18%"}>작업조건 (후)</ApplyInfoTdTitle>
            <ApplyInfoTd $width={"14%"} borderRight={"0.1vw solid #e4e4e4"}>
              {optionData.afterWorkCondition.transportationMethod}
            </ApplyInfoTd>
            <ApplyInfoTd $width={"14%"}>
              {optionData.afterWorkCondition.pyeong}
            </ApplyInfoTd>
          </ApplyInfoTr>
        </ApplyInfoTable>
        <SubTitle>신청 날짜</SubTitle>
        <ApplyInfoTable>
          <ApplyInfoTr>
            <ApplyInfoTdTitle>접수일</ApplyInfoTdTitle>
            <ApplyInfoTd>2024.00.00</ApplyInfoTd>
            <ApplyInfoTdTitle>계약일</ApplyInfoTdTitle>
            <ApplyInfoTd>2024.00.00</ApplyInfoTd>
          </ApplyInfoTr>
          <ApplyInfoTr>
            <ApplyInfoTdTitle>상담일</ApplyInfoTdTitle>
            <ApplyInfoTd>2024.00.00</ApplyInfoTd>
            <ApplyInfoTdTitle>이사일</ApplyInfoTdTitle>
            <ApplyInfoTd>2024.00.00</ApplyInfoTd>
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
              <DetailDrawView
                reNum={reNum}
                setDrawingData={setDrawingData}
                drawingData={drawingData}
                setLines={setLines}
                lines={lines}
              ></DetailDrawView>
            </MemoRound>
          </MemoBox>
          <EstimateContainer>
            <SubTitle>견적 금액 확인</SubTitle>
            <EstimateTable>
              <EstimateTr>
                <EstimateTitle $width="12vw">이사 물량</EstimateTitle>
                <EstimateTd>32.0</EstimateTd>
              </EstimateTr>
              <EstimateTr>
                <EstimateTitle $width="12vw">이사 비용</EstimateTitle>
                <EstimateTd>3,800,000</EstimateTd>
              </EstimateTr>
              <EstimateTr>
                <EstimateTitle $width="12vw">보관 비용</EstimateTitle>
                <EstimateTd>3,600,000</EstimateTd>
              </EstimateTr>
              <EstimateTr>
                <EstimateTitle $width="12vw">계약금</EstimateTitle>
                <EstimateTd>1,300,000</EstimateTd>
              </EstimateTr>
              <EstimateTr>
                <EstimateTitle $width="12vw">리빙서비스 </EstimateTitle>
                <EstimateTd>520,000</EstimateTd>
              </EstimateTr>
              <EstimateTr>
                <EstimateTitle $width="12vw">옵션 비용</EstimateTitle>
                <EstimateTd>700,000</EstimateTd>
              </EstimateTr>
              <EstimateTr>
                <EstimateTitle $width="12vw">부가세</EstimateTitle>
                <EstimateTd>200,000</EstimateTd>
              </EstimateTr>
              <EstimateTr>
                <EstimateTitle $width="12vw">잔금</EstimateTitle>
                <EstimateTd>2,300,000</EstimateTd>
              </EstimateTr>
              <EstimateTr>
                <EstimateTitle $width="12vw" $borderBottom={"#000000"}>
                  부가세
                </EstimateTitle>
                <EstimateTd $borderBottom={"#000000"}>200,000</EstimateTd>
              </EstimateTr>
              <EstimateTr>
                <TotalTitle>총 비용 (VAT별도)</TotalTitle>
                <EstimateTd>8,620,000</EstimateTd>
              </EstimateTr>
              <EstimateTr>
                <TotalTitle $height={"8vw"}>고객 서명</TotalTitle>
                <EstimateTd $height={"8vw"}></EstimateTd>
              </EstimateTr>
            </EstimateTable>
          </EstimateContainer>
        </BottomComponent>
      </Container>
    </Wrapper>
  );
};
export default FirstPage;
