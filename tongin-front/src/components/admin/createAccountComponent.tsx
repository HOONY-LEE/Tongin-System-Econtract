import styled from "styled-components";

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  outline: 1px solid black;
  width: 90%;
  height: 100%;
`;

const UpperBox = styled.div`
  background-color: #c5c5c5;
  width: 100%;
  height: 20vh;
`;

const MidBox = styled.div`
  background-color: #ffc5c5;
  width: 100%;
  height: 20vh;
`;

const LowerBox = styled.div`
  background-color: #e3e3ff;
  width: 100%;
  height: 16vh;
`;

export default function CreateAccountComponent() {
  return (
    <>
      <InputBox>
        <UpperBox></UpperBox>
        <MidBox></MidBox>
        <LowerBox></LowerBox>
      </InputBox>
    </>
  );
}
