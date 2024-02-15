import styled from "styled-components";
import { Image } from "../common/image";

const DefaultList = styled.div`
  margin-top: 1vw;
  width: 100%;
  height: 20vw;
  background-color: white;
  border-radius: 0.4vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  margin-top: 1vw;
  font-size: 1.2vw;
  font-weight: 500;
`;

export default function DefaultSearchResult() {
  return (
    <>
      <DefaultList>
        <Image
          src="icon/alert_icon.svg"
          alt="로고 이미지"
          width={"8vw"}
          height={"8vw"}
        />
        <Title>검색 결과가 없습니다.</Title>
      </DefaultList>
    </>
  );
}
