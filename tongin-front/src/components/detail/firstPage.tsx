import React from "react";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import DrawingViewPanel from "./detailDrawingPanelComponent";
import DetailDrawView from "./dtailDrawView";
import API from "../../API/API";
import { Image } from "../common/image";
import { text } from "stream/consumers";
import SignatureModalComponent from "./signatureModalComponent";

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const Container = styled.div`
  padding: 2vw 1vw 1vw 1vw;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;
const Header = styled.div`
  width: 100%;
  height: 4vw;
  margin-bottom: 2vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const HeaderTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: end;
  font-weight: 800;
  font-size: 3vw;
  height: 4vw;
`;
const LogoImg = styled.div`
  width: 20vw;
  height: 6vw;
  padding-left: 1vw;
  display: flex;
  justify-content: start;
  align-items: end;
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
  /* border-bottom: 0.16vw solid black; */
  height: 3.4vw;
  display: flex;
  align-items: center;
  justify-content: start;
`;
const TopTableTd = styled.div`
  text-align: center;
  width: 100%;
  /* border-top: 0.16vw solid black; */
  border-bottom: 0.16vw solid black;
  height: 3.4vw;
  margin-bottom: 1vw;
  display: flex;
  align-items: center;
  justify-content: start;
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
  font-size: 1.3vw;
  background-color: #f4f4f4;
  width: 10vw;
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: 400;
  justify-content: center;
`;

const TopTdTitle2 = styled.div<{
  $width?: string;
  $borderRight?: string;
  $borderLeft?: string;
}>`
  font-size: 1.3vw;
  background-color: #f4f4f4;
  width: 8vw;
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: 400;
  justify-content: center;
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
  height: 3.4vw;
  border-bottom: 0.1vw solid #e4e4e4;
  /* border-right: 0.1vw solid black; */
`;

const TopTd2 = styled.div<{
  $width?: string;
  $borderRight?: string;
  $borderLeft?: string;
}>`
  font-size: 1.3vw;
  display: flex;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  width: 20vw;
  height: 3.4vw;
  border-bottom: 0.1vw solid #e4e4e4;
  /* border-right: 0.1vw solid black; */
`;

const ApplyInfoTable = styled.div`
  display: flex;
  text-align: center;
  font-size: 10vw;
  width: 100%;
  margin-bottom: 1vw;
`;

const ApplyInfoTable2 = styled.div`
  text-align: center;
  border-top: 0.16vw solid black;
  font-size: 1.3vw;
  width: 100%;
  margin-bottom: 1vw;
`;

const ApplyInfoTr = styled.div<{
  $width?: string;
}>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.1vw solid #e4e4e4;
`;

const WorkConditionBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  border-bottom: 0.1vw solid #e4e4e4;
`;

const ApplyInfoTdTitle = styled.div<{
  $width?: string;
  $borderRight?: string;
  $borderLeft?: string;
}>`
  background-color: #f4f4f4;
  width: ${(props) => (props.$width ? props.$width : "6.12vw")};
  height: 3.4vw;
  display: flex;
  align-items: center;
  font-weight: 400;
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
  font-size: 1.4vw;
  height: 3.4vw;
`;
const MemoBox = styled.div`
  width: 41vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
`;

const TextMemoBox = styled.div`
  width: 100%;
  height: 5vw;
  border: 0.1vw solid #a1a1a1;
  background-color: #fafafa;
  border-radius: 0.4vw;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: start;
  padding: 1vw;
`;

const TextLine = styled.div`
  font-size: 1.3vw;
  margin-bottom: 0.2vw;
`;
const TextSpan1 = styled.span`
  color: black;
  font-size: 1.3vw;
  margin-bottom: 0.2vw;
`;
const TextSpan2 = styled.span`
  color: #ff7f3b;
  text-decoration: underline;
  font-size: 1.3vw;
  margin-bottom: 0.4vw;
`;

const MemoRound = styled.div`
  width: 41vw;
  height: 18vw;
  border: 0.1vw solid #a1a1a1;
  background-color: #fafafa;
  border-radius: 0.6vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 2vw;
  padding-left: 2vw;
  margin-top: 1vw;
`;

const TextMemoRound = styled.div`
  width: 100%;
  height: 40vw;
  border: 0.1vw solid #a1a1a1;
  background-color: #fafafa;
  border-radius: 0.6vw;
  display: flex;
  justify-content: start;
  align-items: start;
  padding: 1vw;
