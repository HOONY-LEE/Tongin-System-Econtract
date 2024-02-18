import styled from "styled-components";
import QuantityComponent from "../common/quantityComponent";
import QuantityInputComponent from "../common/quantityInputComponent";

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
  width: 36%;
  height: 6vw;
`;

const QuantityBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28%;
  height: 6vw;
`;

const CBMBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 18%;
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
  const { item } = props;

  return (
    <ProductItemBox key={item.sortingNumber}>
      <NameBox>
        <Title>{item.article.articleName}</Title>
        <Subtitle>{item.article.articleNameEng}</Subtitle>
      </NameBox>
      <QuantityBox>
        <QuantityComponent></QuantityComponent>
      </QuantityBox>
      <CBMBox>
        <QuantityInputComponent></QuantityInputComponent>
      </CBMBox>
      <HandleBox>
        <QuantityInputComponent></QuantityInputComponent>
      </HandleBox>
    </ProductItemBox>
  );
}
