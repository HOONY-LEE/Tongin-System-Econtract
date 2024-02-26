import styled from "styled-components";
import MultiSelectComponent from "../common/multiSelectComponent";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const OptionItem = styled.div`
  width: 100%;
  height: 8vw;
  border-radius: 0.4vw;
  display: flex;
  outline: 0.1vw solid black;
  margin-bottom: 1vw;
`;

const NameBox = styled.div`
  width: 30%;
  height: 100%;
  outline: 0.1vw solid red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SelectBox = styled.div`
  width: 40%;
  height: 100%;
  outline: 0.1vw solid red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PriceBox = styled.div`
  width: 30%;
  height: 100%;
  outline: 0.1vw solid red;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function OptionProductComponent(props: any) {
  const { optionServiceList, setOptionServiceList } = props;

  return (
    <Wrapper>
      {optionServiceList.map((item: any) => {
        return (
          <OptionItem key={item.id}>
            <NameBox>{item.optionName}</NameBox>
            <SelectBox>
              {/* <MultiSelectComponent></MultiSelectComponent> */}
            </SelectBox>
            <PriceBox></PriceBox>
          </OptionItem>
        );
      })}
    </Wrapper>
  );
}
