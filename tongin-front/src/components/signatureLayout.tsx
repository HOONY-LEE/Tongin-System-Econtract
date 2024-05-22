import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Stage, Layer, Line, Text } from "react-konva";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import API from "../API/API";
import BlankBoxIcon from "./icon/blankBox";
import DetailDrawBlankModalComponent from "./detail/detailDrawBlankModal";
import { Image } from "./common/image";
import CustomButton from "./common/customButton";
import { Dispatch, SetStateAction } from "react";
import BackIcon from "./icon/backIcon";
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

  position: fixed;
  top: 68%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 8000;
  width: 90vw;
  height: 60vw;
  background-color: #f2f2f2;
  border-radius: 0.8vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.div`
  width: 50vw;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8a8a8a;
  font-weight: 700;
  font-size: 2.6vw;
  margin: 2%;
`;
const CanvasBox = styled.div`
  width: 90vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
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
  /* touch-action: none; */
`;
const CnavasToolText = styled.div`
  color: #bebebe;
  font-weight: 900;
  font-size: 2vw;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  /* line-height: 1vw; */
`;
const CanvasToolBox = styled.div`
  width: 18vw;
  height: 6vw;
  display: flex;

  align-items: center;
`;
const CanvasTool = styled.div`
  border-radius: 0.4vw;
  width: 15vw;
  padding: 0 1vw;

  height: 4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  /* flex-direction: column; */
  background-color: #ffffff;
  box-shadow: 0 0.5vh 0.5vh rgba(0, 0, 0, 0.03),
    0 0.5vh 0.5vh rgba(0, 0, 0, 0.003);
  /* outline: 1px solid red; */
`;
const ToolContainer = styled.div`
  padding-right: 2vw;
  margin-left: auto;
  justify-content: center;
  display: flex;
  align-items: center;
  height: 100%;
  /* outline: 1px solid red; */
`;

const UserAgreeBox = styled.div`
  position: fixed;
  top: 24%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 8000;
  width: 90vw;
  height: 56vw;
  background-color: #f2f2f2;
  border-radius: 0.8vw;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const UserAgreeTextBox = styled.div`
  font-size: 2vw;
  line-height: 4vw;
  font-weight: 500;
  width: 90%;
  display: flex;
  flex-direction: column;
`;
const UserAgreeText = styled.div`
  font-size: 1.7vw;
  line-height: 3vw;
  font-weight: 500;
  margin-bottom: 1.2vw;
`;
const UserAgreeTextFinal = styled.div`
  font-size: 2vw;
  line-height: 3vw;
  font-weight: 700;
  margin-bottom: 1.2vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const UserAgreeTextEmphasis = styled.div`
  font-size: 1.7vw;
  line-height: 3vw;
  font-weight: 700;
  margin-bottom: 1.2vw;
  color: #ff7f3b;
`;
const UserAgreeCheckBox = styled.div`
  margin-left: 2vw;
`;
const FinishBox = styled.div`
  position: fixed;
  top: 94%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 8000;
  width: 90vw;
  background-color: #f2f2f2;
  border-radius: 0.8vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
interface CalculatorComponentProps {
  setOnContractFinishPage?: (value: boolean) => void;
  //   style?: React.CSSProperties;
  //   setDrawingData: any;
  //   setIsScrolled: any;
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
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  border: none;
  width: 90%;
  height: 90%;
`;

