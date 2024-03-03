import React from "react";
import styled from "styled-components";
import ListComponent from "../components/home/listComponent";
import { useState } from "react";
import react, { useEffect } from "react";
import axios from "axios";
import DetailComponent from "../components/detail/detailComponent";
import CustomButton from "../components/common/customButton";
import {
  FlexBox,
  FlexBoxRow,
  FlexX,
  FlexXY,
  FlexY,
} from "../components/common/flexBox";

import API from "../API/API";
import ProductComponent from "../components/detail/productComponent";
import { sampleProductDataList } from "../components/common/sampleData";
import OptionComponent from "../components/detail/optionComponent";
import { useParams } from "react-router-dom";
import DetailDrawingPanelComponent from "../components/detail/detailDrawingPanelComponent";
import ContractComponent from "../components/detail/contractComponent";
const HomeContainer = styled.div`
  width: 90vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* outline: 2px solid green; */
  margin-bottom: 6vw;
  /* background-color: red; */
`;
const TabMenu = styled.ul`
  // 탭 메뉴들 포함하고 있는 영역
  color: rgb(232, 234, 237);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* background-color: aqua; */
  justify-content: space-between;
  list-style: none;
  margin-top: 10px;
  width: 100%;
  height: 5vw;
  :hover {
    cursor: pointer;
  }
  .submenu {
    // 각 탭하나당 CSS
    display: flex;
    justify-content: center;
    align-items: center;
    width: 22vw;
    height: 5vw;
    padding: 10px;
    font-size: 2vw;
    transition: 0.2s;
    border-radius: 0.4vw 0.4vw 0px 0px;
    background-color: #ebebeb;
    color: black;
  }

  .focused {
    background-color: #ff7f3b;
    color: white;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  height: 100%;
  border-radius: 0px 0px 0.6vw 0.6vw;
`;

//  상세정보 탭
const DetialTabBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
`;

//  물품추가 탭
const ProductTabBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
  /* outline: 1px solid green; */
`;

//  옵션선택 탭
const OptionTabBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
`;

//  견적계약서 탭
const ContractTabBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
  /* outline: 1px solid green; */
`;

//  스크롤 LOCK
const ScrollLock = styled.div`
  .isScroll {
    overflow: hidden !important;
    position: fixed;
    touch-action: none;
  }
`;

export default function Detail() {
  const [currentTab, setCurrentTab] = useState(0); //tab
  const [detailData, setDetailData] = useState<any[]>([]);
  const [articleDataList, setArticleDataList] = useState<any[]>([]);
  const [optionData, setOptionData] = useState<object>({});
  const [currentProductList, setCurrentProductList] = useState<any[]>([]);
  const [drawingPanel, setDrawingPanel] = useState(false);
  const [isSave, setIsSave] = useState<any[]>([]);
  const [isScrolled, setIsScrolled] = useState<any>(true);

  const reNum = useParams().id;

  const menuArr = [
    { name: "1. 상세정보", content: "견적리스트 영역" },
    { name: "2. 물품정보", content: "미계약 리스트 영역" },
    { name: "3. 옵션선택", content: "계약 리스트 영역" },
    { name: "4. 견적•계약서", content: "작업리스트 영역" },
  ];

  const selectMenuHandler = (index: any) => {
    setCurrentTab(index);
  };

  // 상세정보 호출API
  const getDetailList = async () => {
    const response: any = await API.get(`/receipt/detail/${reNum}`);
    if (response.status === 200) {
      const result = response.data.receiptDetail;
      setDetailData(result);
    } else {
      console.log("에러");
    }
  };

  // 물품정보 호출API
  const getProductList = async () => {
    const response = await API.get(`/receipt/article/${reNum}`);
    if (response.status === 200) {
      const result = response.data.receiptArticleData;

      setArticleDataList(result);
    } else {
      console.log("물품 정보 데이터를 불러오지 못했습니다.");
    }
  };

  // 옵션정보 호출API
  const getOptionList = async () => {
    const response = await API.get(`/receipt/option/${reNum}`);
    if (response.status === 200) {
      setOptionData(response.data.receiptOptionData);
    } else {
      console.log("옵션정보 호출API 실패");
    }
  };

  useEffect(() => {
    getDetailList();
    getProductList();
    getOptionList();
  }, []);

  useEffect(() => {
    setCurrentProductList(articleDataList);
  }, [articleDataList]);

  // 스크롤 잠금
  const scrollRock = () => {
    const { body } = document;

    if (!body.getAttribute("scrollY")) {
      const pageY = window.pageYOffset;

      body.setAttribute("scrollY", pageY.toString());

      body.style.overflow = "hidden";
      body.style.touchAction = "none";
      body.style.position = "fixed";
      body.style.left = "0px";
      body.style.right = "0px";
      body.style.bottom = "0px";
      body.style.top = `-${pageY}px`;
      body.style.scrollBehavior = "contain";
    }
  };

  // 스크롤 잠금 해제
  const disableScrollLock = () => {
    const { body } = document;

    if (body.getAttribute("scrollY")) {
      body.style.removeProperty("overflow");
      body.style.removeProperty("position");
      body.style.removeProperty("top");
      body.style.removeProperty("left");
      body.style.removeProperty("right");
      body.style.removeProperty("bottom");
      body.style.removeProperty("touchAction");
      body.style.removeProperty("scrollBehavior");

      window.scrollTo(0, Number(body.getAttribute("scrollY")));

      body.removeAttribute("scrollY");
    }
  };
  return (
    <>
      <FlexXY>
        <HomeContainer>
          <TabMenu>
            {menuArr.map((item, index) => (
              <li
                key={index}
                className={index === currentTab ? "submenu focused" : "submenu"}
                onClick={() => selectMenuHandler(index)}
              >
                {item.name}
              </li>
            ))}
          </TabMenu>
          <ContentBox>
            {currentTab === 0 ? (
              <DetialTabBox>
                <DetailComponent
                  detailData={detailData}
                  setDetailData={setDetailData}
                ></DetailComponent>
              </DetialTabBox>
            ) : null}
            {currentTab === 1 ? (
              <ProductTabBox>
                <ProductComponent
                  reNum={reNum}
                  getProductList={getProductList}
                  currentProductList={currentProductList}
                  setCurrentProductList={setCurrentProductList}
                ></ProductComponent>
              </ProductTabBox>
            ) : null}
            {currentTab === 2 ? (
              <OptionTabBox>
                <OptionComponent
                  optionData={optionData}
                  setOptionData={setOptionData}
                ></OptionComponent>
              </OptionTabBox>
            ) : null}
            {currentTab === 3 ? (
              <ContractTabBox>
                <ContractComponent
                  detailData={detailData}
                  articleDataList={articleDataList}
                  optionData={optionData}
                ></ContractComponent>
              </ContractTabBox>
            ) : null}
          </ContentBox>
          <button
            onClick={() => {
              setDrawingPanel(true);
              scrollRock();
            }}
          >
            {" "}
            드로잉{" "}
          </button>
          {drawingPanel && (
            <DetailDrawingPanelComponent
              setIsSave={setIsSave}
              setIsScrolled={setIsScrolled}
              onClose={() => {
                setDrawingPanel(false);
                disableScrollLock();
              }}
            />
          )}
        </HomeContainer>
      </FlexXY>
    </>
  );
}
