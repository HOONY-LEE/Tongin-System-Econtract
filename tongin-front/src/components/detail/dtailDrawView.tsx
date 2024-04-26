import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import styled from "styled-components";
import CloseIcon from "../icon/closeIcon";
import BlankBoxIcon from "../icon/blankBox";
import EraserIcon from "../icon/eraserIcon";
import DrawingPen from "../icon/drawingPen";
import API from "../../API/API";
import DetailDrawBlankModalComponent from "./detailDrawBlankModal";
const TopArea = styled.div``;

const CalculatorComponentWrapper = styled.div`
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-use-select: none;
  user-select: none;
  user-select: none;
  top: 50%;
  left: 50%;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* outline: 1px solid; */
`;

const CanvasPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-bottom: 2vw;
  background-color: #ffffff;
  border-radius: 0.8vw;
`;
const CanvasToolBox = styled.div`
  width: 34vw;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const CanvasTool = styled.div`
  border-radius: 10vw 10vw 10vw 10vw;
  width: 28vw;
  height: 5.4vh;
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
interface CalculatorComponentProps {
  style?: React.CSSProperties;
  setDrawingData?: any;
  drawingData: any;
  lines: any;
  setLines: any;
  reNum?: string;
}

const DetailDrawView: React.FC<CalculatorComponentProps> = ({
  style,
  setDrawingData,
  drawingData,
  lines,
  setLines,
  reNum,
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
    { size: 20, width: "2vw", height: "1.5vh" },
    { size: 60, width: "3vw", height: "2.3vh" },
    { size: 110, width: "4.1vw", height: "3vh" },
  ];

  // We cant set the h & w on Stage to 100% it only takes px values so we have to
  // find the parent container's w and h and then manually set those !
  useEffect(() => {
    if (divRef.current?.offsetHeight && divRef.current?.offsetWidth) {
      setDimensions({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
      });
    }
  }, []);

  useEffect(() => {
    setDrawingData([...lines]);
  }, []);

  return (
    <>
      <CalculatorComponentWrapper style={style}>
        <div
          onContextMenu={(e) => {
            e.preventDefault();
          }}
        >
          <CanvasPanel ref={divRef}>
            <Stage
              width={dimensions.width}
              height={dimensions.height}
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
      </CalculatorComponentWrapper>
    </>
  );
};
export default DetailDrawView;
