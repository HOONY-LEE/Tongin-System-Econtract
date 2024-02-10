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

  const createAccountClick = async () => {
    const requestParam = {
      header: {},
      body: {
        name: "허정연",
        contact: "010-2863-7447",
        branchCode: "BE0049",
        userId: "wupee7273",
        password: "1234",
        empCode: "202403121210",
      },
    };

    try {
      const response: any = await axios.post(
        "https://homenmove.net/v1/api/auth/sign-up",
        requestParam
      );
      console.log(response);
    } catch (error) {
      alert(error);
    }
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
