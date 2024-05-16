import styled, { css } from "styled-components";
import ArrowLeftIcon from "../icon/arrowLeftIcon";
import ArrowRightIcon from "../icon/arrowRightIcon";
import CloseIcon from "../icon/closeIcon";
import { Image } from "../common/image";
import { useEffect, useState } from "react";
import API from "../../API/API";
import { useParams } from "react-router-dom";

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 84vw;
  height: 96%;
  margin-top: 2vw;
`;

const TopArea = styled.div`
  width: 80vw;
  height: 6vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const LeftArea = styled.div`
  width: 35%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const TextBox = styled.div`
  width: 20vw;
  height: 5vw;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.4vw;
  font-size: 1.8vw;
  background-color: #f0f0f0ab;
`;

const MidArea = styled.div`
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
const RightArea = styled.div`
  width: 35%;
  height: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
`;

const CloseBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  &&:hover {
    cursor: pointer;
  }
`;

const ContractWrapper = styled.div`
  margin-top: 1vh;
  width: 80vw;
  height: 113vw;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.8vw;
  border: 0.16vw solid gray;
`;

const ContractArea = styled.div`
  width: 98%;
  height: 98%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PrevBox = styled.div<{ $isActivate: boolean }>`
  width: 5vw;
  height: 5vw;
  background-color: ${(props) => (props.$isActivate ? "#ff7f3b" : "#e7e7e7")};
  border-radius: 0.4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    !props.$isActivate &&
    css`
      pointer-events: none;
    `}
`;

const NumBox = styled.div`
  width: 13vw;
  height: 5vw;
  background-color: #e7e7e7;
  border-radius: 0.4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2.4vw;
  font-weight: 600;
`;

const NextBox = styled.div<{ $isActivate: boolean }>`
  width: 5vw;
  height: 5vw;
  background-color: ${(props) => (props.$isActivate ? "#ff7f3b" : "#e7e7e7")};
  border-radius: 0.4vw;
  display: flex;
  justify-content: center;
  align-items: center;
  ${(props) =>
    !props.$isActivate &&
    css`
      pointer-events: none;
    `}
`;

const BottomArea = styled.div`
  margin-top: 1vw;
  width: 80vw;
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
`;

const ThumbnailBox = styled.div<{ index: number; $currentPage: number }>`
  width: 7vw;
  outline: 0.1vw solid gray;
  margin-right: 1vw;
  margin-bottom: 1.2vw;
  border-radius: 0.1vw;
  ${(props) =>
    props.index === props.$currentPage - 1 &&
    css`
      outline: 0.3vw solid #ff7f3b;
    `}
  &:hover {
    cursor: pointer;
  }
`;
export default function ContractImage(props: any) {
  const reNum = useParams().id;
  const [contractImageList, setContractImageList] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [prevBoxActive, setPrevBoxActive] = useState<boolean>(false);
  const [nextBoxActive, setNextBoxActive] = useState<boolean>(true);
  const [maxIndex, setMaxIndex] = useState<number>(1);

  // 계약서 이미지 리스트 API
  const getContractImageList = async () => {
    const response = await API.get(`/receipt/contract-image/${reNum}`);
    if (response.status === 200) {
      setContractImageList(response.data.contractImageList);
      setMaxIndex(response.data.contractImageList.length);
    } else {
      alert("getContractImageList() 실패");
    }
  };
  useEffect(() => {
    getContractImageList();
  }, []);

  const clickPrevPage = (e: any) => {
    if (currentPage <= 1) {
      return;
    } else {
      setCurrentPage(currentPage - 1);
    }
  };

  const clickNextPage = (e: any) => {
    if (currentPage >= maxIndex) {
      return;
    }
    setCurrentPage(currentPage + 1);
  };

  const onclickThumbnail = (index: number) => {
    setCurrentPage(index + 1);
  };

  const openContractImage = (path: string) => {
    window.open(`https://homenmove.net/${path}`);
  };

  const onClickClose = () => {
    window.history.back();
  };
  useEffect(() => {
    if (currentPage <= 1) {
      setPrevBoxActive(false);
      setNextBoxActive(true);
    } else {
      setPrevBoxActive(true);
      if (currentPage >= maxIndex) {
        setNextBoxActive(false);
      } else {
        setNextBoxActive(true);
      }
    }
  }, [currentPage]);

  useEffect(() => {}, [contractImageList]);

  return (
    <Wrapper>
      <Container>
        <TopArea>
          <LeftArea>
            <TextBox>
              생성일 :
              {contractImageList.length > 1 &&
                contractImageList[currentPage - 1].createdAt.substring(0, 10)}
            </TextBox>
          </LeftArea>
          <MidArea>
            <PrevBox $isActivate={prevBoxActive}>
              <ArrowLeftIcon
                onClick={(e: any) => clickPrevPage(e)}
                width={"4.2vw"}
                height={"4.2vw"}
                fill={"white"}
              />
            </PrevBox>
            <NumBox>
              {currentPage} / {maxIndex}
            </NumBox>
            <NextBox $isActivate={nextBoxActive}>
              <ArrowRightIcon
                onClick={(e: any) => clickNextPage(e)}
                width={"4.2vw"}
                height={"4.2vw"}
                fill={"white"}
              />
            </NextBox>
          </MidArea>
          <RightArea>
            <CloseBox onClick={() => onClickClose()}>
              <CloseIcon height={"3vw"} fill={"#AEAEAE"} />
            </CloseBox>
          </RightArea>
        </TopArea>
        <ContractWrapper>
          <ContractArea>
            {contractImageList.map((item: any, index: number) => {
              if (index + 1 === currentPage) {
                return (
                  <Image
                    onClick={() => openContractImage(item.path)}
                    src={`https://homenmove.net/${item.path}`}
                    width={"100%"}
                    height={"100%"}
                    key={index}
                  ></Image>
                );
              }
            })}
          </ContractArea>
        </ContractWrapper>
        <BottomArea>
          {contractImageList.map((item: any, index: number) => {
            return (
              <ThumbnailBox
                key={index}
                index={index}
                $currentPage={currentPage}
                onClick={(e: any) => onclickThumbnail(index)}
              >
                <Image
                  src={`https://homenmove.net/${item.path}`}
                  width={"100%"}
                  height={"100%"}
                ></Image>
              </ThumbnailBox>
            );
          })}
        </BottomArea>
      </Container>
    </Wrapper>
  );
}
