import styled from "styled-components";
import { Image } from "../common/image";
import { useEffect, useState } from "react";
import CommonChargePriceInputBox from "./commonChargePriceInputBox";
import DropdownComponent from "../common/dropdownComponent";
import { format } from "date-fns";
import DateModalComponent from "./dateModalComponent";
import BooleanSelectComponent from "./booleanSelectComponent";

const Wrapper = styled.div``;

const CheckedOptionTitle = styled.div`
  display: flex;
  align-items: center;
  width: 36vw;
  height: 5vw;
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
  height: 6vw;
`;

const PriceInputArea = styled.div`
  display: flex;
  width: 25vw;
`;

const CategoryBox = styled.div`
  width: 20vw;
  height: 5vw;
`;

const DateBox = styled.div`
  width: 12vw;
  height: 5vw;
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

const AddressArea = styled.div`
  width: 8.4vw;
  height: 5vw;
  display: flex;
  justify-content: space-between;
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

const CategoryInputBox = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 0.4vw;
  outline: 0.2vw solid #aaaaaa;
  border: none;
  border-radius: 0.4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2vw;
  padding-left: 2vw;
`;

const CategoryReadOnlyBox = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 0.4vw;
  outline: 0.2vw solid #aaaaaa;
  background-color: #e9e9e9;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2vw;
`;

const PayMethodBox = styled.div`
  width: 12vw;
  height: 5vw;
`;

export default function CommonOptionBoxComponent(props: any) {
  const {
    optionData,
    setOptionData,
    title,
    paymentMethodList,
    isSelected,
    setIsSelected,
    isAfterData,
  } = props;
  const [isChecked, setIsChecked] = useState(isSelected);
  const [isAfter, setIsAfter] = useState<boolean>(isAfterData);
  const [isDateModalOpen, setIsDateModalOpen] = useState<boolean>(false);
  const [description, setDescription] = useState<string>(
    optionData.description
  );
  const formattedDate = /^(\d{4})(\d{2})(\d{2})$/;
  const onClickCheck = () => {
    setIsChecked(!isChecked);
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

  const setDateValue = (newValue: string) => {
    setOptionData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.serviceRequestDate = newValue;
      return updatedData;
    });
  };

  // 인풋이 있는 경우 인풋 변경 함수(기타서비스)
  const onChangeInput = (e: any) => {
    setDescription(e.target.value);
  };

  // 날짜 모달 열기 핸들러
  const dateHandleOpenModal = () => {
    setIsDateModalOpen(true);
  };

  // // 날짜 모달 닫기 핸들러
  const dateHandleCloseModal = () => {
    setIsDateModalOpen(false);
  };

  const deleteValue = () => {
    setOptionData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.serviceRequestDate = "";
      return updatedData;
    });
    dateHandleCloseModal();
  };

  useEffect(() => {
    if (!isChecked) {
      setOptionData((prev: any) => {
        const updatedData = { ...prev };
        updatedData.serviceRequestDate = "";
        updatedData.servicePayment = 0;
        updatedData.paymentMethod = 0;
        if (updatedData.id === 7) {
          updatedData.description = "";
        }
        return updatedData;
      });
    }

    setOptionData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.selected = isChecked;
      return updatedData;
    });
  }, [isChecked]);

  useEffect(() => {
    setOptionData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.isAfter = isAfter;
      return updatedData;
    });
  }, [isAfter]);

  useEffect(() => {
    setOptionData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.description = description;
      return updatedData;
    });
  }, [description]);

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
            {optionData.description !== undefined ? (
              <CategoryInputBox
                placeholder={"서비스명 입력"}
                value={description}
                onChange={(e: any) => onChangeInput(e)}
              ></CategoryInputBox>
            ) : (
              <CategoryReadOnlyBox>일반</CategoryReadOnlyBox>
            )}
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
          {optionData.serviceName === "무브제 디렉터 상담" ? null : (
            <AddressArea>
              <BooleanSelectComponent
                isAfter={isAfter}
                setIsAfter={setIsAfter}
              ></BooleanSelectComponent>
            </AddressArea>
          )}
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
          value={optionData.serviceRequestDate}
          setValue={setDateValue}
          onClose={dateHandleCloseModal}
          deleteValue={deleteValue}
        />
      )}
    </Wrapper>
  );
}
