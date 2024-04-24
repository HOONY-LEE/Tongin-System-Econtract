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
  const { detailData, setDetailData, getDetailList } = props;
  const [isDetailEdit, setIsDetailEdit] = useState(false);
  const [completionContract, setCompletionContract] = useState<any>(false);
  const [onEditDisable, setOnEditDisable] = useState<any>(false);

  const [fetchStatus, setFetchStatus] = useState(false); // toast messege
  const [status, setStatus] = useState(false); // toast messege

  const detailEditVisible = (mode: any) => {
    if (mode) {
      setIsDetailEdit(true);
    } else if (mode === false) {
      setIsDetailEdit(false);
    }
  };
  //계약서 상태 [계약]일시 disabled
  useEffect(() => {
    console.log("completionContract", completionContract);
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
        {fetchStatus && (
          <Toast
            status={status}
            fetchStatus={fetchStatus}
            setFetchStatus={setFetchStatus}
          />
        )}
        {isDetailEdit ? (
          <DetailEditComponent
            getDetailList={getDetailList}
            detailData={detailData}
            setDetailData={setDetailData}
            detailEditVisible={detailEditVisible}
            completionContract={completionContract}
            setCompletionContract={setCompletionContract}
            setFetchStatus={setFetchStatus}
            setStatus={setStatus}
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