const SignatureLayout: React.FC<CalculatorComponentProps> = ({
  setOnContractFinishPage,
}) => {
  const navigate = useNavigate();
  const stageRef = useRef<any>(null);
  const [tool, setTool] = useState<string>("pen");
  const [penColorVisible, setPenColorVisible] = useState<boolean>(false);

  const [penColor, setPenColor] = useState<any>();
  const [penSize, setPenSize] = useState<number>();
  const [blankBoxVisible, setBlankBoxVisible] = useState<boolean>(false);
  const [btnDisabled, setBtnDisabled] = useState<boolean>(false);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [pointerType, setPointerType] = useState<any>("없음");

  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [drawingData, setDrawingData] = useState<any>([]);
  const [lines, setLines] = useState<any[]>([]);

  const handlePointerDown = (e: any) => {
    setIsDrawing(true);
    const pos = stageRef.current?.getPointerPosition();
    if (pos) {
      const newLines = [...lines];
      newLines.push({
        tool,
        points: [pos.x, pos.y],
        stroke: penColor,
        strokeWidth: penSize,
      });
      // 새로운 배열을 상태로 설정합니다.
      setLines(newLines);
    }
  };
  const handlePointerMove = (e: any) => {
    if (!isDrawing) return;

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    if (!lastLine) {
      const newLine = {
        tool,
        points: [point.x, point.y],
        stroke: penColor,
        strokeWidth: penSize,
      };
      setLines([...lines, newLine]);
      setDrawingData([...lines, newLine]);
    } else {
      lastLine.points = lastLine.points.concat([point.x, point.y]);
      setLines([...lines]);
      setDrawingData([...lines]);
    }
  };

  const handlePointerUp = () => {
    setIsDrawing(false);
    setDrawingData(lines);
  };

  const reNum = useParams().id;

  const divRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState<any>({
    width: 0,
    height: 0,
  });

  const isBlank = () => {
    setBlankBoxVisible(true);
  };

  const onBlankData = () => {
    setBlankBoxVisible(false);
    setLines([]);
  };

  const BlankClose = () => {
    setBlankBoxVisible(false);
  };
  const onClickCheck = () => {
    setIsChecked(!isChecked);
  };
  // 서명정보 전송API
  const postContractSignData = async () => {
    const requestPram = {
      contractSignData: drawingData,
      privatePushYN: isChecked,
    };
    const response: any = await API.post(
      `/receipt/contract/sign/${reNum}`,
      requestPram
    );
    if (response.status === 200) {
      alert("전송완료");
      setOnContractFinishPage && setOnContractFinishPage(true);
      navigate(`/contractlist/detail/${reNum}`, { state: { isSigned: true } });
    } else {
      alert("Fail to getDetailList()");
      disableScrollLock();
      setOnContractFinishPage && setOnContractFinishPage(false);
    }
  };
  // 스크롤 잠금
  const scrollRock = () => {
    const { body } = document;

    if (!body.getAttribute("scrollY")) {
      const pageY = window.pageYOffset;

      body.setAttribute("scrollY", pageY.toString());

      body.style.overflow = "hidden";
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

      body.style.removeProperty("scrollBehavior");
      body.style.touchAction = "auto";
      window.scrollTo(0, Number(body.getAttribute("scrollY")));

      body.removeAttribute("scrollY");
    }
  };
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
    scrollRock();
  }, []);

  useEffect(() => {
    if (isChecked && lines.length > 0) {
      setBtnDisabled(false);
    } else setBtnDisabled(true);
  }, [isChecked, lines]);

  return (
    <>
      {blankBoxVisible && (
        <DetailDrawBlankModalComponent
          onBlank={onBlankData}
          onClose={BlankClose}
        ></DetailDrawBlankModalComponent>
      )}
      <UserAgreeBox>
        <UserAgreeTextBox>
          <UserAgreeTextEmphasis>
            고객은 계약서를 작성하기 전 이사 계약 약관을 반드시 확인하셔야 하며,
            의문사항이 있을 경우 견적 상당 직원에게 문의하시어 확인한 후
            계약서에 서명하시기 바랍니다.
          </UserAgreeTextEmphasis>

          <UserAgreeText>
            계약이 체결된 후 고객의 위책사항에 대해 발생하는 불이익은 당사가
            책임지지 않습니다.
          </UserAgreeText>
          <UserAgreeText>
            최근 “통인”을 사칭한 불법계약으로 인한 피해가 빈번하게 발생함에 따라
            모든 통인의 계약건에 대해서 전산의 정보 관리를 하고 있습니다.
          </UserAgreeText>
          <UserAgreeText>
            계약 내용은 당사 홈페이지(https://www.tonginexp.com) 의 “내 이사
            진행상태 보기” 메뉴에서 확인하실 수 있습니다. 조회가 되지 않는
            계약건에 대해서는 정식 계약상태가 아니며, 당사가 책임지지 않습니다.
          </UserAgreeText>
          <UserAgreeText>
            계약(견적) 담당자, 연락처가 미 기재된 경우 계약서로서의 효력이
            없습니다.
          </UserAgreeText>
          <UserAgreeText>
            본인은 위와 같이 신청서의 약관 및 각종 이용안내에 대한 설명을 듣고
            이에 동의하며 개인정보 활용 동의 및 계약 확인에 따라 이사 및 부대
            서비스를 신청합니다.
          </UserAgreeText>

          <UserAgreeTextEmphasis>
            본 서명은 고객의 계약금 입금 이후 계약 효력이 발생합니다.
          </UserAgreeTextEmphasis>
          <br />
          <UserAgreeTextFinal>
            본인은 (주)통인익스프레스 견적•계약 진행에 따른 약관 및 이용안내에
            대한 설명을 듣고 이해했으며, 이사 및 부대 서비스를 신총하고 개인정보
            수집 및 활용에 동의합니다.
            <UserAgreeCheckBox onClick={onClickCheck}>
              <Image
                src={`/icon/${isChecked ? "checked" : "unchecked"}.png`}
                alt="체크박스"
                width={"4vw"}
                height={"4vw"}
              />
            </UserAgreeCheckBox>
          </UserAgreeTextFinal>
        </UserAgreeTextBox>
      </UserAgreeBox>
      <CalculatorComponentWrapper id={"BackgroundPanel"}>
        <ToolContainer>
          <Title>서명을 완료해 주세요</Title>
          <CanvasToolBox>
            <CanvasTool onClick={() => isBlank()}>
              <BackIcon height={"2.3vw"} fill={"#bebebe"} />
              <CnavasToolText>{"다시 서명"}</CnavasToolText>
            </CanvasTool>
          </CanvasToolBox>
        </ToolContainer>
        <div
          onContextMenu={(e) => {
            e.preventDefault();
          }}
        >
          <CanvasBox>
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
                  {lines?.map((line: any, i: any) => (
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
            </CanvasPanel>
          </CanvasBox>
        </div>
      </CalculatorComponentWrapper>

      <FinishBox>
        <CustomButton
          width={"100%"}
          height={"8vw"}
          text={`완료하기`}
          size={"3.4vw"}
          radius={"0.6vw"}
          disabled={btnDisabled}
          onClick={() => postContractSignData()}
        ></CustomButton>
      </FinishBox>
    </>
  );
};
export default SignatureLayout;
