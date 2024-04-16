import styled from "styled-components";
import { Image } from "../common/image";
import { useState } from "react";

const Wrapper = styled.div``;

const CheckedOptionTitle = styled.div`
  display: flex;
  width: 100%;
`;

const Title = styled.div`
  margin-left: 1vw;
  display: flex;
  align-items: center;
  font-size: 2.4vw;
  font-weight: 500;
`;

export default function OptionBoxComponent(props: any) {
  const [isChecked, setIsChecked] = useState(false);

  const onClickCheck = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Wrapper>
      <CheckedOptionTitle onClick={onClickCheck}>
        <Image
          src={`/icon/${isChecked ? "checked" : "unchecked"}.png`}
          alt="체크박스"
          width={"3.4vw"}
          height={"3.4vw"}
        />
        <Title>사다리차 서비스</Title>
      </CheckedOptionTitle>
    </Wrapper>
  );
}
