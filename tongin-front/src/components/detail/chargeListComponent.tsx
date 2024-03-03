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

export default function ChargeListComponent(props: any) {
  const { optionData, inputChargeList, setInputChargeList } = props;
  const ChargeMenuList = [
    { id: 0, title: "이사 비용", subtitle: "Moving Charge" },
    { id: 1, title: "보관 비용", subtitle: "Storage Charge" },
    { id: 2, title: "부가세", subtitle: "VAT" },
  ];

  return (
    <Wrapper>
      {inputChargeList.map((item: any) => {
        return (
          <ListBox key={item.id}>
            <TitleArea>
              <Title>{item.chargeName}</Title>
              <Subtile>/{item.chargeNameEng}</Subtile>
            </TitleArea>
            <PriceInputArea>
              <ChargePriceInputBox
                inputValue={item.amount}
                setInputValue={setInputChargeList}
                optionType={item.chargeName}
              ></ChargePriceInputBox>
            </PriceInputArea>
          </ListBox>
        );
      })}
    </Wrapper>
  );
}
