import styled from "styled-components";
import { InputComponent } from "../common/InputComponent";
import CustomButton from "../common/customButton";
import { useEffect, useState } from "react";
import AdminList from "./adminList";
import SearchComponent from "../common/searchComponent";
import apiInstance from "../../API/API";
import API from "../../API/API";

const BoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
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

const SearchBox = styled.div`
  margin-bottom: 1vw;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 4vw;
  /* background-color: red; */
`;

export default function CreateAccountComponent() {
  const accessToken = localStorage.getItem("accessToken");
  const [empList, setEmpList] = useState<any[]>([]);
  const [searchedList, setSearchedList] = useState(empList);
  const [empName, setEmpName] = useState("");
  const [empCode, setEmpCode] = useState("");
  const [contact, setContact] = useState("");
  const [beName, setBeName] = useState("");
  const [beCode, setBeCode] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmpName(e.target.value);
  };
  const onChangeContact = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regExp = /[^0-9]/g;
    const filteredNumber = e.target.value
      .replace(regExp, "")
      .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
      .replace(/(\-{1,2})$/g, "");
    console.log(filteredNumber);
    setContact(filteredNumber);
  };
  const onChangeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };
  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  // 검색 결과에 따른 목록 재정렬
  const onChangeSearch = (e: any) => {
    const keyword = e.target.value;
    const keyword2 = "홈페이지";
    console.log(keyword);
    console.log(keyword2);
    const filtered = keyword2.includes(keyword);
    console.log(filtered);
    // const filterdList = empList.filter((item) => {
    //   console.log(item.name);
    //   item.name.includes(keyword);
    // });

    // setSearchedList(filterdList);
    // console.log(filterdList[0]);
  };

  const getEmpList = async () => {
    try {
      const response = await API.get("user/activate/list");
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
        // beCode 데이터베이스에 들어간 뒤 변경 해야함, 현재 임시조치
        // branchCode: beCode,
        branchCode: "BE0049",
        userId: userId,
        password: password,
        empCode: empCode,
      },
    };

    const message = `    가입 승인하시겠습니까?

    사원명 : ${requestParam.body.name}
    연락처 : ${requestParam.body.contact}
    소속코드 : ${requestParam.body.branchCode}
    직원코드 : ${requestParam.body.empCode}
    아이디 : ${requestParam.body.userId}
    비밀번호 : ${requestParam.body.password}`;
    if (window.confirm(message)) {
      const response = await API.post("auth/sign-up", requestParam);
      console.log(response);
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
            width={"22vw"}
            height={"3vw"}
          ></InputComponent>
          <InputComponent
            onChange={onChangeContact}
            value={contact}
            label={"사원 연락처"}
            inputType={"text"}
            placeholder={"연락처 입력"}
            width={"22vw"}
            height={"3vw"}
            maxLength={13}
          ></InputComponent>
          <InputComponent
            value={empCode}
            label={"직원코드"}
            inputType={"text"}
            placeholder={"소속 지점"}
            width={"6.2vw"}
            height={"3vw"}
            $backgroundColor={"#cdcdcd"}
            readonly
          ></InputComponent>
          <InputComponent
            value={beCode}
            label={"지점코드"}
            inputType={"text"}
            placeholder={"소속 지점"}
            width={"8vw"}
            height={"3vw"}
            $backgroundColor={"#cdcdcd"}
            readonly
          ></InputComponent>
          <InputComponent
            value={beName}
            label={"지점이름"}
            inputType={"text"}
            placeholder={"소속 지점"}
            width={"12vw"}
            height={"3vw"}
            $backgroundColor={"#cdcdcd"}
            readonly
          ></InputComponent>
        </UpperBox>
        <MidBox>
          <InputComponent
            onChange={onChangeId}
            label={"아이디"}
            inputType={"text"}
            placeholder={"아이디 입력"}
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
          <SearchBox>
            <SearchComponent onChange={onChangeSearch}></SearchComponent>
          </SearchBox>
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
