import React from "react";
import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import DrawingViewPanel from "./detailDrawingPanelComponent";
import DetailDrawView from "./dtailDrawView";
import API from "../../API/API";
import { Image } from "../common/image";
import ContractProductComponent from "../contract/contractProductComponent";
import ContractProductNameComponent from "../contract/contractProductNameComponent";

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
  height: 97%;
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
`;
const TopArea = styled.div`
  display: flex;
  justify-content: start;
  /* border-top: 0.16vw solid black; */
  border-bottom: 0.16vw solid black;
`;

const MidArea = styled.div`
  margin-top: 2vw;
  display: flex;
  justify-content: space-between;
`;
const NameArea = styled.div`
  width: 10.7vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* border-right: 0.12vw solid black; */
`;

const NameTitleBox = styled.div`
  width: 100%;
  height: 4.6vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;
const ItemNameBox = styled.div`
  width: 100%;
`;

const ProductArea = styled.div`
  width: 12vw;
  font-size: 1.6vw;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 0.14vw solid black;
  border-top: 0.16vw solid black;
`;

const ItemArea = styled.div`
  width: 22.8vw;
  display: flex;
  justify-content: center;
  align-items: start;
  /* border: 0.16vw solid black; */
`;

const ItemArea2 = styled.div`
  width: 22.8vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const TopItemArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  /* border: 0.16vw solid black; */
  width: 100%;
`;

const FooterArea = styled.div`
  margin-top: 1vw;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 2vh;
`;

const FooterItem1 = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 12vw;
  height: 100%;
  font-size: 1vw;
  font-weight: 500;
`;

const FooterItem2 = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 12vw;
  height: 100%;
  font-size: 1vw;
  font-weight: 200;
`;

const FooterItem3 = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 22.6vw;
  height: 100%;
  font-size: 1.6vw;
`;

const Index = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 2vh;
  font-size: 1vw;
  font-weight: 100;
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
                <Image src="/icon/titleBox.png" width={"100%"}></Image>
              </NameTitleBox>
              <ItemNameBox>
                <ContractProductNameComponent
                  articleDataList={roomDataList[0].articleData}
                ></ContractProductNameComponent>
              </ItemNameBox>
            </NameArea>
            {roomDataList.map((item: any, index: number) => {
              return (
                <ProductArea key={index}>
                  <ContractProductComponent
                    articleData={item}
                  ></ContractProductComponent>
                </ProductArea>
              );
            })}
          </TopArea>
          <MidArea>
            <ItemArea>
              <NameArea>
                <NameTitleBox>
                  <Image src="/icon/titleBox.png" width={"100%"}></Image>
                </NameTitleBox>
                <ItemNameBox>
                  <ContractProductNameComponent
                    articleDataList={livingroomDataList[0].articleData}
                  ></ContractProductNameComponent>
                </ItemNameBox>
              </NameArea>
              {livingroomDataList.map((item: any, index: number) => {
                return (
                  <ProductArea>
                    <ContractProductComponent
                      articleData={item}
                    ></ContractProductComponent>
                  </ProductArea>
                );
              })}
            </ItemArea>
            <ItemArea>
              <NameArea>
                <NameTitleBox>
                  <Image src="/icon/titleBox.png" width={"100%"}></Image>
                </NameTitleBox>
                <ItemNameBox>
                  <ContractProductNameComponent
                    articleDataList={kitchen[0].articleData}
                  ></ContractProductNameComponent>
                </ItemNameBox>
              </NameArea>
              {kitchen.map((item: any, index: number) => {
                return (
                  <ProductArea>
                    <ContractProductComponent
                      articleData={item}
                    ></ContractProductComponent>
                  </ProductArea>
                );
              })}
            </ItemArea>
            <ItemArea2>
              <TopItemArea>
                <NameArea>
                  <NameTitleBox>
                    <Image src="/icon/titleBox.png" width={"100%"}></Image>
                  </NameTitleBox>
                  <ItemNameBox>
                    <ContractProductNameComponent
                      articleDataList={frontDataList[0].articleData}
                    ></ContractProductNameComponent>
                  </ItemNameBox>
                </NameArea>
                {frontDataList.map((item: any, index: number) => {
                  return (
                    <ProductArea>
                      <ContractProductComponent
                        articleData={item}
                      ></ContractProductComponent>
                    </ProductArea>
                  );
                })}
              </TopItemArea>
              <TopItemArea>
                <NameArea>
                  <NameTitleBox>
                    <Image src="/icon/titleBox.png" width={"100%"}></Image>
                  </NameTitleBox>
                  <ItemNameBox>
                    <ContractProductNameComponent
                      articleDataList={backDataList[0].articleData}
                    ></ContractProductNameComponent>
                  </ItemNameBox>
                </NameArea>
                {backDataList.map((item: any, index: number) => {
                  return (
                    <ProductArea>
                      <ContractProductComponent
                        articleData={item}
                      ></ContractProductComponent>
                    </ProductArea>
                  );
                })}
              </TopItemArea>
              <TopItemArea>
                <NameArea>
                  <NameTitleBox>
                    <Image src="/icon/titleBox.png" width={"100%"}></Image>
                  </NameTitleBox>
                  <ItemNameBox>
                    <ContractProductNameComponent
                      articleDataList={bathroommDataList[0].articleData}
                    ></ContractProductNameComponent>
                  </ItemNameBox>
                </NameArea>
                {bathroommDataList.map((item: any, index: number) => {
                  return (
                    <ProductArea>
                      <ContractProductComponent
                        articleData={item}
                      ></ContractProductComponent>
                    </ProductArea>
                  );
                })}
              </TopItemArea>
            </ItemArea2>
          </MidArea>
          <FooterArea>
            <FooterItem1>www.tonginexp.com</FooterItem1>
            <FooterItem2>고객센터: 1988-0123</FooterItem2>
            <FooterItem2>본사: 02-0000-0000</FooterItem2>
            <FooterItem2>팩스: 00-000-0000</FooterItem2>
            <FooterItem3>SERIAL NO.</FooterItem3>
          </FooterArea>
          <Index>- 2 -</Index>
        </ContentArea>
      </Container>
    </Wrapper>
  );
};
export default SecondPage;
