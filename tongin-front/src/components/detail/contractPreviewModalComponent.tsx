import styled, { css } from "styled-components";
import { ClassNames, DayPicker } from "react-day-picker";
import { useEffect, useRef, useState } from "react";
import { ko } from "date-fns/locale";
import { format } from "date-fns";
import styles from "react-day-picker/dist/style.module.css";
import CustomButton from "../common/customButton";
import EraserIcon from "../icon/eraserIcon";
import ArrowLeftIcon from "../icon/arrowLeftIcon";
import ArrowRightIcon from "../icon/arrowRightIcon";
import API from "../../API/API";
import FirstPage from "./firstPage";
import makePdf from "../../API/makePDF";
import makeHtmltoImage from "../../API/makePDF";
import SecondPage from "./secondPage";
import CloseIcon from "../icon/closeIcon";
import { useNavigate } from "react-router-dom";
import { Image } from "../common/image";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2); /* 배경을 약간 어둡게 만듭니다. */
  z-index: 9998; /* 모달보다 아래에 위치하도록 설정합니다. */
`;

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 86vw;
  height: 98%;
  background-color: white;
  border-radius: 0.8vw;
`;

const Loader = styled.div`
  position: fixed;
  top: 34vh;
  left: 35vw;
  width: 20vw;
  height: 20vw;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #3d3d3d8b;
  border-radius: 2vw;
  padding: 4vw;
`;

const LoadingMessage = styled.div`
  margin-top: 2vw;
  font-size: 2vw;
  color: white;
`;

const TopArea = styled.div`
  width: 76vw;
  height: 6vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const BottomArea = styled.div`
  width: 76vw;
  height: 8vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftArea = styled.div`
  height: 100%;
  width: 36%;
  display: flex;
  align-items: center;
`;

const MidArea = styled.div`
  width: 28%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const RightArea = styled.div`
  height: 100%;
  width: 36%;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const CloseBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  &&:hover {
    cursor: pointer;
  }
`;

const ContractArea = styled.div`
  width: 76vw;
  height: 107.4vw;
  outline: 0.2vw solid #e4e4e4;
  border-radius: 0.6vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ExportBtn = styled.div<{ $disabled: boolean }>`
  width: 76vw;
  height: 6vw;
  background-color: ${(props) => (props.$disabled ? "#ff7f3b" : "#e7e7e7")};
  border-radius: 0.4vw;
  font-size: 2.4vw;
  font-weight: 600;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  &&:hover {
    cursor: pointer;
  }
`;

const ExportBtn1 = styled.div<{}>`
  width: 37vw;
  height: 6vw;
  border: 0.2vw solid #505050;
  border-radius: 0.4vw;
  font-size: 2.4vw;
  font-weight: 600;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  &&:hover {
    cursor: pointer;
  }
`;

const ExportBtn2 = styled.div<{}>`
  width: 37vw;
  height: 6vw;
  background-color: #ff7f3b;
  border-radius: 0.4vw;
  font-size: 2.4vw;
  font-weight: 600;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  &&:hover {
    cursor: pointer;
  }
`;

const SignatureBtn = styled.div<{ $disabled: boolean }>`
  width: 39vw;
  height: 6vw;
  background-color: ${(props) => (props.$disabled ? "#ff7f3b" : "#e7e7e7")};
  border-radius: 0.4vw;
  font-size: 2.4vw;
  font-weight: 600;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  &&:hover {
    cursor: pointer;
  }
`;

const PrevBox = styled.div<{ $isActivate: boolean }>`
  width: 5vw;
  height: 5vw;
  background-color: ${(props) => (props.$isActivate ? "#ff7f3b" : "#e7e7e7")};
  border-radius: 0.4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    !props.$isActivate &&
    css`
      pointer-events: none;
    `}
`;

const NumBox = styled.div`
  width: 10vw;
  height: 5vw;
  background-color: #e7e7e7;
  border-radius: 0.4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.4vw;
  font-weight: 600;
`;

const NextBox = styled.div<{ $isActivate: boolean }>`
  width: 5vw;
  height: 5vw;
  background-color: ${(props) => (props.$isActivate ? "#ff7f3b" : "#e7e7e7")};
  border-radius: 0.4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    !props.$isActivate &&
    css`
      pointer-events: none;
    `}
`;

