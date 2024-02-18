import { useState } from "react";
import styled, { css, keyframes } from "styled-components";

// Define CSS transitions using Keyframes.
const flash = keyframes`
  0% {
    transform: scale(1);
    background-color: #f9f9f9;
  }
  40% {
    transform: scale(0.);
    background-color: #e6e6e6;
    color: #ff7f3b;
    border: 0.3vw solid #ff7f3b;
    font-size: 2.4vw;
  }
  80% {
    transform: scale(0.8);
    background-color: #e6e6e6;
    color: #ff7f3b;
    border: 0.3vw solid #ff7f3b;
    font-size: 2.4vw;
  }
  100% {
    transform: scale(1);
    background-color: #f9f9f9;
  }
`;

// NumBox 컴포넌트에 플래시 효과 적용하는 스타일
const FlashNumBox = styled.div<{ $isFlash?: boolean }>`
  width: 14vw;
  height: 100%;
  border: 0.2vw solid #b8b8b8;
  background-color: #f9f9f9;
  border-radius: 0.4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3vw;
  font-weight: 600;
  cursor: pointer;

  /* 플래시 효과 적용 */
  ${(props) =>
    props.$isFlash &&
    css`
      /* 애니메이션 스타일 추가 */
      animation: ${flash} 0.3s ease-in-out;
    `}
`;

export default function FlashNumBoxComponent(props: any) {
  const { number, tmpValue, setTmpValue } = props;
  const [isFlash, setIsFlash] = useState(false);

  const onClickHandle = () => {
    let newValue = tmpValue + number;
    if (newValue.charAt(0) === "0") {
      if (newValue.charAt(1) !== ".") {
        newValue = newValue.substr(1);
      }
    }
    setTmpValue(newValue);

    setIsFlash(true);
    setTimeout(() => {
      setIsFlash(false);
    }, 100);
  };

  return (
    <>
      <FlashNumBox onClick={onClickHandle} $isFlash={isFlash}>
        {number}
      </FlashNumBox>
    </>
  );
}
