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
  width: 84vw;
  height: 120vw;
  background-color: white;
  border-radius: 0.8vw;
`;

const TopArea = styled.div`
  width: 86vw;
  height: 9vw;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 1px solid green;
`;

const LeftArea = styled.div`
  width: 37%;
  height: 100%;
  display: flex;
  outline: 1px solid red;
`;

const MidArea = styled.div`
  width: 26%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: end;
`;
const RightArea = styled.div`
  width: 28%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: end;
`;

const ContractArea = styled.div`
  margin-top: 2vw;
  width: 72vw;
  height: 101.8224vw;
  background-color: #e6e6e6;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CloseBtn = styled.div`
  width: 8vw;
  height: 4vw;
  background-color: #ff7f3b;
  border-radius: 0.4vw;
  font-size: 1.6vw;
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

const SecondPage = styled.div`
  width: 90%;
  height: 90%;
  background-color: white;
`;

const ContractPreviewModalComponent = (props: any) => {
  const {
    onClose,
    reNum,
    priceDataList,
    articleDataList,
    optionData,
    lines,
    drawingData,
    setLines,
  } = props;

  const [contractImageList, setContractImageList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [prevBoxActive, setPrevBoxActive] = useState<boolean>(false);
  const [nextBoxActive, setNextBoxActive] = useState<boolean>(true);
  const maxIndex = 2;

  const onClickMakePDF = async (e: any) => {
    e.preventDefault();
    // const response = await makeHtmltoImage.viewWithPdf(reNum);
    const response = await makeHtmltoImage._convertToImg(reNum);
    console.log(response);
  };

  const getContractImage = async () => {
    const response = await API.get(`receipt/contract-image/${reNum}`);
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
    // getContractImage();
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
          <LeftArea>
            <button onClick={onClickMakePDF}>pdf로 보기</button>
          </LeftArea>
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
            <CloseBtn onClick={onClose}>닫기</CloseBtn>
          </RightArea>
        </TopArea>
        <ContractArea>
          {currentPage === 1 && (
            <div>
              <FirstPage
                setLines={setLines}
                drawingData={drawingData}
                lines={lines}
                priceDataList={priceDataList}
                articleDataList={articleDataList}
                optionData={optionData}
              ></FirstPage>
            </div>
          )}
          {currentPage === 2 && <SecondPage></SecondPage>}
        </ContractArea>
      </Wrapper>
    </>
  );
};

export default ContractPreviewModalComponent;
