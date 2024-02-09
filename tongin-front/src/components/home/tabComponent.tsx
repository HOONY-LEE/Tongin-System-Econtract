import React from "react";
import { useState } from "react";
import styled from "styled-components";
import InvoiceListComponent from "./invoiceListComponent";
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
  width: 80vw;
  height: 5vw;
  :hover {
    cursor: pointer;
  }
  .submenu {
    // 각 탭하나당 CSS
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24%;
    height: 100%;
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
  background-color: white;
  padding: 1vw;
`;

// 견적리스트 탭
const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
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

export default function TabComponent(props: any) {
  // 현재 선택된 탭, 디폴트는 0(계정 관리)
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    { name: "견적리스트", content: "견적리스트 영역" },
    { name: "미계약리스트", content: "미계약 리스트 영역" },
    { name: "계약리스트", content: "계약 리스트 영역" },
    { name: "작업리스트", content: "작업리스트 영역" },
  ];

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
            <InvoiceListComponent></InvoiceListComponent>
          </ListBox>
        ) : null}
        {currentTab === 1 ? (
          <CreateBox>
            <InvoiceListComponent></InvoiceListComponent>
            {/* <CreateAccountComponent></CreateAccountComponent>
            <MemberListComponent></MemberListComponent> */}
          </CreateBox>
        ) : null}
        {currentTab === 2 ? <Menu1>[계약] 미구현</Menu1> : null}
        {currentTab === 3 ? <Menu2>[작업] 미구현</Menu2> : null}
      </ContentBox>
    </>
  );
}
