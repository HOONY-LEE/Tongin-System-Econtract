import React from "react";
import styled from "styled-components";

const Box: any = styled.div<{
  width?: string;
  height?: string;
  $bgColor?: string;
  color?: string;
  radius?: string;
  size?: string;
  fontWeight?: string;
  $outline?: string;
  $border?: string;
  $hoverBgColor?: string;
  $hoverColor?: string;
  disabled?: string;
  cursor?: string;
}>`
  display: flex;
  user-select: none;
  justify-content: center;
  align-items: center;
  width: ${(props) => (props.width ? props.width : "220px")};
  height: ${(props) => (props.height ? props.height : "50px")};
  background-color: ${(props) =>
    props.$bgColor
      ? props.disabled
        ? "#B9C1C9"
        : props.$bgColor
      : props.disabled
      ? "#dbdbdb"
      : "#FF7F3B"};
  color: ${(props) => (props.color ? props.color : "white")};
  border-radius: ${(props) => (props.radius ? props.radius : "6px")};
  font-size: ${(props) => (props.size ? props.size : "18px")};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : "600")};
  outline: ${(props) => (props.$outline ? props.$outline : "none")};
  border: ${(props) => (props.$border ? props.$border : "none")};
  pointer-events: ${(props) => (props.disabled ? "none" : "auto")};
  &:hover {
    /* background: ${(props) =>
      props.$hoverBgColor ? props.$hoverBgColor : "#FF8F53"};
    color: ${(props) => (props.$hoverColor ? props.$hoverColor : "white")};
    transition: 0.5s; */
    cursor: ${(props) => (props.cursor ? props.cursor : "pointer")};
  }
  &:disabled {
    background-color: gray;
  }
`;

export default function CustomButton(props: any) {
  const {
    width,
    height,
    text,
    $bgColor,
    $border,
    color,
    radius,
    size,
    fontWeight,
    $outline,
    $hoverBgColor,
    $hoverColor,
    disabled,
    cursor,
    onClick,
  } = props;

  return (
    <>
      <Box
        onClick={onClick}
        width={width}
        height={height}
        $bgColor={$bgColor}
        color={color}
        radius={radius}
        size={size}
        fontWeight={fontWeight}
        $outline={$outline}
        $border={$border}
        $hoverBgColor={$hoverBgColor}
        $hoverColor={$hoverColor}
        disabled={disabled}
        cursor={cursor}
      >
        {text ? text : "기본 버튼"}
      </Box>
    </>
  );
}
