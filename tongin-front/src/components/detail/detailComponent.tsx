import { userInfo } from "os";
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import react, { useEffect } from "react";

import DetailViewComponent from "./detailViewComponent";
import API from "../../API/API";
import DetailEditComponent from "./detailEditComponent";
import { Toast } from "../common/toastMessegeComponent";

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
  const {
    detailData,
    setDetailData,
    getDetailList,
    status,
    setStatus,
    fetchStatus,
    setFetchStatus,
    contractImageList,
    otherDateData,
    setOtherDateData,
    allSave,
    setAllSave,
  } = props;
  const [isDetailEdit, setIsDetailEdit] = useState(false);
  const [completionContract, setCompletionContract] = useState<any>(false);
  const [onEditDisable, setOnEditDisable] = useState<any>(false);

  // const [fetchStatus, setFetchStatus] = useState(false); // toast messege
  // const [status, setStatus] = useState(false); // toast messege

  const movingTypeList = [
    { id: 0, status: "가정이사(스탠다드)", moveType: "P01225" },
    { id: 1, status: "가정이사(프리미엄)", moveType: "P01226" },
    { id: 2, status: "가정이사(VIP)", moveType: "P01224" },
    { id: 3, status: "보관이사(스탠다드)", moveType: "P01228" },
    { id: 4, status: "보관이사(프리미엄)", moveType: "P01229" },
    { id: 5, status: "보관이사(VIP)", moveType: "P01230" },
    { id: 6, status: "지방이사(스탠다드)", moveType: "P01017" },
    { id: 7, status: "지방이사(프리미엄)", moveType: "P01480" },
    { id: 8, status: "지방이사(VIP)", moveType: "P01481" },
  ];

  const selfMovingTypeList = [
    { id: 0, status: "가정이사(스탠다드)", moveType: "P01488" },
    { id: 1, status: "가정이사(프리미엄)", moveType: "P01489" },
    { id: 2, status: "가정이사(VIP)", moveType: "P01490" },
    { id: 3, status: "보관이사(스탠다드)", moveType: "P01491" },
    { id: 4, status: "보관이사(프리미엄)", moveType: "P01492" },
    { id: 5, status: "보관이사(VIP)", moveType: "P01493" },
    { id: 6, status: "지방이사(스탠다드)", moveType: "P01017" },
    { id: 7, status: "지방이사(프리미엄)", moveType: "P01495" },
    { id: 8, status: "지방이사(VIP)", moveType: "P01496" },
  ];

  const detailEditVisible = (mode: any) => {
    if (mode) {
      setIsDetailEdit(true);
    } else if (mode === false) {
      setIsDetailEdit(false);
    }
  };
  //계약서 상태 [계약]일시 disabled
  useEffect(() => {
    if (completionContract) {
      setOnEditDisable(true);
    } else {
      setOnEditDisable(false);
    }
  }, [completionContract]);
  return (
    <>
      <ContentBox>
        {fetchStatus && (
          <Toast
            status={status}
            fetchStatus={fetchStatus}
            setFetchStatus={setFetchStatus}
          />
        )}
        {isDetailEdit ? (
          <DetailEditComponent
            allSave={allSave}
            setAllSave={setAllSave}
            movingTypeList={movingTypeList}
            selfMovingTypeList={selfMovingTypeList}
            getDetailList={getDetailList}
            detailData={detailData}
            setDetailData={setDetailData}
            detailEditVisible={detailEditVisible}
            completionContract={completionContract}
            setCompletionContract={setCompletionContract}
            setFetchStatus={setFetchStatus}
            setStatus={setStatus}
            contractImageList={contractImageList}
            otherDateData={otherDateData}
            setOtherDateData={setOtherDateData}
          ></DetailEditComponent>
        ) : (
          <DetailViewComponent
            movingTypeList={movingTypeList}
            selfMovingTypeList={selfMovingTypeList}
            onEditDisable={onEditDisable}
            setOnEditDisable={setOnEditDisable}
            detailEditVisible={detailEditVisible}
            detailData={detailData}
            completionContract={completionContract}
            setCompletionContract={setCompletionContract}
            otherDateData={otherDateData}
          ></DetailViewComponent>
        )}
      </ContentBox>
    </>
  );
}
