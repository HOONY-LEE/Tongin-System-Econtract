import styled from "styled-components";

import { useState } from "react";
import react, { useEffect } from "react";
import axios from "axios";
import DetailComponent from "../components/detail/detailComponent";
import CustomButton from "../components/common/customButton";
import {
  FlexBox,
  FlexBoxRow,
  FlexX,
  FlexXY,
  FlexY,
} from "../components/common/flexBox";

import API from "../API/API";
import ProductComponent from "../components/detail/productComponent";
import {
  drawingSampleData,
  realOptionData,
  sampleProductDataList,
} from "../components/common/sampleData";
import OptionComponent from "../components/detail/optionComponent";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import DetailDrawingPanelComponent from "../components/detail/detailDrawingPanelComponent";
import ContractComponent from "../components/detail/contractComponent";
import PencilIcon from "../components/icon/pencil";
import DetailDrawView from "../components/detail/dtailDrawView";
import NewOptionComponent from "../components/detail/newOptionComponent";
import { newOptionData } from "../components/common/sampleData3";
import { Toast } from "../components/common/toastMessegeComponent";
import DrawingComponent from "../components/detail/drawingComponent";

const HomeContainer = styled.div`
  margin-top: 2vw;
  width: 90vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* outline: 2px solid green; */
  margin-bottom: 6vw;
  /* background-color: red; */
`;
const TabMenu = styled.ul`
  // 탭 메뉴들 포함하고 있는 영역
  color: rgb(232, 234, 237);
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* background-color: aqua; */
  justify-content: space-between;
  list-style: none;
  margin-top: 10px;
  width: 100%;
  height: 5vw;
  :hover {
    cursor: pointer;
  }
  .submenu {
    // 각 탭하나당 CSS
    display: flex;
    justify-content: center;
    align-items: center;
    width: 22vw;
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
  width: 100%;
  height: 100%;
  border-radius: 0px 0px 0.6vw 0.6vw;
`;

//  상세정보 탭
const DetialTabBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
`;

//  물품추가 탭
const ProductTabBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
  /* outline: 1px solid green; */
`;

//  옵션선택 탭
const OptionTabBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
`;

//  견적계약서 탭
const ContractTabBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
  /* outline: 1px solid green; */
`;

//  스크롤 LOCK
const ScrollLock = styled.div`
  .isScroll {
    overflow: hidden !important;
    position: fixed;
    touch-action: none;
  }
`;
const DrawingBtn = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 7vw;
  height: 7vw;
  border-radius: 50%;
  background-color: #ff7f3b;
  position: fixed;
  bottom: 5vh;
  right: 5vw;
  box-shadow: 0 0.5vh 0.5vh rgba(0, 0, 0, 0.073),
    0 0.5vh 0.5vh rgba(0, 0, 0, 0.023);
  &:hover {
    cursor: pointer;
    background-color: rgb(255, 144, 85);
  }
