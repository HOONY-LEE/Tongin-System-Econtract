import styled from "styled-components";
import CustomButton from "./customButton";
import { InputComponent } from "./InputComponent";

const SearchWrapper = styled.div`
  display: flex;
  justify-content: start;
  align-items: end;
  width: 100%;
`;

export default function SearchComponent(props: any) {
  const { onChange } = props;

  return (
    <>
      <SearchWrapper>
        <InputComponent
          onChange={onChange}
          inputType={"text"}
          placeholder={"사원 검색하기"}
          width={"30vw"}
          height={"3vw"}
        ></InputComponent>
        <CustomButton
          size={"1.4vw"}
          text={"검색"}
          height={"3vw"}
        ></CustomButton>
      </SearchWrapper>
    </>
  );
}
