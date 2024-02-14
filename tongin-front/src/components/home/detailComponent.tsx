import { userInfo } from "os";
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import react, { useEffect } from "react";
import TabComponent from "./tabComponent";
import axios from "axios";

const ContentBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 84vw;
  height: 50vw;

  border-radius: 0.7vw;
  background-color: white;
  /* outline: 0.2vw solid gray; */
  margin: 0.7vh 0vh 0.7vh 0vh;
  box-shadow: 0 0.5vh 0.5vh rgba(0, 0, 0, 0.01),
    0 0.5vh 0.5vh rgba(0, 0, 0, 0.003);
`;
export default function DetailComponent(props: any) {
  return (
    <>
      <ContentBox>detailPage</ContentBox>
    </>
  );
}
