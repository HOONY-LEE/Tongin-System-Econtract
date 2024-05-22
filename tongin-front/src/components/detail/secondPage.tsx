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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const Container = styled.div`
  padding: 2vw 4vw;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Header = styled.div`
  width: 100%;
  height: 5vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const HeaderTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 800;
  font-size: 3vw;
  height: 4vw;
`;
const LogoImg = styled.div`
  width: 20vw;
  height: 6vw;
  padding-left: 1vw;
`;

const ContentArea = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;
const TopArea = styled.div`
  display: flex;
  justify-content: start;
  border-top: 0.16vw solid black;
  border-bottom: 0.16vw solid black;
  border: 0.16vw solid black;
  width: 100%;
`;
const MidArea = styled.div`
  margin-top: 1vw;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const NameArea = styled.div`
  width: 8.8vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const NameTitleBox = styled.div`
  width: 100%;
  height: 3vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  border-bottom: 0.16vw solid black;
`;
const NameTitleBox2 = styled.div`
  width: 100%;
  height: 3.2vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  border-bottom: 0.16vw solid black;
  /* background-color: red; */
`;

const ItemNameBox = styled.div`
  width: 100%;
`;

const ProductArea = styled.div`
  width: 12vw;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 0.14vw solid black;
  /* border-top: 0.16vw solid black; */
`;

const ItemArea = styled.div`
  display: flex;
  justify-content: start;
  border: 0.16vw solid black;
`;
const ItemArea2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* background-color: red; */
  /* border-top: 0.16vw solid black; */
  /* border-bottom: 0.16vw solid black; */
`;

const TopItemArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  border: 0.16vw solid black;
  /* border-top: 0.16vw solid black;
  border-bottom: 0.16vw solid black; */
  width: 100%;
  /* background-color: red; */
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
  font-size: 10px;
  font-weight: 500;
`;

const FooterItem2 = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 10px;
  font-weight: 200;
`;

const FooterItem3 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  height: 3vw;
  font-size: 12px;
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
  font-size: 14px;
  font-weight: 300;
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
                  <ProductArea key={index}>
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
                  <ProductArea key={index}>
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
                  <NameTitleBox2>
                    <Image src="/icon/titleBox.png" width={"100%"}></Image>
                  </NameTitleBox2>
                  <ItemNameBox>
                    <ContractProductNameComponent
                      articleDataList={frontDataList[0].articleData}
                    ></ContractProductNameComponent>
                  </ItemNameBox>
                </NameArea>
                {frontDataList.map((item: any, index: number) => {
                  return (
                    <ProductArea key={index}>
                      <ContractProductComponent
                        articleData={item}
                      ></ContractProductComponent>
                    </ProductArea>
                  );
                })}
              </TopItemArea>
              <TopItemArea>
                <NameArea>
                  <NameTitleBox2>
                    <Image src="/icon/titleBox.png" width={"100%"}></Image>
                  </NameTitleBox2>
                  <ItemNameBox>
                    <ContractProductNameComponent
                      articleDataList={backDataList[0].articleData}
                    ></ContractProductNameComponent>
                  </ItemNameBox>
                </NameArea>
                {backDataList.map((item: any, index: number) => {
                  return (
                    <ProductArea key={index}>
                      <ContractProductComponent
                        articleData={item}
                      ></ContractProductComponent>
                    </ProductArea>
                  );
                })}
              </TopItemArea>
              <TopItemArea>
                <NameArea>
                  <NameTitleBox2>
                    <Image src="/icon/titleBox.png" width={"100%"}></Image>
                  </NameTitleBox2>
                  <ItemNameBox>
                    <ContractProductNameComponent
                      articleDataList={bathroommDataList[0].articleData}
                    ></ContractProductNameComponent>
                  </ItemNameBox>
                </NameArea>
                {bathroommDataList.map((item: any, index: number) => {
                  return (
                    <ProductArea key={index}>
                      <ContractProductComponent
                        articleData={item}
                      ></ContractProductComponent>
                    </ProductArea>
                  );
                })}
              </TopItemArea>
            </ItemArea2>
          </MidArea>
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
          <Index>- 2 -</Index>
        </FooterArea>
      </Container>
    </Wrapper>
  );
};
export default SecondPage;
