import styled from "styled-components";
import CustomButton from "../components/common/customButton";
import { useNavigate } from "react-router-dom";
import { Container, Wrapper } from "../components/common/flexWrapper";
import AdminTabComponent from "../components/common/adminTabComponent";

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 30%;
  margin-top: 6vh;
`;

export default function Admin() {
  const navigate = useNavigate();

  const moveToCreate = () => {
    navigate("/admin/create-account");
  };

  return (
    <>
      <Container>
        <Wrapper>
          <BtnBox>
            <AdminTabComponent></AdminTabComponent>
          </BtnBox>
        </Wrapper>
      </Container>
    </>
  );
}
