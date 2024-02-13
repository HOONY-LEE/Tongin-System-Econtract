import styled from "styled-components";

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

const Label = styled.div`
  display: flex;
  justify-content: start;
  height: 2vw;
  font-size: 1vw;
`;

const InputBox = styled.div<{
  width?: string;
  height?: string;
  $backgroundColor?: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.width ? props.width : "24vw")};
  height: ${(props) => (props.height ? props.height : "4vw")};
  background-color: ${(props) =>
    props.$backgroundColor ? props.$backgroundColor : "white"};
  border-radius: 0.4vw;
  outline: 1px solid gray;
`;

const InputText: any = styled.input.attrs((props: { maxLength?: number }) => ({
  type: "text",
  maxLength: props.maxLength,
}))<{ $backgroundColor?: string; maxLength?: number }>`
  width: 94%;
  height: 100%;
  font-size: 1.2vw;
  outline: none;
  border: none;
  background-color: ${(props) =>
    props.$backgroundColor ? props.$backgroundColor : "white"};
`;

const InputPassword: any = styled.input.attrs({
  type: "password",
})<{ backgroundColor?: string }>`
  width: 94%;
  height: 100%;
  font-size: 1.2vw;
  outline: none;
  border: none;
  background-color: ${(props) =>
    props.backgroundColor ? props.backgroundColor : "white"};
`;

const InputNumber: any = styled.input.attrs({
  type: "number",
})<{ $backgroundColor?: string }>`
  width: 94%;
  height: 100%;
  font-size: 1.2vw;
  outline: none;
  border: none;
  $background-color: ${(props) =>
    props.$backgroundColor ? props.$backgroundColor : "white"};
`;

export const InputComponent = (props: any) => {
  const {
    label,
    placeholder,
    width,
    height,
    inputType,
    onChange,
    defaultValue,
    value,
    $backgroundColor,
    maxLength,
  } = props;

  return (
    <>
      <InputArea>
        <Label>{label}</Label>
        <InputBox
          width={width}
          height={height}
          $backgroundColor={$backgroundColor}
        >
          {inputType === "text" ? (
            <InputText
              placeholder={placeholder}
              onChange={onChange}
              defaultValue={defaultValue}
              value={value}
              $backgroundColor={$backgroundColor}
              maxLength={maxLength}
            ></InputText>
          ) : null}
          {inputType === "password" ? (
            <InputPassword
              placeholder={placeholder}
              onChange={onChange}
              defaultValue={defaultValue}
              value={value}
              $backgroundColor={$backgroundColor}
              maxLength={maxLength}
            ></InputPassword>
          ) : null}
          {inputType === "number" ? (
            <InputNumber
              placeholder={placeholder}
              onChange={onChange}
              defaultValue={defaultValue}
              value={value}
              $backgroundColor={$backgroundColor}
              maxLength={maxLength}
            ></InputNumber>
          ) : null}
        </InputBox>
      </InputArea>
    </>
  );
};
