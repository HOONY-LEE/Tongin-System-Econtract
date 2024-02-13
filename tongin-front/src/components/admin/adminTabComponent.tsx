import { useState } from "react";
import styled from "styled-components";
import CreateAccountComponent from "./createAccountComponent";
import MemberListComponent from "./memberListComponent";

// Styled-Component 라이브러리를 활용해 TabMenu 와 Desc 컴포넌트의 CSS를 구현.

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
  width: 86vw;
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
  /* background-color: white; */
  /* padding: 1vw; */
`;

// 계정관리 탭
const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

// 계정 생성 탭
const CreateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

// 메뉴1 탭
const Menu1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40vh;
`;

// 메뉴2 탭
const Menu2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40vh;
`;

export const AdminTabComponent = () => {
  // 현재 선택된 탭, 디폴트는 0(계정 관리)
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    { name: "계정 관리", content: "계정관리 영역" },
    { name: "계정 생성", content: "계정생성 영역" },
    { name: "메뉴1", content: "메뉴1 영역" },
    { name: "메뉴2", content: "메뉴2 영역" },
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
            <div>계정 목록 리스트</div>
          </ListBox>
        ) : null}
        {currentTab === 1 ? (
          <CreateBox>
            <CreateAccountComponent></CreateAccountComponent>
          </CreateBox>
        ) : null}
        {currentTab === 2 ? <Menu1>[메뉴1] 미구현</Menu1> : null}
        {currentTab === 3 ? <Menu2>[메뉴2] 미구현</Menu2> : null}
      </ContentBox>
    </>
  );
};