`;

// const TextMemoText = styled.pre`
//   font-size: 1.2vw;
//   font-weight: 300;
//   text-align: start;
//   line-height: 1.2vw;
//   color: #383838;
// `;
const TextMemoText = styled.pre`
  font-size: 1.6vw;
  font-weight: 400;
  text-align: start;
  line-height: 2vw;
  color: #000000;
  white-space: pre-line; /* width 안에서 받아온 엔터 그대로 적용 될 수 있도록 처리 / 넘치면 아래로 내려감 */
  border: none;
  width: 100%; /* 원하는 너비 */
  height: 100%; /* 원하는 높이 */
  resize: none; /* 크기 조절 비활성화 */
  background-color: #fafafa;
  outline: none; /* 포커스 아웃라인 제거 */
  :read-only {
    background-color: #fafafa; /* 읽기 전용일 때 배경색 (선택 사항) */
  }
  overflow: hidden;
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
  justify-content: space-between;
  width: 100%;
  height: 60vw;
`;
const PriceListArea = styled.div`
  width: 32vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: end;
`;

const PriceListBox = styled.div`
  width: 100%;
  border-top: 0.16vw solid black;
  border-left: 0.1vw solid black;
  margin-bottom: 1vw;
`;

const TotalPriceBox = styled.div`
  margin-top: 1vw;
  width: 100%;
  height: 3vw;
  display: flex;
  border-bottom: 0.16vw solid black;
  margin-bottom: 1vw;
`;

const TotalPriceName = styled.div`
  width: 46%;
  height: 100%;
  margin-bottom: 1vw;
  display: flex;
  align-items: center;
`;
const TotalPriceInput = styled.div`
  width: 54%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  margin-bottom: 1vw;
`;

const PriceNameInput = styled.p`
  text-align: start;
  font-size: 1.7vw;
  font-weight: 600;
`;

const PriceInput = styled.p`
  text-align: end;
  font-size: 1.8vw;
  font-weight: 600;
  width: 10vw;
`;

const PriceNameInputEng = styled.p`
  font-size: 1.3vw;
  font-weight: 300;
  padding-left: 0.4vw;
  padding-right: 0.8vw;
  padding-top: 0.6vw;
`;

const AgreementBox = styled.div`
  width: 100%;
  height: 6.2vw;
  display: flex;
  /* flex-direction: column; */
  justify-content: space-evenly;
  border-bottom: 0.16vw solid black;
  /* background-color: gray; */
`;
const ImageBox = styled.div`
  margin-right: 1vw;
`;

const AgreementTextLine = styled.div`
  margin-top: 0.3vw;
  height: 2vw;
  font-size: 0.8vw;
  line-height: 1.1vw;
  font-weight: 300;
  display: flex;
  text-align: start;
  justify-content: space-between;
  align-items: center;
`;

const SignatureBox = styled.div`
  width: 100%;
  height: 8vw;
  display: flex;
  justify-content: space-between;
  border-bottom: 0.16vw solid black;
  margin-top: 1vw;
`;

const SignatureTitle = styled.div`
  width: 30%;
  height: 100%;
  margin-top: 0.1vw;
`;

const SignatureArea = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4vw;
`;

const PriceItemBox = styled.div`
  width: 100%;
  height: 3vw;
  display: flex;
`;
const PriceItemBox3 = styled.div`
  width: 100%;
  height: 3.8vw;
  display: flex;
  /* border-left: 0.1vw solid black;
  border-top: 0.1vw solid black; */
`;

const PriceItemBox2 = styled.div`
  width: 15.8vw;
  height: 3vw;
  display: flex;
`;

const OptionItemName = styled.div`
  width: 8.2vw;
  height: 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f4f4f4;
  font-size: 1.3vw;
  border-bottom: 0.1vw solid #b4b4b4;
  /* border-right: 0.1vw solid gray; */
`;

const OptionItem = styled.div`
  width: 8vw;
  height: 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3vw;
  border-bottom: 0.1vw solid #b4b4b4;
  /* border-right: 0.1vw solid gray; */
