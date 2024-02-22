import styled from "styled-components";
import CustomButton from "../common/customButton";
import { useState } from "react";
import MultiSelectComponent from "../common/multiSelectComponent";
import RooomsizeInputComoponent from "../common/roomsizeInputComponent";
import CalculatorComponent from "../common/calculatorComponent";
import SelectComponent from "../common/selectComponent";

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 0 0 0.7vw 0.7vw;
  background-color: white;
  /* outline: 0.2vw solid gray; */
  /* margin: 0.7vh 0vh 0.7vh 0vh; */
  box-shadow: 0 0.5vh 0.5vh rgba(0, 0, 0, 0.01),
    0 0.5vh 0.5vh rgba(0, 0, 0, 0.003);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80vw;
  height: 110vw;
  margin-top: 5vw;
  margin-bottom: 5vw;
`;

const OptionArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
`;

const OptionBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
`;

const ButtonArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 9vw;
  outline: 0.1vw dashed green;
`;

const Subtitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 4vw;
  font-size: 2vw;
  font-weight: 400;
`;

const InputArea = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 14vw;
  height: 5vw;
  margin-right: 3vw;
`;

const InputCBMBox = styled.div`
  display: flex;
  justify-content: center;
  width: 10vw;
  height: 100%;
  background-color: #f4f4f4;
  border-radius: 0.6vw;
  margin-right: 0.8vw;
  &:hover {
    cursor: pointer;
  }
`;

const InputCBMNumber = styled.p`
  display: flex;
  justify-content: end;
  align-items: center;
  color: black;
  font-size: 2.2vw;
  font-weight: 400;
  width: 70%;
`;

const SubText = styled.p`
  font-size: 1.6vw;
  font-weight: 400;
  height: 3vw;
  display: flex;
  align-items: end;
`;

export default function OptionComponent(props: any) {
  const [editMode, setEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<number>(0);

  const [optionList, setOptionList] = useState([
    { id: 1, name: "사다리", description: "", isSelected: false },
    { id: 2, name: "엘리베이터", description: "", isSelected: false },
    { id: 3, name: "계단", description: "", isSelected: false },
    { id: 4, name: "기타", description: "", isSelected: false },
  ]);

  // 모달 열기 핸들러
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // 모달 닫기 핸들러
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ContentBox>
      <Wrapper>
        <OptionArea>
          <Subtitle>작업 조건(전)</Subtitle>
          <OptionBox>
            <InputArea>
              <InputCBMBox
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                <InputCBMNumber>{0}</InputCBMNumber>
              </InputCBMBox>
              <SubText>평</SubText>
            </InputArea>
            <MultiSelectComponent
              optionList={optionList}
              setOptionList={setOptionList}
            ></MultiSelectComponent>
          </OptionBox>
        </OptionArea>
        <OptionArea>
          <Subtitle>작업 조건(후)</Subtitle>
          <OptionBox>
            <InputArea>
              <InputCBMBox
                onClick={() => {
                  setIsModalOpen(true);
                }}
              >
                <InputCBMNumber>{0}</InputCBMNumber>
              </InputCBMBox>
              <SubText>평</SubText>
            </InputArea>
            <SelectComponent
              optionList={optionList}
              setOptionList={setOptionList}
            ></SelectComponent>
          </OptionBox>
        </OptionArea>
        {editMode ? (
          <ButtonArea>
            <CustomButton
              onClick={() => setEditMode(false)}
              width={"48%"}
              height={"6vw"}
              text={`닫기`}
              size={"2vw"}
              radius={"0.6vw"}
              $bgColor={"#ffffff"}
              $outline={"0.15vw solid #dcdcdc"}
              color={"black"}
            ></CustomButton>
            <CustomButton
              width={"48%"}
              height={"6vw"}
              text={`저장`}
              size={"2vw"}
              radius={"0.6vw"}
            ></CustomButton>
          </ButtonArea>
        ) : (
          <ButtonArea>
            <CustomButton
              onClick={() => setEditMode(true)}
              width={"100%"}
              height={"6vw"}
              text={`옵션정보 저장하기`}
              size={"2vw"}
              radius={"0.6vw"}
            ></CustomButton>
          </ButtonArea>
        )}
      </Wrapper>
      {isModalOpen && (
        <CalculatorComponent
          title={`[평수] 입력창`}
          unit={"평"}
          onClose={handleCloseModal}
          inputValue={1}
          setInputValue={setInputValue}
          // setCurrentProductList={setCurrentProductList}
        />
      )}
    </ContentBox>
  );
}
