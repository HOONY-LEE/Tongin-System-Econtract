import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 60px;
  outline: 1px dashed green;
`;

const TabItem = styled.div`
  margin-right: 6vh;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #d8d8d8;
  color: white;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
`;

const Marker = styled.div`
  margin-top: 6px;
  width: 5px;
  height: 90%;
  background-color: #ff7f3b;
`;

const TitleBox = styled.div`
  width: 200px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 30px;
`;

export default function AdminTabComponent(props: any) {
  const navigate = useNavigate();

  const onClickHandle = (e: any) => {
    alert(e.target.id);
  };
  return (
    <>
      <Wrapper>
        <TabItem id="aa1" onClick={onClickHandle}>
          <Marker></Marker>
          <TitleBox>계정 관리</TitleBox>
        </TabItem>
        <TabItem id="aa2" onClick={onClickHandle}>
          <Marker></Marker>
          <TitleBox>계정 생성</TitleBox>
        </TabItem>
        <TabItem id="aa3" onClick={onClickHandle}>
          <Marker></Marker>
          <TitleBox>관리자 메뉴1</TitleBox>
        </TabItem>
        <TabItem id="aa4" onClick={onClickHandle}>
          <Marker></Marker>
          <TitleBox>관리자 메뉴2</TitleBox>
        </TabItem>
      </Wrapper>
    </>
  );
}
