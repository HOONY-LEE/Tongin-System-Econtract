import React from "react";
import styled from "styled-components";
import ListComponent from "../components/home/listComponent";
import { useState } from "react";
import react, { useEffect } from "react";
import axios from "axios";
import DetailComponent from "../components/home/detailComponent";
import CustomButton from "../components/common/customButton";
import {
  FlexBox,
  FlexBoxRow,
  FlexX,
  FlexXY,
  FlexY,
} from "../components/common/flexBox";
import SearchComponent from "../components/home/searchComponent";
import TabComponent from "../components/home/tabComponent";
import { Cookies } from "react-cookie";
import DetailTabComponent from "../components/home/detailTabComponent";
import API from "../API/API";
const HomeContainer = styled.div`
  width: 84vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  outline: 2px solid green;
  margin-bottom: 6vw;
`;
const TabMenu = styled.ul`
  // 탭 메뉴들 포함하고 있는 영역
  color: rgb(232, 234, 237);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  margin-top: 10px;
  width: 84vw;
  height: 5vw;
  :hover {
    cursor: pointer;
  }
  .submenu {
    // 각 탭하나당 CSS
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20vw;
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
  width: 84vw;
  height: 100%;
  border-radius: 0px 0px 0.6vw 0.6vw;
  /* background-color: white; */
  padding: 1vw 0 1vw 0;
`;

//  탭
const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
  /* outline: 1px solid red; */

  /* outline: 1px solid red; */
`;

export default function Detail(props: any) {
  const [currentTab, setCurrentTab] = useState(0); //tab
  const [detailShow, setDetailShow] = useState<any>([]); //tab

  const menuArr = [
    { name: "상세정보", content: "견적리스트 영역" },
    { name: "물품정보", content: "미계약 리스트 영역" },
    { name: "옵션선택", content: "계약 리스트 영역" },
    { name: "견적•계약서", content: "작업리스트 영역" },
  ];

  const selectMenuHandler = (index: any) => {
    setCurrentTab(index);
  };
  const fetchData = async () => {
    const response: any = await API.get("receipt/detail/12");
    console.log(response.data.receiptDetail);
    setDetailShow(response.data.receiptDetail);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
              <ListBox>
                <DetailComponent detailShow={detailShow}></DetailComponent>
              </ListBox>
            ) : null}
            {currentTab === 1 ? <ListBox>준비중</ListBox> : null}
            {currentTab === 2 ? <ListBox>준비중</ListBox> : null}
            {currentTab === 3 ? <ListBox>준비중</ListBox> : null}
          </ContentBox>
        </HomeContainer>
      </FlexXY>
    </>
  );
}
