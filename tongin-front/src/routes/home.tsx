import { FlexXY } from "../components/common/flexBox";
import TabComponent from "../components/home/tabComponent";
import styled from "styled-components";
import { Cookies } from "react-cookie";

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
