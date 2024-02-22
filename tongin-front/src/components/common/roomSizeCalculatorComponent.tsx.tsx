import styled, { css, keyframes } from "styled-components";
import { useEffect, useState } from "react";
import FlashNumBoxComponent from "../detail/flashNumBoxComponent";
import FlashDeleteBoxComponent from "../detail/flashDeleteBoxComponent";

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
  height: 68vw;
  background-color: #f2f2f2;
  border-radius: 0.8vw;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 0.4vw solid #ff7f3b; */
`;

const Wrapper = styled.div`
  width: 86%;
  height: 92%;
  display: flex;
  flex-direction: column;
  cursor: auto; // 커서를 기본 상태로 설정합니다.
  /* outline: 0.1vw solid green; */
`;

const TopArea = styled.div`
  /* outline: 0.1vw solid red; */
  display: flex;
  justify-content: space-between;
  align-items: start;
  width: 100%;
  height: 5vw;
`;
const ShowArea = styled.div`
  border: 0.3vw solid #ff7f3b;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 7vw;
  border-radius: 0.6vw;
`;

const ErrorArea = styled.div`
  margin-top: 1vw;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3vw;
  color: red;
`;

const ButtonArea = styled.div`
  margin-top: 1.4vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40vw;
`;
const BottomArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 7vw;
  margin-top: 1.4vw;
`;

const CancelButton = styled.div`
  border: 0.2vw solid #b8b8b8;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 21vw;
  height: 100%;
  border-radius: 0.6vw;
  color: #404040;
  font-size: 3vw;
`;

const OkButton = styled.div`
  /* outline: 0.1vw solid black; */
  background-color: #0d99ff;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 21vw;
  height: 100%;
  border-radius: 0.6vw;
  font-size: 3vw;
`;

const Title = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4vw;
  font-size: 2.6vw;
  font-weight: 400;
`;

const CloseIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5vw;
  height: 4vw;
  font-size: 2vw;
`;

const NumberInput = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 84%;
  height: 5vw;
  font-size: 4.4vw;
`;

const UnitText = styled.div`
  display: flex;
  justify-content: end;
  align-items: end;
  width: 10%;
  height: 5vw;
  margin-left: 0.4vw;
  padding-bottom: 0.6vw;
  font-size: 2vw;
`;

const ColBox = styled.div`
  width: 100%;
  height: 9.5vw;
  display: flex;
  justify-content: space-between;
`;

const RoomSizeCalculatorComponent = (props: any) => {
  const {
    onClose,
    roomSize,
    setRoomSize,
    title,
    unit,
    setCurrentProductList,
    roomId,
    articleId,
  } = props;
  const [tmpValue, setTmpValue] = useState<string>(roomSize.toString());
  const [validate, setValidate] = useState(true);
  const [error, setError] = useState("");

  const onClickOkHandle = () => {
    if (validate) {
      let result = 0;
      if (tmpValue.slice(-1) === ".") {
        result = Number(tmpValue.slice(0, -1));
        setRoomSize(result);
        // setCurrentProductList((prev: any) => {
        //   const updatedList = [...prev];
        //   updatedList[roomId].articleData[articleId].article.cbm = result;
        //   return updatedList;
        // });
      } else {
        result = Number(tmpValue);
        setRoomSize(result);
        console.log(result);
        // setCurrentProductList((prev: any) => {
        //   const updatedList = [...prev];
        //   updatedList[roomId].articleData[articleId].article.cbm = result;
        //   return updatedList;
        // });
      }
      onClose();
    }
  };

  useEffect(() => {
    if (Number(tmpValue) >= 100) {
      setError("[ CBM은 100 미만으로만 입력가능합니다. ]");
      setValidate(false);
    } else if (Number(tmpValue) % 0.5 !== 0) {
      setError("[ CBM은 0.5 단위로만 입력가능합니다. ]");
      setValidate(false);
    } else {
      setValidate(true);
    }
  }, [tmpValue]);

  return (
    <>
      <Backdrop onClick={onClose} />{" "}
      <CalculatorComponentWrapper
        onClick={(event) => {
          event?.preventDefault();
        }}
      >
        <Wrapper>
          <TopArea>
            <Title>{title}</Title>
          </TopArea>
          <ShowArea>
            <NumberInput>{tmpValue}</NumberInput>
            <UnitText>{unit}</UnitText>
          </ShowArea>
          {!validate && <ErrorArea>{error}</ErrorArea>}
          <ButtonArea>
            <ColBox>
              <FlashNumBoxComponent
                number={"7"}
                tmpValue={tmpValue}
                setTmpValue={setTmpValue}
              ></FlashNumBoxComponent>
              <FlashNumBoxComponent
                number={"8"}
                tmpValue={tmpValue}
                setTmpValue={setTmpValue}
              ></FlashNumBoxComponent>
              <FlashNumBoxComponent
                number={"9"}
                tmpValue={tmpValue}
                setTmpValue={setTmpValue}
              ></FlashNumBoxComponent>
            </ColBox>
            <ColBox>
              <FlashNumBoxComponent
                number={"4"}
                tmpValue={tmpValue}
                setTmpValue={setTmpValue}
              ></FlashNumBoxComponent>
              <FlashNumBoxComponent
                number={"5"}
                tmpValue={tmpValue}
                setTmpValue={setTmpValue}
              ></FlashNumBoxComponent>
              <FlashNumBoxComponent
                number={"6"}
                tmpValue={tmpValue}
                setTmpValue={setTmpValue}
              ></FlashNumBoxComponent>
            </ColBox>
            <ColBox>
              <FlashNumBoxComponent
                number={"1"}
                tmpValue={tmpValue}
                setTmpValue={setTmpValue}
              ></FlashNumBoxComponent>
              <FlashNumBoxComponent
                number={"2"}
                tmpValue={tmpValue}
                setTmpValue={setTmpValue}
              ></FlashNumBoxComponent>
              <FlashNumBoxComponent
                number={"3"}
                tmpValue={tmpValue}
                setTmpValue={setTmpValue}
              ></FlashNumBoxComponent>
            </ColBox>
            <ColBox>
              <FlashDeleteBoxComponent
                tmpValue={tmpValue}
                setTmpValue={setTmpValue}
              ></FlashDeleteBoxComponent>
              <FlashNumBoxComponent
                number={"0"}
                tmpValue={tmpValue}
                setTmpValue={setTmpValue}
              ></FlashNumBoxComponent>
              <FlashNumBoxComponent
                number={"."}
                tmpValue={tmpValue}
                setTmpValue={setTmpValue}
              ></FlashNumBoxComponent>
            </ColBox>
          </ButtonArea>
          <BottomArea>
            <CancelButton onClick={onClose}>취소</CancelButton>
            <OkButton onClick={onClickOkHandle}>확인</OkButton>
          </BottomArea>
        </Wrapper>
      </CalculatorComponentWrapper>
    </>
  );
};

export default RoomSizeCalculatorComponent;
