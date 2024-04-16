import styled from "styled-components";
import CustomButton from "../common/customButton";
import { useEffect, useState } from "react";
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
import ServicePaymentSelectComponent from "./servicePaymentSelectComponent";
import OptionProductComponent from "./optionProductComponent";
import DropdownComponent from "../common/dropdownComponent";

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  border-radius: 0 0 0.7vw 0.7vw;
  background-color: white;
  box-shadow: 0 0.5vh 0.5vh rgba(0, 0, 0, 0.01),
    0 0.5vh 0.5vh rgba(0, 0, 0, 0.003);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 80vw;
  height: 100%;
  margin-top: 1vw;
  margin-bottom: 3vw;
`;

const OptionArea = styled.div`
  margin-top: 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
  outline: 0.1vw dashed red;
`;

const WorkConditionArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 8vh;
`;

const ConditionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 50%;
  height: 100%;
`;

const ConditionTitleBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 2.2vw;
  font-weight: 500;
  width: 100%;
  height: 3vh;
`;

const CondtionContentsBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 5vh;
`;

const ButtonArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 9vw;
`;

export default function NewOptionComponent(props: any) {
  const { optionData, setOptionData } = props;

  console.log("옵션데이터");
  console.log(optionData);

  const transportationMethodList = [
    { status: "선택안함", statusCode: 0 },
    { status: "사다리차", statusCode: 1 },
    { status: "엘리베이터", statusCode: 2 },
    { status: "계단", statusCode: 3 },
    { status: "기타", statusCode: 4 },
  ];

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
  const [paymentMethod, setPaymentMethod] = useState(
    optionData.livingService.paymentMethod
  );

  const [optionServiceList, setOptionServiceList] = useState(
    optionData.optionService
  );

  const [prevTransportaionMethod, setPrevTransportaionMethod] = useState(
    prevOptionData.transportationMethod
  );

  const saveOptionData = () => {
    alert("옵션정보를 성공적으로 저장했습니다.");
  };

  useEffect(() => {
    setOptionData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.beforeWorkCondition = prevOptionData;
      updatedData.afterWorkCondition = afterOptionData;
      updatedData.livingService.movingCleaningService = cleaningService;
      updatedData.livingService.deodorizationService = deodorizationService;
      updatedData.livingService.organizationStorageService = organizingService;
      updatedData.livingService.paymentMethod = paymentMethod;
      updatedData.optionService = optionServiceList;

      return updatedData;
    });
  }, [
    prevOptionData,
    afterOptionData,
    cleaningService,
    deodorizationService,
    organizingService,
    paymentMethod,
    optionServiceList,
  ]);

  return (
    <ContentBox>
      <Wrapper>
        <OptionArea>
          <WorkConditionArea>
            <ConditionBox>
              <ConditionTitleBox>작업조건(전)</ConditionTitleBox>
              <CondtionContentsBox>
                <RoomSizeBox
                  inputValue={prevOptionData.pyeong}
                  setInputValue={setPrevOptionData}
                ></RoomSizeBox>
                <DropdownComponent
                  selected={prevTransportaionMethod}
                  setSelected={setPrevTransportaionMethod}
                  dropdownList={transportationMethodList}
                ></DropdownComponent>
              </CondtionContentsBox>
            </ConditionBox>
            <ConditionBox>
              <ConditionTitleBox>작업조건(전)</ConditionTitleBox>
              <CondtionContentsBox>
                <RoomSizeBox
                  inputValue={prevOptionData.pyeong}
                  setInputValue={setPrevOptionData}
                ></RoomSizeBox>
                <DropdownComponent
                  selected={prevTransportaionMethod}
                  setSelected={setPrevTransportaionMethod}
                  dropdownList={transportationMethodList}
                ></DropdownComponent>
              </CondtionContentsBox>
            </ConditionBox>
          </WorkConditionArea>
        </OptionArea>

        <ButtonArea>
          <CustomButton
            onClick={saveOptionData}
            width={"100%"}
            height={"6vw"}
            text={`옵션정보 저장하기`}
            size={"2vw"}
            radius={"0.6vw"}
          ></CustomButton>
        </ButtonArea>
      </Wrapper>
    </ContentBox>
  );
}
