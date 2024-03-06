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

export default function OptionComponent(props: any) {
  const { optionData, setOptionData } = props;
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

  const saveOptionData = () => {};

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
    { id: 2, name: "프리미엄", description: "입주클리닝 + 탈취살균" },
    {
      id: 3,
      name: "VIP",
      description: "입주클리닝 + 탈취살균1 + 매트리스클리닝 + 탈취살균2",
    },
  ];
  const deodorizationServiceList = [
    { id: 0, name: "선택안함", description: "" },
    { id: 1, name: "탈취살균", description: "" },
  ];

  const organizingServiceList = [
    { id: 0, name: "선택안함", description: "" },
    { id: 1, name: "정리수납", description: "" },
  ];

  const servicePaymentMethodList = [
    { id: 0, name: "선택안함", description: "" },
    { id: 1, name: "현금", description: "" },
    { id: 2, name: "온라인", description: "" },
    { id: 3, name: "카드", description: "" },
    { id: 4, name: "무빙팀 수금", description: "" },
    { id: 5, name: "리빙팀 수금", description: "" },
  ];

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
          <Subtitle>서비스 결제방법</Subtitle>
          <OptionBox>
            <ServicePaymentSelectComponent
              optionList={servicePaymentMethodList}
              selectedValue={paymentMethod}
              setSelectedValue={setPaymentMethod}
            ></ServicePaymentSelectComponent>
          </OptionBox>
          <Subtitle>옵션 품목</Subtitle>
          <OptionBox>
            <OptionProductComponent
              optionServiceList={optionServiceList}
              setOptionServiceList={setOptionServiceList}
            ></OptionProductComponent>
          </OptionBox>
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
