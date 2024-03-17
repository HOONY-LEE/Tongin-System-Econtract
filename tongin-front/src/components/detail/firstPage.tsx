import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: white;
  outline: 1px solid #e4e4e4;
  display: flex;
  justify-content: center;
  border-radius: 0.6vw;
  align-items: center;
  width: 75vw;
  height: 106.065vw;
`;
const Container = styled.div`
  outline: 1px solid red;
  width: 84%;
  height: 92%;
  font-size: 3vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.div`
  width: 100%;
  height: 7%;
  display: flex;
  outline: 1px solid red;
  align-items: center;
  justify-content: space-between;
`;
const HeaderTitle = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 3.4vw;
`;
const LogoImg = styled.div`
  outline: 1px solid red;
  border-radius: 0.4vw;
  width: 20vw;
  height: 5vw;
  font-size: 3vw;
`;

const TopTable = styled.table`
  text-align: center;
  font-size: 2vw;
  width: 100%;
  height: 4%;
`;
const TopTr = styled.tr<{
  width?: string;
}>`
  /* outline: 4px solid green; */
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TopTdTitle = styled.td<{
  width?: string;
  borderRight?: string;
  borderLeft?: string;
}>`
  background-color: #f4f4f4;
  width: ${(props) => (props.width ? props.width : "10vw")};
  height: 4vw;
  display: flex;
  align-items: center;
  font-weight: 500;
  justify-content: center;
  border-right: ${(props) =>
    props.borderRight ? props.borderRight : "0.1vw solid black"};
  border-left: ${(props) => (props.borderLeft ? props.borderLeft : "")};
`;
const TopTd = styled.td<{
  width?: string;
}>`
  width: ${(props) => (props.width ? props.width : "5vw")};
  display: flex;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  height: 4vw;
`;
const SubTitle = styled.div`
  font-weight: 600;
  margin: 1.3vw auto 0.6vw 0vw;
  font-size: 2vw;
`;

const ApplyInfoTable = styled.table`
  text-align: center;
  border-top: 0.15vw solid black;
  font-size: 2vw;
  width: 100%;
  height: 4%;
`;
const ApplyInfoTr = styled.tr<{
  width?: string;
}>`
  /* outline: 4px solid green; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.15vw solid #e4e4e4;
`;
const ApplyInfoTdTitle = styled.td<{
  width?: string;
  borderRight?: string;
  borderLeft?: string;
}>`
  background-color: #f4f4f4;
  width: ${(props) => (props.width ? props.width : "10vw")};
  height: 4vw;
  display: flex;
  align-items: center;
  font-weight: 500;
  justify-content: center;
  border-right: ${(props) =>
    props.borderRight ? props.borderRight : "0.1vw solid black"};
  border-left: ${(props) => (props.borderLeft ? props.borderLeft : "")};
`;
const ApplyInfoTd = styled.td<{
  width?: string;
}>`
  width: ${(props) => (props.width ? props.width : "5vw")};
  display: flex;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  height: 4vw;
`;
// FirstPage 컴포넌트 정의
const FirstPage = (props: any) => {
  const { priceDataList } = props;
  return (
    <Wrapper className="firstPageBox">
      <Container>
        <Header>
          <LogoImg>logo</LogoImg>
          <HeaderTitle>계약서 • 견적서</HeaderTitle>
        </Header>
        <TopTable>
          <TopTr>
            <TopTdTitle>dddd</TopTdTitle>
            <TopTd>dddd</TopTd>
            <TopTdTitle>dddd</TopTdTitle>
            <TopTd>dddd</TopTd>
            <TopTdTitle>dddd</TopTdTitle>
            <TopTd>dddd</TopTd>
          </TopTr>
        </TopTable>
        <SubTitle>신청정보</SubTitle>
        <ApplyInfoTable>
          <ApplyInfoTr>
            <ApplyInfoTdTitle>d</ApplyInfoTdTitle>
            <ApplyInfoTd>dd</ApplyInfoTd>
            <ApplyInfoTdTitle>d</ApplyInfoTdTitle>
            <ApplyInfoTd>dd</ApplyInfoTd>
            <ApplyInfoTd>dd</ApplyInfoTd>
          </ApplyInfoTr>
          <ApplyInfoTr>
            <ApplyInfoTdTitle>d</ApplyInfoTdTitle>
            <ApplyInfoTd>dd</ApplyInfoTd>
            <ApplyInfoTdTitle>d</ApplyInfoTdTitle>
            <ApplyInfoTd>dd</ApplyInfoTd>
            <ApplyInfoTd>dd</ApplyInfoTd>
          </ApplyInfoTr>
        </ApplyInfoTable>
      </Container>
    </Wrapper>
  );
};
export default FirstPage;
