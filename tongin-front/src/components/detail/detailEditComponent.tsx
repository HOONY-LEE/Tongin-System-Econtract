import { userInfo } from "os";
import React, { useRef } from "react";
import styled from "styled-components";
import { useState } from "react";
import react, { useEffect } from "react";
import TabComponent from "../home/tabComponent";
import axios from "axios";
import CustomButton from "../common/customButton";
import DaumPostcode from "react-daum-postcode";
import PostModalComponent from "./postModalComponent";
import ModalComponent from "../common/modalComponent";
import DayPicker from "react-day-picker";
// import "react-day-picker/lib/style.css";
import DateModalComponent from "./dateModalComponent";
import DetailEditSelectBoxComponent from "./detailEditSelectBoxComponent";
import { format } from "date-fns";
import API from "../../API/API";
import { useParams } from "react-router-dom";
import DetailEditContractFinishModal from "./detailEditContractFinishModal";
import { Toast } from "../common/toastMessegeComponent";
const ContentTop = styled.div`
  display: flex;
  justify-content: space-between;
  width: 88%;
  height: 20vw;
  /* outline: 0.2vw solid gray; */
  margin: 3vh 0vh 0.7vh 0vh;
`;
const ContentTopLFBox = styled.div`
  display: flex;
  align-items: start;
  justify-content: space-between;
  height: 20vw;
  flex-direction: column;
  /* outline: 0.2vw solid red; */
  margin: 0.7vh 0vh 0.7vh 0vh;
`;
const ContentTopLF = styled.div`
  display: flex;
  align-items: start;
  /* outline: 0.2vw solid red; */
`;
const ContentTopRhBox = styled.div`
  display: flex;
  height: 20vw;
  /* outline: 0.2vw solid red; */
`;
const ContentTopRh = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  height: 20vw;
  flex-direction: column;
  /* outline: 0.2vw solid blue; */
  margin: 0.7vh 0vh 0.7vh 0vh;
`;

const InfoLfBox = styled.div`
  height: 10vw;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  /* outline: 0.2vw solid green; */
  margin-right: 5vw;
`;
const InfoLfTitle = styled.div`
  height: 3vw;
  display: flex;
  font-size: 1.8vw;
  font-weight: 300;
  flex-direction: column;
  align-items: start;
  color: #b2b2b2;
  justify-content: start;
  /* outline: 0.2vw solid red; */
`;
const InfoLfContent = styled.div`
  height: 5vw;
  display: flex;
  font-size: 2.3vw;
  font-weight: 600;
  flex-direction: column;
  align-items: start;
  /* outline: 0.2vw solid blue; */

  border-radius: 0.5vw;
  justify-content: start;
`;
const InfoLfEditContent = styled.div`
  height: 5vw;
  display: flex;
  font-size: 2.3vw;
  font-weight: 600;
  flex-direction: column;
  align-items: start;
  /* outline: 0.2vw solid blue; */
  background-color: white;
  outline: 0.2vw solid #dbdbdb;
  border-radius: 0.5vw;
  justify-content: start;
  padding-left: 2vw;
`;
const InfoRhBox = styled.div`
  height: 10vw;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  /* outline: 0.2vw solid blue; */
`;
const InfoRhTitle = styled.div`
  width: 18vw;
  height: 3vw;
  display: flex;
  font-size: 1.8vw;
  font-weight: 300;
  flex-direction: column;
  text-align: end;
  align-items: end;
  color: #b2b2b2;
  justify-content: start;
  /* outline: 0.2vw solid red; */
`;
const InfoRhContent = styled.div`
  width: 18vw;
  height: 5vw;
  display: flex;
  color: #808080;
  text-align: end;
  font-size: 2.3vw;
  font-weight: 600;
  flex-direction: column;
  align-items: end;
  /* outline: 0.2vw solid blue; */
  justify-content: start;
`;
const UserStatus = styled.div`
  display: flex;
  font-size: 1.6vw;
  align-items: center;
  justify-content: end;
  /* outline: 1px dashed green; */
