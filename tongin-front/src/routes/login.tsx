import { useState } from "react";
import styled from "styled-components";
import TabComponent from "../components/home/tabComponent";
import CustomButton from "../components/common/customButton";
import { useNavigate } from "react-router-dom";

const ContainerLogin = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

const ContainerSub = styled.div`
  width: 60%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* outline: 1px solid red; */
`;

const LoginLogo = styled.div`
  width: 20%;
  height: 20%;
  outline: 2px solid red;
`;
const LogoText = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 500;
  font-size: 20px;
  color: #ea5404;
`;
const OutlineInputbox = styled.div<{
  $outLine?: string;
}>`
  width: 100%;
  height: 12%;
  border-radius: 8px;
  background-color: white;
  outline: ${(props) => props.$outLine};
`;

const Inputbox = styled.input`
  background-color: transparent;
  margin-left: 20px;
  font-size: 20px;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  border: none;
  width: 100%;
  height: 100%;
`;

const CheckContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 5%;
`;
const CheckBox = styled.input`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: start;
  /* outline: 1px dashed blue; */
`;
const CheckText = styled.div`
  font-size: 20px;
`;
const LoginBtn = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10%;
  font-size: 20px;
`;
const MemoryLogin = styled.div`
  width: 100%;
  height: 10%;
  font-size: 20px;
  text-decoration: underline;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default function Login() {
  const navigate = useNavigate();
  const tonginOrange = "1.5px solid #FF7F3B";
  const tonginDisable = "1.5px solid #B9C1C9";
  const [outLineId, setoutLineId] = useState(tonginDisable);
  const [outLinePswd, setoutLinePswd] = useState(tonginDisable);
  const [onDisable, setOnDisable] = useState("#B9C1C9");
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
  const onDisableLogin = () => {
    setOnDisable("#FF7F3B");
  };
  const onInputText = (e: any) => {
    if (e.target.id === "Id") setId(e.target.value);
    else if (e.target.id === "Pw") setPswd(e.target.value);
    if (id.length > 3 && pswd.length > 3) {
      console.log("wkrehd");
      onDisableLogin();
    }
  };

  const onLogin = () => {
    alert("로그인하였습니다.");
    navigate("/", {
      state: { loginUser: { id: id, userType: "USER" } },
    });
  };

  return (
    <>
      <ContainerLogin>
        <ContainerSub>
          <LoginLogo>logo</LoginLogo>
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
            ></Inputbox>
          </OutlineInputbox>
          <CheckContainer>
            <CheckBox type="checkbox"></CheckBox>
            <CheckText>아이디/비밀번호 기억하기</CheckText>
          </CheckContainer>
          <CustomButton
            onClick={onLogin}
            width={"100%"}
            height={"70px"}
            text={`로그인`}
            size={"30px"}
            $bgColor={onDisable}
          ></CustomButton>

          <MemoryLogin> 아이디/비밀번호 찾기</MemoryLogin>
        </ContainerSub>
      </ContainerLogin>
    </>
  );
}
