import { HtmlHTMLAttributes, useEffect, useState } from "react";
import styled from "styled-components";
import TabComponent from "../components/home/tabComponent";
import CustomButton from "../components/common/customButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Cookies } from "react-cookie";
import { Toast } from "../components/common/toastMessegeComponent";
import { Image } from "../components/common/image";
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

const LogoText = styled.div`
  width: 100%;
  height: 6vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 500;
  font-size: 2.2vw;
  color: #ff7f3b;
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

const BottomArea = styled.div`
  margin-top: 3vw;
  width: 100%;
  height: 3vw;
  display: flex;
`;

const RememberAccountBox = styled.div<{
  // onClick?: MouseEventHandler<HTMLDivElement>;
}>`
  height: 100%;
  display: flex;
`;

const TextLine = styled.p`
  margin-left: 1vw;
  display: flex;
  align-items: center;
  font-size: 2.6vw;
  font-weight: 300;
  border-bottom: 0.1vw solid black;
  /* text-decoration: underline; */
`;

export default function Login() {
  const navigate = useNavigate();
  const rememberAccountString = localStorage.getItem("rememberAccount");

  const rememberAccount =
    rememberAccountString !== null ? JSON.parse(rememberAccountString) : false;

  const loginUserString = localStorage.getItem("loginUser");

  const loginUser = loginUserString && JSON.parse(loginUserString);

  const tonginOrange = "0.3vw solid #FF7F3B";
  const tonginDisable = "0.2vw solid #E7E7E7";
  const [outLineId, setoutLineId] = useState(tonginDisable);
  const [outLinePswd, setoutLinePswd] = useState(tonginDisable);
  const [bgColor, setBgColor] = useState("#B9C1C9");
  const [desabled, setDesabled] = useState(true);
  const [fetchStatus, setFetchStatus] = useState(false); // toast messege
  const [status, setStatus] = useState(""); // toast messege
  const [id, setId] = useState("");
  const [pswd, setPswd] = useState("");
  const [loginData, setLoginData] = useState({ id, pswd });
  const [isChecked, setIsChekced] = useState<boolean>(rememberAccount);

  useEffect(() => {
    if (rememberAccount) {
      const accountString = localStorage.getItem("account");
      const account = accountString && JSON.parse(accountString);
      setId(account.id);
      setPswd(account.pswd);
    }
  }, []);

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

  const onInputId = (e: any) => {
    setId(e.target.value);
  };
  const onInputPswd = (e: any) => {
    setPswd(e.target.value);
  };

  useEffect(() => {
    setLoginData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.id = id;
      updatedData.pswd = pswd;
      return updatedData;
    });
    if (id.length > 1 && pswd.length > 1) {
      onDisabled(false);
    } else {
      onDisabled(true);
    }
  }, [id, pswd]);
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
      localStorage.setItem("rememberAccount", JSON.stringify(isChecked));
      if (isChecked) {
        localStorage.setItem("account", JSON.stringify(loginData));
      } else {
        localStorage.setItem("account", "");
      }

      cookies.set("refreshToken", response.data.data.tokens.refreshToken);
      navigate("/");
    } catch (error) {
      setFetchStatus(true);
      setStatus("FAIL");
      // alert(error);
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
        {fetchStatus && (
          <Toast
            status={status}
            fetchStatus={fetchStatus}
            setFetchStatus={setFetchStatus}
            text={"아이디 비밀번호를 다시 확인해주세요."}
          />
        )}
        <ContainerSub>
          <LoginLogo>
            <Image
              src="img/tongin_logo.png"
              alt="로고 이미지"
              width={"100%"}
              height={"100%"}
            />
          </LoginLogo>
          <LogoText>TONGIN LOGIN</LogoText>
          <OutlineInputbox $outLine={outLineId}>
            <Inputbox
              onInput={onInputId}
              id={"Id"}
              onFocus={onFocusHandle}
              onBlur={onblurHandle}
              value={id}
              placeholder="아이디를 입력해 주세요"
            ></Inputbox>
          </OutlineInputbox>
          <OutlineInputbox $outLine={outLinePswd}>
            <Inputbox
              id={"Pw"}
              onInput={onInputPswd}
              onFocus={onFocusHandle}
              onBlur={onblurHandle}
              type="password"
              value={pswd}
              placeholder="비밀번호를 입력해 주세요"
              onKeyPress={handleKeyDown}
            ></Inputbox>
          </OutlineInputbox>
          <CustomButton
            onClick={desabled ? "" : onLogin}
            width={"100%"}
            height={"8vw"}
            text={`로그인`}
            size={"2.5vw"}
            radius={"0.7vw"}
            disabled={desabled}
            $bgColor={bgColor}
          ></CustomButton>
          <BottomArea>
            <RememberAccountBox
              onClick={() => {
                setIsChekced(!isChecked);
              }}
            >
              <Image
                src={`icon/${isChecked ? "checked" : "unchecked"}.png`}
                alt="checkbox"
                width={"3vw"}
                height={"3vw"}
              />
              <TextLine>아이디/비밀번호 기억하기</TextLine>
            </RememberAccountBox>
          </BottomArea>
        </ContainerSub>
      </ContainerLogin>
    </>
  );
}
