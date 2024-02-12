import styled from "styled-components";
import CustomButton from "./common/customButton";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const Tmp = styled.div`
  width: 100%;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 5vh;
  background-color: white;
  border-bottom: 1px solid gray;
`;

const Image = styled.img.attrs({})`
  margin-left: 2vh;
  width: 3.6vh;
  height: 3.6vh;
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20vh;
  height: 3.4vh;
  font-size: 2vh;
  font-weight: 600;
`;

const LeftBox = styled.div`
  display: flex;
  align-items: center;
  width: 8vh;
  height: 4vh;
`;
const MidBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30vh;
  height: 4vh;
`;
const RightBox = styled.div`
  display: flex;
  align-items: center;
  width: 10vh;
  height: 4vh;
`;

const AdminHeader = () => {
  const navigate = useNavigate();

  const logout = () => {
    // eslint-disable-next-line no-restricted-globals
    confirm("로그아웃 하시겠습니까?");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("loginUser");
    navigate("/login");
  };

  return (
    <>
      <Header>
        <LeftBox>
          <Image
            src="img/tongin_logo.png"
            alt="로고 이미지"
            width={"10vw"}
            height={"10vw"}
          />
        </LeftBox>
        <MidBox>
          <Title>헤더</Title>
        </MidBox>
        <RightBox>
          <CustomButton
            onClick={logout}
            width={"6vh"}
            height={"3.2vh"}
            size={"1.2vh"}
            radius={"0.4vh"}
            text={"로그아웃"}
          ></CustomButton>
        </RightBox>
      </Header>
    </>
  );
};
export default function Layout() {
  return (
    <>
      <AdminHeader />
      <Outlet></Outlet>
    </>
  );
}
