import styled from "styled-components";

import { useState } from "react";
import react, { useEffect } from "react";
import axios from "axios";
// import DetailComponent from "../components/detail/detailComponent";
// import CustomButton from "../components/common/customButton";
// import {
//   FlexBox,
//   FlexBoxRow,
//   FlexX,
//   FlexXY,
//   FlexY,
// } from "../components/common/flexBox";

// import ProductComponent from "../components/detail/productComponent";

import { useParams } from "react-router-dom";
import API from "../../../API/API";
import { FlexX, FlexXY } from "../../common/flexBox";
import SiteDetailComponent from "../detail/siteDetailComponent";
import PencilIcon from "../../icon/pencil";
import DetailDrawingPanelComponent from "../../detail/detailDrawingPanelComponent";
// import DetailDrawingPanelComponent from "../components/detail/detailDrawingPanelComponent";
// import ContractComponent from "../components/detail/contractComponent";
// import PencilIcon from "../components/icon/pencil";
// import NewOptionComponent from "../components/detail/newOptionComponent";
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
    border-radius: 0.5vw 0.5vw 0px 0px;
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
  border-radius: 0px 0.6vw 0.6vw 0.6vw;
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
const DrawingBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7vw;
  height: 7vw;
  border-radius: 50%;
  background-color: #ff7f3b;
  position: fixed;
  bottom: 5vh;
  right: 5vw;
  box-shadow: 0 0.5vh 0.5vh rgba(0, 0, 0, 0.073),
    0 0.5vh 0.5vh rgba(0, 0, 0, 0.023);
  &:hover {
    cursor: pointer;
    background-color: rgb(255, 144, 85);
  }
`;

export default function SiteTabPage() {
  const [currentTab, setCurrentTab] = useState(0); //tab
  const [drawingData, setDrawingData] = useState<any[]>([]);
  const [lines, setLines] = useState<any[]>([]);
  const reNum = useParams().id;
  const menuArr = [{ name: "자체견적 현장접수", content: "현장접수 영역" }];

  const selectMenuHandler = (index: any) => {
    setCurrentTab(index);
  };

  useEffect(() => {
    if (drawingData?.length >= 0) {
      setLines(drawingData);
    } else {
      setDrawingData([]);
    }
  }, [drawingData]);
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
                <SiteDetailComponent></SiteDetailComponent>
              </DetialTabBox>
            ) : null}
          </ContentBox>
        </HomeContainer>
      </FlexXY>
    </>
  );
}
