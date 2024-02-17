import styled from "styled-components";

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
  width: 50vw;
  height: 50vw;
  background-color: white;
  border-radius: 0.8vw;
`;

interface CalculatorComponentProps {
  onClose: () => void;
  style?: React.CSSProperties;
}

const TopArea = styled.div``;

const ModalComponent = ({ onClose, style }: CalculatorComponentProps) => {
  return (
    <>
      <Backdrop /> {/* 모달이 열릴 때 배경을 어둡게 하는 역할을 합니다. */}
      <CalculatorComponentWrapper style={style}>
        <button onClick={onClose}>Close</button>
      </CalculatorComponentWrapper>
    </>
  );
};

export default ModalComponent;
