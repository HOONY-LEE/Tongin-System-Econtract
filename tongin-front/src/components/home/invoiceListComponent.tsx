import { userInfo } from "os";
import React from "react";
import styled from "styled-components";

const ContentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 76vw;
  height: 7vh;
  border-radius: 0.7vw;
  background-color: white;
  /* outline: 0.2vw solid gray; */
  margin: 0.7vh 0vh 0.7vh 0vh;
  box-shadow: 0 0.5vh 0.5vh rgba(0, 0, 0, 0.01),
    0 0.5vh 0.5vh rgba(0, 0, 0, 0.033);
`;
const ContentText = styled.div`
  margin: 0.5vw 2vw;
  width: 76vw;
  display: flex;
  outline: 1px solid red;
  align-items: center;
  justify-content: space-between;
`;

const UserInfo = styled.div`
  font-weight: 600;
  display: flex;
  outline: 1px solid red;
  font-size: 2vw;
  align-items: center;
  justify-content: center;
`;
export default function InvoiceListComponent(prop: any) {
  const sampleArr = {
    userList: [
      {
        name: "홈페이지",
        empCode: "20120208",
        contact: "",
        beNm: "통인익스프레스",
        beCode: "BE0002",
        bossNm: "",
      },
      {
        name: "모바일홈페이지",
        empCode: "20130103",
        contact: "",
        beNm: "통인익스프레스",
        beCode: "BE0002",
        bossNm: "",
      },
      {
        name: "0033. 유선호",
        empCode: "20210406",
        contact: "",
        beNm: "통인익스프레스",
        beCode: "BE0002",
        bossNm: "",
      },
      {
        name: "윤성진",
        empCode: "20220301",
        contact: "",
        beNm: "통인익스프레스",
        beCode: "BE0002",
        bossNm: "",
      },
      {
        name: "0054. 박상선",
        empCode: "20220401",
        contact: "",
        beNm: "통인익스프레스",
        beCode: "BE0002",
        bossNm: "",
      },
      {
        name: "0065. 김영호",
        empCode: "20230702",
        contact: "",
        beNm: "통인익스프레스",
        beCode: "BE0002",
        bossNm: "",
      },
      {
        name: "0067. 이명구",
        empCode: "20230801",
        contact: "",
        beNm: "통인익스프레스",
        beCode: "BE0002",
        bossNm: "",
      },
    ],
  };
  const str = /[^A-Za-z가-힣]/g;

  return (
    <>
      {sampleArr.userList.map((user, index) => (
        <ContentBox key={index}>
          <ContentText>
            <UserInfo>{user.name.replace(str, "")}</UserInfo>
            <UserInfo>{user.empCode}</UserInfo>
            <UserInfo>{user.beCode}</UserInfo>
          </ContentText>
        </ContentBox>
      ))}

      {/* <ContentBox>{user.name}</ContentBox> */}
      <div>계약리스트 test</div>
    </>
  );
}
