import styled from "styled-components";
import CustomButton from "../common/customButton";
import API from "../../API/API";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    getUserList();
  }, []);

  return (
    <>
      <AdminUserList
        dataList={userList}
        getUserList={getUserList}
      ></AdminUserList>
    </>
  );
}
