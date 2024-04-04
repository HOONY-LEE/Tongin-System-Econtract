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

const ContentArea = styled.table`
  text-align: center;
  font-size: 2vw;
  width: 100%;
  border-top: 0.15vw solid black;
  border-bottom: 0.15vw solid black;
`;
const TopArea = styled.div`
  display: flex;
  justify-content: start;
`;
const NameArea = styled.div`
  width: 10.7vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-right: 0.14vw solid black;
`;

const NameTitleBox = styled.div`
  width: 100%;
  height: 4.6vw;
  font-size: 1.6vw;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top: 0.14vw solid black;
  border-bottom: 0.14vw solid black;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><line x1="0" y1="0" x2="100%" y2="100%" stroke="black" /></svg>');
`;
const ItemNameBox = styled.div`
  width: 100%;
  height: 40vh;
  /* height: 100%; */
`;

const ProductArea = styled.div`
  width: 12vw;
  font-size: 1.6vw;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-top: 0.14vw solid black;
  border-bottom: 0.14vw solid black;
  border-left: 0.1vw solid black;
`;
const LeftTd = styled.div`
  text-align: left;
  margin-left: 0.4vw;
`;
const RightTd = styled.div`
  text-align: right;
  margin-right: 0.4vw;
`;
const Th = styled.th`
  border-right: 0.14vw solid black;
  width: 10vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2vw;
  font-weight: 600;
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
// SecondPage 컴포넌트 정의
const SecondPage = (props: any) => {
  const { priceDataList, articleDataList, optionData, lines, reNum, setLines } =
    props;
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
  const roomDataList: any = [];
  const livingroomDataList: any = [];
  const kitchen: any = [];
  const frontDataList: any = [];
  const backDataList: any = [];
  const bathroommDataList: any = [];

  articleDataList.forEach((item: any, index: number) => {
    if (index < 5) {
      roomDataList.push(item);
    } else if (index === 5) {
      livingroomDataList.push(item);
    } else if (index === 6) {
      kitchen.push(item);
    } else if (index === 7) {
      frontDataList.push(item);
    } else if (index === 8) {
      backDataList.push(item);
    } else if (index === 9) {
      bathroommDataList.push(item);
    }
  });

  return (
    <Wrapper className="secondPageBox">
      <Container>
        <Header>
          <LogoImg>
            <Image
              src="/icon/tonginLogo.png"
              width={"100%"}
              height={"100%"}
            ></Image>
          </LogoImg>
          <HeaderTitle>이사물량 견적표</HeaderTitle>
        </Header>
        <ContentArea>
          {/* <Image
            src="/img/contractTmpImage.png"
            width={"100%"}
            height={"100%"}
          ></Image> */}
          <TopArea>
            <NameArea>
              <NameTitleBox>
                <RightTd>방</RightTd>
                <LeftTd>품목</LeftTd>
              </NameTitleBox>
              <ItemNameBox></ItemNameBox>
            </NameArea>
            {roomDataList.map((item: any, index: number) => {
              return <ProductArea>{item.locationName}</ProductArea>;
            })}
            {/* <ProductArea></ProductArea> */}
            {/* <ProductArea></ProductArea>
            <ProductArea></ProductArea>
            <ProductArea></ProductArea>
            <ProductArea></ProductArea> */}
          </TopArea>
        </ContentArea>
      </Container>
    </Wrapper>
  );
};
export default SecondPage;
