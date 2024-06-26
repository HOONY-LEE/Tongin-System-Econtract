import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DefaultSearchResult from "../admin/defaultSearchResult";

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 3vw;
  border-radius: 0.4vw;
  background-color: #dddddd90;
  /* outline: 0.2vw solid gray; */
  margin: 0.7vh 0vh 0.7vh 0vh;
  box-shadow: 0 0.5vh 0.5vh rgba(0, 0, 0, 0.01),
    0 0.5vh 0.5vh rgba(0, 0, 0, 0.003);
`;

const ContentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 8vw;

  border-radius: 0.7vw;
  background-color: white;
  /* outline: 0.2vw solid gray; */
  margin-bottom: 1vw;
  box-shadow: 0 0.5vh 0.5vh rgba(0, 0, 0, 0.01),
    0 0.5vh 0.5vh rgba(0, 0, 0, 0.003);
`;
const ContentText = styled.div`
  margin: 0.5vw 0vw;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  /* outline: 1px solid red; */
`;

const UserName = styled.div`
  font-weight: 600;
  width: 12vw;
  font-size: 1.7vw;
  margin-left: 1vw;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* outline: 1px dashed green; */
`;
const UserPhone = styled.div`
  font-weight: 600;
  display: flex;
  width: 12.5vw;
  font-size: 1.6vw;
  align-items: center;
  justify-content: center;
  /* outline: 1px dashed green; */
`;

const UserAcceptDate = styled.div`
  width: 9vw;
  font-weight: 400;
  display: flex;
  font-size: 1.4vw;
  align-items: center;
  justify-content: center;
  /* outline: 1px dashed green; */
`;
const UserConsulDate = styled.div`
  width: 9vw;
  font-weight: 400;
  display: flex;
  font-size: 1.4vw;
  align-items: center;
  justify-content: center;
  /* outline: 1px dashed green; */
`;
const UserMoveDate = styled.div`
  width: 9vw;
  font-weight: 400;
  display: flex;
  font-size: 1.4vw;
  align-items: center;
  justify-content: center;
  /* outline: 1px dashed green; */
`;
const UserStatus = styled.div`
  width: 7vw;
  display: flex;
  font-size: 1.6vw;
  align-items: center;
  justify-content: center;
  /* outline: 1px dashed green; */
  /* margin-right: 1vw; */
`;

const UserStatusColor = styled.div<{
  $bgColor?: string;
}>`
  background-color: ${(props) => props.$bgColor};
  width: 7vw;
  height: 3vw;
  font-weight: 400;
  display: flex;
  color: white;
  font-size: 1.4vw;
  align-items: center;
  justify-content: center;
  border-radius: 0.4vw;
`;

const BorderLeft = styled.div`
  border-left: 0.1vw solid #c4c4c4;
  height: 1.2vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleBorderLeft = styled.div`
  border-left: 0.1vw solid #c4c4c4;
  height: 1.2vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleText = styled.h3`
  text-align: center;
  font-size: 1.2vw;
  font-weight: 300;
`;
const UserSelfContract = styled.div`
  width: 5vw;
  display: flex;
  font-size: 1.6vw;
  align-items: center;
  justify-content: center;
  /* outline: 1px dashed green; */
  /* margin-right: 1vw; */
  margin-right: 1vw;
`;
const UserSelfContractColor = styled.div<{
  $bgColor?: string;
}>`
  background-color: ${(props) => props.$bgColor};
  width: 5vw;
  height: 3vw;
  font-weight: 400;
  display: flex;
  color: white;
  font-size: 1.4vw;
  align-items: center;
  justify-content: center;
  border-radius: 0.4vw;
  margin-right: 1vw;
`;
export default function ListComponent(props: any) {
  const { currentList } = props;
  const navigate = useNavigate();

  const onClickListItemHandle = (item: any) => {
    if (
      item.statusCode === "22" || // 계약
      item.statusCode === "31" || // 작업토스
      item.statusCode === "32" // 작업승인
    ) {
      contractImageShow(item.recNum);
    } else {
      detailPageShow(item.recNum);
    }
  };

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
        return "#3a2fd0";
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
    }
  };

  const str = /[^A-Za-z가-힣]/g;
  const date = /^(\d{4})(\d{2})(\d{2})$/;

  const contractImageShow = (reNum: string) => {
    navigate(`/contractImage/${reNum}`);
  };

  const detailPageShow = (reNum: string) => {
    navigate(`/contractlist/detail/${reNum}`);
  };
  return (
    <>
      <TitleBox>
        <ContentText>
          <UserName>
            <TitleText>고객명</TitleText>
          </UserName>
          <TitleBorderLeft />
          <UserPhone>
            <TitleText>연락처</TitleText>
          </UserPhone>
          <TitleBorderLeft />
          <UserAcceptDate>
            <TitleText>접수일</TitleText>
          </UserAcceptDate>
          <TitleBorderLeft />
          <UserConsulDate>
            <TitleText>상담일</TitleText>
          </UserConsulDate>
          <TitleBorderLeft />
          <UserMoveDate>
            <TitleText>이사일</TitleText>
          </UserMoveDate>
          <TitleBorderLeft />
          <UserStatus>
            <TitleText>상태</TitleText>
          </UserStatus>
          <TitleBorderLeft />
          <UserSelfContract>
            <TitleText>현장접수</TitleText>
          </UserSelfContract>
        </ContentText>
      </TitleBox>
      {currentList.length > 0 ? (
        currentList?.map((user: any, index: number) => {
          return (
            <ContentBox key={index} onClick={() => onClickListItemHandle(user)}>
              <ContentText>
                <UserName>{user.name.substring(0, 7)}</UserName>
                <BorderLeft />
                <UserPhone>{user.contact}</UserPhone>
                <BorderLeft />
                <UserAcceptDate>
                  {user.receptionDate.replace(date, "$1-$2-$3")}
                </UserAcceptDate>
                <BorderLeft />
                <UserConsulDate>
                  {user.consultationDate.replace(date, "$1-$2-$3")}
                </UserConsulDate>
                <BorderLeft />
                <UserMoveDate>
                  {user.movingDate.replace(date, "$1-$2-$3")}
                </UserMoveDate>
                <BorderLeft />
                <UserStatus>
                  <UserStatusColor $bgColor={userStatusColor(user.statusCode)}>
                    {user.status}
                  </UserStatusColor>
                </UserStatus>
                <BorderLeft />

                <>
                  {user.selfReceipt === "true" ? (
                    <UserSelfContractColor $bgColor={"#2fd04b"}>
                      {"현장"}
                    </UserSelfContractColor>
                  ) : (
                    <UserSelfContractColor></UserSelfContractColor>
                  )}
                </>
              </ContentText>
            </ContentBox>
          );
        })
      ) : (
        <DefaultSearchResult></DefaultSearchResult>
      )}
    </>
  );
}
