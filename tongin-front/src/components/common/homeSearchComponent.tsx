import styled from "styled-components";
import CustomButton from "./customButton";
import { InputComponent } from "./InputComponent";

const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  width: 100%;
`;

export default function HomeSearchComponent(props: any) {
  const { onChange, resetSearch, searchedText, setSearchedList, onFocus } =
    props;

  return (
    <>
      <SearchWrapper>
        <InputComponent
          setSearchedList={setSearchedList}
          value={searchedText}
          onChange={onChange}
          onFocus={onFocus}
          inputType={"text"}
          placeholder={"검색하기"}
          width={"80vw"}
          height={"5vw"}
          fontSize={"2vw"}
        ></InputComponent>
        <CustomButton
          onClick={resetSearch}
          size={"1.8vw"}
          text={"검색"}
          width={"8vw"}
          height={"5vw"}
        ></CustomButton>
      </SearchWrapper>
    </>
  );
}
