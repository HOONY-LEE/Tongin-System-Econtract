import styled from "styled-components";
import { useState } from "react";
import react, { useEffect } from "react";
import CustomButton from "../components/common/customButton";
import { Outlet, useNavigate } from "react-router-dom";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 2vw;
`;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 70vw;
  height: 20vh;
  border-radius: 0.8vw;
  background-color: white;
  margin-bottom: 3vw;
  /* outline: 0.2vw solid gray; */
  /* margin: 0.7vh 0vh 0.7vh 0vh; */
  box-shadow: 0 0.5vh 0.5vh rgba(0, 0, 0, 0.01),
    0 0.5vh 0.5vh rgba(0, 0, 0, 0.003);
`;
const TextBox = styled.div`
  font-size: 4vw;
  font-weight: 600;
`;
export default function Profile() {
  const navigate = useNavigate();

  const logout = () => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("loginUser");
      navigate("/login");
    }
  };
  return (
    <>
      <Container>
        <ContentBox>
          <TextBox>마이페이지 수정중입니다</TextBox>
        </ContentBox>
        <CustomButton
          onClick={logout}
          width={"70vw"}
          height={"3.2vh"}
          size={"1.2vh"}
          radius={"0.4vh"}
          text={"로그아웃"}
        ></CustomButton>
      </Container>
    </>
  );
}
