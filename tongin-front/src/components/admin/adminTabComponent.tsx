import { useState } from "react";
import styled from "styled-components";
import CreateAccountComponent from "./createAccountComponent";
import MemberListComponent from "./memberListComponent";

// Styled-Component 라이브러리를 활용해 TabMenu 와 Desc 컴포넌트의 CSS를 구현.

const TabMenu = styled.ul`
  color: rgb(232, 234, 237);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  margin-top: 10px;
  width: 86vw;
  height: 5vw;
  :hover {
    cursor: pointer;
  }
  .submenu {
    // 기본 Tabmenu 에 대한 CSS를 구현
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
    //선택된 Tabmenu 에만 적용되는 CSS를 구현
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

const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  outline: 1px dashed red;
`;

const CreateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  outline: 1px dashed red;
  height: 70vh;
`;

const Menu1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 1px dashed red;
  height: 40vh;
`;

const Menu2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 1px dashed red;
  height: 40vh;
`;

export const AdminTabComponent = () => {
  // Tab Menu 중 현재 어떤 Tab이 선택되어 있는지 확인하기 위한 currentTab 상태와 currentTab을 갱신하는 함수가 존재해야 하고, 초기값은 0.
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    { name: "계정 관리", content: "계정관리" },
    { name: "계정 생성", content: "계정생성" },
    { name: "메뉴1", content: "메뉴1" },
    { name: "메뉴2", content: "메뉴2" },
  ];

  const selectMenuHandler = (index: any) => {
    setCurrentTab(index);
  };

  return (
    <>
      <TabMenu>
        {menuArr.map((item, index) => (
          <li
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
            <div>계정 목록 리스트</div>
          </ListBox>
        ) : null}
        {currentTab === 1 ? (
          <CreateBox>
            <CreateAccountComponent></CreateAccountComponent>
            <MemberListComponent></MemberListComponent>
          </CreateBox>
        ) : null}
        {currentTab === 2 ? <Menu1>[메뉴1] 미구현</Menu1> : null}
        {currentTab === 3 ? <Menu2>[메뉴2] 미구현</Menu2> : null}
      </ContentBox>
    </>
  );
};