const ContractPreviewModalComponent = (props: any) => {
  const {
    getContractImageList,
    onClose,
    reNum,
    priceDataList,
    getDrawingData,
    articleDataList,
    setDrawingData,
    setDrawingData2,
    optionData,
    detailData,
    getDetailList,
    lines,
    lines2,
    drawingData,
    drawingData2,
    movingCBM,
    discardCBM,
    setLines,
    setLines2,
    ladderTruckTotal,
    optionTotalCharge,
    setIsPreviewModalOpen,
    completeReceipt,
    otherDateData,
    contractNum,
  } = props;

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [contractImageList, setContractImageList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [prevBoxActive, setPrevBoxActive] = useState<boolean>(false);
  const [nextBoxActive, setNextBoxActive] = useState<boolean>(true);
  const maxIndex = 2;

  const sendContractToClient = async (e: any) => {
    e.preventDefault();
    if (
      !window.confirm(`      [ 알림 ]
      계약서가 CS에 업로드되고 고객님에게 전달됩니다.
      정말 계약서를 보내시겠습니까?`)
    ) {
      return;
    }
    await exportAndSendContract(e, true);
    // await sendMessage();
    onClose();
  };

  const sendContractToPlaner = async (e: any) => {
    e.preventDefault();
    if (
      !window.confirm(`      [ 알림 ]
      계약서가 CS에 업로드되고 견적자(플래너에게) 전달됩니다.
      정말 계약서를 보내시겠습니까?`)
    ) {
      return;
    }
    await exportAndSendContract(e, false);
    onClose();
  };

  const exportContract = async (e: any) => {
    e.preventDefault();
    if (
      !window.confirm(`      [ 알림 ]
      통인 CS에 계약서를 업로드합니다.
      정말 계약서를 내보내시겠습니까?`)
    ) {
      return;
    }
    await onlyExportContract(e);
    onClose();
  };

  // const sendMessageHandler = async () => {
  //   if (
  //     !window.confirm(`      [ 알림 ]
  //     문자 발송을 하시면 마지막에 내보내기한 계약서가 고객님께 전송됩니다.
  //     정말 계약서를 발송하시겠습니까?`)
  //   ) {
  //     return;
  //   }
  //   await sendMessage();
  // };

  const sendMessage = async (isClient: boolean) => {
    try {
      const result = await API.post("/receipt/send/message", {
        recNum: reNum,
        isClient: isClient,
      });
      alert("문자 발송 성공");
    } catch (error) {
      alert("문자 발송에 실패");
    }
  };

  const exportAndSendContract = async (e: any, isClient: boolean) => {
    e.preventDefault();
    setIsLoading(true);

    // 첫 번째 페이지를 렌더링하고 이미지로 변환
    setCurrentPage(1); // 첫 번째 페이지로 설정
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 렌더링 완료를 위한 시간 지연
    const firstPageImage = await makeHtmltoImage._convertToImg(".firstPageBox");

    // 두 번째 페이지를 렌더링하고 이미지로 변환
    setCurrentPage(2); // 두 번째 페이지로 설정
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 렌더링 완료를 위한 시간 지연
    const secondPageImage = await makeHtmltoImage._convertToImg(
      ".secondPageBox"
    );

    // 두 이미지를 합쳐서 서버로 전송
    const imageFiles = [firstPageImage, secondPageImage];
    try {
      await makeHtmltoImage._sendImgToServer(imageFiles, reNum);

      await completeReceipt(); // 견적서 통인CS 업로드

      await getContractImageList(); // 이미지 전송후 계약서 이미지 리스트 다시 받아오기

      await sendMessage(isClient); // 견적서 문자 발송API
    } catch (error) {
      alert(error);
    }
  };

  const onlyExportContract = async (e: any) => {
    e.preventDefault();
    // 첫 번째 페이지를 렌더링하고 이미지로 변환
    setCurrentPage(1); // 첫 번째 페이지로 설정
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 렌더링 완료를 위한 시간 지연
    const firstPageImage = await makeHtmltoImage._convertToImg(".firstPageBox");

    // 두 번째 페이지를 렌더링하고 이미지로 변환
    setCurrentPage(2); // 두 번째 페이지로 설정
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 렌더링 완료를 위한 시간 지연
    const secondPageImage = await makeHtmltoImage._convertToImg(
      ".secondPageBox"
    );

    // 두 이미지를 합쳐서 서버로 전송
    const imageFiles = [firstPageImage, secondPageImage];
    try {
      await makeHtmltoImage._sendImgToServer(imageFiles, reNum);
      await completeReceipt();
      setIsLoading(false);
      getContractImageList(); // 이미지 전송후 계약서 이미지 리스트 다시 받아오기
    } catch (error) {
      alert(error);
    }
  };

  const getContractImage = async () => {
    const response = await API.get(`/receipt/contract-image/${reNum}`);
    if (response.status === 200) {
      setContractImageList(response.data.contractImageList);
    }
  };

  const clickPrevPage = (e: any) => {
    if (currentPage <= 1) {
      return;
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const clickNextPage = (e: any) => {
    if (currentPage >= maxIndex) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    if (currentPage <= 1) {
      setPrevBoxActive(false);
      setNextBoxActive(true);
    } else {
      setPrevBoxActive(true);
      if (currentPage >= maxIndex) {
        setNextBoxActive(false);
      } else {
        setNextBoxActive(true);
      }
    }
  }, [currentPage]);

  useEffect(() => {
    getContractImage();
  }, []);

  return (
    <>
      <Backdrop />
      <Wrapper>
        <TopArea>
          <LeftArea></LeftArea>
          <MidArea>
            <PrevBox $isActivate={prevBoxActive}>
              <ArrowLeftIcon
                onClick={(e: any) => clickPrevPage(e)}
                width={"4.2vw"}
                height={"4.2vw"}
                fill={"white"}
              />
            </PrevBox>
            <NumBox>{currentPage}</NumBox>
            <NextBox $isActivate={nextBoxActive}>
              <ArrowRightIcon
                onClick={(e: any) => clickNextPage(e)}
                width={"4.2vw"}
                height={"4.2vw"}
                fill={"white"}
              />
            </NextBox>
          </MidArea>
          <RightArea>
            <CloseBox>
              <CloseIcon onClick={onClose} height={"3vw"} fill={"#AEAEAE"} />
            </CloseBox>
          </RightArea>
        </TopArea>
        <ContractArea>
          {currentPage === 1 && (
            <FirstPage
              reNum={reNum}
              setLines={setLines}
              detailData={detailData}
              drawingData={drawingData}
              drawingData2={drawingData2}
              setDrawingData={setDrawingData}
              setDrawingData2={setDrawingData2}
              lines={lines}
              lines2={lines2}
              setIsPreviewModalOpen={setIsPreviewModalOpen}
              setLines2={setLines2}
              movingCBM={movingCBM}
              discardCBM={discardCBM}
              priceDataList={priceDataList}
              articleDataList={articleDataList}
              getDrawingData={getDrawingData}
              optionData={optionData}
              ladderTruckTotal={ladderTruckTotal}
              optionTotalCharge={optionTotalCharge}
              getDetailList={getDetailList}
              otherDateData={otherDateData}
              contractNum={contractNum}
            ></FirstPage>
          )}
          {currentPage === 2 && (
            <SecondPage
              reNum={reNum}
              setLines={setLines}
              drawingData={drawingData}
              lines={lines}
              priceDataList={priceDataList}
              articleDataList={articleDataList}
              optionData={optionData}
              contractNum={contractNum}
            ></SecondPage>
          )}
        </ContractArea>
        <BottomArea>
          <ExportBtn1 onClick={(e) => sendContractToClient(e)}>
            고객 문자 발송
          </ExportBtn1>
          <ExportBtn2 onClick={(e) => sendContractToPlaner(e)}>
            플래너 문자 발송
          </ExportBtn2>
          {/* <SignatureBtn
            $disabled={detailData.pushYN}
            // onClick={() => (detailData.pushYN ? "none" : onSignaturePage())}
          >
            서명하기
          </SignatureBtn> */}
        </BottomArea>
        {isLoading ? (
          <Loader>
            <Image
              src={"/icon/orange_circles.gif"}
              alt="로딩이미지"
              width={`10vw`}
              height={`100%`}
            ></Image>
            <LoadingMessage>처리중...</LoadingMessage>
          </Loader>
        ) : null}
      </Wrapper>
    </>
  );
};

export default ContractPreviewModalComponent;
