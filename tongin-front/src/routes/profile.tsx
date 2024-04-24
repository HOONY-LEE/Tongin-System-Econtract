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
  justify-content: start;
  width: 70vw;
  height: 90vw;
  border-radius: 0.8vw;
  background-color: white;
  margin-bottom: 3vw;
  padding: 2vw;
  /* outline: 0.2vw solid gray; */
  /* margin: 0.7vh 0vh 0.7vh 0vh; */
  box-shadow: 0 0.5vh 0.5vh rgba(0, 0, 0, 0.01),
    0 0.5vh 0.5vh rgba(0, 0, 0, 0.003);
`;

const ContentWrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const TextBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 3.4vw;
  font-weight: 800;
  margin-top: 2vw;
`;

const UserInfoArea = styled.div`
  width: 100%;
  margin-top: 4vw;
  padding: 2vw;
  padding-bottom: 4vw;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  background-color: #f0f0f0bc;
  border-radius: 1vw;
`;

const InfoItem = styled.p`
  margin-top: 2vw;
  font-size: 2.2vw;
  font-weight: 300;
`;

export default function Profile() {
  const navigate = useNavigate();
  const loginUser = JSON.parse(localStorage.getItem("loginUser") || "{}");
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
          <ContentWrapper>
            <TextBox>사용자 정보</TextBox>
            <UserInfoArea>
              <InfoItem>이름 : {loginUser.name}</InfoItem>
              <InfoItem>전화번호 : {loginUser.contact}</InfoItem>
              <InfoItem>직원코드 : {loginUser.empCod}</InfoItem>
              <InfoItem>지점명 : {loginUser.branch.branchName}</InfoItem>
              <InfoItem>지점코드 : {loginUser.branch.branchCode}</InfoItem>
              <InfoItem>지점장 : {loginUser.branch.branchBoss}</InfoItem>
              <InfoItem>지역 : {loginUser.branch.region}</InfoItem>
            </UserInfoArea>
          </ContentWrapper>
        </ContentBox>
      </Container>
    </>
  );
}
