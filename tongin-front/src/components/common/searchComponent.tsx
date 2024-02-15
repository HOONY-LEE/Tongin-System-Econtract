import styled from "styled-components";
import CustomButton from "./customButton";
import { InputComponent } from "./InputComponent";

const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  width: 80%;
`;

export default function SearchComponent(props: any) {
  const { onChange, resetSearch, searchedText, setSearchedList } = props;

  return (
    <>
      <SearchWrapper>
        <InputComponent
          setSearchedList={setSearchedList}
          value={searchedText}
          onChange={onChange}
          inputType={"text"}
          placeholder={
            "사원명 or 사원코드 or 연락처 or 지점이름 or 지점코드로 검색하기"
          }
          width={"60vw"}
          height={"3vw"}
        ></InputComponent>
        <CustomButton
          onClick={resetSearch}
          size={"1.2vw"}
          text={"초기화"}
          width={"8vw"}
          height={"3vw"}
        ></CustomButton>
      </SearchWrapper>
    </>
  );
}
