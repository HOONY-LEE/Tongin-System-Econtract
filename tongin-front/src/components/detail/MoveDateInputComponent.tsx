import { useState } from "react";
import styled from "styled-components";
import DateModalComponent from "./dateModalComponent";

const Wrapper = styled.div``;

const MoveDateInput = styled.div<{ readOnly: boolean }>`
  width: 31.6vw;
  height: 5vw;
  display: flex;
  font-size: 1.8vw;
  font-weight: 500;
  flex-direction: column;
  align-items: center;
  outline: 0.2vw solid #dbdbdb;
  border-radius: 0.6vw;
  justify-content: center;
  /* outline: 0.2vw solid red; */
  padding-left: 0.8vw;
  margin-bottom: 1vw;
  background-color: ${(props) => (props.readOnly ? "#F4F4F4" : "transparent")};
`;

const MoveDateBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;
const MoveDateTitle = styled.div`
  height: 3vw;
  display: flex;
  font-size: 1.8vw;
  font-weight: 300;
  flex-direction: column;
  align-items: start;
  color: #b2b2b2;
  justify-content: start;
  /* outline: 0.2vw solid red; */
`;

const InputBox = styled.input.attrs({})`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  /* margin-left: 1vw; */
  font-size: 1.8vw;
  font-weight: 500;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  border: none;
  width: 90%;
  height: 100%;
`;

export default function MoveDateInputComponent(props: any) {
  const { title, dateData, setDateData, readOnly } = props;

  const [isDateModalOpen, setIsDateModalOpen] = useState<boolean>(false);
  const formattedDate = /^(\d{4})(\d{2})(\d{2})$/;
  // 날짜 모달 열기 핸들러
  const dateHandleOpenModal = () => {
    setIsDateModalOpen(true);
  };

  // // 날짜 모달 닫기 핸들러
  const dateHandleCloseModal = () => {
    setIsDateModalOpen(false);
  };

  const deleteValue = () => {
    setDateData("");
    dateHandleCloseModal();
  };

  return (
    <Wrapper>
      <MoveDateBox>
        <MoveDateTitle>{title}</MoveDateTitle>
        <MoveDateInput
          readOnly={readOnly}
          onClick={() => {
            dateHandleOpenModal();
          }}
        >
          <InputBox
            placeholder="--"
            value={dateData.replace(formattedDate, "$1-$2-$3")}
          ></InputBox>
        </MoveDateInput>
      </MoveDateBox>
      {isDateModalOpen && !readOnly && (
        <DateModalComponent
          value={dateData}
          setValue={setDateData}
          onClose={dateHandleCloseModal}
          deleteValue={deleteValue}
        />
      )}
    </Wrapper>
  );
}
