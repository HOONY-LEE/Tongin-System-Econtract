import { useEffect, useState } from "react";
import styled, { css, keyframes } from "styled-components";
import { Image } from "./image";
import SuccessIcon from "../icon/successIcon";
import FilledIcon from "../icon/filledIcon";
const fadein = keyframes`
  0% { bottom: -10vw; opacity: 0; } 
  100% { bottom: 20vw; opacity: 1; }
`;
const fadeout = keyframes`
  0% { bottom: 20vw; opacity: 1; } 
  100% { bottom: -10vw; opacity: 0; }
`;

const ToastContainer = styled.div<{
  $backgroundColor?: string;
  show?: boolean;
}>`
  background-color: ${(props) =>
    props.$backgroundColor ? props.$backgroundColor : "white"};
  border-radius: 0.5vw;
  height: 5vw;
  width: 34vw;
  padding: 5px;
  text-align: center;
  font-size: 1.5vw;
  font-weight: bold;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 20vw;
  z-index: 10000;
  box-shadow: 0 0.5vh 0.5vh rgba(0, 0, 0, 0.03),
    0 0.5vh 0.5vh rgba(0, 0, 0, 0.003);
  animation: ${(props) =>
    props.show
      ? css`
          ${fadein} 1.2s, ${fadeout} 1.3s 1s
        `
      : css``};
`;
const ToastBox = styled.div`
  display: flex;
  width: 80%;
  align-items: center;
  justify-content: center;
`;
const ToastIcon = styled.div`
  margin-right: 5%;
`;
const ToastMessege = styled.div<{
  $fontColor?: string;
}>`
  color: ${(props) => (props.$fontColor ? props.$fontColor : "black")};
`;
export const Toast = (props: any) => {
  const { setFetchStatus, text, fetchStatus, status } = props;
  const [statusClass, setStatusClass] = useState("");

  useEffect(() => {
    switch (status) {
      case "SUCCESS":
        setStatusClass("SUCCESS");
        break;
      case "FAIL":
        setStatusClass("FAIL");
        break;
      default:
        console.log(`stauts ${status} is not supported`);
    }

    const timer = setTimeout(() => {
      setFetchStatus(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {status === "SUCCESS" && (
        <ToastContainer show={fetchStatus} $backgroundColor={"#f8fff9"}>
          <ToastBox>
            <ToastIcon>
              <SuccessIcon width={"2vw"} fill={"#00c932"} />
              {/* {status} */}
            </ToastIcon>
            <ToastMessege $fontColor={"#00c932"}>
              {text ? text : "저장이 완료되었습니다."}
            </ToastMessege>
          </ToastBox>
        </ToastContainer>
      )}
      {status === "FAIL" && (
        <ToastContainer show={fetchStatus} $backgroundColor={"#fff8f7"}>
          <ToastBox>
            <ToastIcon>
              <FilledIcon width={"2vw"} fill={"#ff4242"} />
            </ToastIcon>
            <ToastMessege $fontColor={"#ff4242"}>
              {text ? text : "저장이 되지 않았습니다."}
            </ToastMessege>
          </ToastBox>
        </ToastContainer>
      )}
    </>
  );
};
