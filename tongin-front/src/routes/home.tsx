import {
  FlexBox,
  FlexBoxRow,
  FlexX,
  FlexXY,
  FlexY,
} from "../components/common/flexBox";
import CustomButton from "../components/common/customButton";

import SearchComponent from "../components/home/searchComponent";
import TabComponent from "../components/home/tabComponent";
import styled from "styled-components";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const HomeContainer = styled.div`
  width: 80vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  outline: 2px solid green;
  margin-bottom: 6vw;
`;
const SearchContainer = styled.div`
  width: 80vw;
  height: 10vh;
  outline: 2px solid green;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TabContainer = styled.div`
  width: 80vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
// const InvoiceContainer = styled.div`
//   width: 100vw;
//   height: 100vh;
//   display: flex;
//   justify-content: center;
//   outline: 2px solid red;
// `;

export default function Home() {
  return (
    <>
      <FlexXY>
        <HomeContainer>
          <SearchContainer>
            <SearchComponent></SearchComponent>
          </SearchContainer>
          <TabContainer>
            <TabComponent></TabComponent>
          </TabContainer>
        </HomeContainer>
      </FlexXY>
    </>
  );
}
