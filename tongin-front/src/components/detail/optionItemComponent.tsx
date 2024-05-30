import styled from "styled-components";
import { Image } from "../common/image";
import { useEffect, useState } from "react";
import OptionPriceInputBox from "./optionPriceInputBox";
import { InputComponent } from "../common/InputComponent";

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
  width: 130%;
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
const InputCotainer = styled.div`
  width: 13vw;
  display: flex;
  align-items: center;
  justify-content: end;
`;
export default function OptionItemComponent(props: any) {
  const { item, index, isSelected, setIsSelected, setOptionData, optionData } =
    props;
  const [isChecked, setIsChecked] = useState(isSelected);
  const [remark, setRemark] = useState(item.remark);
  const onClickCheck = () => {
    setIsChecked(!isChecked);
  };

  const onInputNameItem = (e: any) => {
    setRemark(e.target.value);
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
  useEffect(() => {
    setOptionData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.remark = remark;
      return updatedData;
    });
  }, [remark]);

  return (
    <Wrapper $isChecked={isChecked}>
      <TitleArea>
        <Image
          onClick={onClickCheck}
          src={`/icon/${isChecked ? "checked" : "unchecked"}.png`}
          alt="checkBox"
          width={"3.4vw"}
          height={"3.4vw"}
        />
        <Title onClick={onClickCheck}>{item.optionName}</Title>
        {item.optionNameEng === "ETC" ? (
          isChecked && (
            <InputCotainer>
              <InputComponent
                value={remark}
                onChange={onInputNameItem}
                fontSize="2vw"
                inputType="text"
                width={"10vw"}
              ></InputComponent>
            </InputCotainer>
          )
        ) : (
          <></>
        )}
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
