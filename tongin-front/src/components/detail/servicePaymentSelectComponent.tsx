import { useState } from "react";
import styled, { css } from "styled-components";
import RoomSizeBox from "./roomSizeBox";
import PriceInputBox from "./priceInputBox";
import { format } from "date-fns";
import DateModalComponent from "./dateModalComponent";

const Wrarpper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: space-between;
  width: 100%;
`;

const SelectListBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 6vw;
`;

const SelectList = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 6vw;
`;

const SelectBox = styled.div<{
  width?: string;
  $itemCount?: string;
  $isSelected?: boolean;
}>`
  width: ${(props) => (props.$itemCount ? props.$itemCount : "24vw")};
  height: 5vw;
  background-color: #f4f4f4;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.2vw;
  font-weight: 400;
  border-radius: 0.4vw;
  &:hover {
    cursor: pointer;
  }
  ${(props) =>
    props.$isSelected &&
    css`
      background-color: #ff7f3b;
      color: white;
    `}
`;

const OptionalBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 66%;
`;

const MoveDateBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 36%;
  &&:hover {
    cursor: pointer;
  }
`;
const MoveDateInput = styled.div`
  width: 100%;
  height: 5vw;
  display: flex;
  font-size: 1.8vw;
  font-weight: 500;
  flex-direction: column;
  align-items: center;
  outline: 0.2vw solid #dbdbdb;
  border-radius: 0.6vw;
  justify-content: center;
  &&:hover {
    cursor: pointer;
  }
`;

const InputBox = styled.input.attrs({})<{}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  text-align: center;
  outline: none;
  /* margin-left: 1vw; */
  font-size: 1.8vw;
  font-weight: 500;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  border: none;
  width: 90%;
  height: 100%;
`;

export default function ServicePaymentSelectComponent(props: any) {
  const { optionList, selectedValue, setSelectedValue } = props;
  const [isDateModalOpen, setIsDateModalOpen] = useState<boolean>(false);
  const formattedDate = /^(\d{4})(\d{2})(\d{2})$/;

  // 옵션 선택 핸들러
  const selectOptionHandle = (id: number) => {
    setSelectedValue(id);
  };

  return (
    <Wrarpper>
      <SelectListBox>
        <SelectList>
          {optionList.map((item: any, index: number) => {
            return (
              <SelectBox
                onClick={(e) => selectOptionHandle(item.id)}
                $itemCount={`${94 / optionList.length}%`}
                key={index}
                $isSelected={item.id === selectedValue}
              >
                {item.name}
              </SelectBox>
            );
          })}
        </SelectList>
      </SelectListBox>
    </Wrarpper>
  );
}
