import styled from "styled-components";
import CommonChargePriceInputBox from "./commonChargePriceInputBox";
import { optionData } from "./../common/sampleData2";

const Wrapper = styled.div`
  margin-top: 0.4vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4vh;
  border-radius: 0.4vw;
  outline: 0.1vw solid black;
`;

const TitleArea = styled.div`
  display: flex;
  align-items: center;
  font-size: 2vw;
  font-weight: 500;
  margin-left: 2vw;
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30vw;
  height: 3vh;
  margin-right: 1vw;
`;

export default function OptionItemComponent(props: any) {
  const { item } = props;

  return (
    <Wrapper>
      <TitleArea>{item.optionName}</TitleArea>
      <InputArea>
        <CommonChargePriceInputBox
          inputValue={0}
          setInputValue={() => {}}
          title={item.optionName}
        ></CommonChargePriceInputBox>
      </InputArea>
    </Wrapper>
  );
}
