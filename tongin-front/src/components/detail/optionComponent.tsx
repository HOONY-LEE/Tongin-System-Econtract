import styled from "styled-components";
import CustomButton from "../common/customButton";
import { useState } from "react";
import MultiSelectComponent from "../common/multiSelectComponent";

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
export default function OptionComponent(props: any) {
  const [editMode, setEditMode] = useState(false);

  const [optionList, setOptionList] = useState([
    { id: 1, name: "사다리", description: "", isSelected: false },
    { id: 2, name: "엘리베이터", description: "", isSelected: false },
    { id: 3, name: "계단", description: "", isSelected: false },
    { id: 4, name: "기타", description: "", isSelected: false },
  ]);

  return (
    <ContentBox>
      <Wrapper>
        <OptionArea>
          <Subtitle>작업 조건(전)</Subtitle>
          <MultiSelectComponent
            optionList={optionList}
            setOptionList={setOptionList}
          ></MultiSelectComponent>
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
              text={`옵션정보 수정하기`}
              size={"2vw"}
              radius={"0.6vw"}
            ></CustomButton>
          </ButtonArea>
        )}
      </Wrapper>
    </ContentBox>
  );
}
