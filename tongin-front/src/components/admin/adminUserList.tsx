import { useState } from "react";
import styled, { css } from "styled-components";
import CustomButton from "../common/customButton";
import API from "../../API/API";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ListTitle = styled.div`
  margin-top: 0.8vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 1.8vw;
  border-radius: 0.2vw;
  background-color: #ebebeb;
  font-size: 0.8vw;
`;

const SelectedItemStyle = css`
  background-color: #fff7f0; // 선택된 항목의 배경색상을 빨간색으로 설정합니다.
  outline: 0.1vw solid #ff9544;
`;

// ListItemBox 컴포넌트 정의
const ListItemBox = styled.div<{ isselected?: boolean }>`
  margin-top: 0.8vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 4vw;
  border-radius: 0.3vw;
  font-size: 1.2vw;
  background-color: white;
  box-shadow: 1px 1px 3vw 1vw #dddddd35;
  cursor: pointer;

  // isselected prop이 true일 때 SelectedItemStyle을 적용합니다.
  ${(props) => props.isselected && SelectedItemStyle}

  &:hover {
    background-color: #fff7f0; // hover 시 배경색상을 변경합니다.
  }
`;

const NumberBox = styled.div`
  width: 5%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const NameBox = styled.div`
  width: 14%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const EmpCodeBox = styled.div`
  width: 8%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ContactBox = styled.div`
  width: 16%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BeNmBox = styled.div`
  width: 16%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BeCodeBox = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

function ListItem(props: any) {
  const { dataList, getUserList } = props;

  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );

  // const onClickListItem = (index: number) => {
  //   setSelectedItemIndex(index);
  //   const selectedEmp = dataList[index];
  // };

  const deleteAccount = async (id: string, name: string) => {
    if (
      window.confirm(`정말 "${name}" 아이디 : ${id} 사용자를 삭제하시겠습니까?`)
    ) {
      const response = await API.delete(`/user/${id}`);
      console.log(response);
      alert("정상적으로 삭제되었습니다.");
      getUserList();
    }
  };

  return (
    <>
      {dataList.map((item: any, index: number) => {
        return (
          <ListItemBox
            key={item.no}
            // onClick={() => onClickListItem(index)}
            // isselected={selectedItemIndex === index ? true : false}
          >
            <NumberBox>{item.no}</NumberBox>
            <NameBox>{item.name}</NameBox>
            <EmpCodeBox>{item.empCod}</EmpCodeBox>
            <ContactBox>{item.contact}</ContactBox>
            <BeNmBox>{item.branch.branchName}</BeNmBox>
            <BeCodeBox>{item.branch.branchCode}</BeCodeBox>
            <BeCodeBox>{item.userId}</BeCodeBox>
            <BeCodeBox>{item.password}</BeCodeBox>
            <CustomButton
              onClick={() => {
                deleteAccount(item.id, item.name);
              }}
              width={"3vw"}
              height={"2vw"}
              $backgroundColor={"red"}
              size={"1vw"}
              text={"삭제"}
              radius={"0.4vw"}
            ></CustomButton>
          </ListItemBox>
        );
      })}
    </>
  );
}

export default function AdminUserList(props: any) {
  const { dataList } = props;

  return (
    <>
      <Wrapper>
        <ListTitle>
          <NumberBox>No.</NumberBox>
          <NameBox>이름</NameBox>
          <EmpCodeBox>사원코드</EmpCodeBox>
          <ContactBox>연락처</ContactBox>
          <BeNmBox>지점이름</BeNmBox>
          <BeCodeBox>지점코드</BeCodeBox>
          <BeCodeBox>아이디</BeCodeBox>
          <BeCodeBox>비밀번호</BeCodeBox>
          <BeCodeBox>삭제</BeCodeBox>
        </ListTitle>
        <ListItem dataList={dataList}></ListItem>
      </Wrapper>
    </>
  );
}
