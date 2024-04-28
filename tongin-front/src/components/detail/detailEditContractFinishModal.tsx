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
  width: 55vw;
  height: 30vw;
  background-color: white;
  border-radius: 0.8vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 50vw;
  height: 24vw;
`;
const Title = styled.div`
  width: 30%;
  height: 20%;
  font-size: 2.6vw;
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
  height: 18%;
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
  width: 42%;
  height: 100%;
`;
interface CalculatorComponentProps {
  onClose?: () => void;
  onFinish?: () => void;
  style?: React.CSSProperties;
}

const TopArea = styled.div``;

const DetailEditContractFinishModal = ({
  onFinish,
  onClose,
  style,
}: CalculatorComponentProps) => {
  return (
    <>
      <Backdrop />
      <CalculatorComponentWrapper style={style}>
        <Container>
          <Title>
            <BlankBoxIcon height={"3vw"} fill={"#F27935"} /> 계약 확정
          </Title>
          <Info>
            진행상태를 계약으로 변경하시면 더 이상 수정이 불가합니다.
            <br></br>그래도 진행상태를 계약으로 변경 후 저장하시겠습니까?
          </Info>
          <Btn>
            <BtnBox
              onClick={onClose}
              $bgColor="#ffffff"
              $outline="0.12vw solid #c6c6c6"
            >
              취소
            </BtnBox>
            <BtnBox onClick={onFinish} $bgColor="#F27935" $fontColor="#ffffff">
              계약상태로 변경
            </BtnBox>
          </Btn>
        </Container>
      </CalculatorComponentWrapper>
    </>
  );
};

export default DetailEditContractFinishModal;
