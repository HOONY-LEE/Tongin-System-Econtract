import styled from "styled-components";
import { useState } from "react";
import react, { useEffect } from "react";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 2vw;
`;
const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 70vw;
  height: 60vh;
  border-radius: 0.8vw;
  background-color: white;
  /* outline: 0.2vw solid gray; */
  /* margin: 0.7vh 0vh 0.7vh 0vh; */
  box-shadow: 0 0.5vh 0.5vh rgba(0, 0, 0, 0.01),
    0 0.5vh 0.5vh rgba(0, 0, 0, 0.003);
`;
export default function Profile() {
  return (
    <>
      <Container>
        <ContentBox>
          <h1>myPage</h1>
        </ContentBox>
      </Container>
    </>
  );
}
