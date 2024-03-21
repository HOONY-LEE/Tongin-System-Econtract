import { userInfo } from "os";
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import react, { useEffect } from "react";
import TabComponent from "../home/tabComponent";
import axios from "axios";
import CustomButton from "../common/customButton";
import SelectBoxComponent from "../common/selectBoxComponent";
import DetailDrawView from "./dtailDrawView";

const ContentTop = styled.div`
  display: flex;
  justify-content: space-between;
  width: 88%;
  height: 20vw;
  /* outline: 0.2vw solid gray; */
  margin: 3vh 0vh 0.7vh 0vh;
`;
const ContentTopLFBox = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  height: 20vw;
  flex-direction: column;
  /* outline: 0.2vw solid red; */
  margin: 0.7vh 0vh 0.7vh 0vh;
`;
const ContentTopLF = styled.div`
  display: flex;
  align-items: start;
  /* outline: 0.2vw solid red; */
`;
const ContentTopRhBox = styled.div`
  display: flex;
  height: 20vw;
  /* outline: 0.2vw solid red; */
`;
const ContentTopRh = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  height: 20vw;
  flex-direction: column;
  /* outline: 0.2vw solid blue; */
  margin: 0.7vh 0vh 0.7vh 0vh;
`;

const InfoLfBox = styled.div`
  height: 10vw;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  /* outline: 0.2vw solid green; */
  margin-right: 5vw;
`;
const InfoLfTitle = styled.div`
  height: 3vw;
  display: flex;
  font-size: 1.8vw;
  font-weight: 300;
  flex-direction: column;
  align-items: start;
  color: #b2b2b2;
  justify-content: start;
  /* outline: 0.2vw solid red; */
`;
const InfoLfContent = styled.div`
  height: 5vw;
  display: flex;
  font-size: 2.3vw;
  font-weight: 600;
  flex-direction: column;
  align-items: start;
  /* outline: 0.2vw solid blue; */
  justify-content: start;
`;
const InfoRhBox = styled.div`
  height: 10vw;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  /* outline: 0.2vw solid blue; */
`;
const InfoRhTitle = styled.div`
  width: 18vw;
  height: 3vw;
  display: flex;
  font-size: 1.8vw;
  font-weight: 300;
  flex-direction: column;
  text-align: end;
  align-items: end;
  color: #b2b2b2;
  justify-content: start;
  /* outline: 0.2vw solid red; */
`;
const InfoRhContent = styled.div`
  width: 18vw;
  height: 5vw;
  display: flex;
  color: #808080;
  text-align: end;
  font-size: 2.3vw;
  font-weight: 600;
  flex-direction: column;
  align-items: end;
  /* outline: 0.2vw solid blue; */
  justify-content: start;
`;
const UserStatus = styled.div`
  display: flex;
  font-size: 1.6vw;
  align-items: center;
  justify-content: end;
  /* outline: 1px dashed green; */
`;
const UserStatusColor = styled.div<{
  $bgColor?: string;
}>`
  background-color: ${(props) => props.$bgColor};
  width: 10vw;
  height: 4vw;
  font-weight: 500;
  display: flex;
  color: white;
  font-size: 1.8vw;
  align-items: center;
  justify-content: center;
  border-radius: 0.5vw;
`;

const BorderBottom = styled.div`
  border-bottom: 0.2vw solid #d6d6d6;
  width: 88%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ContentBottom = styled.div`
  display: flex;
  flex-direction: column;
  width: 88%;
  height: 100%;
  /* outline: 0.2vw solid green; */
  margin: 0.7vh 0vh 0.7vh 0vh;
`;
const UserAddressBox = styled.div`
  display: flex;
  flex-direction: column;
  /* outline: 0.2vw solid blue; */
  margin: 2vw 0 2vw 0;
`;
const UserAddressTitle = styled.div`
  height: 3vw;
  display: flex;
  font-size: 1.8vw;
  font-weight: 300;
  flex-direction: column;
  align-items: start;
  color: #b2b2b2;
  justify-content: start;
  /* outline: 0.2vw solid red; */
