import { FlexXY } from "../components/common/flexBox";
import CustomButton from "../components/common/customButton";

import TabComponent from "../components/home/tabComponent";
import styled from "styled-components";
import { Cookies } from "react-cookie";
import { useState } from "react";

import HomeSearchComponent from "../components/common/homeSearchComponent";
const cookies = new Cookies();

const HomeContainer = styled.div`
  width: 90vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 6vw;
`;

const TabContainer = styled.div`
  width: 90vw;
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
          <TabContainer>
            <TabComponent></TabComponent>
          </TabContainer>
        </HomeContainer>
      </FlexXY>
    </>
  );
}
