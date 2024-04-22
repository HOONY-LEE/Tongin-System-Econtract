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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const Container = styled.div`
  padding: 2vw 5vw;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Header = styled.div`
  width: 100%;
  height: 6vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const HeaderTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  font-size: 3.2vw;
`;
const LogoImg = styled.div`
  width: 20vw;
  height: 5vw;
`;

const ContentArea = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TopTable = styled.div`
  text-align: center;
  width: 100%;
  border-top: 0.16vw solid black;
  border-bottom: 0.1vw solid #939393;
  height: 3.2vw;
  margin-bottom: 1vw;
`;
const TopTr = styled.div<{
  width?: string;
  borderRight?: string;
  borderLeft?: string;
}>`
  border-right: ${(props) => (props.borderRight ? props.borderRight : "")};
  display: flex;
  align-items: center;
  justify-content: start;
`;
const TopTdTitle = styled.div<{
  $width?: string;
  $borderRight?: string;
  $borderLeft?: string;
}>`
  font-size: 1.4vw;
  background-color: #f4f4f4;
  width: 10vw;
  height: 3vw;
  display: flex;
  align-items: center;
  font-weight: 500;
  justify-content: center;
  /* border-left: 0.1vw solid black; */
`;
const TopTd = styled.div<{
  $width?: string;
  $borderRight?: string;
  $borderLeft?: string;
}>`
  font-size: 1.4vw;
  display: flex;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  width: 13.3vw;
  height: 3vw;
  /* border-left: 0.1vw solid black; */
  /* border-right: 0.1vw solid black; */
`;

const ApplyInfoTable = styled.div`
  text-align: center;
  font-size: 1.3vw;
  width: 100%;
  margin-bottom: 1vw;
`;

const ApplyInfoTable2 = styled.div`
  text-align: center;
  border-top: 0.16vw solid black;
  font-size: 1.3vw;
  width: 100%;
`;
const ApplyInfoTable3 = styled.div`
  text-align: center;
  border-top: 0.1vw solid black;
  margin-bottom: 1vw;
  font-size: 1.3vw;
  width: 100%;
`;

const ApplyInfoTr = styled.div<{
  $width?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.1vw solid #e4e4e4;
`;
const ApplyInfoTdTitle = styled.div<{
  $width?: string;
  $borderRight?: string;
  $borderLeft?: string;
}>`
  background-color: #f4f4f4;
  width: ${(props) => (props.$width ? props.$width : "6vw")};
  height: 3vw;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.3vw;
  justify-content: center;
  border-right: ${(props) =>
    props.$borderRight ? props.$borderRight : "0.1vw solid #e4e4e4"};
  border-left: ${(props) => (props.$borderLeft ? props.$borderLeft : "")};
`;
const ApplyInfoTd = styled.div<{
  $width?: string;
  $borderRight?: string;
  $borderLeft?: string;
}>`
  width: ${(props) => (props.$width ? props.$width : "10vw")};
  display: flex;
  font-weight: 300;
  align-items: center;
  border-right: ${(props) => (props.$borderRight ? props.$borderRight : "")};
  justify-content: center;
  font-size: 1.3vw;
  height: 3vw;
`;
const MemoBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TextMemoBox = styled.div`
  margin-top: 1vw;
  width: 100%;
  height: 7vw;
  border: 0.1vw solid #a1a1a1;
  background-color: #fafafa;
  border-radius: 0.4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2vw;
  padding-left: 2vw;
`;

const MemoRound = styled.div`
  width: 37vw;
  height: 52vw;
  border: 0.1vw solid #a1a1a1;
  background-color: #fafafa;
  border-radius: 0.6vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2vw;
  padding-left: 2vw;
`;

const MemoRound2 = styled.div`
  width: 20vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BottomComponent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
const PriceListArea = styled.div`
  width: 48vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const PriceListBox = styled.div`
  width: 100%;
  border-top: 0.16vw solid black;
  border-left: 0.1vw solid black;
`;

const TotalPriceBox = styled.div`
  width: 100%;
  height: 4vw;
  display: flex;
  border-bottom: 0.16vw solid black;
`;

const TotalPriceName = styled.div`
  width: 46%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 1vw;
`;
const TotalPriceInput = styled.div`
  width: 54%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const PriceNameInput = styled.p`
  font-size: 1.8vw;
  font-weight: 600;