`;

const OptionItem2 = styled.div`
  width: 8vw;
  height: 3vw;
  display: flex;
  justify-content: end;
  align-items: center;
  font-size: 1.3vw;
  border-bottom: 0.1vw solid #b4b4b4;
`;

const OptionItemListBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const PriceItemName = styled.div`
  width: 48%;
  height: 100%;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
  font-size: 1.3vw;
  padding-left: 1vw;
  border-bottom: 0.1vw solid #dbdbdb;
`;

const PriceItemPrice = styled.div`
  width: 52%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  padding-right: 1vw;
  border-bottom: 0.04vw solid #d3d3d3;
`;
const PriceItemName2 = styled.div`
  width: 48%;
  height: 100%;
  background-color: #f4f4f4;
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 1.6vw;

  padding-left: 1vw;
  border-bottom: 0.1vw solid #dbdbdb;
`;

const PriceItemPrice2 = styled.div`
  width: 52%;
  height: 100%;
  display: flex;
  font-weight: 600;
  justify-content: end;
  align-items: center;
  padding-right: 1vw;
  border-bottom: 0.04vw solid #d3d3d3;
`;
const Price = styled.p`
  font-size: 1.5vw;
  font-weight: 400;
  margin-right: 0.4vw;
`;
const Price2 = styled.p`
  font-size: 1.6vw;
  font-weight: 600;
  margin-right: 0.4vw;
`;
const Unit = styled.p`
  font-size: 1.3vw;
  font-weight: 100;
  padding-top: 0.3vw;
`;

const EstimateTable = styled.div`
  text-align: center;
  border-top: 0.1vw solid black;
  /* outline: 1px solid black; */
  font-size: 1.3px;
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
  font-size: 1.3px;
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
  margin-top: 0.8vw;
  width: 100%;
  border-top: 0.1vw solid black;
  margin-bottom: 0.4vw;
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
  /* height: 5vw; */
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
  height: 3vw;
  font-size: 1.2vw;
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
  height: 1vw;
  font-size: 1.2vw;
  font-weight: 300;
`;

const ServiceArea = styled.div`
  width: 100%;
  margin-bottom: 1vw;
  display: flex;
  border-bottom: 0.04vw solid #e4e4e4;
  border-top: 0.16vw solid black;
