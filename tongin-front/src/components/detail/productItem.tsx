import styled from "styled-components";
import QuantityComponent from "../common/quantityComponent";
import QuantityInputComponent from "../common/quantityInputComponent";
import MethodSelectBoxComponent from "./methodSelectBoxComponent";
import { useEffect, useState } from "react";

const ProductItemBox = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 7vw;
  background-color: #f4f4f4;
  border-radius: 0.6vw;
  margin-bottom: 1vw;
`;

const NameBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 40%;
  height: 6vw;
`;

const RemarkBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: 20vw;
  height: 4.2vw;
  margin-left: 3vw;
  border-radius: 0.4vw;
  background-color: white;
  outline: 0.1vw solid #353535;
`;

const RemarkInput = styled.input`
  border: none;
  outline: none;
  background-color: none;
  width: 100%;
  height: 100%;
  margin-left: 1vw;
  font-size: 2vw;
`;

const QuantityBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26%;
  height: 6vw;
`;

const CBMBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 17%;
  height: 6vw;
`;
const HandleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18%;
  height: 6vw;
`;

const Title = styled.p`
  margin-left: 2vw;
  font-size: 2.4vw;
  font-weight: 500;
  height: 3vw;
  line-height: 3vw;
`;

const Subtitle = styled.p`
  font-size: 1vw;
  font-weight: 300;
  height: 3vw;
  line-height: 4vw;
  margin-left: 0.4vw;
`;

export default function ProductItem(props: any) {
  const {
    item,
    setCurrentProductList,
    roomId,
    articleId,
    totalQuantity,
    totalCBM,
    setTotalQuantity,
    setTotalCBM,
  } = props;

  const [remark, setRemark] = useState(item.article.articleRemark);
  const onChangeInput = (e: any) => {
    setRemark(e.target.value);
  };

  useEffect(() => {
    setCurrentProductList((prev: any) => {
      const updatedList = [...prev];
      updatedList[roomId].articleData[articleId].article.articleRemark = remark;
      return updatedList;
    });
  }, [remark]);

  return (
    <ProductItemBox key={item.sortingNumber}>
      <NameBox>
        <Title>{item.article.articleName}</Title>
        <Subtitle>{item.article.articleNameEng}</Subtitle>
        {item.article.articleNameEng === "Etc" && (
          <RemarkBox>
            <RemarkInput
              placeholder={"물품명을 입력하세요."}
              value={remark}
              onChange={onChangeInput}
            ></RemarkInput>
          </RemarkBox>
        )}
      </NameBox>
      <QuantityBox>
        <QuantityComponent
          roomId={roomId}
          articleId={articleId}
          quantity={item.article.amount}
          setCurrentProductList={setCurrentProductList}
          totalQuantity={totalQuantity}
          totalCBM={totalCBM}
          setTotalQuantity={setTotalQuantity}
          setTotalCBM={setTotalCBM}
        ></QuantityComponent>
      </QuantityBox>
      <CBMBox>
        <QuantityInputComponent
          setCurrentProductList={setCurrentProductList}
          quantity={item.article.cbm}
          articleName={item.article.articleName}
          unit={"CBM"}
          roomId={roomId}
          articleId={articleId}
          totalQuantity={totalQuantity}
          totalCBM={totalCBM}
          setTotalQuantity={setTotalQuantity}
          setTotalCBM={setTotalCBM}
        ></QuantityInputComponent>
      </CBMBox>
      <HandleBox>
        <MethodSelectBoxComponent
          method={item.article.carryType}
          roomId={roomId}
          articleId={articleId}
          setCurrentProductList={setCurrentProductList}
        ></MethodSelectBoxComponent>
      </HandleBox>
    </ProductItemBox>
  );
}
