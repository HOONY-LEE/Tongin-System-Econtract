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
  width: 42vw;
  height: 20vw;
  flex-wrap: wrap;
  outline: 0.2vw solid red;
  margin: 0.7vh 0vh 0.7vh 0vh;
`;
const ContentTopRh = styled.div`
  display: flex;
  align-items: start;
  justify-content: end;
  width: 42vw;
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
  height: 10vw;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  outline: 0.2vw solid red;
`;
const InfoContent = styled.div`
  width: 14vw;
  height: 10vw;
  display: flex;
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
              <InfoTitle>{detailShow.name}</InfoTitle>
              <InfoContent>내용들어감</InfoContent>
            </InfoBox>
            <InfoBox>
              <InfoTitle>title</InfoTitle>
              <InfoContent>내용들어감</InfoContent>
            </InfoBox>
            <InfoBox>
              <InfoTitle>title</InfoTitle>
              <InfoContent>내용들어감</InfoContent>
            </InfoBox>
            <InfoBox>
              <InfoTitle>title</InfoTitle>
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
        <ContentBottom>{detailShow.name}</ContentBottom>
      </ContentBox>
    </>
  );
}
