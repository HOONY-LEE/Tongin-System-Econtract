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

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  width: 94vw;
  height: 96vh;
  background-color: white;
  border-radius: 0.8vw;
`;

const TopArea = styled.div`
  width: 100%;
  height: 7vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const BottomArea = styled.div`
  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const LeftArea = styled.div`
  height: 100%;
  width: 20%;
  display: flex;
  align-items: center;
`;

const MidArea = styled.div`
  width: 26%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const RightArea = styled.div`
  height: 100%;
  width: 20%;
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
  margin-top: 1vh;
  width: 90vw;
  height: 127vw;
  outline: 0.2vw solid #e4e4e4;
  border-radius: 0.6vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ExportBtn = styled.div`
  width: 80vw;
  height: 6vw;
  background-color: #ff7f3b;
  border-radius: 0.4vw;
  font-size: 2vw;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  &&:hover {
    cursor: pointer;
  }
`;

const PrevBox = styled.div<{ isActivate: boolean }>`
  width: 5vw;
  height: 5vw;
  background-color: ${(props) => (props.isActivate ? "#ff7f3b" : "#e7e7e7")};
  border-radius: 0.4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    !props.isActivate &&
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

const NextBox = styled.div<{ isActivate: boolean }>`
  width: 5vw;
  height: 5vw;
  background-color: ${(props) => (props.isActivate ? "#ff7f3b" : "#e7e7e7")};
  border-radius: 0.4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    !props.isActivate &&
    css`
      pointer-events: none;
    `}
`;

const ContractPreviewModalComponent = (props: any) => {
  const {
    onClose,
    reNum,
    priceDataList,
    articleDataList,
    setDrawingData,
    optionData,
    detailData,
    lines,
    drawingData,
    movingCBM,
    setLines,
    optionTotalCharge,
  } = props;

  const [contractImageList, setContractImageList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [prevBoxActive, setPrevBoxActive] = useState<boolean>(false);
  const [nextBoxActive, setNextBoxActive] = useState<boolean>(true);
  const maxIndex = 2;

  const onClickMakePDF = async (e: any) => {
    e.preventDefault();
    if (
      !window.confirm(`      [ 알림 ]
      견적서를 내보내면 시스템과 고객님에게 계약서가 전송됩니다.
      정말 계약서를 내보내시겠습니까?`)
    ) {
      return;
    }
    // 첫 번째 페이지를 렌더링하고 이미지로 변환
    setCurrentPage(1); // 첫 번째 페이지로 설정
    await new Promise((resolve) => setTimeout(resolve, 500)); // 렌더링 완료를 위한 시간 지연
    const firstPageImage = await makeHtmltoImage._convertToImg(".firstPageBox");

    // 두 번째 페이지를 렌더링하고 이미지로 변환
    setCurrentPage(2); // 두 번째 페이지로 설정
    await new Promise((resolve) => setTimeout(resolve, 500)); // 렌더링 완료를 위한 시간 지연
    const secondPageImage = await makeHtmltoImage._convertToImg(
      ".secondPageBox"
    );

    // 두 이미지를 합쳐서 서버로 전송
    const imageFiles = [firstPageImage, secondPageImage];
    await makeHtmltoImage._sendImgToServer(imageFiles, reNum);
  };

  const getContractImage = async () => {
    const response = await API.get(`/receipt/contract-image/${reNum}`);
    if (response.status === 200) {
      console.log("response>>>");
      console.log(response.data.contractImageList);
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

  useEffect(() => {
    console.log("contractImageList>>");
    console.log(contractImageList);
  }, [contractImageList]);

  return (
    <>
      <Backdrop />
      <Wrapper>
        <TopArea>
          <LeftArea></LeftArea>
          <MidArea>
            <PrevBox isActivate={prevBoxActive}>
              <ArrowLeftIcon
                onClick={(e: any) => clickPrevPage(e)}
                width={"4.2vw"}
                height={"4.2vw"}
                fill={"white"}
              />
            </PrevBox>
            <NumBox>{currentPage}</NumBox>
            <NextBox isActivate={nextBoxActive}>
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
              drawingData={drawingData}
              detailData={detailData}
              lines={lines}
              movingCBM={movingCBM}
              priceDataList={priceDataList}
              articleDataList={articleDataList}
              optionData={optionData}
              optionTotalCharge={optionTotalCharge}
              setDrawingData={setDrawingData}
            ></FirstPage>
          )}
          {currentPage === 2 && (
            <SecondPage
              setLines={setLines}
              drawingData={drawingData}
              lines={lines}
              priceDataList={priceDataList}
              articleDataList={articleDataList}
              optionData={optionData}
            ></SecondPage>
          )}
        </ContractArea>
        <BottomArea>
          <ExportBtn onClick={onClickMakePDF}>견적서 내보내기</ExportBtn>
        </BottomArea>
      </Wrapper>
    </>
  );
};

export default ContractPreviewModalComponent;
