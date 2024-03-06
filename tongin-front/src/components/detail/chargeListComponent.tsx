import styled from "styled-components";
import OptionPriceInputBox from "./optionPriceInputBox";
import ChargePriceInputBox from "./chargePriceInputBox";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ListBox = styled.div`
  background-color: #f4f4f4;
  width: 100%;
  height: 7vw;
  border-radius: 0.6vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2vw;
`;

const TitleArea = styled.div`
  display: flex;
  align-items: center;
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
  background-color: #f4f4f4;
  width: 100%;
  height: 12vw;
  border-radius: 0.6vw;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2vw;
  border: 0.4vw solid #ff7f3b;
`;

export default function ChargeListComponent(props: any) {
  const { inputChargeList, setInputChargeList } = props;
  return (
    <Wrapper>
      {inputChargeList.map((item: any, index: number) => {
        // 총 비용의 경우 UI
        if (index === 3) {
          return (
            <TotalChargeBox key={index}>
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
            </TotalChargeBox>
          );
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
