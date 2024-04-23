import styled from "styled-components";
import { Image } from "../common/image";
import { useEffect, useState } from "react";
import CommonChargePriceInputBox from "./commonChargePriceInputBox";
import DropdownComponent from "../common/dropdownComponent";
import { format } from "date-fns";
import DateModalComponent from "./dateModalComponent";

const Wrapper = styled.div``;

const CheckedOptionTitle = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 3vh;
`;

const Title = styled.div`
  margin-left: 1vw;
  display: flex;
  align-items: center;
  font-size: 2.4vw;
  font-weight: 700;
`;

const ActivatedArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4vh;
`;

const PriceInputArea = styled.div`
  display: flex;
  width: 30vw;
`;

const CategoryBox = styled.div`
  width: 16vw;
  height: 3vh;
`;

const DateBox = styled.div`
  width: 14vw;
  height: 3vh;
  display: flex;
  justify-content: center;
  align-items: center;
  &&:hover {
    cursor: pointer;
  }
`;
const MoveDateInput = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  font-size: 1.8vw;
  font-weight: 500;
  flex-direction: column;
  align-items: center;
  border: 0.2vw solid #aaaaaa;
  border-radius: 0.4vw;
  justify-content: center;
  &&:hover {
    cursor: pointer;
  }
`;
const InputBox = styled.input.attrs({})<{}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  text-align: center;
  outline: none;
  /* margin-left: 1vw; */
  font-size: 1.8vw;
  font-weight: 500;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  border: none;
  width: 90%;
  height: 100%;
`;

const PayMethodBox = styled.div`
  width: 14vw;
  height: 3vh;
`;

export default function CleaningOptionBoxComponent(props: any) {
  const {
    optionData,
    setOptionData,
    title,
    paymentMethodList,
    isSelected,
    setIsSelected,
  } = props;
  const [isChecked, setIsChecked] = useState(isSelected);
  const [isDateModalOpen, setIsDateModalOpen] = useState<boolean>(false);
  const formattedDate = /^(\d{4})(\d{2})(\d{2})$/;
  // const dropdownList = [
  //   { id: 0, status: "일반" },
  //   { id: 1, status: "VIP" },
  // ];
  const dropdownList = [
    {
      id: optionData.serviceList[0].serviceType,
      status: optionData.serviceList[0].serviceTypeName,
    },
    {
      id: optionData.serviceList[1].serviceType,
      status: optionData.serviceList[1].serviceTypeName,
    },
  ];

  const onClickCheck = () => {
    setIsChecked(!isChecked);
  };

  const setSelected = (id: number) => {
    setOptionData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.selectedType = id;
      return updatedData;
    });
  };

  const setPaymentMethod = (id: number) => {
    setOptionData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.paymentMethod = id;
      return updatedData;
    });
  };

  const setInputValue = (newValue: number) => {
    setOptionData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.servicePayment = newValue;
      return updatedData;
    });
  };

  // 날짜 모달 열기 핸들러
  const dateHandleOpenModal = () => {
    setIsDateModalOpen(true);
  };

  // // 날짜 모달 닫기 핸들러
  const dateHandleCloseModal = () => {
    setIsDateModalOpen(false);
  };

  const dateValueInput = (data: any) => {
    console.log("dateValueInput", data);
    const myData = new Date(data);
    // setDateData(data);
    console.log(format(myData, "y-MM-dd"));
    if (!Number.isNaN(new Date(myData).getTime())) {
      optionData.serviceRequestDate = format(myData, "y-MM-dd");
    } else {
      return "";
    }
  };

  const deteValueDelete = () => {
    optionData.serviceRequestDate = "";
    dateHandleCloseModal();
  };

  useEffect(() => {
    setOptionData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.selected = isChecked;
      return updatedData;
    });
    setIsSelected(isChecked);
  }, [isChecked]);

  return (
    <Wrapper>
      <CheckedOptionTitle onClick={onClickCheck}>
        <Image
          src={`/icon/${isChecked ? "checked" : "unchecked"}.png`}
          alt="체크박스"
          width={"3.4vw"}
          height={"3.4vw"}
        />
        <Title>{title}</Title>
      </CheckedOptionTitle>
      {isChecked && (
        <ActivatedArea>
          <CategoryBox>
            <DropdownComponent
              selected={optionData.selectedType}
              setSelected={setSelected}
              dropdownList={dropdownList}
            ></DropdownComponent>
          </CategoryBox>
          <DateBox>
            <MoveDateInput
              onClick={() => {
                dateHandleOpenModal();
              }}
            >
              <InputBox
                placeholder="--"
                readOnly
                value={optionData.serviceRequestDate.replace(
                  formattedDate,
                  "$1-$2-$3"
                )}
              ></InputBox>
            </MoveDateInput>
          </DateBox>
          <PayMethodBox>
            <DropdownComponent
              selected={optionData.paymentMethod}
              setSelected={setPaymentMethod}
              dropdownList={paymentMethodList}
            ></DropdownComponent>
          </PayMethodBox>
          <PriceInputArea>
            <CommonChargePriceInputBox
              inputValue={optionData.servicePayment}
              setInputValue={setInputValue}
              title={title}
            ></CommonChargePriceInputBox>
          </PriceInputArea>
        </ActivatedArea>
      )}
      {isDateModalOpen && (
        <DateModalComponent
          dateValueInput={dateValueInput}
          onClose={dateHandleCloseModal}
          deteValueDelete={deteValueDelete}
        />
      )}
    </Wrapper>
  );
}
