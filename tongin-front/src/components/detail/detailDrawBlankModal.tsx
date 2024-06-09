import styled from "styled-components";
import BlankBoxIcon from "../icon/blankBox";

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
  width: 46vw;
  height: 30vw;
  background-color: white;
  border-radius: 0.8vw;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 0.1vw solid #ebebeb;
  box-shadow: 0.1vh 0.5vh 0.3vh rgba(0, 0, 0, 0.05),
    0.1vh 0.5vh 0.3vh rgba(0, 0, 0, 0.03);
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 32vw;
  height: 20vw;
`;
const Title = styled.div`
  width: 70%;
  height: 20%;
  font-size: 2.4vw;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-weight: 700;
`;
const Info = styled.div`
  width: 100%;
  height: 60%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: 4vw;
  font-size: 2vw;
`;
const Btn = styled.div`
  width: 100%;
  height: 22%;
  display: flex;

  align-items: center;
  justify-content: space-evenly;
`;
const BtnBox = styled.div<{
  $bgColor?: string;
  $outline?: string;
  $fontColor?: string;
}>`
  font-weight: 600;
  font-size: 1.8vw;
  display: flex;
  border-radius: 0.6vw;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$fontColor};
  outline: ${(props) => props.$outline};
  width: 40%;
  height: 100%;
`;
interface CalculatorComponentProps {
  onClose?: () => void;
  onBlank?: () => void;
  style?: React.CSSProperties;
}

const TopArea = styled.div``;

const DetailDrawBlankModalComponent = ({
  onBlank,
  onClose,
  style,
}: CalculatorComponentProps) => {
  return (
    <>
      {/* <Backdrop /> 모달이 열릴 때 배경을 어둡게 하는 역할을 합니다. */}
      <CalculatorComponentWrapper style={style}>
        <Container>
          <Title>
            <BlankBoxIcon height={"3vw"} fill={"#F27935"} /> 메모페이지 초기화
          </Title>
          <Info>
            여태까지 작성한 메모가 모두 사라집니다.
            <br></br>그래도 페이지를 초기화 하시겠습니까?
          </Info>
          <Btn>
            <BtnBox
              onClick={onClose}
              $bgColor="#ffffff"
              $outline="0.12vw solid #c6c6c6"
            >
              취소
            </BtnBox>
            <BtnBox onClick={onBlank} $bgColor="#F27935" $fontColor="#ffffff">
              확인
            </BtnBox>
          </Btn>
        </Container>
      </CalculatorComponentWrapper>
    </>
  );
};

export default DetailDrawBlankModalComponent;
