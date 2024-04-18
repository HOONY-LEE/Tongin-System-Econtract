import { userInfo } from "os";
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import react, { useEffect } from "react";

import DetailViewComponent from "./detailViewComponent";
import API from "../../API/API";
import DetailEditComponent from "./detailEditComponent";

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 0 0 0.7vw 0.7vw;
  background-color: white;
  /* outline: 0.2vw solid gray; */
  /* margin: 0.7vh 0vh 0.7vh 0vh; */
  box-shadow: 0 0.5vh 0.5vh rgba(0, 0, 0, 0.01),
    0 0.5vh 0.5vh rgba(0, 0, 0, 0.003);
`;

export default function DetailComponent(props: any) {
  const { detailData, setDetailData, getDetailList } = props;
  const [isDetailEdit, setIsDetailEdit] = useState(false);
  const [completionContract, setCompletionContract] = useState<any>(false);
  const [onEditDisable, setOnEditDisable] = useState<any>(false);
  // const fetchData = async () => {
  //   const response: any = await API.get("receipt/detail/12");
  //   if (response.status === 200) {
  //     console.log(response.data.receiptDetail);
  //     setDetailData(response.data.receiptDetail);
  //   } else {
  //     console.log("에러");
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const detailEditVisible = (mode: any) => {
    console.log("tlfgd");
    console.log(mode);
    if (mode) {
      setIsDetailEdit(true);
    } else if (mode === false) {
      setIsDetailEdit(false);
    }
  };
  //계약서 상태 [계약]일시 계약날짜 추가
  useEffect(() => {
    if (completionContract) {
      console.log("detail 완료 실행");
      setOnEditDisable(true);
    } else {
      console.log("detail 완료");
      setOnEditDisable(false);
    }
  }, [completionContract]);
  return (
    <>
      <ContentBox>
        {isDetailEdit ? (
          <DetailEditComponent
            getDetailList={getDetailList}
            detailData={detailData}
            setDetailData={setDetailData}
            detailEditVisible={detailEditVisible}
            completionContract={completionContract}
            setCompletionContract={setCompletionContract}
          ></DetailEditComponent>
        ) : (
          <DetailViewComponent
            onEditDisable={onEditDisable}
            setOnEditDisable={setOnEditDisable}
            detailEditVisible={detailEditVisible}
            detailData={detailData}
            completionContract={completionContract}
            setCompletionContract={setCompletionContract}
          ></DetailViewComponent>
        )}
      </ContentBox>
    </>
  );
}
