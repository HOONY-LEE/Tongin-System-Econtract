import { userInfo } from "os";
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import react, { useEffect } from "react";
import TabComponent from "./tabComponent";
import axios from "axios";
import detailComponent from "./detailComponent";
import { useNavigate } from "react-router-dom";
const ContentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 6vw;

  border-radius: 0.7vw;
  background-color: white;
  /* outline: 0.2vw solid gray; */
  margin: 0.7vh 0vh 0.7vh 0vh;
  box-shadow: 0 0.5vh 0.5vh rgba(0, 0, 0, 0.01),
    0 0.5vh 0.5vh rgba(0, 0, 0, 0.003);
`;
const ContentText = styled.div`
  margin: 0.5vw 2vw;
  width: 76vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* outline: 2px solid red; */
`;

const UserName = styled.div`
  font-weight: 600;
  width: 8vw;
  font-size: 1.7vw;
  margin-right: 1vw;
  text-align: start;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* outline: 1px solid red; */
`;
const UserPhone = styled.div`
  font-weight: 600;
  display: flex;
  width: 14vw;
  font-size: 1.6vw;
  align-items: center;
  justify-content: center;
  /* outline: 1px solid red; */
`;

const UserAcceptDate = styled.div`
  width: 11vw;
  font-weight: 400;
  display: flex;
  font-size: 1.4vw;
  align-items: center;
  justify-content: center;
  /* outline: 1px solid red; */
`;
const UserConsulDate = styled.div`
  width: 11vw;
  font-weight: 400;
  display: flex;
  font-size: 1.4vw;
  align-items: center;
  justify-content: center;
  /* outline: 1px solid red; */
`;
const UserMoveDate = styled.div`
  width: 11vw;
  font-weight: 400;
  display: flex;
  font-size: 1.4vw;
  align-items: center;
  justify-content: center;
  /* outline: 1px solid red; */
`;
const UserStatus = styled.div`
  width: 9.4vw;
  font-weight: 600;
  display: flex;
  font-size: 1.6vw;
  align-items: center;
  justify-content: center;
  /* outline: 1px solid red; */
  margin-left: 2vw;
`;
const UserStatusColor = styled.div<{
  $bgColor?: string;
}>`
  background-color: ${(props) => props.$bgColor};
  width: 9.2vw;
  height: 3.2vw;
  font-weight: 300;
  display: flex;
  color: white;
  font-size: 1.4vw;
  align-items: center;
  justify-content: center;
  border-radius: 0.4vw;
`;

const BorderLeft = styled.div`
  border-left: 0.1vw solid #e7e7e7;
  height: 1.2vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ListComponent(props: any) {
  const { currentList, onDtailPage } = props;

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
    }
  };

  const str = /[^A-Za-z가-힣]/g;
  const date = /^(\d{4})(\d{2})(\d{2})$/;

  const navigate = useNavigate();
  const detailPageShow = () => {
    navigate("/detail");
  };
  return (
    <>
      {currentList?.map((user: any) => {
        return (
          <ContentBox key={user.no} onClick={() => detailPageShow()}>
            <ContentText>
              <UserName>{user.name.replace(str, "")}</UserName>
              <BorderLeft />
              <UserPhone>{user.contact}</UserPhone>
              <BorderLeft />
              <UserAcceptDate>
                {user.receptionDate.replace(date, "$1-$2-$3")}
              </UserAcceptDate>
              <BorderLeft />
              <UserConsulDate>
                {user.contractDate.replace(date, "$1-$2-$3")}
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
            </ContentText>
          </ContentBox>
        );
      })}
    </>
  );
}
