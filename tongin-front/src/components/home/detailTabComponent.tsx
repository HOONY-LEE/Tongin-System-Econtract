import React from "react";
import styled from "styled-components";
import ListComponent from "./listComponent";
import { useState } from "react";
import react, { useEffect } from "react";
import axios from "axios";
import DetailComponent from "./detailComponent";
import CustomButton from "../common/customButton";

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

// 견적리스트 탭
const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
  /* outline: 1px solid red; */

  /* outline: 1px solid red; */
`;

// 미계약리스트 탭
const CreateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
`;

// 계약리스트 탭
const Menu1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40vh;
`;

// 작업리스트 탭
const Menu2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40vh;
`;

export default function DetailTabComponent(props: any) {
  const [currentTab, setCurrentTab] = useState(0); //tab

  const { listPage } = props;
  const menuArr = [
    { name: "상세정보", content: "견적리스트 영역" },
    { name: "물품정보", content: "미계약 리스트 영역" },
    { name: "옵션선택", content: "계약 리스트 영역" },
    { name: "견적•계약서", content: "작업리스트 영역" },
  ];
  const listShow = () => {
    props.listPage(false);
  };
  const selectMenuHandler = (index: any) => {
    setCurrentTab(index);
  };

  return (
    <>
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
            <DetailComponent></DetailComponent>
          </ListBox>
        ) : null}
        {currentTab === 1 ? <ListBox>준비중</ListBox> : null}
        {currentTab === 2 ? <ListBox>준비중</ListBox> : null}
        {currentTab === 3 ? <ListBox>준비중</ListBox> : null}
      </ContentBox>
      <CustomButton
        onClick={listShow}
        width={"100%"}
        height={"6vw"}
        text={`임시 LIST로 나가기`}
        size={"2.5vw"}
        radius={"0.7vw"}
      ></CustomButton>
    </>
  );
}
