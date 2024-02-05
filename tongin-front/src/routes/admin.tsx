import styled from "styled-components";
import CustomButton from "../components/common/customButton";
import { useNavigate } from "react-router-dom";
import { Container, Wrapper } from "../components/common/flexWrapper";
import AdminTabComponent from "../components/common/adminTabComponent";
import { useState } from "react";
import { Tab } from "../components/admin/tabComponent";

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 30%;
  margin-top: 6vh;
`;

export default function Admin() {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState("admin");

  const moveToCreate = () => {
    navigate("/admin/create-account");
  };

  return (
    <>
      <Container>
        <Wrapper>
          <BtnBox>
            <Tab></Tab>
          </BtnBox>
        </Wrapper>
      </Container>
    </>
  );
}
