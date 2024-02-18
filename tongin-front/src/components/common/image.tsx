import styled from "styled-components";

export const Image = styled.img.attrs((props: {}) => ({}))`
  width: ${(props) => (props.width ? props.width : "6vw")};
  height: ${(props) => (props.height ? props.height : "6vw")};
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: scale-down;
`;
