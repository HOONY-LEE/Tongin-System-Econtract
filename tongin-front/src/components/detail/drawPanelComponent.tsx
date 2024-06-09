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
import CustomButton from "../common/customButton";
import { Image } from "../common/image";
const TopArea = styled.div``;
// const Backdrop = styled.div`

//   -webkit-user-select: none;
//   -moz-user-select: none;
//   -ms-user-select: none;
//   user-select: none;
//   user-select: none;
//   -webkit-user-drag: none;
//   -khtml-user-drag: none;
//   -moz-user-drag: none;
//   -o-user-drag: none;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;

// `;
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  margin-top: 3vw;
  /* padding-top: 2vw; */
`;
const CalculatorComponentWrapper = styled.div`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  width: 100vw;
  height: 100vh;
  background-color: #f2f2f2;
  border-radius: 0.8vw;
  /* margin-top: 2vw; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;
const ToolContainer = styled.div`
  /* padding-left: 4vw; */
  width: 90vw;
  height: 8vw;
  /* outline: 1px solid red; */
  justify-content: space-around;
  display: flex;
`;
const ColorCanvasBox = styled.div`
  width: 24vw;
  /* outline: 1px solid red; */
  height: 7vw;
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
  height: 50vw;
  margin-bottom: 2vw;
  background-color: #ffffff;
  border-radius: 0.8vw;
  user-select: none;
  /* pointer-events: none; */
  /* touch-action: none; */
`;
const CanvasToolBox = styled.div`
  width: 34vw;
  height: 7vw;
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
const BtnBox = styled.div`
  user-select: none;
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
  height: 72vw;
  margin-bottom: 1vw;
  background-color: #ffffff;
  border-radius: 0.8vw;

  /* touch-action: none; */
`;

const CloseBox = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 85vw;
  height: 5vw;
  /* background-color: red; */
`;

const InputBox = styled.textarea.attrs({})<{}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  line-height: 3.2vw;
  /* margin-left: 1vw; */
  font-family: "pretendard";
  font-size: 3vw;
  font-weight: 400;
  resize: none;
  /* outline: 1px solid red; */
  outline: none;
  overflow: hidden;
  touch-action: none;
  /* -webkit-user-
  select: none;
  -moz-user-select: none;
  -ms-use-select: none; */

  /* -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none; */

  appearance: none;
  /* -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none; */
  /* user-select: none; */
  border: none;
  width: 94%;
  height: 90%;
`;

interface CalculatorComponentProps {
  setDrawingData: any;
  setTextMemoData: any;
  drawingData?: any;
  textMemoData?: any;
  lines?: any;
  setLines?: any;
  postDrawingData?: any;
  setDrawingPanel?: any;
}

const DrawPanelComponent: React.FC<CalculatorComponentProps> = ({
  drawingData,
  textMemoData,
  setDrawingPanel,
  lines,
  setLines,
  setDrawingData,
  setTextMemoData,
  postDrawingData,
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
    // setDrawingData((e: any) => drawingData.splice[0]);
    setDrawingData([]);
    setLines([]);
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
  // const allTargetElement = document.querySelector("#Back");
  const allTargetElement = document.getElementById("Back");
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

  //2024.06.03 주석처리
  // // 도큐먼트에 이벤트를 추가하고 contextmenu타입을 사용한다
  // allTargetElement?.addEventListener("contextmenu", (event) => {
  //   // event의 기본동작을 실행하지 못하게 한다
  //   event.preventDefault();
  //   return false;
  // });

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
  const onSave = () => {
    postDrawingData();
    setDrawingPanel(false);
  };
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
      {/* <Backdrop
        id={"Back"}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
        onTouchMove={handleBackdropTouchMove}
      /> */}
      <Container>
        <CalculatorComponentWrapper>
          {/* <Image
            src="/icon/save_close.png"
            width={"88vw"}
            height={"9vw"}
            onClick={() => onSave()}
          ></Image> */}
          <CloseBox>
            <CloseIcon
              onClick={() => onSave()}
              height={"2.3vw"}
              fill={"#AEAEAE"}
            />
          </CloseBox>

          {blankBoxVisible && (
            <DetailDrawBlankModalComponent
              onBlank={onBlankData}
              onClose={BlankClose}
            ></DetailDrawBlankModalComponent>
          )}
          <TextPanel>
            <InputBox
              placeholder="메모할 내용을 입력해 주세요."
              value={textMemoData}
              onChange={textMemoInput}
              maxLength={1000}
            ></InputBox>
          </TextPanel>
          {/* 그림그리기 부분 */}
          {/* <ToolContainer>
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
            {/* <CloseBox>
            <CloseIcon onClick={onClose} height={"2.3vw"} fill={"#AEAEAE"} />
          </CloseBox> */}
          {/* </ToolContainer> */}
          {/* <h1>{pointerType}</h1> */}
          <div
            onContextMenu={(e) => {
              e.preventDefault();
            }}
          >
            {/* <h1>현재 타입5 최종 : {pointerType}</h1> */}
            {/* <CanvasPanel ref={divRef} id={"CanvasPanel"}>
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
                        line.tool === "eraser"
                          ? "destination-out"
                          : "source-over"
                      }
                    />
                  ))}
                </Layer>
              </Stage>
            </CanvasPanel>  */}
          </div>
        </CalculatorComponentWrapper>
        <BtnBox>
          {/* <CustomButton
            width={"90vw"}
            height={"8vw"}
            text={`저장 및 닫기`}
            size={"3.4vw"}
            radius={"0.6vw"}
            onClick={() => onSave()}
          ></CustomButton> */}
          {/* <Image
            src="/icon/save_close.png"
            width={"92vw"}
            height={"9vw"}
            onClick={() => onSave()}
          ></Image> */}
        </BtnBox>
      </Container>
    </>
  );
};
export default DrawPanelComponent;
