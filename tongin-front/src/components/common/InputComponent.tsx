import { useState } from "react";
import styled, { css } from "styled-components";

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
  $isFocused?: boolean; // 타입을 명시적으로 지정
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.width ? props.width : "24vw")};
  height: ${(props) => (props.height ? props.height : "4vw")};
  background-color: ${(props) =>
    props.$backgroundColor ? props.$backgroundColor : "white"};
  border-radius: 0.4vw;
  outline: 0.2vw solid #c4c4c4;

  /* 포커스 되었을 때의 스타일 */
  ${(props) =>
    props.$isFocused &&
    css`
      outline: 0.2vw solid #ff7f3b;
    `}
`;

const InputText: any = styled.input.attrs(
  (props: { maxLength?: number; fontSize?: string }) => ({
    type: "text",
    maxLength: props.maxLength,
  })
)<{ $backgroundColor?: string; maxLength?: number; fontSize: string }>`
  width: 94%;
  height: 100%;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.2vw")};
  outline: none;
  border: none;
  background-color: ${(props) =>
    props.$backgroundColor ? props.$backgroundColor : "white"};
`;

const InputPassword: any = styled.input.attrs({
  type: "password",
})<{ $backgroundColor?: string; maxLength?: number; fontSize: string }>`
  width: 94%;
  height: 100%;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.2vw")};
  outline: none;
  border: none;
  background-color: ${(props) =>
    props.$backgroundColor ? props.$backgroundColor : "white"};
`;

const InputNumber: any = styled.input.attrs({
  type: "number",
})<{ $backgroundColor?: string; maxLength?: number; fontSize: string }>`
  width: 94%;
  height: 100%;
  font-size: ${(props) => (props.fontSize ? props.fontSize : "1.2vw")};
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
    fontSize,
    onFocus,
  } = props;

  // 포커스 여부를 상태로 관리
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <>
      <InputArea>
        {label && <Label>{label}</Label>}
        <InputBox
          width={width}
          height={height}
          $backgroundColor={$backgroundColor}
          $isFocused={isFocused}
        >
          {inputType === "text" ? (
            <InputText
              placeholder={placeholder}
              onChange={onChange}
              defaultValue={defaultValue}
              value={value}
              $backgroundColor={$backgroundColor}
              maxLength={maxLength}
              fontSize={fontSize}
              onFocus={(e: any) => {
                setIsFocused(true); // 1.isFocused를 true로 변경
                onFocus && onFocus(e); // 2. 부모 컴포넌트로 포커스 이벤트 전달
              }}
              onBlur={() => setIsFocused(false)}
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
              fontSize={fontSize}
              onFocus={(e: any) => {
                setIsFocused(true); // 1.isFocused를 true로 변경
                onFocus && onFocus(e); // 2. 부모 컴포넌트로 포커스 이벤트 전달
              }}
              onBlur={() => setIsFocused(false)}
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
              fontSize={fontSize}
              onFocus={(e: any) => {
                setIsFocused(true); // 1.isFocused를 true로 변경
                onFocus && onFocus(e); // 2. 부모 컴포넌트로 포커스 이벤트 전달
              }}
              onBlur={() => setIsFocused(false)}
            ></InputNumber>
          ) : null}
        </InputBox>
      </InputArea>
    </>
  );
};