`;
const PriceNameInputEng = styled.p`
  font-size: 1vw;
  font-weight: 300;
  padding-left: 0.4vw;
  padding-right: 0.8vw;
  padding-top: 0.6vw;
`;

const AgreementBox = styled.div`
  width: 100%;
  height: 7vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 0.16vw solid black;
  /* background-color: gray; */
`;
const ImageBox = styled.div`
  margin-right: 1vw;
`;

const AgreementTextLine = styled.div`
  height: 2vw;
  font-size: 1vw;
  font-weight: 300;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SignatureBox = styled.div`
  width: 100%;
  height: 8.4vw;

  display: flex;
  justify-content: space-between;
  border-bottom: 0.16vw solid black;
`;

const SignatureTitle = styled.div`
  width: 30%;
  height: 100%;
  margin-top: 1vw;
`;

const SignatureArea = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PriceItemBox = styled.div`
  width: 100%;
  height: 2.6vw;
  display: flex;
`;

const PriceItemName = styled.div`
  width: 46%;
  height: 100%;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
  font-size: 1.2vw;
  padding-left: 1vw;
  border-bottom: 0.1vw solid #d3d3d3;
`;

const PriceItemPrice = styled.div`
  width: 54%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 1vw;
  border-bottom: 0.04vw solid #d3d3d3;
`;

const Price = styled.p`
  font-size: 1.2vw;
  font-weight: 400;
  margin-right: 0.4vw;
`;
const Unit = styled.p`
  font-size: 0.8vw;
  font-weight: 100;
  padding-top: 0.3vw;
`;

