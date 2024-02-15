import styled from "styled-components";
import CustomButton from "../common/customButton";
import API from "../../API/API";
import { useEffect, useState } from "react";
import AdminUserList from "./adminUserList";

export default function AdminAccountComponent() {
  const [userList, setUserList] = useState<any[]>([]);

  // 가입된 유저리스트 받아오기
  const getUserList = async () => {
    try {
      const response = await API.get("/user/list");
      setUserList(response.data.userList);
    } catch (error) {
      alert(error);
    }
  };

  // 유저 비활성화
  const deactivateAccount = async (id: string, name: string) => {
    if (
      window.confirm(
        `정말 "${name}" 아이디 : ${id} 사용자를 비활성화하시겠습니까?`
      )
    ) {
      const response = await API.delete(`/user/${id}`);
      console.log(response);
      alert("정상적으로 비활성화 되었습니다.");
      getUserList();
    }
  };
  // 유저 활성화
  const activateAccount = async (id: string, name: string) => {
    if (
      window.confirm(
        `정말 "${name}" 아이디 : ${id} 사용자를 활성화하시곘습니까?`
      )
    ) {
      const response = await API.put(`/user/reactivate/${id}`);
      console.log(response);
      alert("정상적으로 활성화되었습니다.");
      getUserList();
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
        deactivateAccount={deactivateAccount}
        activateAccount={activateAccount}
      ></AdminUserList>
    </>
  );
}