`;
const UserStatusColor = styled.div<{
  $bgColor?: string;
}>`
  background-color: ${(props) => props.$bgColor};
  width: 10vw;
  height: 4vw;
  font-weight: 500;
  display: flex;
  color: white;
  font-size: 1.8vw;
  align-items: center;
  justify-content: center;
  border-radius: 0.5vw;
`;

const BorderBottom = styled.div`
  border-bottom: 0.2vw solid #d6d6d6;
  width: 88%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ContentBottom = styled.div`
  display: flex;
  flex-direction: column;
  width: 88%;
  height: 100%;
  /* outline: 0.2vw solid green; */
  margin: 0.7vh 0vh 0.7vh 0vh;
`;
const UserAddressBox = styled.div`
  display: flex;
  flex-direction: column;
  /* outline: 0.2vw solid blue; */
  margin: 2vw 0 2vw 0;
`;
const UserAddressTitle = styled.div`
  height: 3vw;
  display: flex;
  font-size: 1.8vw;
  font-weight: 300;
  flex-direction: column;
  align-items: start;
  color: #b2b2b2;
  justify-content: start;
  /* outline: 0.2vw solid red; */
`;
const UserAddressInput = styled.div`
  width: 100%;
  height: 5vw;
  display: flex;
  font-size: 1.8vw;
  font-weight: 500;
  flex-direction: column;
  align-items: start;
  background-color: #f4f4f4;
  border-radius: 0.5vw;
  justify-content: center;
  /* outline: 0.2vw solid red; */
  padding-left: 2vw;
  margin-bottom: 1vw;
`;
const UserAddressEditInput = styled.div`
  width: 100%;
  height: 5vw;
  display: flex;
  font-size: 1.8vw;
  font-weight: 500;
  flex-direction: column;
  align-items: start;
  outline: 0.2vw solid #dbdbdb;
  border-radius: 0.5vw;
  justify-content: center;
  /* outline: 0.2vw solid red; */
  padding-left: 2vw;
  margin-bottom: 1vw;
`;
const MoveDateContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 1vw 0 1vw 0;
`;
const MoveDateBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 40%;
`;
const MoveDateTitle = styled.div`
  height: 3vw;
  display: flex;
  font-size: 1.8vw;
  font-weight: 300;
  flex-direction: column;
  align-items: start;
  color: #b2b2b2;
  justify-content: start;
  /* outline: 0.2vw solid red; */
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
  /* outline: 0.2vw solid red; */
  padding-left: 0.8vw;
  margin-bottom: 1vw;
`;
const MoveBtnContainer = styled.div`
  display: flex;

  flex-direction: column;
  width: 100%;
  margin: 1vw 0 1vw 0;
`;
const MoveBtnBox = styled.div`
  display: flex;
  justify-content: space-between;
`;
const MoveBtnTitle = styled.div`
  height: 3vw;
  display: flex;
  font-size: 1.8vw;
  font-weight: 300;
  flex-direction: column;
  align-items: start;
  color: #b2b2b2;
  justify-content: start;
  /* outline: 0.2vw solid red; */
`;
const MoveBtn = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.8vw;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  /* width: 15vw;
  height: 4vw; */
  width: 100%;

  border-radius: 0.6vw;
  /* margin: 1vw 0 1vw 0; */
  .focused {
    background-color: #5a5a5a;
    color: white;
    display: flex;
    align-items: center;
    font-size: 1.8vw;
    font-weight: 600;

    width: 15vw;
    height: 5vw;

    justify-content: center;
    border-radius: 0.6vw;
  }
  .desabled {
    display: flex;
    align-items: center;
    font-size: 1.8vw;
    font-weight: 600;

    width: 15vw;
    height: 5vw;

    justify-content: center;
    border-radius: 0.6vw;
    background-color: #f4f4f4;
  }
