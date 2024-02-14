import styled from "styled-components";
import CustomButton from "../common/customButton";
import API from "../../API/API";
import { useState } from "react";
import AdminUserList from "./adminUserList";

const Title = styled.div`
  width: 100%;
  height: 2vw;
`;

export default function AdminAccountComponent() {
  const [userList, setUserList] = useState<any[]>([]);

  const getUserList = async () => {
    try {
      const response = await API.get("/user/list");
      setUserList(response.data.userList);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
      <CustomButton
        onClick={getUserList}
        text={"유저리스트 요청"}
      ></CustomButton>
      <AdminUserList empList={userList}></AdminUserList>

      {userList.map((item) => {
        return (
          <div key={item.id}>
            <div>{item.no}</div>
            <div>{item.name}</div>
            <div>{item.empCod}</div>
            <div>{item.branch.branchName}</div>
            <div>{item.branch.branchCode}</div>
            <div>{item.userId}</div>
            <div>{item.password}</div>
          </div>
        );
      })}
    </>
  );
}
