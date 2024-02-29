import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ListBox = styled.div`
  background-color: #f4f4f4;
  width: 100%;
  height: 7vw;
  border-radius: 0.6vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 2vw;
`;

export default function ChargeListComponent(props: any) {
  const ChargeMenuList = [
    { id: 0, title: "이사 비용", subtitle: "Moving Charge" },
    { id: 1, title: "옵션 비용", subtitle: "Moving Charge" },
    { id: 2, title: "보관 비용", subtitle: "Moving Charge" },
    { id: 3, title: "입주청소서비스 비용", subtitle: "Moving Charge" },
    { id: 4, title: "탈취살균서비스 비용", subtitle: "Moving Charge" },
    { id: 5, title: "정리수납서비스 비용", subtitle: "Moving Charge" },
    { id: 6, title: "부가세", subtitle: "Moving Charge" },
    { id: 6, title: "계약금", subtitle: "Moving Charge" },
    { id: 6, title: "잔금", subtitle: "Moving Charge" },
  ];

  return (
    <Wrapper>
      {ChargeMenuList.map((item: any) => {
        return <ListBox>{item.title}</ListBox>;
      })}
    </Wrapper>
  );
}
