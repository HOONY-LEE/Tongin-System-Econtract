import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  width: 78vw;
  height: 80vh;
`;

// FirstPage 컴포넌트 정의
const FirstPage = () => (
  <Wrapper>
    <h1>페이지1</h1>
  </Wrapper>
);

export default FirstPage;
