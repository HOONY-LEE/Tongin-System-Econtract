import styled from "styled-components";
import { Image } from "../common/image";

const RoomItemBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 8vw;
  border-radius: 0.8vw;
  background-color: white;
  box-shadow: 1px 1px 3vw 1vw #dddddd35;
  margin-top: 2vw;
  cursor: pointer;
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
  /* outline: 1px solid green; */
  padding-top: 1.8vw;
`;

const SliderBox = styled.div`
  display: flex;
  align-items: center;
  width: 28vw;
  height: 2.3vw;
  overflow: hidden;
  /* outline: 1px dashed green; */
`;

const IndexBox = styled.div`
  width: 4vw;
  height: 4vw;
  border-radius: 100%;
  background-color: #ff7f3b;
  margin-top: 1vw;
  margin-left: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.4vw;
  font-weight: 500;
  color: white;
`;

const RoomName = styled.p`
  width: 24vw;
  height: 4vw;
  margin-top: 1vw;
  margin-left: 2vw;
  display: flex;
`;

const InputCBMBox = styled.div`
  display: flex;
  justify-content: center;
  width: 8vw;
  height: 80%;
  background-color: #dddddd;
  border-radius: 0.8vw;
  margin-right: 1vw;
`;

const InputCBMNumber = styled.p`
  display: flex;
  justify-content: end;
  align-items: center;
  color: black;
  font-size: 2.4vw;
  font-weight: 300;
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

export default function RoomItemComponent(props: any) {
  const { discardCBM, roomItem, index } = props;

  return (
    <>
      <RoomItemBox>
        <RoomInfoBox>
          <RoomNameBox>
            <IndexBox>{index + 1}</IndexBox>
            <RoomName>
              <Title>{roomItem.locationName.substring(0, 8)}</Title>
              <Subtitle>{`/${roomItem.locationNameEng}`}</Subtitle>
            </RoomName>
          </RoomNameBox>
          <SumBox>
            <InputArea>
              <InputCBMBox>
                <InputCBMNumber>{discardCBM}</InputCBMNumber>
              </InputCBMBox>
              <SubText>개</SubText>
            </InputArea>
            <InputArea>
              <InputCBMBox>
                <InputCBMNumber>{discardCBM}</InputCBMNumber>
              </InputCBMBox>
              <SubText>CBM</SubText>
            </InputArea>
          </SumBox>
        </RoomInfoBox>
        <SliderBox>
          <Image
            src={"/img/slider_down_icon.png"}
            width={"100%"}
            height={"4.3vw"}
          ></Image>
        </SliderBox>
      </RoomItemBox>
    </>
  );
}
