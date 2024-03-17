import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  background-color: white;
  display: flex;
  justify-content: center;
  width: 78vw;
  height: 80vh;
`;
const Item = styled.div`
  background-color: red;
  border-radius: 0.4vw;
  width: 10vw;
  height: 4vw;
  font-size: 3vw;
`;

// FirstPage 컴포넌트 정의
const FirstPage = (props: any) => {
  const { priceDataList } = props;
  return (
    <Wrapper className="firstPageBox">
      <h1>페이지1</h1>
      {priceDataList.map((item: any, index: number) => {
        return <Item>{item.chargeName}</Item>;
      })}
    </Wrapper>
  );
};
export default FirstPage;
