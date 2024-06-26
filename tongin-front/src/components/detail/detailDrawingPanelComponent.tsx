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
const TopArea = styled.div``;
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;

  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2); /* 배경을 약간 어둡게 만듭니다. */
  z-index: 9998; /* 모달보다 아래에 위치하도록 설정합니다. */
`;

const CalculatorComponentWrapper = styled.div`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  /* /* user-select: none; */
  /* pointer-events: none; */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: 90vw;
  height: 90vh;
  background-color: #f2f2f2;
  border-radius: 0.8vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ToolContainer = styled.div`
  padding-left: 4vw;
  width: 90vw;
  height: 7vh;
  /* outline: 1px solid red; */
  justify-content: center;
  display: flex;
`;
const ColorCanvasBox = styled.div`
  width: 24vw;
  /* outline: 1px solid red; */
  height: 6vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const ColorCanvastitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2vh;
  font-weight: 600;
  margin-bottom: 0.3vh;
  font-size: 1.8vw;
`;
const ColorCanvas = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0vw 3vw 1vw 3vw;
  height: 3vh;
`;

const ColorPicker = styled.div<{
  $bgColor?: string;
  $outlineColor?: string;
}>`
  background-color: ${(props) => props.$bgColor};
  border-radius: 50%;
  width: 2.5vh;
  height: 2.5vh;
  outline: 0.3vw solid ${(props) => props.$outlineColor};
`;
const SizePicker = styled.div<{
  $widthSize?: string;
  $heightSize?: string;
  $outlineColor?: string;
}>`
  background-color: #ffffff;
  border-radius: 50%;

  width: ${(props) => props.$widthSize};
  height: ${(props) => props.$heightSize};
  outline: 0.2vw solid ${(props) => props.$outlineColor};
`;
const CanvasPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 86vw;
  height: 54vh;
  margin-bottom: 2vw;
  background-color: #ffffff;
  border-radius: 0.8vw;
  user-select: none;
  /* pointer-events: none; */
  /* touch-action: none; */
`;
const CanvasToolBox = styled.div`
  width: 34vw;
  height: 6vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CanvasTool = styled.div`
  border-radius: 10vw 10vw 10vw 10vw;
  width: 28vw;
  height: 5vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #ffffff;
  box-shadow: 0 0.5vh 0.5vh rgba(0, 0, 0, 0.03),
    0 0.5vh 0.5vh rgba(0, 0, 0, 0.003);
`;
const CloseBox = styled.div`
  margin: 2vw 2vw 0vw auto;

  display: flex;
  align-items: top;
  justify-content: end;
`;
const CanvasPanelMask = styled.div``;
const TextComponentWrapper = styled.div`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;

  position: fixed;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: 90vw;
  height: 40vh;
  background-color: #f2f2f2;
  border-radius: 0.8vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TextPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 86vw;
  height: 24vh;
  margin-bottom: 2vw;
  background-color: #ffffff;
  border-radius: 0.8vw;

  /* touch-action: none; */
`;
interface CalculatorComponentProps {
  onClose: () => void;
  style?: React.CSSProperties;
  setDrawingData: any;
  setIsScrolled: any;
  textMemoData: any;
  setTextMemoData: any;
  drawingData: any;
  lines: any;
  setLines: any;
  reNum?: string;
  preventDefault?: any;
  setPreventDefault?: any;
  disableScrollLock?: any;
}
const InputBox = styled.textarea.attrs({})<{}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  /* margin-left: 1vw; */
  font-size: 1.8vw;
  font-weight: 500;
  /* outline: 1px solid red; */
  outline: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;

  appearance: none;
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  border: none;
  width: 90%;

  height: 90%;
`;

