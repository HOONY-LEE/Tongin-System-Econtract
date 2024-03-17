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

  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.div`
  width: 100%;
  height: 7%;
  display: flex;
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
  border-top: 0.15vw solid black;
  height: 4%;
  border-bottom: 0.15vw solid black;
`;
const TopTr = styled.tr<{
  width?: string;
  borderRight?: string;
  borderLeft?: string;
}>`
  /* outline: 4px solid green; */
  border-right: ${(props) => (props.borderRight ? props.borderRight : "")};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TopTdTitle = styled.td<{
  width?: string;
  borderRight?: string;
  borderLeft?: string;
}>`
  font-size: 1.5vw;
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
  borderRight?: string;
  borderLeft?: string;
}>`
  font-size: 1.5vw;
  border-right: ${(props) => (props.borderRight ? props.borderRight : "")};
  border-left: ${(props) => (props.borderLeft ? props.borderLeft : "")};
  width: ${(props) => (props.width ? props.width : "10vw")};
  display: flex;
  font-weight: 500;
  align-items: center;
  justify-content: center;
  height: 4vw;
`;
const SubTitle = styled.div`
  font-weight: 600;
  margin: 1.3vw auto 0.6vw 0vw;
  font-size: 1.7;
`;

const ApplyInfoTable = styled.table`
  text-align: center;
  border-top: 0.15vw solid black;
  font-size: 1.3vw;
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
  width: ${(props) => (props.width ? props.width : "8vw")};
  height: 4vw;
  display: flex;
  align-items: center;
  font-weight: 500;
  font-size: 1.3vw;
  justify-content: center;
  border-right: ${(props) =>
    props.borderRight ? props.borderRight : "0.1vw solid #e4e4e4"};
  border-left: ${(props) => (props.borderLeft ? props.borderLeft : "")};
`;
const ApplyInfoTd = styled.td<{
  width?: string;
  borderRight?: string;
  borderLeft?: string;
}>`
  width: ${(props) => (props.width ? props.width : "12vw")};
  display: flex;
  font-weight: 500;
  align-items: center;
  border-right: ${(props) => (props.borderRight ? props.borderRight : "")};
  justify-content: center;
  font-size: 1.3vw;
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
            <TopTdTitle borderLeft={"0.1vw solid black"}>dddd</TopTdTitle>
            <TopTd>dddd</TopTd>
            <TopTdTitle borderLeft={"0.1vw solid black"}>dddd</TopTdTitle>
            <TopTd>dddd</TopTd>
          </TopTr>
        </TopTable>
        <SubTitle>신청 정보</SubTitle>
        <ApplyInfoTable>
          <ApplyInfoTr>
            <ApplyInfoTdTitle>d</ApplyInfoTdTitle>
            <ApplyInfoTd>dd</ApplyInfoTd>
            <ApplyInfoTdTitle>d</ApplyInfoTdTitle>
            <ApplyInfoTd borderRight={"0.1vw solid #e4e4e4"}>dd</ApplyInfoTd>
            <ApplyInfoTd>dd</ApplyInfoTd>
          </ApplyInfoTr>
          <ApplyInfoTr>
            <ApplyInfoTdTitle>d</ApplyInfoTdTitle>
            <ApplyInfoTd>dd</ApplyInfoTd>
            <ApplyInfoTdTitle>d</ApplyInfoTdTitle>
            <ApplyInfoTd borderRight={"0.1vw solid #e4e4e4"}>1</ApplyInfoTd>
            <ApplyInfoTd>dd</ApplyInfoTd>
          </ApplyInfoTr>
        </ApplyInfoTable>

        <SubTitle>신청 날짜</SubTitle>
        <ApplyInfoTable>
          <ApplyInfoTr>
            <ApplyInfoTdTitle>견적일</ApplyInfoTdTitle>
            <ApplyInfoTd>2024.00.00</ApplyInfoTd>
            <ApplyInfoTdTitle>계약일</ApplyInfoTdTitle>
            <ApplyInfoTd>2024.00.00</ApplyInfoTd>
            <ApplyInfoTdTitle>포장일</ApplyInfoTdTitle>
            <ApplyInfoTd borderRight={"0.1vw solid #e4e4e4"}>
              2024.00.00
            </ApplyInfoTd>
          </ApplyInfoTr>
          <ApplyInfoTr>
            <ApplyInfoTdTitle>견적일</ApplyInfoTdTitle>
            <ApplyInfoTd>2024.00.00</ApplyInfoTd>
            <ApplyInfoTdTitle>계약일</ApplyInfoTdTitle>
            <ApplyInfoTd>2024.00.00</ApplyInfoTd>
            <ApplyInfoTdTitle></ApplyInfoTdTitle>
            <ApplyInfoTd borderRight={"0.1vw solid #e4e4e4"}></ApplyInfoTd>
          </ApplyInfoTr>
        </ApplyInfoTable>

        <SubTitle>리빙서비스</SubTitle>
        <ApplyInfoTable>
          <ApplyInfoTr>
            <ApplyInfoTd width={"26%"}>입주크리닝 프리미엄</ApplyInfoTd>
            <ApplyInfoTdTitle width={"12%"}>일시</ApplyInfoTdTitle>
            <ApplyInfoTd width={"17%"}>2024.01.24</ApplyInfoTd>
            <ApplyInfoTdTitle width={"12%"}>금액</ApplyInfoTdTitle>
            <ApplyInfoTd width={"18%"} borderRight={"0.1vw solid #e4e4e4"}>
              000,000 ₩
            </ApplyInfoTd>
            <ApplyInfoTd width={"14%"}>온라인결제</ApplyInfoTd>
          </ApplyInfoTr>
          <ApplyInfoTr>
            <ApplyInfoTd width={"26%"}>탈취살균 서비스</ApplyInfoTd>
            <ApplyInfoTdTitle width={"12%"}>일시</ApplyInfoTdTitle>
            <ApplyInfoTd width={"17%"}>2024.01.24</ApplyInfoTd>
            <ApplyInfoTdTitle width={"12%"}>금액</ApplyInfoTdTitle>
            <ApplyInfoTd width={"18%"} borderRight={"0.1vw solid #e4e4e4"}>
              000,000 ₩
            </ApplyInfoTd>
            <ApplyInfoTd width={"14%"}>온라인결제</ApplyInfoTd>
          </ApplyInfoTr>
          <ApplyInfoTr>
            <ApplyInfoTd width={"26%"}>정리 수납 서비스</ApplyInfoTd>
            <ApplyInfoTdTitle width={"12%"}>일시</ApplyInfoTdTitle>
            <ApplyInfoTd width={"17%"}>2024.01.24</ApplyInfoTd>
            <ApplyInfoTdTitle width={"12%"}>금액</ApplyInfoTdTitle>
            <ApplyInfoTd width={"18%"} borderRight={"0.1vw solid #e4e4e4"}>
              000,000 ₩
            </ApplyInfoTd>
            <ApplyInfoTd width={"14%"}>온라인결제</ApplyInfoTd>
          </ApplyInfoTr>
        </ApplyInfoTable>
      </Container>
    </Wrapper>
  );
};
export default FirstPage;
