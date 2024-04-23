import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import ContractIcon from "../components/icon/contractIcon";
import PenIcon from "../components/icon/penIcon";
import { useState } from "react";
import react, { useEffect } from "react";
import { Toast } from "../components/common/toastMessegeComponent";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  padding: 10vw 2vw 2vw 2vw;
`;
const ContentBox = styled.div`
  display: flex;
  align-items: center;
  width: 80vw;
  border-radius: 0.8vw;
  justify-content: space-evenly;
`;
const Content = styled.div<{
  $bgColor?: string;
  $outLine?: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 25vw;
  height: 32vw;
  border-radius: 0.8vw;
  background-color: white;
  justify-content: center;
  /* outline: 0.2vw solid gray; */
  /* margin: 0.7vh 0vh 0.7vh 0vh; */
  box-shadow: 0 0.5vh 0.5vh rgba(0, 0, 0, 0.01),
    0 0.5vh 0.5vh rgba(0, 0, 0, 0.005);
  /* outline: 0.1vw solid
    ${(props) => (props.$outLine ? props.$outLine : "#fff6ee")}; */
  &:hover {
    background-color: ${(props) =>
      props.$bgColor ? props.$bgColor : "#fff6ee"};
    cursor: pointer;
  }
`;
const Icon = styled.div`
  margin-bottom: 2vw;
`;
const SiteTitle = styled.div`
  color: #75e563;
  font-size: 3vw;
  font-weight: 700;
`;
const DetailTitle = styled.div`
  color: #ff7f3b;
  font-size: 3vw;
  font-weight: 700;
`;
export default function LandingPage() {
  const [fetchStatus, setFetchStatus] = useState(false); // toast messege
  //   const [status, setStatus] = useState(false); // toast messege

  const navigate = useNavigate();
  const detailPageShow = () => {
    navigate(`contractlist`);
  };
  const sitePageShow = () => {
    navigate(`onsitecontract`);
  };

  //sitePage 출입방지용 임시 toastModal
  const disabledSite = () => {
    setFetchStatus(true);
  };
  return (
    <>
      <Container>
        <ContentBox>
          {fetchStatus && (
            <Toast
              text={"준비 중 입니다."}
              setFetchStatus={setFetchStatus}
              fetchStatus={fetchStatus}
              status={"FAIL"}
            />
          )}

          <Content onClick={detailPageShow} $outLine={"#ff7f3b"}>
            <Icon>
              <ContractIcon height={"6vw"} fill={"#ff7f3b"} />
            </Icon>
            <DetailTitle>{"견적 리스트"}</DetailTitle>
          </Content>
          <Content
            // onClick={disabledSite}
            onClick={sitePageShow}
            $outLine={"#75E563"}
            $bgColor={"#eefff4"}
          >
            <Icon>
              <PenIcon height={"6vw"} fill={"#75E563"} />
            </Icon>
            <SiteTitle>{"자체 견적"}</SiteTitle>
          </Content>
        </ContentBox>
      </Container>
    </>
  );
}