`;
const MoveBtnDesabled = styled.div`
  width: 15vw;
  display: flex;
  align-items: center;
  font-size: 1.8vw;
  font-weight: 600;
  /* color: #ffffff; */
  height: 4vw;
  background-color: #f4f4f4;
  justify-content: center;
  border-radius: 0.6vw;
  /* margin: 1vw 0 1vw 0; */
`;

const InputBox = styled.input.attrs({})<{}>`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  /* margin-left: 1vw; */
  font-size: 1.8vw;
  font-weight: 500;
  outline: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  border: none;
  width: 90%;
  height: 100%;
`;
const BtnBox = styled.div`
  margin: 5vw 0 4vw 0;
  display: flex;
  justify-content: space-between;
`;
export default function DetailEditComponent(props: any) {
  const {
    detailData,
    setDetailData,
    getDetailList,
    completionContract,
    setCompletionContract,
    setFetchStatus,
    setStatus,
  } = props;
  const [postData, setPostData] = useState<any>([]);
  const { detailEditVisible } = props;
  const [currentBtn, setCurrentBtn] = useState(0);
  const [addressType, setAddressType] = useState();
  const [dateType, setDateType] = useState();
  const [dateData, setDateData] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [movingDate, setMovingDate] = useState(new Date(detailData.movingDate));
  const [finishContract, setFinishContract] = useState<any>("");

  const reNum = useParams().id;
  const [isContractFinishModal, setIsContractFinishModal] =
    useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<any>(detailData.statusCode); //상태 번호 value

  const [prevAddressDetail, setPrevAddressDetail] = useState(
    detailData.preAddressDetail
  ); //전 상세주소value

  const [afterAddressDetail, setAfterAddressDetail] = useState(
    detailData.afterAddressDetail
  );

  const [userName, setUserName] = useState(detailData.name);
  const [userContact, setUserContact] = useState(detailData.contact);
  const [currentTab, setCurrentTab] = useState(0); //btn
  const BtnArr = [
    { name: "가정이사" },
    { name: "보관이사" },
    { name: "기업이사" },
    { name: "해외이사" },
    { name: "미니이사" },
  ];

  const selectMenuHandler = (index: number) => {
    console.log(index);
    setCurrentTab(index);
  };

  const onChangUserName = (e: any) => {
    console.log(e.target.value);
    setUserName(e.target.value);
  };

  useEffect(() => {
    setDetailData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.name = userName;
      updatedData.contact = userContact;
      updatedData.prevAddressDetail = prevAddressDetail;
      updatedData.afterAddressDetail = afterAddressDetail;
      return updatedData;
    });
  }, [
    userName,
    userContact,
    prevAddressDetail,
    afterAddressDetail,
    finishContract,
  ]);
  //계약서 상태 [계약]일시 계약날짜 추가
  useEffect(() => {
    setDetailData((prev: any) => {
      let today = new Date();
      const updatedData = { ...prev };
      if (finishContract) {
        updatedData.contractDate = format(today, "yMMdd");
        console.log("계약일", updatedData.contractDate);
      } else {
        updatedData.contractDate = "";
      }
      console.log("계약일", updatedData.contractDate);
      return updatedData;
    });
  }, [finishContract]);
  //////////////////////////////////
  const onChangUserContact = (e: any) => {
    const regExp = /[^0-9]/g;
    let formattedValue = e.target.value.replace(regExp, "").substring(0, 13);

    if (formattedValue.length === 9) {
      formattedValue = formattedValue.replace(
        /^(\d{2})(\d{3})(\d{4})$/,
        "$1-$2-$3"
      );
    } else if (formattedValue.length === 10) {
      formattedValue = formattedValue.replace(
        /^(\d{3})(\d{3})(\d{4})$/,
        "$1-$2-$3"
      );
    } else if (formattedValue.length === 11) {
      formattedValue = formattedValue.replace(
        /^(\d{3})(\d{4})(\d{4})$/,
        "$1-$2-$3"
      );
    }

    e.target.value = formattedValue;
    setUserContact(e.target.value);
    detailData.contact = userContact;
  };
  ////////////////////주소 모달 시작////////////////////

  //주소 모달 열기 핸들러
  const postHandleOpenModal = (type: any) => {
    setAddressType(type);
    setIsModalOpen(true);
  };

  //주소 모달 닫기 핸들러
  const postHandleCloseModal = () => {
    setIsModalOpen(false);
  };

  const postValueInput = (data: any) => {
    setPostData(data);

    if (addressType === "prev") {
      detailData.preAddress = `${data.address}${
        data.buildingName
          ? " (" + data.buildingName + ") (" + data.zonecode + ")"
          : ""
      }`;
    } else if (addressType === "after") {
      detailData.afterAddress = `${data.address}${
        data.buildingName
          ? " (" + data.buildingName + ") (" + data.zonecode + ")"
          : ""
      }`;
    }
  };

  const onSelectStatus = () => {
    detailData.statusCode = statusCode;
    console.log("onSelectStatus", detailData.statusCode);
  };

  //전 상세주소
  const onChangePrevAddressDetail = (e: any) => {
    console.log(e.target.value);
    setPrevAddressDetail(e.target.value);
  };
  //후 상세주소
  const onChangAfterAddressDetail = (e: any) => {
    console.log(e.target.value);
    setAfterAddressDetail(e.target.value);
  };

  ////////////////////날짜 모달 시작////////////////////
  // 날짜 모달 열기 핸들러
  const dateHandleOpenModal = (type: any) => {
    setIsDateModalOpen(true);
    setDateType(type);
  };

  // // 날짜 모달 닫기 핸들러
  const dateHandleCloseModal = () => {
    setIsDateModalOpen(false);
  };

  const dateValueInput = (data: any) => {
    console.log("dateValueInput", data);
    const myData = new Date(data);
    // setDateData(data);
    console.log("myData", myData);
    console.log(format(myData, "yMMdd"));
    if (!Number.isNaN(new Date(myData).getTime())) {
      if (dateType === "reception") {
        detailData.receptionDate = format(myData, "yMMdd");
      } else if (dateType === "moving") {
        detailData.movingDate = format(myData, "yMMdd");
      } else if (dateType === "consultation") {
        detailData.consultationDate = format(myData, "yMMdd");
      } else {
        return "";
      }
    } else {
      return "";
    }
  };
  // 에러방지를 위한 onChangeHandle
  const onChangeHandle = () => {};

  const deteValueDelete = () => {
    if (dateType === "reception") {
      detailData.receptionDate = "";
    } else if (dateType === "moving") {
      detailData.movingDate = "";
    } else if (dateType === "consultation") {
      detailData.consultationDate = "";
    } else {
      return "";
    }
    dateHandleCloseModal();
  };
  const formattedDate = /^(\d{4})(\d{2})(\d{2})$/;

  // 계약 상태 안내 모달 닫기 핸들
  const contractHandleCloseModal = () => {
    setIsContractFinishModal(false);
  };

  // 상세정보 저장 시 호출
  const detailPageSave = () => {
    if (finishContract) {
      setIsContractFinishModal(true);
    } else {
      putDetailData();
    }
  };

  // 상세정보 수정API
  const putDetailData = async () => {
    if (isContractFinishModal) {
      setIsContractFinishModal(false);
      setCompletionContract(true);
    }

    console.log("vvvvvv 보내기 전detailData vvvvv");
    console.log(statusCode);
    const requestPram = {
      receiptDetail: {
        name: detailData.name,
        contact: detailData.contact,
        statusCode: statusCode,
        preZipCode: detailData.address,
        preAddress: detailData.preAddress,
        preAddressDetail: detailData.prevAddressDetail,
        afterZipCode: detailData.address,
        afterAddress: detailData.afterAddress,
        afterAddressDetail: detailData.afterAddressDetail,
        receptionDate: detailData.receptionDate, // 접수일
        consultationScheduledDate: detailData.consultationDate, // 상담 예정일
        consultationDate: detailData.consultationDate, // 상담일
        contractDate: detailData.contractDate, // 계약일
        movingDate: detailData.movingDate, //이사일
      },
    };

    const response: any = await API.put(
      `/receipt/detail/${reNum}`,
      requestPram
    );
    if (response.status === 200) {
      console.log(response);
      setStatus("SUCCESS");
      setFetchStatus(true);

      detailEditVisible(false);
      getDetailList();
    } else if (response.statusCode === 400) {
      setFetchStatus(true);
      setStatus("FAIL");
      // alert("Fail to getDetailList()");
    }
  };

  return (
    <>
      {isContractFinishModal && (
        <DetailEditContractFinishModal
          onClose={contractHandleCloseModal}
          onFinish={putDetailData}
        />
      )}

      {isModalOpen && (
        <PostModalComponent
          onClose={postHandleCloseModal}
          postValueInput={postValueInput}
          addressType={addressType}
        />
      )}
      {isDateModalOpen && (
        <DateModalComponent
          value={"20240425"}
          dateValueInput={dateValueInput}
          onClose={dateHandleCloseModal}
          deteValueDelete={deteValueDelete}
        />
      )}
      <ContentTop>
        <ContentTopLFBox>
          <ContentTopLF>
            <InfoLfBox>
              <InfoLfTitle>고객명</InfoLfTitle>
              <InfoLfEditContent>
                <InputBox
                  placeholder="고객명을 입력해 주세요"
                  defaultValue={userName}
                  onChange={onChangUserName}
                ></InputBox>
              </InfoLfEditContent>
            </InfoLfBox>
            <InfoLfBox>
              <InfoLfTitle>계약번호</InfoLfTitle>
              <InfoLfContent>{detailData?.recNum}</InfoLfContent>
            </InfoLfBox>
          </ContentTopLF>
          <ContentTopLF>
            <InfoLfBox>
              <InfoLfTitle>전화번호</InfoLfTitle>
              <InfoLfEditContent>
                <InputBox
                  placeholder="전화번호를 입력해 주세요"
                  defaultValue={userContact}
                  onChange={onChangUserContact}
                ></InputBox>
              </InfoLfEditContent>
            </InfoLfBox>
          </ContentTopLF>
        </ContentTopLFBox>
        <ContentTopRhBox>
          <ContentTopRh>
            <InfoRhBox>
              <InfoRhTitle>계약담당자</InfoRhTitle>
              <InfoRhContent>{detailData?.branch?.branchBoss}</InfoRhContent>
            </InfoRhBox>
            <InfoRhBox>
              <InfoRhTitle>담당자연락처</InfoRhTitle>
              <InfoRhContent>{detailData?.planner?.contact}</InfoRhContent>
            </InfoRhBox>
          </ContentTopRh>
          <ContentTopRh>
            <InfoRhBox>
              <InfoRhTitle>진행상태</InfoRhTitle>
              <InfoRhContent>
                <UserStatus>
                  <DetailEditSelectBoxComponent
                    statusCode={statusCode}
                    setStatusCode={setStatusCode}
                    onSelectStatus={onSelectStatus}
                    setFinishContract={setFinishContract}
                    setCompletionContract={setCompletionContract}
                  />
                  {/* 현재:{statusCode} */}
                  {/* {detailData?.status} */}
                </UserStatus>
              </InfoRhContent>
            </InfoRhBox>
            <InfoRhBox>
              <InfoRhTitle>지점명</InfoRhTitle>
              <InfoRhContent>{detailData?.branch?.region}</InfoRhContent>
            </InfoRhBox>
          </ContentTopRh>
        </ContentTopRhBox>
      </ContentTop>
      {/* 윗 부분 끝 */}
      <BorderBottom />
      <ContentBottom>
        <UserAddressBox>
          <UserAddressTitle>전 주소</UserAddressTitle>
          <UserAddressEditInput
            onClick={() => {
              postHandleOpenModal("prev");
            }}
          >
            <InputBox
              readOnly
              placeholder="전 주소를 입력해 주세요."
              value={detailData?.preAddress}
            ></InputBox>
          </UserAddressEditInput>
          <UserAddressEditInput>
            <InputBox
              placeholder="전 상세주소를 입력해 주세요"
              defaultValue={prevAddressDetail}
              onChange={onChangePrevAddressDetail}
            ></InputBox>
          </UserAddressEditInput>
        </UserAddressBox>
        <UserAddressBox>
          <UserAddressTitle>후 주소</UserAddressTitle>
          <UserAddressEditInput>
            <InputBox
              onClick={() => {
                postHandleOpenModal("after");
              }}
              placeholder="후 주소를 입력해 주세요"
              value={detailData?.afterAddress}
              onChange={onChangeHandle}
            ></InputBox>
          </UserAddressEditInput>
          <UserAddressEditInput>
            <InputBox
              placeholder="후 상세주소를 입력해 주세요"
              defaultValue={afterAddressDetail}
              onChange={onChangAfterAddressDetail}
            ></InputBox>
          </UserAddressEditInput>
        </UserAddressBox>
        <MoveDateContainer>
          <MoveDateBox>
            <MoveDateTitle>접수일</MoveDateTitle>
            <MoveDateInput
              onClick={() => {
                dateHandleOpenModal("reception");
              }}
            >
              <InputBox
                readOnly
                placeholder="--"
                value={(detailData?.receptionDate).replace(
                  formattedDate,
                  "$1-$2-$3"
                )}
              ></InputBox>
              {/* <InputBox
                value={format(movingDate, "y-MM-dd").toString()}
              ></InputBox> */}
            </MoveDateInput>
          </MoveDateBox>
          <MoveDateBox>
            <MoveDateTitle>계약일</MoveDateTitle>
            <MoveDateInput>
              <InputBox
                placeholder="--"
                readOnly
                disabled
                value={(detailData?.contractDate).replace(
                  formattedDate,
                  "$1-$2-$3"
                )}
              ></InputBox>
            </MoveDateInput>
          </MoveDateBox>
        </MoveDateContainer>
        <MoveDateContainer>
          <MoveDateBox>
            <MoveDateTitle>상담일</MoveDateTitle>
            <MoveDateInput
              onClick={() => {
                dateHandleOpenModal("consultation");
              }}
            >
              <InputBox
                placeholder="--"
                readOnly
                value={(detailData?.consultationDate).replace(
                  formattedDate,
                  "$1-$2-$3"
                )}
              ></InputBox>
            </MoveDateInput>
          </MoveDateBox>
          <MoveDateBox>
            <MoveDateTitle>이사일</MoveDateTitle>
            <MoveDateInput
              onClick={() => {
                dateHandleOpenModal("moving");
              }}
            >
              <InputBox
                placeholder="--"
                readOnly
                value={(detailData?.movingDate).replace(
                  formattedDate,
                  "$1-$2-$3"
                )}
              ></InputBox>
            </MoveDateInput>
          </MoveDateBox>
        </MoveDateContainer>
        {/* <MoveBtnContainer>
          <MoveBtnTitle>이사종류</MoveBtnTitle>
          <MoveBtnBox>
            <MoveBtn>
              {BtnArr.map((item, index) => (
                <li
                  key={index}
                  className={
                    detailData?.movingType === item.name
                      ? "focused"
                      : "desabled"
                  }
                >
                  {item.name}
                </li>
              ))}
            </MoveBtn>
          </MoveBtnBox>
        </MoveBtnContainer> */}
        <BtnBox>
          <CustomButton
            width={"48%"}
            height={"6vw"}
            text={`닫기`}
            size={"2vw"}
            radius={"0.6vw"}
            $bgColor={"#ffffff"}
            $outline={"0.15vw solid #dcdcdc"}
            color={"black"}
            onClick={() => detailEditVisible(false)}
          ></CustomButton>
          <CustomButton
            width={"48%"}
            height={"6vw"}
            text={`저장`}
            size={"2vw"}
            radius={"0.6vw"}
            onClick={() => detailPageSave()}
          ></CustomButton>
        </BtnBox>
      </ContentBottom>
    </>
  );
}
