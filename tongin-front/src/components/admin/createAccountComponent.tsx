import styled from "styled-components";
import { InputComponent } from "../common/InputComponent";
import CustomButton from "../common/customButton";
import axios from "axios";
import { useState } from "react";

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  outline: 1px solid black;
  width: 90%;
  height: 100%;
  padding-top: 4vh;
`;

const UpperBox = styled.div`
  display: flex;
  justify-content: space-between;
  outline: 1px dashed red;
  width: 100%;
  height: 14vh;
`;

const MidBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  outline: 1px dashed red;
  width: 100%;
  height: 14vh;
`;

const LowerBox = styled.div`
  width: 100%;
  height: 10vh;
  outline: 1px dashed red;
`;

export default function CreateAccountComponent() {
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const createTestClick = async (e: React.MouseEvent<Element, MouseEvent>) => {
    const requestParam = {
      header: {
        Authorization: {
          accessToken,
          refreshToken,
        },
      },
      body: {},
    };

    const response: any = await axios.post(
      "https://homenmove.net/v1/api/auth/sign-up",
      requestParam
    );
  };

  const createAccountClick = async (
    e: React.MouseEvent<Element, MouseEvent>
  ) => {
    const requestParam = {
      header: {},
      body: {
        name: "이성훈5",
        contact: "010-1234-1234",
        branchCode: "BE0049",
        userId: "leesh132110002",
        password: "12341234",
        empCode: "22211115",
      },
    };

    const response: any = await axios.post(
      "https://homenmove.net/v1/api/auth/sign-up",
      requestParam
    );

    console.log("response");
    console.log(response);
    setAccessToken(response.data.body.data.tokens.accessToken);
    setRefreshToken(response.data.body.data.tokens.refreshToken);
  };

  return (
    <>
      <BoxWrapper>
        <UpperBox>
          <InputComponent
            onChange={handleInput}
            label={"사원 이름"}
            inputType={"text"}
            placeholder={"지점코드+사원코드로 생성"}
            width={"20vw"}
            height={"4vw"}
          ></InputComponent>
          <InputComponent
            onChange={handleInput}
            label={"사원 연락처"}
            inputType={"text"}
            placeholder={"010-1234-1234"}
            width={"20vw"}
            height={"4vw"}
          ></InputComponent>
          <InputComponent
            onChange={handleInput}
            label={"소속 지점"}
            inputType={"text"}
            placeholder={"소속 지점"}
            width={"10vw"}
            height={"4vw"}
          ></InputComponent>
        </UpperBox>
        <MidBox>
          <InputComponent
            onChange={handleInput}
            label={"아이디"}
            inputType={"text"}
            placeholder={"지점코드+사원코드"}
            width={"26vw"}
            height={"4vw"}
          ></InputComponent>
          <InputComponent
            onChange={handleInput}
            label={"비밀번호"}
            inputType={"password"}
            placeholder={"비밀번호 입력"}
            width={"26vw"}
            height={"4vw"}
          ></InputComponent>
          <CustomButton
            onClick={createAccountClick}
            text={"계정 생성하기"}
            size={"1.4vw"}
            width={"16vw"}
            height={"4vw"}
          ></CustomButton>
        </MidBox>
        <LowerBox>
          <CustomButton
            onClick={createTestClick}
            text={"테스트요청"}
            size={"1.4vw"}
            width={"16vw"}
            height={"4vw"}
          ></CustomButton>
        </LowerBox>
      </BoxWrapper>
    </>
  );
}
