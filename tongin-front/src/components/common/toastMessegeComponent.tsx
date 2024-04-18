import { useEffect, useState } from "react";
import styled from "styled-components";
import { Image } from "./image";
const ToastContainer = styled.div<{
  $backgroundColor?: string;
}>`
  background-color: ${(props) =>
    props.$backgroundColor ? props.$backgroundColor : "white"};
  border-radius: 0.5vw;
  height: 4vw;
  width: 25vw;
  padding: 5px;
  text-align: center;
  font-size: 1.5vw;
  font-weight: bold;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 10vw;
  box-shadow: 0 0.5vh 0.5vh rgba(0, 0, 0, 0.01),
    0 0.5vh 0.5vh rgba(0, 0, 0, 0.003);
`;
const ToastBox = styled.div``;
const ToastIcon = styled.div``;
const ToastMessege = styled.div``;
export const Toast = (props: any) => {
  const { setFetchStatus, text, status } = props;
  const [statusClass, setStatusClass] = useState("");

  useEffect(() => {
    switch (status) {
      case "SUCSSES":
        setStatusClass("SUCSSES");
        break;
      case "FAIL":
        setStatusClass("FAIL");
        break;
      default:
        console.log(`stauts ${status} is not supported`);
    }

    const timer = setTimeout(() => {
      setFetchStatus(false);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {status === "SUCSSES" && (
        <ToastContainer>
          <ToastBox>
            <ToastIcon>{status}</ToastIcon>
            <ToastMessege>{text}</ToastMessege>
          </ToastBox>
        </ToastContainer>
      )}
      {status === "FAIL" && (
        <ToastContainer>
          <ToastBox>
            <ToastIcon>{status}</ToastIcon>
            <ToastMessege>{text}</ToastMessege>
          </ToastBox>
        </ToastContainer>
      )}
    </>
  );
};
