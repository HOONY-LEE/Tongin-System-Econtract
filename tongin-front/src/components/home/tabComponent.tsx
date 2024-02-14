import React from "react";
import styled from "styled-components";
import ListComponent from "./listComponent";
import { useState } from "react";
import react, { useEffect } from "react";
import axios from "axios";
import DetailComponent from "./detailComponent";
import Home from "../../routes/home";
import API from "../../API/API";
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
  width: 84vw;
  height: 5vw;
  :hover {
    cursor: pointer;
  }
  .submenu {
    // 각 탭하나당 CSS
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20vw;
    height: 5vw;
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
  width: 84vw;
  height: 100%;
  border-radius: 0px 0px 0.6vw 0.6vw;
  /* background-color: white; */
  padding: 1vw 0 1vw 0;
`;

// 견적리스트 탭
const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
  /* outline: 1px solid red; */

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

  const [receiptList, setReceiptList] = useState<any[]>([]); // user list
  const [currentTab, setCurrentTab] = useState(0); //tab
  const [invoiceList, setInvoiceList] = useState<any[]>([]); //견적리스트
  const [uncontractedList, setUncontractedList] = useState<any[]>([]); //미계약리스트
  const [contractList, setcontractList] = useState<any[]>([]); //계약리스트
  const [worklist, setWorklist] = useState<any[]>([]); //작업리스트
  const { detailPage } = props;
  const [isDetailPage, setIsDetailPage] = useState(false);

  const onDetailPage = () => {
    props.detailPage();
  };
  const authorization = localStorage
    ? localStorage.getItem("accessToken")
    : null;

  const loginUser = localStorage
    ? JSON.parse(localStorage.getItem("loginUser") || "{}")
    : null;
  const requestParam: any = {
    headers: {
      // authorization: `Bearer ${authorization}`,
      empCod: loginUser.empCod,
    },
  };
  const fetchData = async () => {
    //   try {
    //     const data: any = await axios.get(
    //       "https://homenmove.net/v1/api/receipt/list",
    //       requestParam
    //     );
    //     setReceiptList(data.data.receiptList);
    //   } catch (error) {
    //     alert(error);
    //   }

    const data = await API.get("/receipt/list", requestParam);

    console.log(data);
    setReceiptList(data.data.receiptList);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // 견적리스트 : 접수완료 11, 상담토스12, 상담승인13
    const invoiceListBox = receiptList.filter(
      (content) =>
        content.statusCode === "11" ||
        content.statusCode === "12" ||
        content.statusCode === "13"
    );
    setInvoiceList(invoiceListBox);

    // 미계약리스트 : 상담완료14, 계약미승인21
    const uncontractedListBox = receiptList.filter(
      (content) => content.statusCode === "14" || content.statusCode === "21"
    );
    setUncontractedList(uncontractedListBox);

    // 계약리스트 : 계약22
    const contractListBox = receiptList.filter(
      (content) => content.statusCode === "22"
    );
    setcontractList(contractListBox);

    // 작업리스트 : 작업토스31, 작업승인32, 완료41
    const worklistBox = receiptList.filter(
      (content) =>
        content.statusCode === "31" ||
        content.statusCode === "32" ||
        content.statusCode === "41"
    );
    setWorklist(worklistBox);
  }, [receiptList]);

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
            <ListComponent
              onDetailPage={onDetailPage}
              currentList={invoiceList}
            ></ListComponent>
          </ListBox>
        ) : null}
        {currentTab === 1 ? (
          <ListBox>
            <ListComponent
              onDetailPage={onDetailPage}
              currentList={uncontractedList}
            ></ListComponent>
          </ListBox>
        ) : null}
        {currentTab === 2 ? (
          <ListBox>
            <ListComponent
              onDetailPage={onDetailPage}
              currentList={contractList}
            ></ListComponent>
          </ListBox>
        ) : null}
        {currentTab === 3 ? (
          <ListBox>
            <ListComponent
              onDetailPage={onDetailPage}
              currentList={worklist}
            ></ListComponent>
          </ListBox>
        ) : null}
      </ContentBox>
    </>
  );
}
