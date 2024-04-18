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
import OptionBoxComponent from "./optionBoxComponent";
import CleaningOptionBoxComponent from "./cleaningOptionBoxComponent";
import CommonOptionBoxComponent from "./commonOptionBoxComponent";
import OptionListBoxComponent from "./optionListBoxComponent";

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
  font-weight: 700;
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

const CheckedOptionBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2vh;
  width: 100%;
`;

const DropdownBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16vw;
  height: 3vh;
`;

export default function NewOptionComponent(props: any) {
  const { optionData, setOptionData } = props;

  console.log("옵션데이터");
  console.log(optionData);

  const transportationMethodList = [
    { id: 0, status: "선택안함" },
    { id: 1, status: "사다리차" },
    { id: 2, status: "엘리베이터" },
    { id: 3, status: "계단" },
    { id: 4, status: "기타" },
  ];

  const paymentMethodList = [
    { id: 0, status: "선택안함" },
    { id: 1, status: "현금" },
    { id: 2, status: "온라인" },
    { id: 3, status: "카드" },
    { id: 4, status: "무빙팀 수금" },
    { id: 5, status: "리빙팀 수금" },
  ];

  const [prevOptionData, setPrevOptionData] = useState(
    optionData.beforeWorkCondition
  );
  const [afterOptionData, setAfterOptionData] = useState(
    optionData.afterWorkCondition
  );
  const [ladderTruckData, setLadderTruckData] = useState(
    optionData.ladderTruck
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

  const [otherService, setOtherService] = useState(
    optionData.livingService.otherService
  );

  const [optionServiceList, setOptionServiceList] = useState(
    optionData.optionService
  );

  const [prevTransportaionMethod, setPrevTransportaionMethod] = useState(
    prevOptionData.transportationMethod
  );
  const [afterTransportaionMethod, setAfterTransportaionMethod] = useState(
    afterOptionData.transportationMethod
  );

  const setLadderTruckSelected = (flag: boolean) => {
    setLadderTruckData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.selected = flag;
      return updatedData;
    });
  };
  const setCleaningSelected = (flag: boolean) => {
    setCleaningService((prev: any) => {
      const updatedData = { ...prev };
      updatedData.selected = flag;
      return updatedData;
    });
  };
  const setDeodorizationSelected = (flag: boolean) => {
    setDeodorizationService((prev: any) => {
      const updatedData = { ...prev };
      updatedData.selected = flag;
      return updatedData;
    });
  };
  const setOrganizationSelected = (flag: boolean) => {
    setOrganizingService((prev: any) => {
      const updatedData = { ...prev };
      updatedData.selected = flag;
      return updatedData;
    });
  };
  const setOtherServiceSelected = (flag: boolean) => {
    setOtherService((prev: any) => {
      const updatedData = { ...prev };
      updatedData.selected = flag;
      return updatedData;
    });
  };

  const setOptionServiceSelected = (flag: boolean) => {
    setOptionServiceList((prev: any) => {
      const updatedData = { ...prev };
      updatedData.selected = flag;
      return updatedData;
    });
  };

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
      updatedData.livingService.otherService = otherService;
      updatedData.optionService = optionServiceList;
      updatedData.ladderTruck = ladderTruckData;

      return updatedData;
    });
  }, [
    prevOptionData,
    afterOptionData,
    cleaningService,
    deodorizationService,
    organizingService,
    otherService,
    optionServiceList,
    ladderTruckData,
  ]);

  useEffect(() => {
    setPrevOptionData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.transportationMethod = prevTransportaionMethod;
      return updatedData;
    });
    setAfterOptionData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.transportationMethod = afterTransportaionMethod;
      return updatedData;
    });
  }, [prevTransportaionMethod, afterTransportaionMethod]);

  return (
    <ContentBox>
      <Wrapper>
        <OptionArea>
          <WorkConditionArea>
            <ConditionBox>
              <ConditionTitleBox>작업 조건(전)</ConditionTitleBox>
              <CondtionContentsBox>
                <RoomSizeBox
                  inputValue={prevOptionData.pyeong}
                  setInputValue={setPrevOptionData}
                ></RoomSizeBox>
                <DropdownBox>
                  <DropdownComponent
                    selected={prevTransportaionMethod}
                    setSelected={setPrevTransportaionMethod}
                    dropdownList={transportationMethodList}
                  ></DropdownComponent>
                </DropdownBox>
              </CondtionContentsBox>
            </ConditionBox>
            <ConditionBox>
              <ConditionTitleBox>작업 조건(후)</ConditionTitleBox>
              <CondtionContentsBox>
                <RoomSizeBox
                  inputValue={afterOptionData.pyeong}
                  setInputValue={setAfterOptionData}
                ></RoomSizeBox>
                <DropdownBox>
                  <DropdownComponent
                    selected={afterTransportaionMethod}
                    setSelected={setAfterTransportaionMethod}
                    dropdownList={transportationMethodList}
                  ></DropdownComponent>
                </DropdownBox>
              </CondtionContentsBox>
            </ConditionBox>
          </WorkConditionArea>
          <CheckedOptionBox>
            <OptionBoxComponent
              ladderTruckData={ladderTruckData}
              setLadderTruckData={setLadderTruckData}
              title={"사다리차 서비스"}
              isSelected={ladderTruckData.selected}
              setIsSelected={setLadderTruckSelected}
            ></OptionBoxComponent>
          </CheckedOptionBox>
          <CheckedOptionBox>
            <CleaningOptionBoxComponent
              optionData={cleaningService}
              setOptionData={setCleaningService}
              title={"입주청소 서비스"}
              paymentMethodList={paymentMethodList}
              isSelected={cleaningService.selected}
              setIsSelected={setCleaningSelected}
            ></CleaningOptionBoxComponent>
          </CheckedOptionBox>
          <CheckedOptionBox>
            <CommonOptionBoxComponent
              optionData={organizingService}
              setOptionData={setOrganizingService}
              title={"정리수납 서비스"}
              paymentMethodList={paymentMethodList}
              isSelected={organizingService.selected}
              setIsSelected={setOrganizationSelected}
            ></CommonOptionBoxComponent>
          </CheckedOptionBox>
          <CheckedOptionBox>
            <CommonOptionBoxComponent
              optionData={deodorizationService}
              setOptionData={setDeodorizationService}
              title={"탈취살균 서비스"}
              paymentMethodList={paymentMethodList}
              isSelected={deodorizationService.selected}
              setIsSelected={setDeodorizationSelected}
            ></CommonOptionBoxComponent>
          </CheckedOptionBox>
          <CheckedOptionBox>
            <CommonOptionBoxComponent
              optionData={otherService}
              setOptionData={setOtherService}
              title={"기타 서비스"}
              paymentMethodList={paymentMethodList}
              isSelected={otherService.selected}
              setIsSelected={setOtherServiceSelected}
            ></CommonOptionBoxComponent>
          </CheckedOptionBox>
          <CheckedOptionBox>
            <OptionListBoxComponent
              optionData={optionServiceList}
              setOptionData={setOptionServiceList}
              title={"옵션품목(분해/설치)"}
              paymentMethodList={paymentMethodList}
              isSelected={optionServiceList.selected}
              setIsSelected={setOptionServiceSelected}
            ></OptionListBoxComponent>
          </CheckedOptionBox>
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