`;
const UserAddressInput = styled.div`
  width: 100%;
  height: 5vw;
  display: flex;
  font-size: 1.8vw;
  font-weight: 500;
  flex-direction: column;
  align-items: start;
  background-color: #f4f4f4;
  border-radius: 0.5vw;
  justify-content: center;
  /* outline: 0.2vw solid red; */
  padding-left: 2vw;
  margin-bottom: 1vw;
`;
const MoveDateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1vw 0 1vw 0;
`;
const MoveDateBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;
const MoveDateTitle = styled.div`
  height: 3vw;
  display: flex;
  font-size: 1.8vw;
  font-weight: 300;
  flex-direction: column;
  align-items: start;
  color: #b2b2b2;
  justify-content: start;
  /* outline: 0.2vw solid red; */
`;
const MoveDateInput = styled.div`
  width: 100%;
  height: 5vw;
  display: flex;
  font-size: 2vw;
  font-weight: 500;
  flex-direction: column;
  align-items: center;
  background-color: #f4f4f4;
  border-radius: 0.6vw;
  justify-content: center;
  /* outline: 0.2vw solid red; */
  padding-left: 0.8vw;
  margin-bottom: 1vw;
`;
const MoveBtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1vw 0 1vw 0;
`;
const MoveBtnBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const MoveBtnTitle = styled.div`
  height: 3vw;
  display: flex;
  font-size: 1.8vw;
  font-weight: 300;
  flex-direction: column;
  align-items: start;
  color: #b2b2b2;
  justify-content: start;
  /* outline: 0.2vw solid red; */