`;

export default function Detail() {
  const signed = useLocation();

  const [currentTab, setCurrentTab] = useState(0); //tab
  const [detailData, setDetailData] = useState<any[]>([]);
  const [otherDateData, setOtherDateData] = useState<any>({});
  const [optionData, setOptionData] = useState<any>({});
  const [currentProductList, setCurrentProductList] = useState<any[]>([]);
  const [priceDataList, setPriceDataList] = useState<any[]>([]);
  const [drawingPanel, setDrawingPanel] = useState(false);
  const [drawingData, setDrawingData] = useState<any[]>([]);
  const [drawingData2, setDrawingData2] = useState<any[]>([]);
  const [textMemoData, setTextMemoData] = useState<any[]>([]);
  const [contractImageList, setContractImageList] = useState<any[]>();
  const [isScrolled, setIsScrolled] = useState<any>(true);
  const [lines, setLines] = useState<any[]>([]);
  const [lines2, setLines2] = useState<any[]>([]);
  const reNum = useParams().id;
  const [preventDefault, setPreventDefault] = useState<any>(false);
  const [fetchStatus, setFetchStatus] = useState(false); // toast messege
  const [status, setStatus] = useState(""); // toast messege
  const menuArr = [
    { name: "1. 상세정보", content: "견적리스트 영역" },
    { name: "2. 물품정보", content: "미계약 리스트 영역" },
    { name: "3. 옵션선택", content: "계약 리스트 영역" },
    { name: "4. 견적•계약서", content: "작업리스트 영역" },
  ];

  const selectMenuHandler = (index: any) => {
    setCurrentTab(index);
  };

  // useEffect(() => {
  //   if (signed.state) {
  //     setCurrentTab(3);
  //   }
  // }, [signed]);

  // 계약서 이미지 리스트 API
  const getContractImageList = async () => {
    const response = await API.get(`/receipt/contract-image/${reNum}`);
    if (response.status === 200) {
      setContractImageList(response.data.contractImageList);
    }
  };

  // 상세정보 호출API
  const getDetailList = async () => {
    const response: any = await API.get(`/receipt/detail/${reNum}`);
    if (response.status === 200) {
      const result = response.data.receiptDetail;
      const result2 = response.data.contractSignData;
      const result3 = response.data.otherDateData;
      setDetailData(result);
      setLines2(result2);
      setOtherDateData(result3);
    } else {
      alert("Fail to getDetailList()");
    }
  };

  // 물품정보 호출API
  const getProductList = async () => {
    const response = await API.get(`/receipt/article/${reNum}`);
    if (response.status === 200) {
      const result = response.data.receiptArticleData;

      setCurrentProductList(result);
    } else {
      alert("Fail to getProductList()");
    }
  };

  // 옵션정보 호출API
  const getOptionList = async () => {
    const response = await API.get(`/receipt/option2/${reNum}`);
    if (response.status === 200) {
      console.log("response.data.receiptOptionData>>>");
      console.log(response.data.receiptOptionData);
      setOptionData(response.data.receiptOptionData);
    } else {
      alert("Fail to getOptionList()");
    }
  };

  // 옵션정보 수정API
  const postOptionData = async () => {
    if (optionData.isEditable === false) {
      alert("이미 내보내기한 계약서는 수정할 수 없습니다.");
      return;
    }

    try {
      const requestParam = { receiptOptionData: optionData };

      const response = await API.post(`receipt/option2/${reNum}`, requestParam);

      if (response.status === 200) {
        setFetchStatus(true);
        setStatus("SUCCESS");
        alert("옵션정보를 저장하는데 성공하였습니다.");
      } else {
        setFetchStatus(true);
        setStatus("FAIL");
        alert("Fail to saveOptionData()");
      }
    } catch (error) {
      setFetchStatus(true);
      setStatus("FAIL");
      alert("옵션정보를 저장하는데 실패했습니다!");
    }
  };

  // 가격정보 호출API
  const getPriceList = async () => {
    const response = await API.get(`/receipt/price/${reNum}`);
    if (response.status === 200) {
      setPriceDataList(response.data.receiptPriceData);
    } else {
      alert("Fail to getPriceList()");
    }
  };

  // // 메모장 전송 API
  // const postDrawingData = async () => {
  //   const requestParam = {
  //     receiptMemoData: drawingData,
  //     textMemo: textMemoData,
  //   };
  //   const response = await API.post(`receipt/memo/${reNum}`, requestParam);
  //   if (response.status === 200) {
  //     const result = response.data;
  //     disableScrollLock();
  //     setIsScrolled(false);
  //     disableScrollLock();
  //   } else {
  //     alert("Fail to postDrawingData()");
  //   }
  // };
  // // 메모장 데이터 가져오기 API
  // const getDrawingData = async () => {
  //   try {
  //     const response = await API.get(`receipt/memo/${reNum}`);
  //     if (response.status === 200) {
  //       const result = response.data.receiptMemoData;
  //       const textMemo = response.data.textMemo;
  //       setDrawingData(result);
  //       setTextMemoData(textMemo);
  //       setIsScrolled(true);
  //       setPreventDefault(true);
  //     } else {
  //       alert("Fail to getDrawingData()");
  //     }
  //   } catch (error) {
  //     // alert("메모 정보를 불러오는데 실패했습니다.");
  //   }
  // };

  const onPanelClose = () => {
    // postDrawingData();
    setDrawingPanel(false);
    disableScrollLock();
  };

  useEffect(() => {
    getDetailList();
    getProductList();
    getOptionList();
    getPriceList();
    getContractImageList();
  }, []);

  // 스크롤 잠금
  const scrollRock = () => {
    const { body } = document;

    if (!body.getAttribute("scrollY")) {
      const pageY = window.pageYOffset;

      body.setAttribute("scrollY", pageY.toString());

      body.style.overflow = "hidden";
      body.style.touchAction = "none";
      body.style.position = "fixed";
      body.style.left = "0px";
      body.style.right = "0px";
      body.style.bottom = "0px";
      body.style.top = `-${pageY}px`;
      body.style.scrollBehavior = "contain";
    }
  };

  // 스크롤 잠금 해제
  const disableScrollLock = () => {
    const { body } = document;

    if (body.getAttribute("scrollY")) {
      body.style.removeProperty("overflow");
      body.style.removeProperty("position");
      body.style.removeProperty("top");
      body.style.removeProperty("left");
      body.style.removeProperty("right");
      body.style.removeProperty("bottom");
      body.style.removeProperty("touchAction");
      body.style.removeProperty("scrollBehavior");
      body.style.touchAction = "auto";
      window.scrollTo(0, Number(body.getAttribute("scrollY")));

      body.removeAttribute("scrollY");
    }
  };
  useEffect(() => {
    if (drawingData?.length >= 0) {
      setLines(drawingData);
    } else {
      setDrawingData([]);
    }
  }, [drawingData]);

  useEffect(() => {
    if (drawingData2?.length >= 0) {
      setLines2(drawingData2);
    } else {
      setDrawingData([]);
    }
  }, [drawingData2]);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onDrawingPanel = () => {
    navigate(
      `/drawing/${reNum}`,
      JSON.parse(
        JSON.stringify({
          state: {
            setDrawingPanel: setDrawingPanel,
            setDrawingData: setDrawingData,
            drawingData: drawingData,
            textMemoData: textMemoData,
            setTextMemoData: setTextMemoData,
            setIsScrolled: setIsScrolled,
            setLines: setLines,
            lines: lines,
            setPreventDefault: setPreventDefault,
            preventDefault: preventDefault,
            disableScrollLock: disableScrollLock,
          },
        })
      )
    );
  };
  useEffect(() => {
    disableScrollLock();
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      <FlexXY>
        <HomeContainer>
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
              <DetialTabBox>
                <DetailComponent
                  setStatus={setStatus}
                  status={status}
                  fetchStatus={fetchStatus}
                  setFetchStatus={setFetchStatus}
                  getDetailList={getDetailList}
                  detailData={detailData}
                  setDetailData={setDetailData}
                  contractImageList={contractImageList}
                  otherDateData={otherDateData}
                  setOtherDateData={setOtherDateData}
                ></DetailComponent>
              </DetialTabBox>
            ) : null}
            {currentTab === 1 ? (
              <ProductTabBox>
                <ProductComponent
                  reNum={reNum}
                  getProductList={getProductList}
                  currentProductList={currentProductList}
                  setCurrentProductList={setCurrentProductList}
                ></ProductComponent>
              </ProductTabBox>
            ) : null}
            {currentTab === 2 ? (
              <OptionTabBox>
                <NewOptionComponent
                  optionData={optionData}
                  setOptionData={setOptionData}
                  postOptionData={postOptionData}
                  reNum={reNum}
                ></NewOptionComponent>
              </OptionTabBox>
            ) : null}
            {currentTab === 3 ? (
              <ContractTabBox>
                <ContractComponent
                  reNum={reNum}
                  getDetailList={getDetailList}
                  drawingData={drawingData}
                  setDrawingData={setDrawingData}
                  drawingData2={drawingData2}
                  setDrawingData2={setDrawingData2}
                  setIsScrolled={setIsScrolled}
                  setLines={setLines}
                  setLines2={setLines2}
                  lines={lines}
                  lines2={lines2}
                  detailData={detailData}
                  articleDataList={currentProductList}
                  optionData={optionData}
                  priceDataList={priceDataList}
                  setPriceDataList={setPriceDataList}
                  contractImageList={contractImageList}
                  getContractImageList={getContractImageList}
                  otherDateData={otherDateData}
                ></ContractComponent>
              </ContractTabBox>
            ) : null}
          </ContentBox>

          <DrawingBtn
            onClick={() => {
              setDrawingPanel(true);
              onDrawingPanel();
            }}
          >
            <PencilIcon height={"4vw"} fill={"#ffffff"} />
          </DrawingBtn>
        </HomeContainer>
      </FlexXY>
    </>
  );
}
