import { useState } from "react";
import styled from "styled-components";

const ContainerLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const ContainerSub = styled.div`
  width: 66%;
  height: 70vw;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  /* outline: 1px solid red; */
`;

const LoginLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20vw;
  height: 20vw;
  margin-bottom: 3vw;
`;

const Image = styled.img.attrs({})``;

const LogoText = styled.div`
  width: 100%;
  height: 6vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 700;
  line-height: 5vw;
  font-size: 3vw;
  color: #ea5404;
`;

export default function ContractFinish() {
  return (
    <>
      <ContainerLogin>
        <ContainerSub>
          <LoginLogo>
            <Image
              src="\img\tongin_logo.svg"
              alt="로고 이미지"
              width={"100%"}
              height={""}
            />
          </LoginLogo>
          <LogoText>
            계약이 완료되었습니다
            <br />
            통인익스프레스를 이용해주셔서 감사합니다.
          </LogoText>
        </ContainerSub>
      </ContainerLogin>
    </>
  );
}
