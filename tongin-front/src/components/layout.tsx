import styled from "styled-components";
import CustomButton from "./common/customButton";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import UserIcon from "./icon/userIcon";
import { useEffect, useState } from "react";
import { URLSearchParams } from "url";

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 8vw;
  background-color: white;
  box-shadow: 1vw 1vw 1vw 1vw #adadad10;
`;

const Image = styled.img.attrs({})`
  margin-left: 3vw;
  width: 6vw;
  height: 6vw;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 2vh;
  font-weight: 600;
  color: #ff7f3b;
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
  width: 20%;
  height: 100%;
`;
const MidBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 60%;
  height: 100%;
`;

const MenuTabItem = styled.div`
  width: 16vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &&:hover {
    cursor: pointer;
  }
`;

const MenuTabTitle = styled.div<{ $selectedTab?: number; index?: number }>`
  width: 100%;
  height: 7vw;
  color: ${(props) =>
    props.$selectedTab === props.index
      ? props.index === 3
        ? "#6AD959"
        : "#ff7f3b"
      : "#505050"};
  font-size: 2.6vw;
  font-weight: ${(props) =>
    props.$selectedTab === props.index ? "700" : "400"};
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1vw;
`;
const MenuTabLine = styled.div<{ $selectedTab?: number; index?: number }>`
  width: 100%;
  height: 0.8vw;
  background-color: ${(props) =>
    props.$selectedTab === props.index
      ? props.index === 3
        ? "#6AD959"
        : "#ff7f3b"
      : "white"};
  border-radius: 2vw;
`;

const RightBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  width: 20%;
  height: 100%;
`;
const MyPage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 3vw;
  background-color: #ff803b16;
  border-radius: 2vw;
  width: 6vw;
  height: 6vw;
  &&:hover {
    cursor: pointer;
  }
`;

const MyMenuArea = styled.div`
  background-color: #fffffff4;
  width: 16vw;
  position: absolute;
  top: 8vw;
  right: 0.2vw;
  border-radius: 0.4vw;
  display: flex;
  flex-direction: column;
  padding: 1vw;
  border: 0.4vw solid #ff7f3b;
  z-index: 9999;
`;

const NameItem = styled.div`
  width: 100%;
  height: 3vw;
  display: flex;
  justify-content: end;
  padding-right: 1vw;
  border-bottom: 0.1vw solid #ff7f3b;
  font-size: 1.6vw;
  font-weight: 500;
  /* color: #ff7f3b; */
`;

const MenuItem = styled.div`
  margin-top: 1vw;
  width: 100%;
  height: 4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2vw;
  border-radius: 0.4vw;
  padding: 1vw;
  &&:hover {
    background-color: #ff7f3b;
    color: white;
    cursor: pointer;
  }
`;
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9998; /* 모달보다 아래에 위치하도록 설정합니다. */
`;

const MyPageText = styled.div``;
const HomeHeader = () => {
  const url = window.location.href;

  const navigate = useNavigate();

  const loginUser = JSON.parse(localStorage.getItem("loginUser") || "{}");
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<number>(1);

  useEffect(() => {
    if (url.includes("/contractlist")) {
      setSelectedTab(2);
      return;
    } else if (url.includes("/onsitecontract")) {
      setSelectedTab(3);
      return;
    } else {
      setSelectedTab(1);
      return;
    }
  }, [url]);

  const logout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("loginUser");
      navigate("/login");
    }
  };

  const closeMenu = () => {
    setOpenMenu(false);
  };

  const goOnsitecontract = () => {
    navigate("/onsitecontract");
  };

  const goHome = () => {
    navigate("/");
  };

  const goContractList = () => {
    navigate("/contractlist");
  };

  const goProfile = () => {
    navigate("profile");
  };

  return (
    <>
      {openMenu && <Backdrop onClick={closeMenu}></Backdrop>}
      <Header>
        <LeftBox onClick={goHome}>
          <Image
            src="../img/tongin_logo.png"
            alt="로고 이미지"
            width={"10vw"}
            height={"10vw"}
          />
        </LeftBox>
        <MidBox>
          <MenuTabItem
            onClick={() => {
              // setSelectedTab(1);
              goHome();
            }}
          >
            <MenuTabTitle $selectedTab={selectedTab} index={1}>
              홈
            </MenuTabTitle>
            <MenuTabLine $selectedTab={selectedTab} index={1}></MenuTabLine>
          </MenuTabItem>
          <MenuTabItem
            onClick={() => {
              // setSelectedTab(2);
              goContractList();
            }}
          >
            <MenuTabTitle $selectedTab={selectedTab} index={2}>
              견적리스트
            </MenuTabTitle>
            <MenuTabLine $selectedTab={selectedTab} index={2}></MenuTabLine>
          </MenuTabItem>
          <MenuTabItem
            onClick={() => {
              // setSelectedTab(3);
              goOnsitecontract();
            }}
          >
            <MenuTabTitle $selectedTab={selectedTab} index={3}>
              현장접수
            </MenuTabTitle>
            <MenuTabLine $selectedTab={selectedTab} index={3}></MenuTabLine>
          </MenuTabItem>
        </MidBox>
        <RightBox>
          <MyPage
            onClick={() => {
              setOpenMenu(!openMenu);
            }}
          >
            <UserIcon width={"4vw"} fill={"#ff7f3b"} />
            {/* <MyPageText>{loginUser.name} 님</MyPageText> */}
            {openMenu && (
              <MyMenuArea>
                <NameItem>{loginUser.name} 님</NameItem>
                <MenuItem>설정</MenuItem>
                <MenuItem onClick={goProfile}>프로필</MenuItem>
                <MenuItem onClick={logout}>로그아웃</MenuItem>
              </MyMenuArea>
            )}
          </MyPage>
        </RightBox>
      </Header>
    </>
  );
};
export default function Layout() {
  return (
    <>
      <HomeHeader />
      <Outlet></Outlet>
    </>
  );
}
