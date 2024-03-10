import styled from "styled-components";
import DaumPostcode from "react-daum-postcode";
import CloseIcon from "../icon/closeIcon";
const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2); /* 배경을 약간 어둡게 만듭니다. */
  z-index: 9998; /* 모달보다 아래에 위치하도록 설정합니다. */
`;

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 52vw;
  height: 66vw;
  background-color: white;
  border-radius: 0.8vw;
`;
const CloseBox = styled.div`
  margin: 1vw 2vw 1vw auto;
`;
const TopArea = styled.div``;

const PostModalComponent = (props: any) => {
  const { postValueInput, onClose, style } = props;

  const handleComplete = (data: any) => {
    console.log(data);
    postValueInput(data);
  };
  const theme = {
    postcodeTextColor: "#ff7f3b",
    // emphTextColor: "#ff7f3b",
    outlineColor: "#ff7f3b",
  };
  const postCodeStyle = {
    width: "50vw",
    height: "60vw",
  };

  return (
    <>
      <Backdrop /> {/* 모달이 열릴 때 배경을 어둡게 하는 역할을 합니다. */}.
      <Wrapper>
        <CloseBox>
          <CloseIcon onClick={onClose} height={"2.3vw"} fill={"#AEAEAE"} />
        </CloseBox>
        <DaumPostcode
          style={postCodeStyle}
          theme={theme}
          onClose={onClose}
          onComplete={handleComplete}
        ></DaumPostcode>
      </Wrapper>
    </>
  );
};

export default PostModalComponent;