`;
const MoveBtn = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.8vw;
  font-weight: 600;
  color: #ffffff;
  width: 15vw;
  height: 5vw;
  background-color: #ff7f3b;
  justify-content: center;
  border-radius: 0.6vw;
  /* margin: 1vw 0 1vw 0; */
`;
const MoveBtnDesabled = styled.div`
  width: 15vw;
  display: flex;
  align-items: center;
  font-size: 1.8vw;
  font-weight: 600;
  /* color: #ffffff; */
  height: 5vw;
  background-color: #f4f4f4;
  justify-content: center;
  border-radius: 0.6vw;
  /* margin: 1vw 0 1vw 0; */
`;
const BtnBox = styled.div`
  margin: 5vw 0 4vw 0;
`;
export default function DetailViewComponent(props: any) {
  const { detailData } = props;
  const { detailEditVisible } = props;

  const [currentBtn, setCurrentBtn] = useState(0);
  const [detailUserData, setDetailUserData] = useState<any[]>([]);

  const BtnArr = [
    { name: "가정이사" },
    { name: "보관이사" },
    { name: "기업이사" },
    { name: "해외이사" },
    { name: "미니이사" },
  ];

  const userStatusColor = (status: string) => {
    switch (status) {
      case "CA":
        return "#9BAABB";
      case "41":
        return "#1E1E1E";
      case "32":
        return "#9C39FF";
      case "31":
        return "#0C8CE9";
      case "22":
        return "#2FD04B";
      case "21":
        return "#FF7F3B";
      case "14":
        return "#00BAF7";
      case "13":
        return "#FFD600";
      case "12":
        return "#FD6C60";
      case "11":
        return "#9BAABB";
      default:
        return "#ff2aa3";
    }
  };
  const formattedDate = /^(\d{4})(\d{2})(\d{2})$/;
  return (
    <>
      <ContentTop>
        <ContentTopLFBox>
          <ContentTopLF>
            <InfoLfBox>
              <InfoLfTitle>고객명</InfoLfTitle>
              <InfoLfContent>{detailData?.name}</InfoLfContent>
            </InfoLfBox>
            <InfoLfBox>
              <InfoLfTitle>계약번호</InfoLfTitle>
              <InfoLfContent>{detailData?.recNum}</InfoLfContent>
            </InfoLfBox>
          </ContentTopLF>
          <ContentTopLF>
            <InfoLfBox>
              <InfoLfTitle>전화번호</InfoLfTitle>
              <InfoLfContent>{detailData?.contact}</InfoLfContent>
            </InfoLfBox>
          </ContentTopLF>
        </ContentTopLFBox>
        <ContentTopRhBox>
          <ContentTopRh>
            <InfoRhBox>
              <InfoRhTitle>계약담당자</InfoRhTitle>
              <InfoRhContent>{detailData?.branch?.branchBoss}</InfoRhContent>
            </InfoRhBox>
            <InfoRhBox>
              <InfoRhTitle>담당자연락처</InfoRhTitle>
              <InfoRhContent>{detailData?.planner?.contact}</InfoRhContent>
            </InfoRhBox>
          </ContentTopRh>
          <ContentTopRh>
            <InfoRhBox>
              <InfoRhTitle>진행상태</InfoRhTitle>

              <InfoRhContent>
                <UserStatus>
                  <UserStatusColor
                    $bgColor={userStatusColor(detailData?.statusCode)}
                  >
                    {detailData?.status}
                  </UserStatusColor>
                </UserStatus>
              </InfoRhContent>
            </InfoRhBox>
            <InfoRhBox>
              <InfoRhTitle>지점명</InfoRhTitle>
              <InfoRhContent>{detailData?.branch?.region}</InfoRhContent>
            </InfoRhBox>
          </ContentTopRh>
        </ContentTopRhBox>
      </ContentTop>
      {/* 윗 부분 끝 */}
      <BorderBottom />
      <ContentBottom>
        <UserAddressBox>
          <UserAddressTitle>전 주소</UserAddressTitle>
          <UserAddressInput>{detailData?.preAddress}</UserAddressInput>
          <UserAddressInput>{detailData?.preAddressDetail}</UserAddressInput>
        </UserAddressBox>
        <UserAddressBox>
          <UserAddressTitle>후 주소</UserAddressTitle>
          <UserAddressInput>{detailData?.afterAddress}</UserAddressInput>
          <UserAddressInput>{detailData?.afterAddressDetail}</UserAddressInput>
        </UserAddressBox>
        <MoveDateContainer>
          <MoveDateBox>
            <MoveDateTitle>접수일</MoveDateTitle>
            <MoveDateInput>
              {detailData?.receptionDate?.replace(formattedDate, "$1-$2-$3")}
            </MoveDateInput>
          </MoveDateBox>
          <MoveDateBox>
            <MoveDateTitle>계약일</MoveDateTitle>
            <MoveDateInput>
              {detailData?.contractDate?.replace(formattedDate, "$1-$2-$3")}
            </MoveDateInput>
          </MoveDateBox>
        </MoveDateContainer>
        <MoveDateContainer>
          <MoveDateBox>
            <MoveDateTitle>상담일</MoveDateTitle>
            <MoveDateInput>
              {detailData?.consultationDate?.replace(formattedDate, "$1-$2-$3")}
            </MoveDateInput>
          </MoveDateBox>
          <MoveDateBox>
            <MoveDateTitle>이사일</MoveDateTitle>
            <MoveDateInput>
              {detailData?.movingDate?.replace(formattedDate, "$1-$2-$3")}
            </MoveDateInput>
          </MoveDateBox>
        </MoveDateContainer>
        <MoveBtnContainer>
          <MoveBtnTitle>이사종류</MoveBtnTitle>
          <MoveBtnBox>
            <MoveBtn>가정이사</MoveBtn>
            <MoveBtnDesabled>보관이사</MoveBtnDesabled>
            <MoveBtnDesabled>기업이사</MoveBtnDesabled>
            <MoveBtnDesabled>해외이사</MoveBtnDesabled>
            <MoveBtnDesabled>미니이사</MoveBtnDesabled>
          </MoveBtnBox>
        </MoveBtnContainer>
        <BtnBox>
          <CustomButton
            onClick={() => detailEditVisible(true)}
            width={"100%"}
            height={"6vw"}
            text={`상세정보 수정하기`}
            size={"2vw"}
            radius={"0.6vw"}
          ></CustomButton>
        </BtnBox>
      </ContentBottom>
    </>
  );
}
