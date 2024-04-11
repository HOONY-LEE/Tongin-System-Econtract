import { useState } from "react";
import styled from "styled-components";
import TabComponent from "../components/home/tabComponent";
import CustomButton from "../components/common/customButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

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
  width: 12vw;
  height: 12vw;
`;

const Image = styled.img.attrs({})``;

const LogoText = styled.div`
  width: 100%;
  height: 6vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 500;
  font-size: 2.2vw;
  color: #ea5404;
`;
const OutlineInputbox = styled.div<{
  $outLine?: string;
}>`
  margin-bottom: 4vw;
  display: flex;
  align-items: center;
  width: 100%;
  height: 8vw;
  border-radius: 0.7vw;
  background-color: white;
  outline: ${(props) => props.$outLine};
`;

const Inputbox = styled.input`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  margin-left: 2vw;
  font-size: 2.2vw;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  border: none;
  width: 58vw;
  height: 6vw;
`;

// const CheckContainer = styled.div`
//   display: flex;
//   align-items: center;
//   width: 100%;
//   height: 5%;
// `;
// const CheckBox = styled.input`
//   width: 20px;
//   height: 20px;
//   display: flex;
//   align-items: start;
//   /* outline: 1px dashed blue; */
// `;
// const CheckText = styled.div`
//   font-size: 20px;
// `;
// const LoginBtn = styled.button`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   height: 10vh;
//   font-size: 20px;
// `;
const MemoryLogin = styled.div`
  width: 100%;
  margin-top: 4vw;
  height: 4vw;
  font-size: 2.2vw;
  color: #b3b3b3;
  text-decoration: underline;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Login() {
  const navigate = useNavigate();
  const tonginOrange = "0.3vw solid #FF7F3B";
  const tonginDisable = "0.2vw solid #E7E7E7";
  const [outLineId, setoutLineId] = useState(tonginDisable);
  const [outLinePswd, setoutLinePswd] = useState(tonginDisable);
  const [bgColor, setBgColor] = useState("#B9C1C9");
  const [desabled, setDesabled] = useState(true);

  const [id, setId] = useState("");
  const [pswd, setPswd] = useState("");

  const onFocusHandle = (e: any) => {
    if (e.target.id === "Id") setoutLineId(tonginOrange);
    else if (e.target.id === "Pw") setoutLinePswd(tonginOrange);
  };

  const onblurHandle = (e: any) => {
    setoutLineId(tonginDisable);
    setoutLinePswd(tonginDisable);
  };

  const onDisabled = (desabled: any) => {
    if (desabled) {
      setBgColor("#B9C1C9");
      setDesabled(true);
    }
    if (desabled === false) {
      setBgColor("#FF7F3B");
      setDesabled(false);
    }
  };

  const onInputText = (e: any) => {
    if (e.target.id === "Id") setId(e.target.value);
    if (e.target.id === "Pw") setPswd(e.target.value);
    if (id.length > 3 && pswd.length > 1) {
      onDisabled(false);
    } else {
      onDisabled(true);
    }
  };

  const onLogin = async (e: React.KeyboardEvent) => {
    const requestParam = {
      header: {},
      body: {
        userId: id,
        password: pswd,
      },
    };
    try {
      const response: any = await axios.post(
        "https://homenmove.net/v1/api/auth/login",
        requestParam
      );
      localStorage.setItem(
        "accessToken",
        response.data.data.tokens.accessToken
      );

      localStorage.setItem(
        "loginUser",
        JSON.stringify(response.data.data.user)
      );

      cookies.set("refreshToken", response.data.data.tokens.refreshToken);
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      onLogin(e);
    }
  };

  return (
    <>
      <ContainerLogin>
        <ContainerSub>
          <LoginLogo>
            <Image
              src="img/tongin_logo.png"
              alt="로고 이미지"
              width={"100%"}
              height={""}
            />
          </LoginLogo>
          <LogoText>TONGIN LOGIN</LogoText>
          <OutlineInputbox $outLine={outLineId}>
            <Inputbox
              onInput={onInputText}
              id={"Id"}
              onFocus={onFocusHandle}
              onBlur={onblurHandle}
              placeholder="아이디를 입력해 주세요"
            ></Inputbox>
          </OutlineInputbox>
          <OutlineInputbox $outLine={outLinePswd}>
            <Inputbox
              id={"Pw"}
              onInput={onInputText}
              onFocus={onFocusHandle}
              onBlur={onblurHandle}
              type="password"
              placeholder="비밀번호를 입력해 주세요"
              onKeyPress={handleKeyDown}
            ></Inputbox>
          </OutlineInputbox>
          {/* <CheckContainer>
            <CheckBox type="checkbox"></CheckBox>
            <CheckText>아이디/비밀번호 기억하기</CheckText>
          </CheckContainer> */}
          <CustomButton
            onClick={desabled ? onInputText : onLogin}
            width={"100%"}
            height={"8vw"}
            text={`로그인`}
            size={"2.5vw"}
            radius={"0.7vw"}
            disabled={desabled}
            $bgColor={bgColor}
          ></CustomButton>
          <MemoryLogin> 아이디/비밀번호 찾기</MemoryLogin>
        </ContainerSub>
      </ContainerLogin>
    </>
  );
}
