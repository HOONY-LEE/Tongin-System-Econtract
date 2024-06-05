import styled from "styled-components";
import OptionPriceInputBox from "./optionPriceInputBox";
import ChargePriceInputBox from "./chargePriceInputBox";
import DropdownComponent from "../common/dropdownComponent";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ListBox = styled.div`
  background-color: #ffffff;
  width: 100%;
  height: 8vw;
  border-radius: 0.6vw;
  outline: 0.2vw solid #d8d8d8;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1vw;
`;

const TitleArea = styled.div`
  display: flex;
  align-items: center;
`;

const TitleArea2 = styled.div`
  display: flex;
  align-items: center;
  width: 25vw;
`;

const Title = styled.div`
  margin-left: 2vw;
  display: flex;
  align-items: center;
  justify-content: start;
  font-size: 2.4vw;
  font-weight: 500;
`;

const Subtile = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 1.6vw;
  margin-top: 1vw;
`;

const PriceInputArea = styled.div`
  display: flex;
  width: 30vw;
`;

const TotalChargeBox = styled.div`
  background-color: #fcfcfc;
  width: 100%;
  height: 12vw;
  border-radius: 0.6vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1vw;
  outline: 0.4vw solid #ff7f3b;
`;
const PriceInput = styled.div`
  display: flex;
  flex-direction: row;
  height: 3vh;
  width: 30vw;
`;
const ChargePriceInput = styled.div`
  display: flex;
  justify-content: center;
  width: 26vw;
  height: 100%;
  background-color: #ececec;
  border-radius: 0.6vw;
  margin-right: 0.8vw;
  /* border: 0.2vw solid #a7a7a7; */
`;
const SubText = styled.p`
  font-size: 1.6vw;
  font-weight: 400;
  height: 3vw;
  display: flex;
  align-items: end;
  margin-top: 1vw;
`;
const InputTotalNumber = styled.p`
  display: flex;
  justify-content: end;
  align-items: center;
  color: black;
  font-size: 2.2vw;
  font-weight: 400;
  width: 80%;
`;

const DropdowArea = styled.div`
  display: flex;
  width: 14vw;
  height: 4vw;
`;

export default function ChargeListComponent(props: any) {
  const { inputChargeList, setInputChargeList, totalCharge } = props;

  const paymentMethodList = [
    { id: 0, status: "온라인 결제" },
    { id: 1, status: "현금 결제" },
    { id: 2, status: "카드 결제" },
  ];

  const setPaymentMethod = (id: number, index: number) => {
    setInputChargeList((prev: any) => {
      const updatedData = [...prev];
      updatedData[index].paymentMethod = id;
      return updatedData;
    });
  };

  return (
    <Wrapper>
      {inputChargeList.map((item: any, index: number) => {
        // 총 비용의 경우 UI
        if (index === 3) {
          return (
            <TotalChargeBox key={index}>
              <TitleArea>
                <Title>{item.chargeName}</Title>
                <Subtile>{"/Total Price"}</Subtile>
              </TitleArea>
              <PriceInput>
                <ChargePriceInput>
                  <InputTotalNumber>
                    {totalCharge.toLocaleString()}
                  </InputTotalNumber>
                </ChargePriceInput>
                <SubText>원</SubText>
              </PriceInput>
            </TotalChargeBox>
          );
        }
        // 계약금과 잔금의 경우 UI
        else if (index === 4 || index === 5) {
          return (
            <ListBox key={index}>
              <TitleArea2>
                <Title>{item.chargeName}</Title>
                <Subtile>/{item.chargeNameEng}</Subtile>
              </TitleArea2>
              <DropdowArea>
                <DropdownComponent
                  itemIndex={index}
                  selected={item.paymentMethod}
                  setSelected={setPaymentMethod}
                  dropdownList={paymentMethodList}
                ></DropdownComponent>
              </DropdowArea>
              <PriceInputArea>
                <ChargePriceInputBox
                  inputValue={item.amount}
                  setInputValue={setInputChargeList}
                  optionType={item.chargeName}
                  id={index}
                ></ChargePriceInputBox>
              </PriceInputArea>
            </ListBox>
          );
          // 나머지 UI
        } else {
          return (
            <ListBox key={index}>
              <TitleArea>
                <Title>{item.chargeName}</Title>
                <Subtile>/{item.chargeNameEng}</Subtile>
              </TitleArea>
              <PriceInputArea>
                <ChargePriceInputBox
                  inputValue={item.amount}
                  setInputValue={setInputChargeList}
                  optionType={item.chargeName}
                  id={index}
                ></ChargePriceInputBox>
              </PriceInputArea>
            </ListBox>
          );
        }
      })}
    </Wrapper>
  );
}
