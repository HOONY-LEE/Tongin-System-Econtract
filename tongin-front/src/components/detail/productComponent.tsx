import styled from "styled-components";
import API from "../../API/API";
import { useEffect, useState } from "react";
import { Image } from "../common/image";
import RoomItemComponent from "./roomItemComponent";
import CustomButton from "../common/customButton";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  /* background-color: #6020201d; */
`;

const TotalBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 9vw;
  border-bottom-left-radius: 0.6vw;
  border-bottom-right-radius: 0.6vw;
  box-shadow: 1px 1px 3vw 1vw #dddddd35;
`;

const RoomListBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin-top: 1vw;
  margin-bottom: 2vw;
`;

const TotalAMountBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16vw;
  height: 6vw;
`;

const CBMBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  width: 14vw;
  height: 7vw;
`;

const Title = styled.p`
  font-size: 2.4vw;
  font-weight: 600;
  height: 4vw;
  display: flex;
  align-items: center;
  margin-right: 0.4vw;
`;
const Subtitle = styled.p`
  font-size: 1.2vw;
  font-weight: 300;
  height: 3vw;
  display: flex;
  align-items: end;
`;

const SubText = styled.p`
  font-size: 1.4vw;
  font-weight: 400;
  height: 2vw;
  display: flex;
  align-items: center;
  margin-left: 1vw;
`;

const InputArea = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 5vw;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  width: 10vw;
  height: 78%;
  background-color: #f4f4f4;
  border-radius: 0.4vw;
`;

const InputNumber = styled.p`
  display: flex;
  justify-content: end;
  align-items: center;
  font-size: 2.6vw;
  font-weight: 400;
  width: 70%;
`;

export default function ProductComponent(props: any) {
  const { currentProductList, setCurrentProductList } = props;
  const [movingCBM, setMovingCBM] = useState<number>(0);
  const [discardCBM, setDiscardCBM] = useState<number>(0);
  const [totalCBM, setTotalCBM] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState<number>(0);

  // console.log("currentProductList>>>");
  // console.log(currentProductList);

  const saveProductList = async () => {
    // TODO : 물품정보 업데이트 API 호출
    try {
      const response = await API.post("url");
      if (response.status === 200) {
        alert("성공적으로 저장되었습니다.");
      } else {
        alert("물품정보 저장에 실패하였습니다.");
      }
    } catch (error) {
      alert("물품정보 저장에 실패하였습니다.");
    }
  };

  const calculateTotalCBM = (currentProductList: any) => {
    let movingSum = 0;
    let discardSum = 0;
    let totalSum = 0;

    currentProductList.forEach((item: any) => {
      const articleData = item.articleData;
      articleData.forEach((article: any) => {
        // 운반, 경유는 이사물량으로 합계
        if (article.article.carryType == 0 || article.article.carryType == 3) {
          movingSum += article.article.cbm;

          // 폐기, 하역은 폐기물량으로 합계
        } else if (
          article.article.carryType == 1 ||
          article.article.carryType == 2
        ) {
          discardSum += article.article.cbm;
        }
        // 방치는 계산 안함
      });
    });
    // 전체 물량 = 이사물량 + 폐기물량
    totalSum = movingSum + discardSum;

    setMovingCBM(movingSum);
    setDiscardCBM(discardSum);
    setTotalCBM(totalSum);
  };
  useEffect(() => {
    calculateTotalCBM(currentProductList);
  }, [currentProductList]);

  return (
    <>
      <Wrapper>
        <TotalBox>
          <TotalAMountBox>
            <Title>합계</Title>
            <Subtitle>/Total Amount</Subtitle>
          </TotalAMountBox>
          <CBMBox>
            <SubText>이사/운반</SubText>
            <InputArea>
              <InputBox>
                <InputNumber>{movingCBM}</InputNumber>
              </InputBox>
              <SubText>CBM</SubText>
            </InputArea>
          </CBMBox>
          <CBMBox>
            <SubText>폐기/하역</SubText>
            <InputArea>
              <InputBox>
                <InputNumber>{discardCBM}</InputNumber>
              </InputBox>
              <SubText>CBM</SubText>
            </InputArea>
          </CBMBox>
          <CBMBox>
            <SubText>전체물량</SubText>
            <InputArea>
              <InputBox>
                <InputNumber>{totalCBM}</InputNumber>
              </InputBox>
              <SubText>CBM</SubText>
            </InputArea>
          </CBMBox>
          <CBMBox>
            <CustomButton
              onClick={saveProductList}
              text={"저장하기"}
              width={"12vw"}
              height={"6.4vw"}
              size={"2vw"}
              radius={"0.4vw"}
            ></CustomButton>
          </CBMBox>
        </TotalBox>
        <RoomListBox>
          {currentProductList.map((item: any, index: number) => {
            return (
              <RoomItemComponent
                key={index + 1}
                index={index + 1}
                roomItem={item}
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                currentProductList={currentProductList}
                setCurrentProductList={setCurrentProductList}
              ></RoomItemComponent>
            );
          })}
        </RoomListBox>
      </Wrapper>
    </>
  );
}