const EstimateTable = styled.div`
  text-align: center;
  border-top: 0.1vw solid black;
  /* outline: 1px solid black; */
  font-size: 1.3vw;
  width: 100%;
  height: 100%;
`;
const EstimateTr = styled.div<{
  $width?: string;
  $borderBottom?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.05vw solid
    ${(props) => (props.$borderBottom ? props.$borderBottom : "#e4e4e4")};
`;
const EstimateTitle = styled.div<{
  $width?: string;
  $borderRight?: string;
  $borderLeft?: string;
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
    props.$borderRight ? props.$borderRight : "0.1vw solid #e4e4e4"};
  border-left: ${(props) => (props.$borderLeft ? props.$borderLeft : "")};
  border-bottom: 0.05vw solid
    ${(props) => (props.$borderBottom ? props.$borderBottom : "#e4e4e4")};
`;
const EstimateTd = styled.div<{
  $width?: string;
  $borderRight?: string;
  $borderLeft?: string;
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
  border-right: ${(props) => (props.$borderRight ? props.$borderRight : "")};
  border-left: ${(props) => (props.$borderLeft ? props.$borderLeft : "")};
  border-bottom: 0.05vw solid
    ${(props) => (props.$borderBottom ? props.$borderBottom : "#e4e4e4")};
  text-align: end;
`;
const TotalTitle = styled.div<{
  $width?: string;
  $borderRight?: string;
  $borderLeft?: string;
  $borderBottom?: string;
  $height?: string;
}>`
  width: ${(props) => (props.$width ? props.$width : "8vw")};
  height: ${(props) => (props.$height ? props.$height : "4vw")};
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.3vw;
  justify-content: center;

  border-bottom: 0.1vw solid
    ${(props) => (props.$borderBottom ? props.$borderBottom : "#e4e4e4")};
`;

const TotalTd = styled.div<{
  $width?: string;
  $borderRight?: string;
  $borderLeft?: string;
  $borderBottom?: string;
  $height?: string;
}>`
  /* outline: 1px solid red; */
  background-color: #ffffff;
  width: ${(props) => (props.$width ? props.$width : "100%")};
  height: ${(props) => (props.$height ? props.$height : "4vw")};
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.3vw;
  justify-content: center;
  border-right: ${(props) => (props.$borderRight ? props.$borderRight : "")};
  border-left: ${(props) => (props.$borderLeft ? props.$borderLeft : "")};
  border-bottom: 0.1vw solid
    ${(props) => (props.$borderBottom ? props.$borderBottom : "#e4e4e4")};
`;
const BottomLine = styled.div`
  margin-top: 1vw;
  width: 100%;
  border-top: 0.1vw solid black;
`;
const AgreeBox = styled.div`
  margin-top: 1vw;
  height: 10vw;
  width: 100%;
  display: flex;
  align-items: start;
  padding: 1vw;
  background-color: #f7f7f7;
  border-radius: 0.6vw;
`;
const AgreeCheckBox = styled.input`
  width: 1vw;
  height: 1vw;
  &:checked {
    background-color: #ff7f3b;
  }
`;

const FooterArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const FooterItemBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const FooterItem1 = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 1vw;
  font-weight: 500;
`;

const FooterItem2 = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 1vw;
  font-weight: 200;
`;

const FooterItem3 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  height: 4vw;
  font-size: 1.6vw;
  border: 0.1vw solid #ababab;
  background-color: #efefef3a;
  border-radius: 0.2vw;
  padding: 1vw 2vw;
`;

const Index = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2vw;
  font-size: 1.4vw;
  font-weight: 300;
`;

const ServiceArea = styled.div`
  /* outline: 0.1vw dashed red; */
  width: 100%;
  margin-bottom: 1vw;
  display: flex;
  border-bottom: 0.04vw solid #e4e4e4;
  border-top: 0.16vw solid black;

  /* border-right: 0.04vw solid black; */
`;

const ServiceBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ServiceColumnBox = styled.div`
  width: 100%;
  height: 3vw;
  display: flex;
  font-size: 1.3vw;
  font-weight: 300;
`;

const ServiceName = styled.div`
  width: 10vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
  /* border-left: 0.04vw solid black; */
  border-bottom: 0.04vw solid #e4e4e4;
`;

const ServiceDate = styled.div`
  width: 9vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 0.04vw solid #e4e4e4;
  border-bottom: 0.04vw solid #e4e4e4;
`;

const ServicePrice = styled.div`
  width: 9vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 0.04vw solid #e4e4e4;
  border-bottom: 0.04vw solid #e4e4e4;
`;

const ServicePaymentMethod = styled.div`
  width: 7vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 0.04vw solid #e4e4e4;
  border-bottom: 0.04vw solid #e4e4e4;
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
    drawingData2,
    detailData,
    movingCBM,
    discardCBM,
    setLines,
    setLines2,
    lines2,
    setDrawingData,
    setDrawingData2,
    optionTotalCharge,
  } = props;
  console.log("lines>>>>");
  console.log(lines);
  console.log("lines2>>>>");
  console.log(lines2);

  const divRef = useRef<any>(null);
  const stageRef = useRef<any>(null);
  const divRef2 = useRef<any>(null);
  const stageRef2 = useRef<any>(null);
  const [dimensions, setDimensions] = useState<any>({
    width: 0,
    height: 0,
  });
  const [dimensions2, setDimensions2] = useState<any>({
    width: 0,
    height: 0,
  });
  const [tool, setTool] = useState<string>("pen");
  const [penColorVisible, setPenColorVisible] = useState<boolean>(false);
  const [penColor, setPenColor] = useState<any>();

  const formattedDate = /^(\d{4})(\d{2})(\d{2})$/;

  const transportationMethodList = [
    { id: 0, status: "선택안함" },
    { id: 1, status: "사다리차" },
    { id: 2, status: "엘리베이터" },
    { id: 3, status: "계단" },
    { id: 4, status: "기타" },
  ];

  const paymentMethodList = [
    { id: 0, status: "선택안함" },
    { id: 1, status: "현금" },
    { id: 2, status: "온라인" },
    { id: 3, status: "카드" },
    { id: 4, status: "무빙팀 수금" },
    { id: 5, status: "리빙팀 수금" },
  ];

  // const data = () => {
  //   console.log("detailData", detailData);
  //   console.log("priceDataList", priceDataList);
  //   console.log("articleDataList", articleDataList);
  //   console.log("optionData", optionData);
  //   console.log("lines", lines);
  //   console.log("drawingData", drawingData);
  //   console.log("optionTotalCharge", optionTotalCharge);
  //   console.log("movingCBM", movingCBM);
  // };
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

  const getDrawingData2 = async () => {
    const response: any = await API.get(`/receipt/detail/${reNum}`);
    if (response.status === 200) {
      const result = response.data.contractSignData;
      setDrawingData2(result);
    } else {
      console.log("Fail to getDetailList()");
    }
  };

  useEffect(() => {
    getDrawingData();
    getDrawingData2();
    setDrawingData([...lines]);
    setDrawingData2([...lines2]);
  }, []);

  useEffect(() => {
    if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
      setDimensions({
        width: divRef.current.offsetWidth - 2,
        height: divRef.current.offsetHeight - 2,
      });
    }
    if (divRef2.current?.offsetHeight && divRef2.current?.offsetWidth) {
      setDimensions2({
        width: divRef2.current.offsetWidth - 1,
        height: divRef2.current.offsetHeight - 1,
      });
    }
  }, []);

  useEffect(() => {
    setPenColorVisible(true);
    setTool("pen");
    setPenColor("#000000");
    setDrawingData([]);
  }, []);

  return (
    <Wrapper className="firstPageBox">
      <Container>
        <Header>
          <LogoImg>
            <Image src="/icon/tonginLogo.png" width={"100%"}></Image>
          </LogoImg>
          <HeaderTitle>계약서 • 견적서</HeaderTitle>
        </Header>
        <ContentArea>
          <TopTable>
            <TopTr>
              <TopTdTitle $width={"8vw"}>고객명</TopTdTitle>
              <TopTd>{detailData.name}</TopTd>
              <TopTdTitle $borderLeft={"0.1vw solid black"}>
                이사종류
              </TopTdTitle>
              <TopTd>{detailData.movingType}</TopTd>
              <TopTdTitle $borderLeft={"0.1vw solid black"}>
                전화번호
              </TopTdTitle>
              <TopTd $width={"15vw"}>{detailData.contact}</TopTd>
            </TopTr>
          </TopTable>
          {/* <SubTitle>신청 정보</SubTitle> */}
          <ApplyInfoTable2>
            <ApplyInfoTr>
              <ApplyInfoTdTitle>접수일</ApplyInfoTdTitle>
              <ApplyInfoTd>
                {detailData.receptionDate === ""
                  ? "--"
                  : detailData.receptionDate.replace(formattedDate, "$1-$2-$3")}
              </ApplyInfoTd>
              <ApplyInfoTdTitle>계약일</ApplyInfoTdTitle>
              <ApplyInfoTd>
                {detailData.contractDate === ""
                  ? "--"
                  : detailData.contractDate.replace(formattedDate, "$1-$2-$3")}
              </ApplyInfoTd>
              <ApplyInfoTdTitle>상담일</ApplyInfoTdTitle>
              <ApplyInfoTd>
                {detailData.consultationDate === ""
                  ? "--"
                  : detailData.consultationDate.replace(
                      formattedDate,
                      "$1-$2-$3"
                    )}
              </ApplyInfoTd>
              <ApplyInfoTdTitle>이사일</ApplyInfoTdTitle>
              <ApplyInfoTd>
                {detailData.movingDate === ""
                  ? "--"
                  : detailData.movingDate.replace(formattedDate, "$1-$2-$3")}
              </ApplyInfoTd>
            </ApplyInfoTr>
          </ApplyInfoTable2>
          <ApplyInfoTable>
            <ApplyInfoTr>
              <ApplyInfoTdTitle $width={"18%"}>이사 전 주소</ApplyInfoTdTitle>
              <ApplyInfoTd $width={"56%"}>
                {`${detailData.preAddress}, ${detailData.preAddressDetail}`}
              </ApplyInfoTd>
              <ApplyInfoTdTitle $width={"18%"}>작업조건 (전)</ApplyInfoTdTitle>
              <ApplyInfoTd $width={"14%"} $borderRight={"0.1vw solid #e4e4e4"}>
                {
                  transportationMethodList[
                    optionData.beforeWorkCondition.transportationMethod
                  ].status
                }
              </ApplyInfoTd>
              <ApplyInfoTd $width={"14%"}>
                {optionData.beforeWorkCondition.pyeong}(평)
              </ApplyInfoTd>
            </ApplyInfoTr>
            <ApplyInfoTr>
              <ApplyInfoTdTitle $width={"18%"}>이사 후 주소</ApplyInfoTdTitle>
              <ApplyInfoTd $width={"56%"}>
                {`${detailData.afterAddress}, ${detailData.afterAddressDetail}`}
              </ApplyInfoTd>
              <ApplyInfoTdTitle $width={"18%"}>작업조건 (후)</ApplyInfoTdTitle>
              <ApplyInfoTd $width={"14%"} $borderRight={"0.1vw solid #e4e4e4"}>
                {
                  transportationMethodList[
                    optionData.afterWorkCondition.transportationMethod
                  ].status
                }
              </ApplyInfoTd>
              <ApplyInfoTd $width={"14%"}>
                {optionData.afterWorkCondition.pyeong}(평)
              </ApplyInfoTd>
            </ApplyInfoTr>
          </ApplyInfoTable>

          <ServiceArea>
            <ServiceBox>
              <ServiceColumnBox>
                <ServiceName>서비스</ServiceName>
                <ServiceDate>날짜</ServiceDate>
                <ServicePrice>금액</ServicePrice>
                <ServicePaymentMethod>결제</ServicePaymentMethod>
              </ServiceColumnBox>
              {/* 입주청소서비스 */}
              <ServiceColumnBox>
                <ServiceName>
                  {optionData.livingService.movingCleaningService.serviceName}
                </ServiceName>
                <ServiceDate>
                  {optionData.livingService.movingCleaningService.selected
                    ? optionData.livingService.movingCleaningService
                        .serviceRequestDate === ""
                      ? "--"
                      : optionData.livingService.movingCleaningService
                          .serviceRequestDate
                    : "-"}
                </ServiceDate>
                <ServicePrice>
                  {optionData.livingService.movingCleaningService.selected
                    ? optionData.livingService.movingCleaningService.servicePayment.toLocaleString()
                    : "-"}
                </ServicePrice>
                <ServicePaymentMethod>
                  {" "}
                  {optionData.livingService.movingCleaningService.selected
                    ? paymentMethodList[
                        optionData.livingService.movingCleaningService
                          .paymentMethod
                      ].status
                    : "-"}
                </ServicePaymentMethod>
              </ServiceColumnBox>
              {/* 정리수납서비스 */}
              <ServiceColumnBox>
                <ServiceName>
                  {
                    optionData.livingService.organizationStorageService
                      .serviceName
                  }
                </ServiceName>
                <ServiceDate>
                  {optionData.livingService.organizationStorageService.selected
                    ? optionData.livingService.organizationStorageService
                        .serviceRequestDate === ""
                      ? "--"
                      : optionData.livingService.organizationStorageService
                          .serviceRequestDate
                    : "-"}
                </ServiceDate>
                <ServicePrice>
                  {optionData.livingService.organizationStorageService.selected
                    ? optionData.livingService.organizationStorageService.servicePayment.toLocaleString()
                    : "-"}
                </ServicePrice>
                <ServicePaymentMethod>
                  {" "}
                  {optionData.livingService.organizationStorageService.selected
                    ? paymentMethodList[
                        optionData.livingService.organizationStorageService
                          .paymentMethod
                      ].status
                    : "-"}
                </ServicePaymentMethod>
              </ServiceColumnBox>
            </ServiceBox>
            <ServiceBox>
              <ServiceColumnBox>
                <ServiceName>서비스</ServiceName>
                <ServiceDate>날짜</ServiceDate>
                <ServicePrice>금액</ServicePrice>
                <ServicePaymentMethod>결제</ServicePaymentMethod>
              </ServiceColumnBox>
              {/* 탈취살균서비스 */}
              <ServiceColumnBox>
                <ServiceName>
                  {optionData.livingService.deodorizationService.serviceName}
                </ServiceName>
                <ServiceDate>
                  {optionData.livingService.deodorizationService.selected
                    ? optionData.livingService.deodorizationService
                        .serviceRequestDate === ""
                      ? "--"
                      : optionData.livingService.deodorizationService
                          .serviceRequestDate
                    : "-"}
                </ServiceDate>
                <ServicePrice>
                  {optionData.livingService.deodorizationService.selected
                    ? optionData.livingService.deodorizationService.servicePayment.toLocaleString()
                    : "-"}
                </ServicePrice>
                <ServicePaymentMethod>
                  {" "}
                  {optionData.livingService.deodorizationService.selected
                    ? paymentMethodList[
                        optionData.livingService.deodorizationService
                          .paymentMethod
                      ].status
                    : "-"}
                </ServicePaymentMethod>
              </ServiceColumnBox>
              {/* 기타서비스 */}
              <ServiceColumnBox>
                <ServiceName>
                  {optionData.livingService.otherService.serviceName}
                </ServiceName>
                <ServiceDate>
                  {optionData.livingService.otherService.selected
                    ? optionData.livingService.otherService
                        .serviceRequestDate === ""
                      ? "--"
                      : optionData.livingService.otherService.serviceRequestDate
                    : "-"}
                </ServiceDate>
                <ServicePrice>
                  {optionData.livingService.otherService.selected
                    ? optionData.livingService.otherService.servicePayment.toLocaleString()
                    : "-"}
                </ServicePrice>
                <ServicePaymentMethod>
                  {" "}
                  {optionData.livingService.otherService.selected
                    ? paymentMethodList[
                        optionData.livingService.otherService.paymentMethod
                      ].status
                    : "-"}
                </ServicePaymentMethod>
              </ServiceColumnBox>
            </ServiceBox>
          </ServiceArea>

          <BottomComponent>
            <MemoBox>
              <MemoRound ref={divRef} id={"CanvasPanel"}>
                <Stage
                  width={dimensions.width}
                  height={dimensions.height}
                  ref={stageRef}
                  stroke={""}
                >
                  <Layer>
                    {lines.map((line: any, i: any) => (
                      <Line
                        key={i}
                        points={line.points.map(
                          (point: number) => point * 0.44
                        )}
                        stroke={line.stroke}
                        strokeWidth={1}
                        tension={0.8}
                        lineCap="round"
                        globalCompositeOperation={
                          line.tool === "eraser"
                            ? "destination-out"
                            : "source-over"
                        }
                      />
                    ))}
                  </Layer>
                </Stage>
              </MemoRound>
            </MemoBox>
            <PriceListArea>
              <PriceListBox>
                {/* 이사물량 */}
                <PriceItemBox>
                  <PriceItemName>이사물량(폐기/운반)</PriceItemName>
                  <PriceItemPrice>
                    <Price>{`${discardCBM}  /  ${movingCBM}`}</Price>
                    <Unit>cbm</Unit>
                  </PriceItemPrice>
                </PriceItemBox>
                {/* 이사물량 */}
                <PriceItemBox>
                  <PriceItemName>사다리차 비용</PriceItemName>
                  <PriceItemPrice>
                    <Price>
                      {optionData.ladderTruck.servicePayment.toLocaleString()}
                    </Price>
                    <Unit>₩</Unit>
                  </PriceItemPrice>
                </PriceItemBox>
                {/* 이사물량 */}
                <PriceItemBox>
                  <PriceItemName>입주청소서비스</PriceItemName>
                  <PriceItemPrice>
                    <Price>
                      {optionData.livingService.movingCleaningService.servicePayment.toLocaleString()}
                    </Price>
                    <Unit>₩</Unit>
                  </PriceItemPrice>
                </PriceItemBox>
                {/* 이사물량 */}
                <PriceItemBox>
                  <PriceItemName>정리수납서비스</PriceItemName>
                  <PriceItemPrice>
                    <Price>
                      {optionData.livingService.organizationStorageService.servicePayment.toLocaleString()}
                    </Price>
                    <Unit>₩</Unit>
                  </PriceItemPrice>
                </PriceItemBox>
                {/* 이사물량 */}
                <PriceItemBox>
                  <PriceItemName>탈취살균서비스</PriceItemName>
                  <PriceItemPrice>
                    <Price>
                      {optionData.livingService.deodorizationService.servicePayment.toLocaleString()}
                    </Price>
                    <Unit>₩</Unit>
                  </PriceItemPrice>
                </PriceItemBox>
                {/* 이사물량 */}
                <PriceItemBox>
                  <PriceItemName>기타서비스</PriceItemName>
                  <PriceItemPrice>
                    <Price>
                      {optionData.livingService.otherService.servicePayment.toLocaleString()}
                    </Price>
                    <Unit>₩</Unit>
                  </PriceItemPrice>
                </PriceItemBox>
                {/* 이사물량 */}
                <PriceItemBox>
                  <PriceItemName>옵션비용(분해/설치)</PriceItemName>
                  <PriceItemPrice>
                    <Price> {optionTotalCharge.toLocaleString()}</Price>
                    <Unit>₩</Unit>
                  </PriceItemPrice>
                </PriceItemBox>
                {/* 이사물량 */}
                <PriceItemBox>
                  <PriceItemName>이사비용</PriceItemName>
                  <PriceItemPrice>
                    <Price>{priceDataList[0].amount.toLocaleString()}</Price>
                    <Unit>₩</Unit>
                  </PriceItemPrice>
                </PriceItemBox>
                {/* 이사물량 */}
                <PriceItemBox>
                  <PriceItemName>보관비용</PriceItemName>
                  <PriceItemPrice>
                    <Price>{priceDataList[1].amount.toLocaleString()}</Price>
                    <Unit>₩</Unit>
                  </PriceItemPrice>
                </PriceItemBox>
                {/* 이사물량 */}
                <PriceItemBox>
                  <PriceItemName>부가세(VAT)</PriceItemName>
                  <PriceItemPrice>
                    <Price>{priceDataList[2].amount.toLocaleString()}</Price>
                    <Unit>₩</Unit>
                  </PriceItemPrice>
                </PriceItemBox>
                {/* 이사물량 */}
                <PriceItemBox>
                  <PriceItemName>계약금</PriceItemName>
                  <PriceItemPrice>
                    <Price>{priceDataList[4].amount.toLocaleString()}</Price>
                    <Unit>₩</Unit>
                  </PriceItemPrice>
                </PriceItemBox>
                {/* 이사물량 */}
                <PriceItemBox>
                  <PriceItemName>잔금</PriceItemName>
                  <PriceItemPrice>
                    <Price>{priceDataList[5].amount.toLocaleString()}</Price>
                    <Unit>₩</Unit>
                  </PriceItemPrice>
                </PriceItemBox>
              </PriceListBox>
              <TotalPriceBox>
                <TotalPriceName>
                  <PriceNameInput>총 비용</PriceNameInput>
                  <PriceNameInputEng>(VAT별도)</PriceNameInputEng>
                </TotalPriceName>
                <TotalPriceInput>
                  <PriceNameInput>32,100,000</PriceNameInput>
                  <PriceNameInputEng>₩</PriceNameInputEng>
                </TotalPriceInput>
              </TotalPriceBox>
              <AgreementBox>
                <AgreementTextLine>
                  본인은 (주)통인익스프레스 견적•계약 진행에 따른 약관 및 이용
                  안내에
                </AgreementTextLine>
                <AgreementTextLine>
                  대한 설명을 듣고 이해했으며, 이사 및 부대 서비스를 신총하고
                  개인정보
                </AgreementTextLine>
                <AgreementTextLine>
                  수집 및 활용에 동의합니다.
                  <ImageBox>
                    <Image
                      src={`/icon/${
                        detailData.pushYN ? "checked" : "unchecked"
                      }.png`}
                      width={"1.6vw"}
                      height={"1.6vw"}
                    ></Image>
                  </ImageBox>
                </AgreementTextLine>
              </AgreementBox>
              <SignatureBox>
                <SignatureTitle>
                  <PriceNameInput>고객서명</PriceNameInput>
                </SignatureTitle>
                <SignatureArea>
                  <MemoRound2 ref={divRef2} id={"CanvasPanel2"}>
                    <Stage
                      width={dimensions2.width}
                      height={dimensions2.height}
                      ref={stageRef2}
                      stroke={""}
                    >
                      <Layer>
                        {lines2.map((line: any, i: any) => (
                          <Line
                            key={i}
                            points={line.points.map(
                              (point: number) => point * 0.24
                            )}
                            stroke={line.stroke}
                            strokeWidth={1}
                            tension={0.8}
                            lineCap="round"
                            globalCompositeOperation={
                              line.tool === "eraser"
                                ? "destination-out"
                                : "source-over"
                            }
                          />
                        ))}
                      </Layer>
                    </Stage>
                  </MemoRound2>
                </SignatureArea>
              </SignatureBox>
            </PriceListArea>
          </BottomComponent>
          <TextMemoBox></TextMemoBox>
          <TextMemoBox></TextMemoBox>
          {/* <BottomLine></BottomLine> */}
        </ContentArea>
        <FooterArea>
          <FooterItemBox>
            <FooterItem1>www.tonginexp.com</FooterItem1>
            <FooterItem2>고객센터: 1988-0123</FooterItem2>
            <FooterItem2>본사: 02-3678-0123</FooterItem2>
            <FooterItem2>서울시 서초구 양재대로12길 36</FooterItem2>
            <FooterItem3>
              <div>SERIAL NO.</div>
              <div>{reNum}</div>
            </FooterItem3>
          </FooterItemBox>
          <Index>- 1 -</Index>
        </FooterArea>
      </Container>
    </Wrapper>
  );
};
export default FirstPage;
