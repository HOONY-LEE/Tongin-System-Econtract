import React, { useState, useRef, useEffect } from "react";
import { Stage, Layer, Line, Text } from "react-konva";
import styled from "styled-components";
const TopArea = styled.div``;
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2); /* 배경을 약간 어둡게 만듭니다. */
  z-index: 9998; /* 모달보다 아래에 위치하도록 설정합니다. */
`;

const CalculatorComponentWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  width: 90vw;
  height: 90vh;
  background-color: #2d2d2d60;
  border-radius: 0.8vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CanvasPanel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 86vw;
  height: 80vh;
  background-color: #ffffff;
  border-radius: 0.8vw;
`;
const CanvasPanelMask = styled.div``;
interface CalculatorComponentProps {
  onClose: () => void;
  style?: React.CSSProperties;
  setIsSave: any;
}

const DetailDrawingPanelComponent: React.FC<CalculatorComponentProps> = ({
  onClose,
  style,
  setIsSave,
}) => {
  const stageRef = useRef<any>(null);
  const [tool, setTool] = useState<string>("pen");
  const [penColorVisible, setPenColorVisible] = useState<boolean>(false);
  const [eraserSizeVisible, setEraserSizeVisible] = useState<boolean>(false);
  const [eraserSize, setEraserSize] = useState<number>();
  const [penColor, setPenColor] = useState<any>();
  const [penSize, setPenSize] = useState<number>();
  const [lines, setLines] = useState<any[]>([]);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);

  const handleMouseDown = (e: any) => {
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
  };
  const handleMouseMove = (e: any) => {
    if (!isDrawing) return;
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = lastLine.points.concat([point.x, point.y]);
    setLines([...lines]);
    setIsSave([...lines]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
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
  const divRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState<any>({
    width: 0,
    height: 0,
  });
  const colorArr = [
    { color: "#000000", name: "Black" },
    { color: "#ff7f3b", name: "red" },
    { color: "#009dff", name: "blue" },
  ];
  const eraserArr = [
    { size: 20, name: "1px" },
    { size: 60, name: "10px" },
    { size: 110, name: "50px" },
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
    setTool("pen");
    setPenColor("#000000");
  }, []);

  return (
    <>
      <Backdrop />
      <CalculatorComponentWrapper style={style}>
        <CanvasPanel ref={divRef}>
          <Stage
            width={dimensions.width}
            height={dimensions.height}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleMouseDown}
            onTouchMove={handleMouseMove}
            onTouchEnd={handleMouseUp}
            ref={stageRef}
            stroke={""}
          >
            <Layer>
              {lines.map((line, i) => (
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

          <div style={{ position: "absolute", top: 10, left: 10 }}>
            {penColorVisible && (
              <div>
                {colorArr.map((colorArr, i) => (
                  <button onClick={() => setPenColor(colorArr.color)} key={i}>
                    {colorArr.name}
                  </button>
                ))}
              </div>
            )}
            {eraserSizeVisible && (
              <div>
                {eraserArr.map((eraser, i) => (
                  <button onClick={() => setEraserSize(eraser.size)} key={i}>
                    {eraser.name}
                  </button>
                ))}
              </div>
            )}
            <button value="pen" onClick={() => selectPen()}>
              Pen
            </button>
            <button value="eraser" onClick={() => selectEraser()}>
              Eraser
            </button>
          </div>
        </CanvasPanel>
        <button onClick={onClose}>Close</button>
      </CalculatorComponentWrapper>
    </>
  );
};

export default DetailDrawingPanelComponent;
