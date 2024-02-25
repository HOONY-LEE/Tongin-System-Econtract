import styled from "styled-components";
import CustomButton from "../common/customButton";
import { useEffect, useState } from "react";
import MultiSelectComponent from "../common/multiSelectComponent";
import RooomsizeInputComoponent from "../common/roomsizeInputComponent";
import CalculatorComponent from "../common/roomSizeCalculatorComponent.tsx";
import SelectComponent from "../common/selectComponent";
import RoomSizeCalculatorComponent from "../common/roomSizeCalculatorComponent.tsx";
import RoomSizeBox from "./roomSizeBox";
import CleaningSelectComponent from "./cleaningSelectComponent";
import QuantityInputComponent from "../common/quantityInputComponent";
import ServiceSelectComponent from "./serviceSelectComponent";
import DateModalComponent from "./dateModalComponent";
import { format } from "date-fns";

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
  margin-top: 1vw;
  margin-bottom: 3vw;
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
`;

const Subtitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 4vw;
  font-size: 2vw;
  font-weight: 400;
  margin-top: 2vw;
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
const MoveDateInput = styled.div`
  width: 100%;
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
`;

const InputBox = styled.input.attrs({})<{}>`
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

export default function OptionComponent(props: any) {
  const { optionData, setOptionData } = props;
  const [dateType, setDateType] = useState();
  const [isDateModalOpen, setIsDateModalOpen] = useState<boolean>(false);
  const [prevOptionData, setPrevOptionData] = useState(
    optionData.beforeWorkCondition
  );
  const [afterOptionData, setAfterOptionData] = useState(
    optionData.afterWorkCondition
  );
  const [cleaningService, setCleaningService] = useState(
    optionData.livingService.movingCleaningService
  );
  const [deodorizationService, setDeodorizationService] = useState(
    optionData.livingService.deodorizationService
  );
  const [organizingService, setOrganizingService] = useState(
    optionData.livingService.organizationStorageService
  );

  const transportMethodList = [
    { id: 0, name: "선택안함", description: "" },
    { id: 1, name: "사다리", description: "" },
    { id: 2, name: "엘리베이터", description: "" },
    { id: 3, name: "계단", description: "" },
    { id: 4, name: "기타", description: "" },
  ];

  const cleaningServiceList = [
    { id: 0, name: "선택안함", description: "선택안함" },
    { id: 1, name: "스탠다드", description: "입주클리닝" },
    { id: 2, name: "프리미엄", description: "입주클리닝+탈취살균" },
    {
      id: 3,
      name: "VIP",
      description: "입주클리닝+탈취살균1+매트리스클리닝+탈취살균2",
    },
  ];
  const deodorizationServiceList = [
    { id: 0, name: "선택안함", description: "" },
    { id: 1, name: "탈취살균서비스", description: "" },
  ];

  const organizingServiceList = [
    { id: 0, name: "선택안함", description: "" },
    { id: 1, name: "정리수납서비스", description: "" },
  ];

  console.log("optionData>>>");
  console.log(optionData);

  ////////////////////날짜 모달 시작////////////////////
  // 날짜 모달 열기 핸들러
  const dateHandleOpenModal = (type: any) => {
    setIsDateModalOpen(true);
    setDateType(type);
  };

  // // 날짜 모달 닫기 핸들러
  const dateHandleCloseModal = () => {
    setIsDateModalOpen(false);
  };

  const deteValueDelete = () => {
    if (dateType === "cleaning") {
      cleaningService.serviceRequestDate = "";
    } else if (dateType === "deodorazation") {
      deodorizationService.serviceRequestDate = "";
    } else if (dateType === "organizing") {
      organizingService.serviceRequestDate = "";
    } else {
      return "";
    }

    dateHandleCloseModal();
  };

  const dateValueInput = (data: any) => {
    console.log("dateValueInput", data);
    const myData = new Date(data);
    // setDateData(data);
    console.log(format(myData, "y-MM-dd"));
    if (!Number.isNaN(new Date(myData).getTime())) {
      if (dateType === "cleaning") {
        cleaningService.serviceRequestDate = format(myData, "y-MM-dd");
      } else if (dateType === "deodorazation") {
        deodorizationService.serviceRequestDate = format(myData, "y-MM-dd");
      } else if (dateType === "organizing") {
        organizingService.serviceRequestDate = format(myData, "y-MM-dd");
      } else {
        return "";
      }
    } else {
      return "";
    }
  };

  const formattedDate = /^(\d{4})(\d{2})(\d{2})$/;

  useEffect(() => {
    setOptionData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.beforeWorkCondition = prevOptionData;
      updatedData.afterWorkCondition = afterOptionData;
      updatedData.livingService.movingCleaningService = cleaningService;

      return updatedData;
    });
  }, [prevOptionData, afterOptionData, cleaningService]);

  return (
    <ContentBox>
      <Wrapper>
        <OptionArea>
          <Subtitle>작업 조건(전)</Subtitle>
          <OptionBox>
            <RoomSizeBox
              inputValue={prevOptionData.pyeong}
              setInputValue={setPrevOptionData}
            ></RoomSizeBox>
            <SelectComponent
              optionList={transportMethodList}
              selectedValue={prevOptionData.transportationMethod}
              setSelectedValue={setPrevOptionData}
            ></SelectComponent>
          </OptionBox>
          <Subtitle>작업 조건(후)</Subtitle>
          <OptionBox>
            <RoomSizeBox
              inputValue={afterOptionData.pyeong}
              setInputValue={setAfterOptionData}
            ></RoomSizeBox>
            <SelectComponent
              optionList={transportMethodList}
              selectedValue={afterOptionData.transportationMethod}
              setSelectedValue={setAfterOptionData}
            ></SelectComponent>
          </OptionBox>
          <Subtitle>입주청소서비스</Subtitle>
          <OptionBox>
            <CleaningSelectComponent
              optionList={cleaningServiceList}
              selectedValue={cleaningService}
              setSelectedValue={setCleaningService}
            ></CleaningSelectComponent>
          </OptionBox>
          <MoveDateBox>
            <MoveDateTitle>계약일</MoveDateTitle>
            <MoveDateInput
              onClick={() => {
                dateHandleOpenModal("cleaning");
              }}
            >
              <InputBox
                placeholder="--"
                readOnly
                value={cleaningService.serviceRequestDate.replace(
                  formattedDate,
                  "$1-$2-$3"
                )}
              ></InputBox>
            </MoveDateInput>
          </MoveDateBox>
          <Subtitle>탈취살균서비스</Subtitle>
          <OptionBox>
            <ServiceSelectComponent
              optionList={deodorizationServiceList}
              selectedValue={deodorizationService}
              setSelectedValue={setDeodorizationService}
            ></ServiceSelectComponent>
          </OptionBox>
          <Subtitle>정리수납서비스</Subtitle>
          <OptionBox>
            <ServiceSelectComponent
              optionList={organizingServiceList}
              selectedValue={organizingService}
              setSelectedValue={setOrganizingService}
            ></ServiceSelectComponent>
          </OptionBox>
        </OptionArea>

        <ButtonArea>
          <CustomButton
            onClick={console.log("save")}
            width={"100%"}
            height={"6vw"}
            text={`옵션정보 저장하기`}
            size={"2vw"}
            radius={"0.6vw"}
          ></CustomButton>
        </ButtonArea>
        {isDateModalOpen && (
          <DateModalComponent
            dateValueInput={dateValueInput}
            onClose={dateHandleCloseModal}
            deteValueDelete={deteValueDelete}
          />
        )}
      </Wrapper>
    </ContentBox>
  );
}
