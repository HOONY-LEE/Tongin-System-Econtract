import { useState } from "react";
import styled, { css } from "styled-components";
import CustomButton from "../common/customButton";
import DefaultSearchResult from "./defaultSearchResult";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const ListTitle = styled.div`
  margin-top: 2vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 2vw;
  border-radius: 0.2vw;
  background-color: #ebebeb;
  box-shadow: 1px 1px 3vw 1vw #dddddd35;
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
  /* cursor: pointer; */

  // isselected prop이 true일 때 SelectedItemStyle을 적용합니다.
  ${(props) => props.isselected && SelectedItemStyle}

  &:hover {
    background-color: #fff7f0; // hover 시 배경색상을 변경합니다.
  }
`;

const NumberBox = styled.div`
  width: 2vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const NameBox = styled.div`
  width: 8vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EmpCodeBox = styled.div`
  width: 10vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContactBox = styled.div`
  width: 10vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BeNmBox = styled.div`
  width: 10vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BeCodeBox = styled.div`
  width: 5vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const IdPwBox = styled.div`
  width: 10vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteBox = styled.div`
  width: 6vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function ListItem(props: any) {
  const { dataList, getUserList, deactivateAccount, activateAccount } = props;

  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );

  // const onClickListItem = (index: number) => {
  //   setSelectedItemIndex(index);
  //   const selectedEmp = dataList[index];
  // };

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
            <IdPwBox>{item.userId}</IdPwBox>
            <IdPwBox>{item.password}</IdPwBox>
            <DeleteBox>
              {item.status === 1 ? (
                <CustomButton
                  onClick={() => {
                    deactivateAccount(item.id, item.name);
                  }}
                  width={"3vw"}
                  height={"2vw"}
                  $bgColor={"#2FD04B"}
                  text={"활성화"}
                  radius={"0.4vw"}
                  size={"0.7vw"}
                  fontWeight={"300"}
                ></CustomButton>
              ) : (
                <CustomButton
                  onClick={() => {
                    activateAccount(item.id, item.name);
                  }}
                  width={"3vw"}
                  height={"2vw"}
                  $bgColor={"gray"}
                  text={"비활성화"}
                  radius={"0.4vw"}
                  size={"0.7vw"}
                  fontWeight={"300"}
                ></CustomButton>
              )}
            </DeleteBox>
          </ListItemBox>
        );
      })}
    </>
  );
}

export default function AdminUserList(props: any) {
  const { dataList, deleteAccount, deactivateAccount, activateAccount } = props;

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
          <IdPwBox>아이디</IdPwBox>
          <IdPwBox>비밀번호</IdPwBox>
          <DeleteBox>비활성화</DeleteBox>
        </ListTitle>
        {dataList.length > 0 ? (
          <ListItem
            dataList={dataList}
            deactivateAccount={deactivateAccount}
            activateAccount={activateAccount}
          ></ListItem>
        ) : (
          <DefaultSearchResult></DefaultSearchResult>
        )}
      </Wrapper>
    </>
  );
}
