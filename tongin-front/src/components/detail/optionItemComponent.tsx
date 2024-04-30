import styled from "styled-components";
import { Image } from "../common/image";
import { useEffect, useState } from "react";
import OptionPriceInputBox from "./optionPriceInputBox";

const Wrapper = styled.div<{ $isChecked: boolean }>`
  margin-top: 1vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 7vw;
  border-radius: 0.4vw;
  outline: ${(props) =>
    props.$isChecked ? "0.3vw solid #ff7f3b" : "0.1vw solid #777777"};
`;

const TitleArea = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2vw;
  width: 20vw;
  height: 100%;
`;

const Title = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  margin-left: 2vw;
  font-size: 2.2vw;
  font-weight: 600;
`;

const Subtitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: end;
  margin-left: 1vw;
  font-size: 1.8vw;
  font-weight: 300;
  height: 2vh;
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 52vw;
  height: 5vw;
  margin-right: 1vw;
`;

const BorderLeftLine = styled.div`
  border-left: 0.3vw solid #d4d4d4;
  height: 3.2vw;
`;

const SelectArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 19vw;
  height: 5vw;
`;

const SelectItem = styled.div<{ $isSelected?: boolean }>`
  width: 9vw;
  height: 4.6vw;
  /* background-color: #b9c1c9; */
  background-color: ${(props) => (props.$isSelected ? "#ff7f3b" : "#b9c1c9")};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.4vw;
  color: white;
  font-size: 2vw;
  font-weight: 300;
  &:hover {
    cursor: pointer;
  }
`;

export default function OptionItemComponent(props: any) {
  const { item, index, isSelected, setIsSelected, setOptionData, optionData } =
    props;
  const [isChecked, setIsChecked] = useState(isSelected);

  const onClickCheck = () => {
    setIsChecked(!isChecked);
  };

  const onClickSelectItem = (type: number) => {
    if (type === 0) {
      setOptionData((prev: any) => {
        const updatedData = { ...prev };
        updatedData.ServiceList[index].decomposition =
          !updatedData.ServiceList[index].decomposition;
        return updatedData;
      });
    } else if (type === 1) {
      setOptionData((prev: any) => {
        const updatedData = { ...prev };
        updatedData.ServiceList[index].installation =
          !updatedData.ServiceList[index].installation;
        return updatedData;
      });
    }
  };

  useEffect(() => {
    setIsSelected(index, isChecked);
  }, [isChecked]);

  return (
    <Wrapper $isChecked={isChecked}>
      <TitleArea onClick={onClickCheck}>
        <Image
          src={`/icon/${isChecked ? "checked" : "unchecked"}.png`}
          alt="checkBox"
          width={"3.4vw"}
          height={"3.4vw"}
        />
        <Title>{item.optionName}</Title>
        {/* <Subtitle>/{item.optionNameEng}</Subtitle> */}
      </TitleArea>
      {isChecked ? (
        <InputArea>
          <BorderLeftLine></BorderLeftLine>
          <SelectArea>
            <SelectItem
              $isSelected={item.decomposition}
              onClick={() => onClickSelectItem(0)}
            >
              분해
            </SelectItem>
            <SelectItem
              $isSelected={item.installation}
              onClick={() => onClickSelectItem(1)}
            >
              설치
            </SelectItem>
          </SelectArea>
          <OptionPriceInputBox
            inputValue={item.optionPayment}
            setInputValue={setOptionData}
            index={index}
          ></OptionPriceInputBox>
        </InputArea>
      ) : (
        <></>
      )}
    </Wrapper>
  );
}