const DetailDrawingPanelComponent: React.FC<CalculatorComponentProps> = ({
  onClose,
  style,
  setDrawingData,
  drawingData,
  textMemoData,
  setTextMemoData,
  setIsScrolled,
  lines,
  setLines,
  reNum,
  preventDefault,
  setPreventDefault,
  disableScrollLock,
}) => {
  const stageRef = useRef<any>(null);
  const [tool, setTool] = useState<string>("pen");
  const [penColorVisible, setPenColorVisible] = useState<boolean>(false);
  const [eraserSizeVisible, setEraserSizeVisible] = useState<boolean>(false);
  const [eraserSize, setEraserSize] = useState<number>();
  const [penColor, setPenColor] = useState<any>();
  const [penSize, setPenSize] = useState<number>();
  const [blankBoxVisible, setBlankBoxVisible] = useState<boolean>(false);
  const [eraserCurrentOutLine, setEraserCurrentOutLine] = useState(0);
  const [penCurrentOutLine, setPenCurrentOutLine] = useState(0);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [pointerType, setPointerType] = useState<any>("없음");
  const handlePointerDown = (e: any) => {
    if (pointerType === "mouse" || pointerType === "pen") {
      setIsDrawing(true);
      const pos = stageRef.current?.getPointerPosition();
      if (pos) {
        setLines([
          ...lines,
          {
            tool,
            points: [pos.x, pos.y],
            stroke: penColor,
            strokeWidth: tool === "eraser" ? eraserSize : penSize,
          },
        ]);
      }
    }
  };
  const handlePointerMove = (e: any) => {
    if (!isDrawing) return;
    if (pointerType === "mouse" || pointerType === "pen") {
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();
      let lastLine = lines[lines.length - 1];
      lastLine.points = lastLine?.points?.concat([point.x, point.y]);
      setLines([...lines]);
      setDrawingData([...lines]);
    }
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
    setDrawingData(lines);
  };
  const selectPen = () => {
    setPenColorVisible(true);
    setEraserSizeVisible(false);
    setTool("pen");
  };
  const selectEraser = () => {
    setEraserSizeVisible(true);
    setPenColorVisible(false);
    setTool("eraser");
    setEraserSize(20);
  };

  const isBlank = () => {
    setBlankBoxVisible(true);
  };
  const onBlankData = () => {
    setBlankBoxVisible(false);
    setDrawingData((e: any) => drawingData.splice[0]);
  };
  const BlankClose = () => {
    setBlankBoxVisible(false);
  };
  const eraserSetting = (size: number, index: number) => {
    setEraserSize(size);
    setEraserCurrentOutLine(index);
  };

  const penSetting = (color: string, index: number) => {
    setPenColor(color);
    setPenCurrentOutLine(index);
  };

  const divRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState<any>({
    width: 0,
    height: 0,
  });
  const colorArr = [
    { color: "#000000", name: "Black" },
    { color: "#FD6C60", name: "red" },
    { color: "#009dff", name: "blue" },
  ];
  const eraserArr = [
    { size: 20, width: "1.5vh", height: "1.5vh" },
    { size: 60, width: "2.3vh", height: "2.3vh" },
    { size: 110, width: "3vh", height: "3vh" },
  ];

  const targetElement = document.querySelector("#CanvasPanel");

  targetElement?.addEventListener(
    "pointerdown",
    (event: any) => {
      // Call the appropriate pointer type handler
      switch (event.pointerType) {
        case "mouse":
          setPointerType("mouse");
          break;
        case "pen":
          setPointerType("pen");
          break;
        case "touch":
          setPointerType("touch");
          break;
        default:
        // console.log(`pointerType ${event.pointerType} is not supported`);
      }
    },
    false
  );

  const textMemoInput = (e: any) => {
    setTextMemoData(e.target.value);
  };
  const backTargetElement = document.querySelector("#BackgroundPanel");
  const allTargetElement = document.querySelector("#Back");
  // backTargetElement?.addEventListener(
  //   "dragover",
  //   (event) => {
  //     event.preventDefault();
  //   },
  //   false
  // );
  // 도큐먼트에 이벤트를 추가하고 contextmenu타입을 사용한다
  // backTargetElement?.addEventListener("contextmenu", (event) => {
  //   // event의 기본동작을 실행하지 못하게 한다
  //   event.preventDefault();
  // });
  // allTargetElement?.addEventListener(
  //   "dragover",
  //   (event) => {
  //     event.preventDefault();
  //   },
  //   false
  // );
  // 도큐먼트에 이벤트를 추가하고 contextmenu타입을 사용한다
  allTargetElement?.addEventListener("contextmenu", (event) => {
    // event의 기본동작을 실행하지 못하게 한다
    event.preventDefault();
    return false;
  });
  // We cant set the h & w on Stage to 100% it only takes px values so we have to
  // find the parent container's w and h and then manually set those !
  useEffect(() => {
    if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
      setDimensions({
        width: divRef.current.offsetWidth - 30,
        height: divRef.current.offsetHeight - 30,
      });
    }
  }, []);

  useEffect(() => {
    setPenColorVisible(true);
    setTool("pen");
    setPenColor("#000000");
    setDrawingData([]);
  }, []);

  // useEffect(() => {
  //   setTextMemo((prev: any) => {
  //     const updatedData = { ...prev };
  //     updatedData.textMemo = textMemo;

  //     return updatedData;
  //   });
  // }, [textMemo]);
  // 더블 탭 시간 간격을 체크하기 위한 변수

  // CalculatorComponentWrapper에서 드래그 이벤트 핸들러
  // const handleCalculatorTouchMove = (e: any) => {
  //   if (!isDrawing) {
  //     e.preventDefault(); // 터치 이벤트의 기본 동작을 막음
  //   }
  // };

  const handleBackdropTouchMove = (e: any) => {
    e.preventDefault(); // 터치 이벤트의 기본 동작을 막음
  };
  return (
    <>
      <Backdrop
        id={"Back"}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        onTouchMove={handleBackdropTouchMove}
      />

      <CalculatorComponentWrapper style={style}>
        {blankBoxVisible && (
          <DetailDrawBlankModalComponent
            onBlank={onBlankData}
            onClose={BlankClose}
          ></DetailDrawBlankModalComponent>
        )}
        <ToolContainer>
          <ColorCanvasBox>
            <ColorCanvastitle>
              {penColorVisible && <div>펜 색상 선택</div>}
              {eraserSizeVisible && <div>지우개 두께 선택</div>}
            </ColorCanvastitle>
            {penColorVisible && (
              <ColorCanvas>
                {colorArr.map((colorArr, i) => (
                  <ColorPicker
                    onClick={() => penSetting(colorArr.color, i)}
                    key={i}
                    $bgColor={colorArr.color}
                    $outlineColor={
                      i === penCurrentOutLine ? "#FF7F3B" : "#ffffff"
                    }
                  ></ColorPicker>
                ))}
              </ColorCanvas>
            )}
            {eraserSizeVisible && (
              <ColorCanvas>
                {eraserArr.map((eraser, i) => (
                  <SizePicker
                    onClick={() => eraserSetting(eraser.size, i)}
                    key={i}
                    $widthSize={eraser.width}
                    $heightSize={eraser.height}
                    $outlineColor={
                      i === eraserCurrentOutLine ? "#FF7F3B" : "#AEAEAE"
                    }
                  ></SizePicker>
                ))}
              </ColorCanvas>
            )}
          </ColorCanvasBox>
          <CanvasToolBox>
            <CanvasTool>
              <DrawingPen
                onClick={() => selectPen()}
                height={"4vw"}
                fill={tool === "pen" ? "#FF7F3B" : "#AEAEAE"}
              />
              <EraserIcon
                onClick={() => selectEraser()}
                height={"4vw"}
                fill={tool === "eraser" ? "#FF7F3B" : "#AEAEAE"}
              />
              <BlankBoxIcon
                onClick={() => isBlank()}
                height={"4vw"}
                fill={"#AEAEAE"}
              />
            </CanvasTool>
          </CanvasToolBox>
          <CloseBox>
            <CloseIcon onClick={onClose} height={"2.3vw"} fill={"#AEAEAE"} />
          </CloseBox>
        </ToolContainer>
        {/* <h1>{pointerType}</h1> */}
        <div
          onContextMenu={(e) => {
            e.preventDefault();
          }}
        >
          {/* <h1>현재 타입5 최종 : {pointerType}</h1> */}
          <CanvasPanel ref={divRef} id={"CanvasPanel"}>
            <Stage
              width={dimensions.width}
              height={dimensions.height}
              onMouseDown={handlePointerDown}
              onMouseMove={handlePointerMove}
              onMouseUp={handlePointerUp}
              onTouchStart={handlePointerDown}
              onTouchMove={handlePointerMove}
              onTouchEnd={handlePointerUp}
              ref={stageRef}
              stroke={""}
            >
              <Layer>
                {lines.map((line: any, i: any) => (
                  <Line
                    key={i}
                    points={line.points}
                    stroke={line.stroke}
                    strokeWidth={line.strokeWidth}
                    tension={0.8}
                    lineCap="round"
                    globalCompositeOperation={
                      line.tool === "eraser" ? "destination-out" : "source-over"
                    }
                  />
                ))}
              </Layer>
            </Stage>
          </CanvasPanel>
        </div>
        <TextPanel>
          <InputBox
            placeholder="메모할 내용을 입력해 주세요."
            value={textMemoData}
            onChange={textMemoInput}
          ></InputBox>
        </TextPanel>
      </CalculatorComponentWrapper>
    </>
  );
};
export default DetailDrawingPanelComponent;
