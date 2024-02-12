import React from "react";
import styled from "styled-components";
import InvoiceListComponent from "./invoiceListComponent";
import { useState } from "react";
import react, { useEffect } from "react";
import axios from "axios";

const TabMenu = styled.ul`
  // 탭 메뉴들 포함하고 있는 영역
  color: rgb(232, 234, 237);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  list-style: none;
  margin-top: 10px;
  width: 80vw;
  height: 5vw;
  :hover {
    cursor: pointer;
  }
  .submenu {
    // 각 탭하나당 CSS
    display: flex;
    justify-content: center;
    align-items: center;
    width: 19vw;
    height: 5vh;
    padding: 10px;
    font-size: 2vw;
    transition: 0.2s;
    border-radius: 0.4vw 0.4vw 0px 0px;
    background-color: #ebebeb;
    color: black;
  }

  .focused {
    background-color: #ff7f3b;
    color: white;
  }
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 80vw;
  height: 100%;
  border-radius: 0px 0px 0.6vw 0.6vw;
  /* background-color: white; */
  padding: 1vw;
`;

// 견적리스트 탭
const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
  /* outline: 1px solid red; */
`;

// 미계약리스트 탭
const CreateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 70vh;
`;

// 계약리스트 탭
const Menu1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40vh;
`;

// 작업리스트 탭
const Menu2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40vh;
`;

export default function TabComponent(props: any) {
  // 현재 선택된 탭, 디폴트는 0(계정 관리)
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
  const [receiptList, setReceiptList] = useState<any[]>([]);
  const authorization = localStorage
    ? localStorage.getItem("accessToken")
    : null;

  // const loginUser = localStorage
  //   ? JSON.parse(localStorage.getItem("loginUser") || "{}")
  //   : null;
  // const requestParam: any = {
  //   headers: {
  //     authorization: `Bearer ${authorization}`,
  //     empCod: loginUser.empCod,
  //   },
  // };
  // const fetchData = async () => {
  //   const data: any = await axios.get(
  //     "https://homenmove.net/v1/api/receipt/list",
  //     requestParam
  //   );
  //   setReceiptList(data.data.receiptList);
  //   ListArr(data.data.receiptList.statusCode);
  // };
  const fetchData = {
    success: true,
    receiptList: [
      {
        no: "1",
        recNum: "R20240200885",
        name: "김은진",
        contact: "010-2460-4993",
        receptionDate: "20240205",
        consultationScheduledDate: "20240206",
        consultationDate: "20240206",
        contractDate: "        ",
        movingDate: "20240305",
        status: "취소",
        statusCode: "CA",
      },
      {
        no: "2",
        recNum: "R20240200817",
        name: "오영진",
        contact: "010-9542-6116",
        receptionDate: "20240205",
        consultationScheduledDate: "20240206",
        consultationDate: "20240205",
        contractDate: "        ",
        movingDate: "20240313",
        status: "취소",
        statusCode: "CA",
      },
      {
        no: "3",
        recNum: "R20240200698",
        name: "정근웅",
        contact: "010-3359-6926",
        receptionDate: "20240205",
        consultationScheduledDate: "20240206",
        consultationDate: "20240205",
        contractDate: "        ",
        movingDate: "20240315",
        status: "취소",
        statusCode: "22",
      },
      {
        no: "4",
        recNum: "R20240200633",
        name: "박창범",
        contact: "010-4316-7938",
        receptionDate: "20240204",
        consultationScheduledDate: "20240205",
        consultationDate: "20240206",
        contractDate: "        ",
        movingDate: "20240309",
        status: "취소",
        statusCode: "22",
      },
      {
        no: "5",
        recNum: "R20240200459",
        name: "김영미",
        contact: "010-2569-3584",
        receptionDate: "20240203",
        consultationScheduledDate: "20240205",
        consultationDate: "20240205",
        contractDate: "        ",
        movingDate: "20240321",
        status: "취소",
        statusCode: "22",
      },
      {
        no: "6",
        recNum: "R20240200446",
        name: "김수연",
        contact: "010-9302-3819",
        receptionDate: "20240203",
        consultationScheduledDate: "20240205",
        consultationDate: "20240206",
        contractDate: "        ",
        movingDate: "20240311",
        status: "취소",
        statusCode: "22",
      },
      {
        no: "7",
        recNum: "R20240200431",
        name: "김지한",
        contact: "010-2306-5353",
        receptionDate: "20240203",
        consultationScheduledDate: "20240205",
        consultationDate: "20240205",
        contractDate: "        ",
        movingDate: "20240308",
        status: "취소",
        statusCode: "CA",
      },
      {
        no: "8",
        recNum: "R20240200412",
        name: "이나영",
        contact: "010-7106-2304",
        receptionDate: "20240202",
        consultationScheduledDate: "20240206",
        consultationDate: "20240206",
        contractDate: "        ",
        movingDate: "20240302",
        status: "취소",
        statusCode: "22",
      },
      {
        no: "9",
        recNum: "R20240200338",
        name: "장지현",
        contact: "010-2788-7402",
        receptionDate: "20240202",
        consultationScheduledDate: "20240203",
        consultationDate: "20240202",
        contractDate: "        ",
        movingDate: "20240303",
        status: "취소",
        statusCode: "22",
      },
    ],
  };
  useEffect(() => {
    ListArr("CA");
  }, []);

  const ListArr = (status: string) => {
    switch (status) {
      case "CA": {
        setInvoiceList(
          fetchData.receiptList.filter((content) =>
            content.statusCode.includes("CA")
          )
        );

        const { filteredList: any } = props;
        // return <InvoiceListComponent></InvoiceListComponent>;
        break;
      }

      // return <InvoiceListComponent></InvoiceListComponent>;
    }
  };

  const [currentTab, setCurrentTab] = useState(0);
  const [invoiceList, setInvoiceList] = useState<any[]>([]);
  const [unContractList, setUnContractList] = useState<any[]>([]);
  // const [invoiceList, setInvoiceList] = useState<any[]>([]);
  // const [invoiceList, setInvoiceList] = useState<any[]>([]);

  const menuArr = [
    { name: "견적리스트", content: "견적리스트 영역" },
    { name: "미계약리스트", content: "미계약 리스트 영역" },
    { name: "계약리스트", content: "계약 리스트 영역" },
    { name: "작업리스트", content: "작업리스트 영역" },
  ];

  const selectMenuHandler = (index: any) => {
    setCurrentTab(index);
  };

  return (
    <>
      <TabMenu>
        {menuArr.map((item, index) => (
          <li
            key={index}
            className={index === currentTab ? "submenu focused" : "submenu"}
            onClick={() => selectMenuHandler(index)}
          >
            {item.name}
          </li>
        ))}
      </TabMenu>
      <ContentBox>
        {currentTab === 0 ? (
          <ListBox>
            <InvoiceListComponent
              invoiceList={invoiceList}
            ></InvoiceListComponent>
          </ListBox>
        ) : null}
        {currentTab === 1 ? (
          <ListBox>
            <InvoiceListComponent></InvoiceListComponent>
          </ListBox>
        ) : null}
        {currentTab === 2 ? <Menu1>[계약] 미구현</Menu1> : null}
        {currentTab === 3 ? <Menu2>[작업] 미구현</Menu2> : null}
      </ContentBox>
    </>
  );
}