`;

const ServiceBox = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const ServiceColumnBox = styled.div`
  width: 100%;
  height: 2.6vw;
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
const SignatureNoneBox = styled.div`
  width: 18vw;
  height: 80%;
  outline: 0.3vw dashed #d0d0d0;
  border-radius: 0.5vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SignatureNoneBoxText = styled.div`
  color: #d0d0d0;
  font-weight: 500;
  font-size: 2.4vw;
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
    getDetailList,
    movingCBM,
    discardCBM,
    setLines,
    setLines2,
    lines2,
    setDrawingData,
    setDrawingData2,
    ladderTruckTotal,
    optionTotalCharge,
    setIsPreviewModalOpen,
    otherDateData,
    contractNum,
  } = props;

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
  const [textMemo, setTextMemo] = useState<string>("");
  const [onSignatureModal, setOnSignatureModal] = useState<boolean>(false);
  const formattedDate = /^(\d{4})(\d{2})(\d{2})$/;
  const signatureModalVisible = () => {
    setOnSignatureModal(true);
  };
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

  const paymentMethodList2 = [
    { id: 0, status: "온라인" },
    { id: 1, status: "현금" },
    { id: 2, status: "카드" },
  ];

  const getDrawingData = async () => {
    const response = await API.get(`receipt/memo/${reNum}`);
    if (response.status === 200) {
      const result = response.data.receiptMemoData;
      const result2 = response.data.textMemo;
      setDrawingData(result);
      setTextMemo(result2);
    } else {
      alert("Fail to getDrawingData()");
    }
  };

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
    getDrawingData();
    setPenColorVisible(true);
    setTool("pen");
    setPenColor("#000000");
  }, []);

  useEffect(() => {
    getDetailList();
  }, [onSignatureModal]);

  const [width, setWidth] = useState<any>(window.innerWidth);
  const [drawNum, setDrawNum] = useState<number>(0.1);
  const [signatureNum, setSignatureNum] = useState<number>(0.41);
  const handleResize = () => {
    setWidth(window.innerWidth);
    if (width < 300) {
      setSignatureNum(0.07);
      setDrawNum(0.1);
    } else if (width < 400) {
      setSignatureNum(0.06);
      setDrawNum(0.14);
    } else if (width < 400) {
      setSignatureNum(0.08);
      setDrawNum(0.16);
    } else if (width < 600) {
      setSignatureNum(0.08);
      setDrawNum(0.18);
    } else if (width < 700) {
      setSignatureNum(0.1);
      setDrawNum(0.26);
    } else if (width < 830) {
      setSignatureNum(0.12);
      setDrawNum(0.3);
    } else if (width < 915) {
      setSignatureNum(0.13);
      setDrawNum(0.3);
    } else if (width < 1050) {
      setSignatureNum(0.16);
      setDrawNum(0.41);
    } else {
      setSignatureNum(0.18);
      setDrawNum(0.43);
    }
  };
  useEffect(() => {
    // console.log(optionData.optionService.ServiceList);
    setTimeout(() => {
      window.addEventListener("resize", handleResize);
      handleResize();
    }, 500);
    return () => {
      // cleanup
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    handleResize();
  }, [width]);
  return (
    <>
      {onSignatureModal && (
        <SignatureModalComponent
          setOnSignatureModal={setOnSignatureModal}
          setIsPreviewModalOpen={setIsPreviewModalOpen}
          // getDrawingData2={getDrawingData2}
          getDetailList={getDetailList}
        />
      )}
      <Wrapper className="firstPageBox">
        <Container>
          <Header>
            <LogoImg>
              <Image
                src="/icon/tonginLogo.png"
                width={"70%"}
                height={"70%"}
              ></Image>
            </LogoImg>
            <HeaderTitle>계약서 • 견적서</HeaderTitle>
          </Header>
          <ContentArea>
            <TopTable>
              <TopTdTitle2>고객명</TopTdTitle2>
              <TopTd>{detailData.name}</TopTd>
              <TopTdTitle $borderLeft={"0.1vw solid black"}>
                이사종류
              </TopTdTitle>
              <TopTd2>{detailData.movingType}</TopTd2>
              <TopTdTitle $borderLeft={"0.1vw solid black"}>
                전화번호
              </TopTdTitle>
              <TopTd>{detailData.contact}</TopTd>
            </TopTable>
            <TopTableTd>
              <TopTdTitle2>담당자</TopTdTitle2>
              <TopTd>{detailData.planner.name}</TopTd>
              <TopTdTitle $borderLeft={"0.1vw solid black"}>
                담당자연락처
              </TopTdTitle>
              <TopTd2>{detailData.planner.contact}</TopTd2>
              <TopTdTitle $borderLeft={"0.1vw solid black"}>지점명</TopTdTitle>
              <TopTd>{detailData.branch.region}</TopTd>
            </TopTableTd>

            <ApplyInfoTable2>
              <ApplyInfoTr>
                <ApplyInfoTdTitle>접수일</ApplyInfoTdTitle>
                <ApplyInfoTd>
                  {detailData.receptionDate === ""
                    ? "--"
                    : detailData.receptionDate.replace(
                        formattedDate,
                        "$1-$2-$3"
                      )}
                </ApplyInfoTd>
                <ApplyInfoTdTitle>계약일</ApplyInfoTdTitle>
                <ApplyInfoTd>
                  {detailData.contractDate === "        "
                    ? otherDateData.fakeContractDate.replace(
                        formattedDate,
                        "$1-$2-$3"
                      )
                    : detailData.contractDate.replace(
                        formattedDate,
                        "$1-$2-$3"
                      )}
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
              <ApplyInfoTr>
                <ApplyInfoTdTitle>포장일</ApplyInfoTdTitle>
                <ApplyInfoTd>
                  {otherDateData.packageDate === ""
                    ? "--"
                    : otherDateData.packageDate.replace(
                        formattedDate,
                        "$1-$2-$3"
                      )}
                </ApplyInfoTd>
                <ApplyInfoTdTitle>운반일</ApplyInfoTdTitle>
                <ApplyInfoTd>
                  {otherDateData.carryDate === ""
                    ? "--"
                    : otherDateData.carryDate.replace(
                        formattedDate,
                        "$1-$2-$3"
                      )}
                </ApplyInfoTd>
                <ApplyInfoTdTitle>정리일</ApplyInfoTdTitle>
                <ApplyInfoTd>
                  {otherDateData.cleanDate === ""
                    ? "--"
                    : otherDateData.cleanDate.replace(
                        formattedDate,
                        "$1-$2-$3"
                      )}
                </ApplyInfoTd>
                <ApplyInfoTdTitle></ApplyInfoTdTitle>
                <ApplyInfoTd></ApplyInfoTd>
              </ApplyInfoTr>
            </ApplyInfoTable2>
            <ApplyInfoTable2>
              <WorkConditionBox>
                <ApplyInfoTdTitle $width={"15%"}>이사 전 주소</ApplyInfoTdTitle>
                <ApplyInfoTd
                  $width={"60%"}
                  $borderRight={"0.1vw solid #e4e4e4"}
                >
                  {`${detailData.preAddress}, ${detailData.preAddressDetail}`}
                </ApplyInfoTd>
                <ApplyInfoTdTitle $width={"15%"}>
                  작업조건 (전)
                </ApplyInfoTdTitle>
                <ApplyInfoTd
                  $width={"14%"}
                  $borderRight={"0.1vw solid #e4e4e4"}
                >
                  {
                    transportationMethodList[
                      optionData.beforeWorkCondition.transportationMethod
                    ].status
                  }
                </ApplyInfoTd>
                <ApplyInfoTd $width={"15%"}>
                  {optionData.beforeWorkCondition.pyeong}(평)
                </ApplyInfoTd>
              </WorkConditionBox>
              <WorkConditionBox>
                <ApplyInfoTdTitle $width={"15%"}>이사 후 주소</ApplyInfoTdTitle>
                <ApplyInfoTd
                  $width={"60%"}
                  $borderRight={"0.1vw solid #e4e4e4"}
                >
                  {`${detailData.afterAddress}, ${detailData.afterAddressDetail}`}
                </ApplyInfoTd>
                <ApplyInfoTdTitle $width={"15%"}>
                  작업조건 (후)
                </ApplyInfoTdTitle>
                <ApplyInfoTd
                  $width={"14%"}
                  $borderRight={"0.1vw solid #e4e4e4"}
                >
                  {
                    transportationMethodList[
                      optionData.afterWorkCondition.transportationMethod
                    ].status
                  }
                </ApplyInfoTd>
                <ApplyInfoTd $width={"15%"}>
                  {optionData.afterWorkCondition.pyeong}(평)
                </ApplyInfoTd>
              </WorkConditionBox>
              {/* <ApplyInfoTr>
                <ApplyInfoTdTitle $width={"18%"}>이사 후 주소</ApplyInfoTdTitle>
                <ApplyInfoTd $width={"56%"}>
                  {`${detailData.afterAddress}, ${detailData.afterAddressDetail}`}
                </ApplyInfoTd>
                <ApplyInfoTdTitle $width={"18%"}>
                  작업조건 (후)
                </ApplyInfoTdTitle>
                <ApplyInfoTd
                  $width={"14%"}
                  $borderRight={"0.1vw solid #e4e4e4"}
                >
                  {
                    transportationMethodList[
                      optionData.afterWorkCondition.transportationMethod
                    ].status
                  }
                </ApplyInfoTd>
                <ApplyInfoTd $width={"14%"}>
                  {optionData.afterWorkCondition.pyeong}(평)
                </ApplyInfoTd>
              </ApplyInfoTr> */}
            </ApplyInfoTable2>

            <ServiceArea>
              <ServiceBox>
                {/* <ServiceColumnBox>
                <ServiceName>서비스</ServiceName>
                <ServiceDate>날짜</ServiceDate>
                <ServicePrice>금액</ServicePrice>
                <ServicePaymentMethod>결제</ServicePaymentMethod>
              </ServiceColumnBox> */}
                {/* 입주청소서비스 */}
                <ServiceColumnBox>
                  <ServiceName>입주청소서비스</ServiceName>
                  <ServiceDate>
                    {optionData.livingService.movingCleaningService.selected
                      ? optionData.livingService.movingCleaningService
                          .serviceRequestDate === ""
                        ? "--"
                        : optionData.livingService.movingCleaningService
                            .serviceRequestDate
                      : "-"}
                  </ServiceDate>
                  <ServicePaymentMethod>
                    {" "}
                    {optionData.livingService.movingCleaningService.selected
                      ? paymentMethodList[
                          optionData.livingService.movingCleaningService
                            .paymentMethod
                        ].status
                      : "-"}
                  </ServicePaymentMethod>
                  <ServicePrice>
                    {optionData.livingService.movingCleaningService.selected
                      ? optionData.livingService.movingCleaningService.servicePayment.toLocaleString()
                      : "-"}
                  </ServicePrice>
                </ServiceColumnBox>
                {/* 정리수납서비스 */}
                <ServiceColumnBox>
                  <ServiceName>정리수납서비스</ServiceName>
                  <ServiceDate>
                    {optionData.livingService.organizationStorageService
                      .selected
                      ? optionData.livingService.organizationStorageService
                          .serviceRequestDate === ""
                        ? "--"
                        : optionData.livingService.organizationStorageService
                            .serviceRequestDate
                      : "-"}
                  </ServiceDate>
                  <ServicePaymentMethod>
                    {" "}
                    {optionData.livingService.organizationStorageService
                      .selected
                      ? paymentMethodList[
                          optionData.livingService.organizationStorageService
                            .paymentMethod
                        ].status
                      : "-"}
                  </ServicePaymentMethod>
                  <ServicePrice>
                    {optionData.livingService.organizationStorageService
                      .selected
                      ? optionData.livingService.organizationStorageService.servicePayment.toLocaleString()
                      : "-"}
                  </ServicePrice>
                </ServiceColumnBox>
                {/* 정리수납서비스 */}
                <ServiceColumnBox>
                  <ServiceName>가전청소서비스</ServiceName>
                  <ServiceDate>
                    {optionData.livingService.electronicCleaningService.selected
                      ? optionData.livingService.electronicCleaningService
                          .serviceRequestDate === ""
                        ? "--"
                        : optionData.livingService.electronicCleaningService
                            .serviceRequestDate
                      : "-"}
                  </ServiceDate>
                  <ServicePaymentMethod>
                    {" "}
                    {optionData.livingService.electronicCleaningService.selected
                      ? paymentMethodList[
                          optionData.livingService.electronicCleaningService
                            .paymentMethod
                        ].status
                      : "-"}
                  </ServicePaymentMethod>
                  <ServicePrice>
                    {optionData.livingService.electronicCleaningService.selected
                      ? optionData.livingService.electronicCleaningService.servicePayment.toLocaleString()
                      : "-"}
                  </ServicePrice>
                </ServiceColumnBox>
              </ServiceBox>
              <ServiceBox>
                {/* <ServiceColumnBox>
                <ServiceName>서비스</ServiceName>
                <ServiceDate>날짜</ServiceDate>
                <ServicePrice>금액</ServicePrice>
                <ServicePaymentMethod>결제</ServicePaymentMethod>
              </ServiceColumnBox> */}
                {/* 탈취살균서비스 */}
                <ServiceColumnBox>
                  <ServiceName>탈취살균서비스</ServiceName>
                  <ServiceDate>
                    {optionData.livingService.deodorizationService.selected
                      ? optionData.livingService.deodorizationService
                          .serviceRequestDate === ""
                        ? "--"
                        : optionData.livingService.deodorizationService
                            .serviceRequestDate
                      : "-"}
                  </ServiceDate>
                  <ServicePaymentMethod>
                    {" "}
                    {optionData.livingService.deodorizationService.selected
                      ? paymentMethodList[
                          optionData.livingService.deodorizationService
                            .paymentMethod
                        ].status
                      : "-"}
                  </ServicePaymentMethod>
                  <ServicePrice>
                    {optionData.livingService.deodorizationService.selected
                      ? optionData.livingService.deodorizationService.servicePayment.toLocaleString()
                      : "-"}
                  </ServicePrice>
                </ServiceColumnBox>
                {/* 에이프런서비스 */}
                <ServiceColumnBox>
                  <ServiceName>에이프런서비스</ServiceName>
                  <ServiceDate>
                    {optionData.livingService.apronService.selected
                      ? optionData.livingService.apronService
                          .serviceRequestDate === ""
                        ? "--"
                        : optionData.livingService.apronService
                            .serviceRequestDate
                      : "-"}
                  </ServiceDate>
                  <ServicePaymentMethod>
                    {" "}
                    {optionData.livingService.apronService.selected
                      ? paymentMethodList[
                          optionData.livingService.apronService.paymentMethod
                        ].status
                      : "-"}
                  </ServicePaymentMethod>
                  <ServicePrice>
                    {optionData.livingService.apronService.selected
                      ? optionData.livingService.apronService.servicePayment.toLocaleString()
                      : "-"}
                  </ServicePrice>
                </ServiceColumnBox>
                {/* 기타서비스 */}
                <ServiceColumnBox>
                  <ServiceName>무브제서비스</ServiceName>
                  <ServiceDate>
                    {optionData.livingService.movjetService.selected
                      ? optionData.livingService.movjetService
                          .serviceRequestDate === ""
                        ? "--"
                        : optionData.livingService.movjetService
                            .serviceRequestDate
                      : "-"}
                  </ServiceDate>
                  <ServicePaymentMethod>
                    {" "}
                    {optionData.livingService.movjetService.selected
                      ? paymentMethodList[
                          optionData.livingService.movjetService.paymentMethod
                        ].status
                      : "-"}
                  </ServicePaymentMethod>
                  <ServicePrice>
                    {optionData.livingService.movjetService.selected
                      ? optionData.livingService.movjetService.servicePayment.toLocaleString()
                      : "-"}
                  </ServicePrice>
                </ServiceColumnBox>
              </ServiceBox>
            </ServiceArea>

            <BottomComponent>
              <MemoBox>
                <TextMemoRound>
                  <TextMemoText>{textMemo}</TextMemoText>
                </TextMemoRound>
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
                            (point: number) => point * drawNum
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
                  {/* <PriceItemBox>
                    <PriceItemName>옵션품목(분해/설치)</PriceItemName>
                    <PriceItemPrice>
                      <Price> {optionTotalCharge.toLocaleString()}</Price>
                      <Unit>₩</Unit>
                    </PriceItemPrice>
                  </PriceItemBox> */}
                  <OptionItemListBox>
                    {optionData.optionService.ServiceList.map(
                      (item: any, index: number) => {
                        return (
                          <PriceItemBox2 key={index}>
                            <>
                              <OptionItemName>
                                {item.optionNameEng === "ETC"
                                  ? item.remark
                                    ? item.remark
                                    : item.optionName
                                  : item.optionName}
                              </OptionItemName>
                              <OptionItem>
                                {item.decomposition && item.installation
                                  ? "분해 / 설치"
                                  : ""}
                                {item.decomposition && !item.installation
                                  ? "설치"
                                  : ""}
                                {!item.decomposition && item.installation
                                  ? "분해"
                                  : ""}
                                {!item.decomposition && !item.installation
                                  ? "-"
                                  : ""}
                              </OptionItem>
                            </>
                          </PriceItemBox2>
                        );
                      }
                    )}
                    <PriceItemBox2>
                      <OptionItemName>옵션금액</OptionItemName>
                      <OptionItem2>
                        {optionTotalCharge.toLocaleString()}₩
                      </OptionItem2>
                    </PriceItemBox2>
                  </OptionItemListBox>
                </PriceListBox>
                <PriceListBox>
                  <PriceItemBox>
                    <PriceItemName>이사물량(운반/폐기)</PriceItemName>
                    <PriceItemPrice>
                      <Price>{`${movingCBM}  /  ${discardCBM}`}</Price>
                      <Unit>cbm</Unit>
                    </PriceItemPrice>
                  </PriceItemBox>
                  <PriceItemBox>
                    <PriceItemName>사다리차 비용</PriceItemName>
                    <PriceItemPrice>
                      <Price>{ladderTruckTotal.toLocaleString()}</Price>
                      <Unit>₩</Unit>
                    </PriceItemPrice>
                  </PriceItemBox>

                  <PriceItemBox>
                    <PriceItemName>기타서비스</PriceItemName>
                    <PriceItemPrice>
                      <Price>
                        {optionData.livingService.otherService.servicePayment.toLocaleString()}
                      </Price>
                      <Unit>₩</Unit>
                    </PriceItemPrice>
                  </PriceItemBox>

                  <PriceItemBox>
                    <PriceItemName>이사비용</PriceItemName>
                    <PriceItemPrice>
                      <Price>{priceDataList[0].amount.toLocaleString()}</Price>
                      <Unit>₩</Unit>
                    </PriceItemPrice>
                  </PriceItemBox>
                  <PriceItemBox>
                    <PriceItemName>보관비용</PriceItemName>
                    <PriceItemPrice>
                      <Price>{priceDataList[1].amount.toLocaleString()}</Price>
                      <Unit>₩</Unit>
                    </PriceItemPrice>
                  </PriceItemBox>
                  <PriceItemBox>
                    <PriceItemName>부가세(VAT)</PriceItemName>
                    <PriceItemPrice>
                      <Price>{priceDataList[2].amount.toLocaleString()}</Price>
                      <Unit>₩</Unit>
                    </PriceItemPrice>
                  </PriceItemBox>
                  <PriceItemBox3>
                    <PriceItemName2>총 비용</PriceItemName2>
                    <PriceItemPrice2>
                      <Price2>
                        {priceDataList[3].amount.toLocaleString()}
                      </Price2>
                      <Unit>₩</Unit>
                    </PriceItemPrice2>
                  </PriceItemBox3>
                  <PriceItemBox3>
                    <PriceItemName2>
                      계약금(
                      {
                        paymentMethodList2[priceDataList[4].paymentMethod]
                          .status
                      }
                      )
                    </PriceItemName2>
                    <PriceItemPrice2>
                      <Price2>
                        {priceDataList[4].amount.toLocaleString()}
                      </Price2>
                      <Unit>₩</Unit>
                    </PriceItemPrice2>
                  </PriceItemBox3>
                  <PriceItemBox3>
                    <PriceItemName2>
                      잔금(
                      {
                        paymentMethodList2[priceDataList[5].paymentMethod]
                          .status
                      }
                      )
                    </PriceItemName2>
                    <PriceItemPrice2>
                      <Price2>
                        {priceDataList[5].amount.toLocaleString()}
                      </Price2>
                      <Unit>₩</Unit>
                    </PriceItemPrice2>
                  </PriceItemBox3>
                </PriceListBox>
                {/* <TotalPriceBox>
                  <TotalPriceName>
                    <PriceNameInput>총 비용</PriceNameInput>
                    <PriceNameInputEng>(VAT별도)</PriceNameInputEng>
                  </TotalPriceName>
                  <TotalPriceInput>
                    <PriceInput>
                      {priceDataList[3].amount.toLocaleString()}
                    </PriceInput>
                    <PriceNameInputEng>₩</PriceNameInputEng>
                  </TotalPriceInput>
                </TotalPriceBox> */}
                {/* <AgreementBox>
                  <AgreementTextLine>
                    본인은 (주)통인익스프레스 견적•계약에 따른 약관 및 이용
                    안내에<br></br>
                    대한 설명을 듣고 이해했으며, 이사 및 부대 서비스를 신청하고{" "}
                    <br></br>
                    개인정보 수집 및 활용에 동의합니다.
                  </AgreementTextLine>
                  <AgreementTextLine>
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
                </AgreementBox> */}
                <SignatureBox>
                  <SignatureTitle>
                    <PriceNameInput>고객서명</PriceNameInput>
                  </SignatureTitle>
                  <SignatureArea>
                    {!detailData.pushYN ? (
                      <SignatureNoneBox onClick={() => signatureModalVisible()}>
                        <SignatureNoneBoxText>서명하기</SignatureNoneBoxText>
                      </SignatureNoneBox>
                    ) : (
                      <>
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
                                    (point: number) => point * signatureNum
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
                      </>
                    )}
                  </SignatureArea>
                </SignatureBox>
              </PriceListArea>
            </BottomComponent>
          </ContentArea>
          <FooterArea>
            <BottomLine></BottomLine>
            <FooterItemBox>
              <FooterItem1>www.tonginexp.com</FooterItem1>
              <FooterItem2>고객센터: 1988-0123</FooterItem2>
              <FooterItem2>본사: 02-3678-0123</FooterItem2>
              <FooterItem2>서울시 서초구 양재대로12길 36</FooterItem2>
              <FooterItem3>
                <div>SERIAL NO.</div>
                <div>{contractNum} </div>
              </FooterItem3>
            </FooterItemBox>
            <Index>- 1 -</Index>
          </FooterArea>
        </Container>
      </Wrapper>
    </>
  );
};
export default FirstPage;
