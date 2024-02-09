import React from "react";
import styled from "styled-components";

const ContentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 76vw;
  height: 7vh;
  border-radius: 0.7vw;
  background-color: white;
  outline: 0.2vw solid gray;
`;

export default function InvoiceListComponent() {
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

  return (
    <>
      {sampleArr.userList.map((user) => (
        <ContentBox>
          {user.name}
          {user.empCode}
        </ContentBox>
      ))}

      {/* <ContentBox>{user.name}</ContentBox> */}
      <div>계약리스트 test</div>
    </>
  );
}
