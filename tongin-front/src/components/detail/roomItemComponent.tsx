import styled, { css } from "styled-components";
import { Image } from "../common/image";
import { useEffect, useState } from "react";
import ProductItem from "./productItem";

const RoomItemBox = styled.div<{
  $isOpened?: boolean;
  selectedTab?: number;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 8vw;
  border-top-right-radius: 0.8vw;
  border-top-left-radius: 0.8vw;
  background-color: white;
  margin-top: 2vw;
  box-shadow: 4px 4px 3vw 2vw #dddddd11;
  cursor: pointer;

  // 슬라이더가 열렸을 때 스타일
  ${(props) =>
    props.$isOpened &&
    css`
      border: 0.3vw solid #ff7f3b;
      border-bottom: none;
    `}
`;

const RoomInfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  width: 100%;
  height: 74%;
  /* outline: 1px dashed red; */
`;

const RoomNameBox = styled.div`
  display: flex;
  align-items: center;
  width: 32vw;
  height: 100%;
  /* outline: 1px solid green; */
`;

const SumBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 32vw;
  height: 100%;
  padding-top: 1.8vw;
  margin-right: 2vw;
`;

const SliderBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 2vw;
  background-color: white;
  border-bottom-right-radius: 0.8vw;
  border-bottom-left-radius: 0.8vw;
  box-shadow: 4px 4px 3vw 2vw #dddddd11;
`;

const SliderCloseBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 21.8vw;
  height: 2vw;
  /* background-color: white; */
  border-bottom: 0.8vw solid #ff7f3b;
  /* border-bottom-right-radius: 0.8vw; */
  /* border-bottom-left-radius: 0.8vw; */
  /* box-shadow: 4px 4px 3vw 2vw #dddddd11; */
`;

const IndexBox = styled.div`
  width: 3vw;
  height: 3vw;
  border-radius: 100%;
  background-color: #ff7f3b;
  margin-top: 2vw;
  margin-left: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4vw;
  font-weight: 500;
  color: white;
`;

const RoomName = styled.div`
  width: 24vw;
  height: 4vw;
  margin-top: 2vw;
  margin-left: 2vw;
  display: flex;
`;

const InputCBMBox = styled.div`
  display: flex;
  justify-content: center;
  width: 8.7vw;
  height: 4.6vw;
  background-color: #f4f4f4;
  border-radius: 0.6vw;
  margin-right: 0.8vw;
`;

const InputCBMNumber = styled.p`
  display: flex;
  justify-content: end;
  align-items: center;
  color: black;
  font-size: 2.6vw;
  font-weight: 500;
  width: 70%;
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
  font-size: 1.2vw;
  font-weight: 300;
  height: 2vw;
  display: flex;
  align-items: center;
`;

const InputArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 5vw;
  margin-left: 2vw;
`;

const InputBox = styled.div`
  display: flex;
  justify-content: center;
  width: 8vw;
  height: 80%;
  background-color: #ff7f3b;
  border-radius: 0.8vw;
  margin-right: 1vw;
`;

const InputNumber = styled.p`
  display: flex;
  justify-content: end;
  align-items: center;
  color: white;
  font-size: 3vw;
  font-weight: 400;
  width: 70%;
`;

const OpenedBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  border: 0.3vw solid #ff7f3b;
  border-top: 0.1vw solid gray;
  border-bottom-left-radius: 1vw;
  border-bottom-right-radius: 1vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: end;
`;

const TitleBox = styled.div`
  display: flex;
  align-items: center;
  width: 94%;
  height: 3vw;
  margin-top: 2vw;
  font-size: 1.6vw;
  font-weight: 500;
`;

const NameBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 32vw;
  height: 100%;
  padding-left: 2vw;
`;

const QuantityBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20vw;
  height: 100%;
`;
const CBMBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 19vw;
  height: 100%;
`;
const MethodBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 11vw;
  height: 100%;
`;
const ProductListBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 94%;
  height: 95%;
  margin-top: 1vw;
  margin-bottom: 2vw;
`;

export default function RoomItemComponent(props: any) {
  const {
    roomItem,
    index,
    selectedTab,
    setSelectedTab,
    currentProductList,
    setCurrentProductList,
  } = props;
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalCBM, setTotalCBM] = useState(0);
  const [totalNum, setTotalNum] = useState([
    { id: 1, quantity: 3, cbm: 0 },
    { id: 2, quantity: 4, cbm: 0 },
    { id: 3, quantity: 0, cbm: 0 },
    { id: 4, quantity: 0, cbm: 0 },
    { id: 5, quantity: 0, cbm: 0 },
    { id: 6, quantity: 0, cbm: 0 },
    { id: 7, quantity: 0, cbm: 0 },
    { id: 8, quantity: 0, cbm: 0 },
    { id: 9, quantity: 5, cbm: 0 },
    { id: 10, quantity: 0, cbm: 0 },
  ]);

  const handleOnClick = (index: number) => {
    if (!isOpened) {
      setSelectedTab(index);
    } else {
      setSelectedTab(0);
    }
  };

  const sliderClose = () => {
    setIsOpened(false);
    setSelectedTab(0);
  };

  useEffect(() => {
    if (selectedTab === index) {
      setIsOpened(true);
    } else {
      setIsOpened(false);
    }
  }, [selectedTab]);

  const calculateTotals = (articleList: any) => {
    let quantitySum = 0;
    let cbmSum = 0;

    articleList.forEach((item: any) => {
      quantitySum += item.article.amount;
      cbmSum += item.article.cbm;
    });

    setTotalQuantity(quantitySum);
    setTotalCBM(cbmSum);
  };
  useEffect(() => {
    const articleData = currentProductList[roomItem.id - 1].articleData;
    calculateTotals(articleData);
  }, [currentProductList]);

  return (
    <>
      <RoomItemBox
        onClick={() => {
          handleOnClick(index);
        }}
        $isOpened={isOpened}
      >
        <RoomInfoBox>
          <RoomNameBox>
            <IndexBox>{index}</IndexBox>
            <RoomName>
              <Title>{roomItem.locationName.substring(0, 8)}</Title>
              <Subtitle>{`/${roomItem.locationNameEng}`}</Subtitle>
            </RoomName>
          </RoomNameBox>
          <SumBox>
            <InputArea>
              {/* <InputCBMBox>
                <InputCBMNumber>{totalQuantity}</InputCBMNumber>
              </InputCBMBox>
              <SubText>개</SubText> */}
            </InputArea>
            <InputArea>
              <InputCBMBox>
                <InputCBMNumber>{totalCBM}</InputCBMNumber>
              </InputCBMBox>
              <SubText>CBM</SubText>
            </InputArea>
          </SumBox>
        </RoomInfoBox>
      </RoomItemBox>
      {isOpened ? (
        <OpenedBox>
          <TitleBox>
            <NameBox>물품명</NameBox>
            <QuantityBox>메모</QuantityBox>
            <CBMBox>부피(CBM)</CBMBox>
            <MethodBox>처리방법</MethodBox>
          </TitleBox>
          <ProductListBox>
            {roomItem.articleData.map((item: any, id: number) => {
              return (
                <ProductItem
                  key={id}
                  item={item}
                  articleId={id}
                  roomId={index - 1}
                  setCurrentProductList={setCurrentProductList}
                  totalQuantity={totalQuantity}
                  totalCBM={totalCBM}
                  setTotalQuantity={setTotalQuantity}
                  setTotalCBM={setTotalCBM}
                ></ProductItem>
              );
            })}
          </ProductListBox>
          <SliderCloseBox onClick={sliderClose}>
            <Image
              src={"/img/slider_up_icon.png"}
              width={"26vw"}
              height={"4vw"}
            ></Image>
          </SliderCloseBox>
        </OpenedBox>
      ) : (
        <SliderBox
          onClick={() => {
            handleOnClick(index);
          }}
        >
          <Image
            src={"/img/slider_down_icon.png"}
            width={"26vw"}
            height={"4vw"}
          ></Image>
        </SliderBox>
      )}
    </>
  );
}
