import styled from "styled-components";

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  outline: 1px dashed black;
`;

const Label = styled.div`
  display: flex;
  justify-content: start;
  height: 2vw;
  font-size: 1.4vw;
`;

const InputBox = styled.div<{
  width?: string;
  height?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.width ? props.width : "24vw")};
  height: ${(props) => (props.height ? props.height : "4vw")};
  background-color: white;
  border-radius: 8px;
  outline: 1px solid gray;
`;

const InputText: any = styled.input.attrs({
  type: "text",
})`
  width: 94%;
  height: 100%;
  font-size: 1.4vw;
  outline: none;
  border: none;
`;

const InputPassword: any = styled.input.attrs({
  type: "password",
})`
  width: 94%;
  height: 100%;
  font-size: 1.4vw;
  outline: none;
  border: none;
`;

const InputNumber: any = styled.input.attrs({
  type: "number",
})`
  width: 94%;
  height: 100%;
  font-size: 1.4vw;
  outline: none;
  border: none;
`;

export const InputComponent = (props: any) => {
  const { label, placeholder, width, height, inputType, onChange } = props;

  return (
    <>
      <InputArea>
        <Label>{label}</Label>
        <InputBox width={width} height={height}>
          {inputType === "text" ? (
            <InputText
              placeholder={placeholder}
              onChange={onChange}
            ></InputText>
          ) : null}
          {inputType === "password" ? (
            <InputPassword
              placeholder={placeholder}
              onChange={onChange}
            ></InputPassword>
          ) : null}
          {inputType === "number" ? (
            <InputNumber
              placeholder={placeholder}
              onChange={onChange}
            ></InputNumber>
          ) : null}
        </InputBox>
      </InputArea>
    </>
  );
};
