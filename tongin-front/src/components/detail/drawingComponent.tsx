import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import styled from "styled-components";
import CloseIcon from "../icon/closeIcon";
import BlankBoxIcon from "../icon/blankBox";
import EraserIcon from "../icon/eraserIcon";
import DrawingPen from "../icon/drawingPen";
import API from "../../API/API";
import DetailDrawBlankModalComponent from "./detailDrawBlankModal";
import { AnyRecordWithTtl } from "dns";

import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomButton from "../common/customButton";
import DrawPanelComponent from "./drawPanelComponent";

const TopArea = styled.div``;

export default function DrawingComponent(props: any) {
  const [drawingData, setDrawingData] = useState<any[]>([]);
  const [textMemoData, setTextMemoData] = useState<any[]>([]);
  const [lines, setLines] = useState<any[]>([]);
  const navigate = useNavigate();
  const reNum = useParams().id;
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
  // 메모장 전송 API
  const postDrawingData = async () => {
    const requestParam = {
      receiptMemoData: drawingData ? drawingData : [],
      textMemo: textMemoData ? textMemoData : "",
    };
    const response = await API.post(`receipt/memo/${reNum}`, requestParam);
    if (response.status === 200) {
      const result = response.data;
      disableScrollLock();
      navigate(`/contractlist/detail/${reNum}`);
    } else {
      alert("Fail to postDrawingData()");
    }
  };
  // // 메모장 데이터 가져오기 API
  const getDrawingData = async () => {
    try {
      const response = await API.get(`receipt/memo/${reNum}`);
      if (response.status === 200) {
        const result = response.data.receiptMemoData;
        const textMemo = response.data.textMemo;
        setDrawingData(result);
        setTextMemoData(textMemo);
        setLines(result);

        scrollRock();
        // setIsScrolled(true);
        // setPreventDefault(true);
      } else {
        alert("Fail to getDrawingData()");
      }
    } catch (error) {
      // alert("메모 정보를 불러오는데 실패했습니다.");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    getDrawingData();
  }, []);

  return (
    <>
      <DrawPanelComponent
        drawingData={drawingData}
        textMemoData={textMemoData}
        setDrawingData={setDrawingData}
        setTextMemoData={setTextMemoData}
        lines={lines}
        setLines={setLines}
        postDrawingData={() => postDrawingData()}
      ></DrawPanelComponent>
    </>
  );
}
