import styled from "styled-components";
import { Image } from "../common/image";
import { useEffect, useState } from "react";
import OptionPriceInputBox from "./optionPriceInputBox";

const Wrapper = styled.div<{ $isChecked: boolean }>`
  margin-top: 0.5vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 4.6vh;
  border-radius: 0.4vw;
  outline: ${(props) =>
    props.$isChecked ? "0.2vw solid #ff7f3b" : "0.1vw solid #777777"};
`;

const TitleArea = styled.div`
  display: flex;
  align-items: center;

  margin-left: 2vw;
  width: 40vw;
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
  justify-content: center;
  width: 30vw;
  height: 3vh;
  margin-right: 1vw;
`;

export default function OptionItemComponent(props: any) {
  const { item, index, isSelected, setIsSelected, setOptionData } = props;
  const [isChecked, setIsChecked] = useState(isSelected);

  const onClickCheck = () => {
    setIsChecked(!isChecked);
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
        <Subtitle>/{item.optionNameEng}</Subtitle>
      </TitleArea>
      <InputArea>
        {isChecked ? (
          <OptionPriceInputBox
            inputValue={item.optionPayment}
            setInputValue={setOptionData}
            index={index}
          ></OptionPriceInputBox>
        ) : (
          <></>
        )}
      </InputArea>
    </Wrapper>
  );
}
