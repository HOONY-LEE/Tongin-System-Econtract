import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Container, Wrapper } from "../components/common/flexWrapper";
import { useState } from "react";
import { AdminTabComponent } from "../components/admin/adminTabComponent";

const TabComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  margin-top: 4vw;
`;

export default function Admin() {
  const navigate = useNavigate();

  const moveToCreate = () => {
    navigate("/admin/create-account");
  };

  return (
    <>
      <Container>
        <Wrapper>
          <TabComponentWrapper>
            <AdminTabComponent></AdminTabComponent>
          </TabComponentWrapper>
        </Wrapper>
      </Container>
    </>
  );
}
