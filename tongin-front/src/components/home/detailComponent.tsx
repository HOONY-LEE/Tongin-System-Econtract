import { userInfo } from "os";
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import react, { useEffect } from "react";
import TabComponent from "./tabComponent";
import axios from "axios";

const ContentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;
  width: 84vw;
  height: 100vw;
  border-radius: 0.7vw;
  background-color: white;
  /* outline: 0.2vw solid gray; */
  margin: 0.7vh 0vh 0.7vh 0vh;
  box-shadow: 0 0.5vh 0.5vh rgba(0, 0, 0, 0.01),
    0 0.5vh 0.5vh rgba(0, 0, 0, 0.003);
`;

const ContentTop = styled.div`
  display: flex;
  align-items: start;
  justify-content: start;
  width: 84vw;
  height: 20vw;
  outline: 0.2vw solid gray;
  margin: 0.7vh 0vh 0.7vh 0vh;
`;
const ContentTopLF = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: 40vw;
  height: 20vw;
  flex-direction: column;
  flex-wrap: wrap;
  outline: 0.2vw solid yellow;
  margin: 0.7vh 0vh 0.7vh 0vh;
`;
const ContentTopRh = styled.div`
  display: flex;
  align-items: start;
  justify-content: end;
  width: 84vw;
  height: 20vw;

  outline: 0.2vw solid gray;
  margin: 0.7vh 0vh 0.7vh 0vh;
`;
const ContentBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 84vw;
  height: 30vw;
  outline: 0.2vw solid green;
  margin: 0.7vh 0vh 0.7vh 0vh;
`;
const InfoBox = styled.div`
  width: 14vw;
  height: 10vw;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  outline: 0.2vw solid green;
`;
const InfoTitle = styled.div`
  width: 14vw;
  height: 3vw;
  display: flex;
  font-size: 1.3vw;
  font-weight: 300;
  flex-direction: column;
  align-items: start;
  color: #b2b2b2;
  justify-content: start;
  outline: 0.2vw solid red;
`;
const InfoContent = styled.div`
  width: 14vw;
  height: 5vw;
  display: flex;
  font-size: 1.8vw;
  font-weight: 600;
  flex-direction: column;
  align-items: start;
  outline: 0.2vw solid blue;
  justify-content: start;
`;

export default function DetailComponent(props: any) {
  const { detailShow } = props;
  const [detailUserData, setDetailUserData] = useState<any[]>([]);

  return (
    <>
      <ContentBox>
        <ContentTop>
          <ContentTopLF>
            <InfoBox>
              <InfoTitle>고객명</InfoTitle>
              <InfoContent>{detailShow.name}</InfoContent>
            </InfoBox>
            <InfoBox>
              <InfoTitle>계약번호</InfoTitle>
              <InfoContent>{detailShow.recNum}</InfoContent>
            </InfoBox>
          </ContentTopLF>
          <ContentTopLF>
            <InfoBox>
              <InfoTitle>전화번호</InfoTitle>
              <InfoContent>{detailShow.contact}</InfoContent>
            </InfoBox>
            <InfoBox>
              <InfoTitle>전화번호</InfoTitle>
              <InfoContent>내용들어감</InfoContent>
            </InfoBox>
          </ContentTopLF>
          <ContentTopRh>
            <InfoBox>
              <InfoTitle>title</InfoTitle>
              <InfoContent>내용들어감</InfoContent>
            </InfoBox>
          </ContentTopRh>
        </ContentTop>
        <ContentBottom>{detailShow.recNum}</ContentBottom>
      </ContentBox>
    </>
  );
}
