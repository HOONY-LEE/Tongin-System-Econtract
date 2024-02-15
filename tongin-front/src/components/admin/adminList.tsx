import { useState } from "react";
import styled, { css } from "styled-components";
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
  margin-top: 0.8vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 2vw;
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

const NameBox = styled.div`
  width: 26%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const EmpCodeBox = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ContactBox = styled.div`
  width: 26%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const BeNmBox = styled.div`
  width: 26%;
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
  const { empList, setEmpName, setEmpCode, setContact, setBeName, setBeCode } =
    props;

  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(
    null
  );

  const onClickListItem = (index: number) => {
    setSelectedItemIndex(index);
    const selectedEmp = empList[index];
    setEmpName(selectedEmp.name);
    setEmpCode(selectedEmp.empCode);
    setContact(selectedEmp.contact);
    setBeName(selectedEmp.beNm);
    setBeCode(selectedEmp.beCode);
  };
  return (
    <>
      {empList.map((item: any, index: number) => {
        return (
          <ListItemBox
            key={index}
            onClick={() => onClickListItem(index)}
            isselected={selectedItemIndex === index ? true : false}
          >
            <NameBox>{item.name.match(/[가-힣A-Za-z()]+[^,()]+/)}</NameBox>
            <EmpCodeBox>{item.empCode}</EmpCodeBox>
            <ContactBox>{item.contact}</ContactBox>
            <BeNmBox>{item.beNm.match(/[가-힣A-Za-z()]+[^,()]+/)}</BeNmBox>
            <BeCodeBox>{item.beCode}</BeCodeBox>
          </ListItemBox>
        );
      })}
    </>
  );
}

export default function AdminList(props: any) {
  const { empList, setEmpName, setEmpCode, setContact, setBeName, setBeCode } =
    props;

  return (
    <>
      <Wrapper>
        <ListTitle>
          <NameBox>사원명</NameBox>
          <EmpCodeBox>사원코드</EmpCodeBox>
          <ContactBox>연락처</ContactBox>
          <BeNmBox>지점이름</BeNmBox>
          <BeCodeBox>지점코드</BeCodeBox>
        </ListTitle>
        {empList.length > 0 ? (
          <ListItem
            empList={empList}
            setEmpName={setEmpName}
            setEmpCode={setEmpCode}
            setContact={setContact}
            setBeName={setBeName}
            setBeCode={setBeCode}
          ></ListItem>
        ) : (
          <DefaultSearchResult></DefaultSearchResult>
        )}
      </Wrapper>
    </>
  );
}
