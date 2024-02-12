import styled from "styled-components";
import { InputComponent } from "../common/InputComponent";
import CustomButton from "../common/customButton";
import axios from "axios";
import { useEffect, useState } from "react";
import AdminList from "./adminList";

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  /* outline: 1px solid black; */
  width: 90%;
  height: 100%;
  padding-top: 2vw;
`;

const UpperBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 20%;
`;

const MidBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  width: 100%;
  height: 20%;
  margin-top: 1vw;
`;

const LowerBox = styled.div`
  margin-top: 2vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 100%;
`;

export default function CreateAccountComponent() {
  const accessToken = localStorage.getItem("accessToken");
  const [empList, setEmpList] = useState([]);
  const [empName, setEmpName] = useState("");
  const [empCode, setEmpCode] = useState("");
  const [contact, setContact] = useState("");
  const [beName, setBeName] = useState("");
  const [beCode, setBeCode] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    setEmpName(e.target.value);
  };
  const onChangeContact = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regExp = /[^0-9]/g;
    const filteredNumber = e.target.value
      .replace(regExp, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");

    setContact(filteredNumber);
  };
  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const getEmpList = async () => {
    try {
      const response = await axios.get(
        "https://homenmove.net/v1/api/user/activate/list",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setEmpList(response.data.userList);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    getEmpList();
  }, []);

  const createAccountClick = async () => {
    const requestParam = {
      header: {},
      body: {
        name: empName,
        contact: contact,
        branchCode: beCode,
        userId: userId,
        password: password,
        empCode: empCode,
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
            onChange={onChangeName}
            value={empName}
            label={"사원 이름"}
            inputType={"text"}
            placeholder={"이름을 입력하세요."}
            width={"26vw"}
            height={"3vw"}
          ></InputComponent>
          <InputComponent
            onChange={onChangeContact}
            value={contact}
            label={"사원 연락처"}
            inputType={"text"}
            placeholder={"연락처 입력"}
            width={"26vw"}
            height={"3vw"}
            maxlength={13}
          ></InputComponent>
          <InputComponent
            value={`${beName}(${beCode})`}
            label={"소속 지점"}
            inputType={"text"}
            placeholder={"소속 지점"}
            width={"16vw"}
            height={"3vw"}
            backgroundColor={"#cdcdcd"}
            readonly
          ></InputComponent>
        </UpperBox>
        <MidBox>
          <InputComponent
            onChange={onChangeId}
            label={"아이디"}
            inputType={"text"}
            placeholder={"지점코드+사원코드"}
            width={"26vw"}
            height={"3vw"}
          ></InputComponent>
          <InputComponent
            onChange={onChangePassword}
            label={"비밀번호"}
            inputType={"password"}
            placeholder={"비밀번호 입력"}
            width={"26vw"}
            height={"3vw"}
          ></InputComponent>
          <CustomButton
            onClick={createAccountClick}
            text={"계정 생성하기"}
            size={"1.4vw"}
            width={"16vw"}
            height={"3vw"}
          ></CustomButton>
        </MidBox>
        <LowerBox>
          <AdminList
            empList={empList}
            setEmpName={setEmpName}
            setEmpCode={setEmpCode}
            setContact={setContact}
            setBeName={setBeName}
            setBeCode={setBeCode}
          ></AdminList>
        </LowerBox>
      </BoxWrapper>
    </>
  );
}
