import styled from "styled-components";
import { Outlet, useNavigate } from "react-router-dom";
import ContractIcon from "../components/icon/contractIcon";
import PenIcon from "../components/icon/penIcon";
import { useState } from "react";
import react, { useEffect } from "react";
import { Toast } from "../components/common/toastMessegeComponent";
import TruckIcon from "../components/icon/truckIcon";
import LockIcon from "../components/icon/lockIcon";
const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: start;
  height: 80vh;
  width: 100%;
`;
const MarginBox = styled.div`
  margin-top: 12vw;
`;
const ContentBox = styled.div`
  display: flex;
  align-items: center;
  width: 58vw;
  border-radius: 0.8vw;
  margin-bottom: 2vw;
  justify-content: space-between;

  /* outline: 5px solid green; */
`;
const Content = styled.div<{
  $bgColor?: string;
  $outLine?: string;
  $hoverBgColor?: string;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 28vw;
  height: 28vw;
  border-radius: 0.8vw;
  background-color: ${(props) => (props.$bgColor ? props.$bgColor : "#fff6ee")};
  justify-content: center;
  /* outline: 0.2vw solid gray; */
  /* margin: 0.7vh 0vh 0.7vh 0vh; */
  box-shadow: 0 0.5vh 0.5vh rgba(0, 0, 0, 0.01),
    0 0.5vh 0.5vh rgba(0, 0, 0, 0.009);
  /* outline: 0.1vw solid
    ${(props) => (props.$outLine ? props.$outLine : "#fff6ee")}; */
  &:hover {
    background-color: ${(props) =>
      props.$hoverBgColor ? props.$hoverBgColor : "#fff6ee"};
    cursor: pointer;
  }
`;
const Icon = styled.div`
  margin-bottom: 2vw;
`;
const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 9vw;
  width: 100%;

  justify-content: start;
`;
const SiteTitle = styled.div`
  color: #ffffff;
  font-size: 3vw;
  font-weight: 700;
`;

const SubTitle = styled.div`
  color: #ffffff;
  font-size: 1.4vw;
  font-weight: 100;
  width: 80%;
  text-align: center;
  line-height: 2vw;
  margin-top: 2vw;
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
        {fetchStatus && (
          <Toast
            text={"준비 중 입니다."}
            setFetchStatus={setFetchStatus}
            fetchStatus={fetchStatus}
            status={"FAIL"}
          />
        )}
        <MarginBox>
          <ContentBox>
            <Content
              $bgColor={"#FF8646"}
              onClick={detailPageShow}
              $hoverBgColor={"#ffb188"}
              // $outLine={"#ff7f3b"}
            >
              <Icon>
                <ContractIcon height={"6vw"} fill={"#ffffff"} />
              </Icon>
              <TitleBox>
                <SiteTitle>{"견적 리스트"}</SiteTitle>
                <SubTitle>
                  {"나에게 배정된 견적 및 계약, 작업"}
                  <br />
                  {" 리스트들을 관리합니다."}
                </SubTitle>
              </TitleBox>
            </Content>
            <Content
              // onClick={disabledSite}
              onClick={sitePageShow}
              $bgColor={"#6AD958"}
              $hoverBgColor={"#93e187"}
            >
              <Icon>
                <TruckIcon height={"6.2vw"} fill={"#ffffff"} />
              </Icon>
              <TitleBox>
                <SiteTitle>{"현장 접수"}</SiteTitle>
                <SubTitle>
                  {"현장에서 자체 견적을 통해 "}
                  <br />
                  {"통인CS에 견적을 접수합니다."}
                </SubTitle>
              </TitleBox>
            </Content>
          </ContentBox>
          <ContentBox>
            <Content
              $bgColor={"#DBDBDB"}
              $hoverBgColor={"##ffffff"}
              onClick={disabledSite}
            >
              <Icon>
                <LockIcon height={"6vw"} fill={"#ffffff"} />
              </Icon>
              <TitleBox>
                <SiteTitle>{"준비 중"}</SiteTitle>
                <SubTitle>{"서비스 준비 중 입니다."}</SubTitle>
              </TitleBox>
            </Content>
            <Content
              onClick={disabledSite}
              $hoverBgColor={"##ffffff"}
              $bgColor={"#DBDBDB"}
            >
              <Icon>
                <LockIcon height={"6vw"} fill={"#ffffff"} />
              </Icon>
              <TitleBox>
                <SiteTitle>{"준비 중"}</SiteTitle>
                <SubTitle>{"서비스 준비 중 입니다."}</SubTitle>
              </TitleBox>
            </Content>
          </ContentBox>
        </MarginBox>
      </Container>
    </>
  );
}
