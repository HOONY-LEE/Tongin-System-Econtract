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
import MoveDateInputComponent from "./MoveDateInputComponent";
import { pack } from "html2canvas/dist/types/css/types/color";
import DropdownComponent from "../common/dropdownComponent";
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
  margin: 0.7vh 0vh 0.7vh 0vh;
`;
const ContentTopLF = styled.div`
  display: flex;
  align-items: start;
`;

const ContentTopLF2Box = styled.div`
  display: flex;
  justify-content: start;
`;

const ContentTopLF2 = styled.div`
  display: flex;
  align-items: start;
  width: 22vw;
  /* outline: 0.2vw solid red; */
`;

const ContentTopRhBox = styled.div`
  display: flex;
  height: 20vw;
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
  background-color: white;
  border: 0.2vw solid #dbdbdb;
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
  margin: 1vw 0 2vw 0;
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

const MoveTypeMenu = styled.ul`
  // 탭 메뉴들 포함하고 있는 영역
  color: rgb(232, 234, 237);
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  list-style: none;

  width: 100%;
  height: 5vw;
  :hover {
    cursor: pointer;
  }
  .submenu {
    // 각 탭하나당 CSS
    display: flex;
    justify-content: center;
    align-items: center;
    width: 24vw;
    height: 4.6vw;
    /* margin-right: 2vw; */
    font-size: 2vw;
    transition: 0.2s;
    border-radius: 0.5vw;
    background-color: #ebebeb;
    color: black;
  }

  .focused {
    background-color: #ff7f3b;
    color: white;
  }
`;

const DropdownBox = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
  width: 21vw;
  height: 5vw;
`;

export default function DetailEditComponent(props: any) {
  const {
    detailData,
    setDetailData,
    getDetailList,
    otherDateData,
    setOtherDateData,
    setCompletionContract,
    setFetchStatus,
    contractImageList,
    movingTypeList,
    selfMovingTypeList,
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
  const [finishContract, setFinishContract] = useState<any>("");
  const [receptionDate, setReceptionDate] = useState(detailData.receptionDate);
  const [consultationDate, setConsultationDate] = useState(
    detailData.consultationDate
  );
  const [contractDate, setContractDate] = useState(detailData.contractDate);
  const [movingDate, setMovingDate] = useState(detailData.movingDate);
  const [packageDate, setPackageDate] = useState(otherDateData.packageDate);
  const [carryDate, setCarryDate] = useState(otherDateData.carryDate);
  const [cleanDate, setCleanDate] = useState(otherDateData.cleanDate);
  const [fakeContractDate, setFakeContractDate] = useState(
    otherDateData.fakeContractDate
  );
  const [preZipCode, setPreZipCode] = useState(detailData.preZoneCode);
  const [afterZipCode, setAfterZipCode] = useState(detailData.afterZoneCode);

  const reNum = useParams().id;
  const [isContractFinishModal, setIsContractFinishModal] =
    useState<boolean>(false);
  const [statusCode, setStatusCode] = useState<any>(detailData.statusCode); //상태 번호 value
  const [status, setStatus] = useState<any>(detailData.status); //상태 이름 value

  const [prevAddressDetail, setPrevAddressDetail] = useState(
    detailData.preAddressDetail
  ); //전 상세주소value

  const [afterAddressDetail, setAfterAddressDetail] = useState(
    detailData.afterAddressDetail
  );
  const [preAddress, setPreAddress] = useState(detailData.preAddress);
  const [afterAddress, setAfterAddress] = useState(detailData.afterAddress);
  const [userName, setUserName] = useState(detailData.name);
  const [userContact, setUserContact] = useState(detailData.contact);
  const [movingTypeCode, setMovingTypeCode] = useState(
    detailData.movingTypeCode
  );
  const [selfMovingTypeCode, setSelfMovingTypeCode] = useState(
    detailData.movingTypeCode
  );
  const [selectedMovingType, setSelectedMovingType] = useState<number>(0);

  const onChangUserName = (e: any) => {
    setUserName(e.target.value);
  };

  useEffect(() => {
    setDetailData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.name = userName;
      updatedData.contact = userContact;
      updatedData.preAddressDetail = prevAddressDetail;
      updatedData.afterAddressDetail = afterAddressDetail;
      updatedData.receptionDate = receptionDate;
      updatedData.consultationDate = consultationDate;
      updatedData.contractDate = contractDate;
      updatedData.movingDate = movingDate;
      updatedData.afterAddress = afterAddress;
      updatedData.preAddress = preAddress;
      updatedData.preZipCode = preZipCode;
      updatedData.afterZipCode = afterZipCode;
      updatedData.statusCode = statusCode;
      updatedData.status = status;
      updatedData.movingTypeCode = movingTypeCode;
      return updatedData;
    });
  }, [
    finishContract,
    userName,
    userContact,
    prevAddressDetail,
    afterAddressDetail,
    receptionDate,
    consultationDate,
    contractDate,
    movingDate,
    preAddress,
    afterAddress,
    preZipCode,
    afterZipCode,
    statusCode,
    status,
    movingTypeCode,
  ]);

  useEffect(() => {
    if (detailData?.selfReceipt) {
      setMovingTypeCode(selfMovingTypeList[selectedMovingType]?.moveType);
    } else {
      setMovingTypeCode(movingTypeList[selectedMovingType]?.moveType);
    }
  }, [selectedMovingType]);

  useEffect(() => {
    setOtherDateData((prev: any) => {
      const updatedData = { ...prev };
      updatedData.packageDate = packageDate;
      updatedData.carryDate = carryDate;
      updatedData.cleanDate = cleanDate;
      updatedData.fakeContractDate = fakeContractDate;
      return updatedData;
    });
  }, [packageDate, carryDate, cleanDate, fakeContractDate]);

  //계약서 상태 [계약]일시 계약날짜 추가
  // useEffect(() => {
  //   setDetailData((prev: any) => {
  //     let today = new Date();
  //     const updatedData = { ...prev };
  //     if (finishContract) {
  //       updatedData.contractDate = format(today, "yMMdd");
  //     } else {
  //       updatedData.contractDate = "";
  //     }
  //     return updatedData;
  //   });
  // }, [finishContract]);

  // useEffect(() => {
  //   if (statusCode === "22") {
  //     const today = new Date();
  //     setContractDate(format(today, "yMMdd"));
  //   } else {
  //     setContractDate("");
  //   }
  // }, [statusCode]);

  useEffect(() => {
    let index = 0;
    if (detailData?.selfReceipt) {
      index = findSelfSelectedIndex(movingTypeCode);
    } else {
      index = findSelectedIndex(movingTypeCode);
    }
    setSelectedMovingType(index);
  }, []);

  // 아이템 코드로 index를 반환하는 함수
  const findSelectedIndex = (movingTypeCode?: string) => {
    const selectedIndex = movingTypeList?.filter(
      (item: any) => item?.moveType === movingTypeCode
    );
    return selectedIndex[0]?.id;
  };

  // 아이템 코드로 index를 반환하는 함수
  const findSelfSelectedIndex = (movingTypeCode?: string) => {
    const selectedIndex = selfMovingTypeList?.filter(
      (item: any) => item?.moveType === movingTypeCode
    );
    return selectedIndex[0]?.id;
  };

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
      setPreZipCode(data.zonecode);
      setPreAddress(
        `${data.address}${data.buildingName ? "" + data.buildingName : ""}  `
      );
    } else if (addressType === "after") {
      setAfterZipCode(data.zonecode);
      setAfterAddress(
        `${data.address}${data.buildingName ? "" + data.buildingName : ""} `
      );
    }
  };

  const onSelectStatus = () => {
    detailData.statusCode = statusCode;
  };

  //전 상세주소
  const onChangePrevAddressDetail = (e: any) => {
    setPrevAddressDetail(e.target.value);
  };
  //후 상세주소
  const onChangAfterAddressDetail = (e: any) => {
    setAfterAddressDetail(e.target.value);
  };

  // 에러방지를 위한 onChangeHandle
  const onChangeHandle = () => {};

  // 계약 상태 안내 모달 닫기 핸들
  const contractHandleCloseModal = () => {
    setIsContractFinishModal(false);
  };

  // 상세정보 저장 시 호출
  const detailPageSave = () => {
    if (finishContract) {
      if (contractImageList.length === 0) {
        alert("아직 생성된 계약서가 없습니다.");
        return;
      }
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

    const requestPram = {
      receiptDetail: detailData,
      otherDateData: otherDateData,
    };
    try {
      const response: any = await API.put(
        `/receipt/detail/${reNum}`,
        requestPram
      );
      if (response.status === 200) {
        setStatus("SUCCESS");
        setFetchStatus(true);

        detailEditVisible(false);
        getDetailList();
      } else {
        setFetchStatus(true);
        setStatus("FAIL");
        alert("상세정보 수정 실패");
      }
    } catch (error) {
      alert("상세정보 수정 실패");
    }
  };
  // 드로잉판넬 오픈 시 호출
  // const detailDrawPageSave = () => {
  //   if (finishContract) {
  //     if (contractImageList.length === 0) {
  //       alert("아직 생성된 계약서가 없습니다.");
  //       return;
  //     }
  //     setIsContractFinishModal(true);
  //   } else {
  //     putDrawSave();
  //   }
  // };
  // 상세정보 수정API
  const putDrawSave = async () => {
    if (isContractFinishModal) {
      setIsContractFinishModal(false);
      setCompletionContract(true);
    }

    const requestPram = {
      receiptDetail: detailData,
      otherDateData: otherDateData,
    };
    try {
      const response: any = await API.put(
        `/receipt/detail/${reNum}`,
        requestPram
      );
      if (response.status === 200) {
        setStatus("SUCCESS");
        setFetchStatus(true);
      } else {
        setFetchStatus(true);
        setStatus("FAIL");
        alert("상세정보 수정 실패");
      }
    } catch (error) {
      alert("상세정보 수정 실패");
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
      <ContentTop>
        <ContentTopLFBox>
          <ContentTopLF>
            <InfoLfBox>
              <InfoLfTitle>고객명</InfoLfTitle>
              <InfoLfEditContent>
                <InputBox
                  placeholder="고객명"
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
          <ContentTopLF2Box>
            <ContentTopLF2>
              <InfoLfBox>
                <InfoLfTitle>전화번호</InfoLfTitle>
                <InfoLfEditContent>
                  <InputBox
                    placeholder="전화번호"
                    defaultValue={userContact}
                    onChange={onChangUserContact}
                  ></InputBox>
                </InfoLfEditContent>
              </InfoLfBox>
            </ContentTopLF2>
            {detailData?.selfReceipt ? (
              <ContentTopLF2>
                <InfoLfBox>
                  <InfoLfTitle>이사종류(현장)</InfoLfTitle>
                  <DropdownBox>
                    <DropdownComponent
                      selected={selectedMovingType}
                      setSelected={setSelectedMovingType}
                      dropdownList={selfMovingTypeList}
                      border={`0.2vw solid #dbdbdb;`}
                    ></DropdownComponent>
                  </DropdownBox>
                </InfoLfBox>
              </ContentTopLF2>
            ) : (
              <ContentTopLF2>
                <InfoLfBox>
                  <InfoLfTitle>이사종류</InfoLfTitle>
                  <DropdownBox>
                    <DropdownComponent
                      selected={selectedMovingType}
                      setSelected={setSelectedMovingType}
                      dropdownList={movingTypeList}
                      border={`0.2vw solid #dbdbdb;`}
                    ></DropdownComponent>
                  </DropdownBox>
                </InfoLfBox>
              </ContentTopLF2>
            )}
          </ContentTopLF2Box>
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
                    setStatus={setStatus}
                    onSelectStatus={onSelectStatus}
                    setFinishContract={setFinishContract}
                    setCompletionContract={setCompletionContract}
                  />
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
              value={`${preAddress}${preZipCode ? ` ( ${preZipCode})` : ""}`}
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
              value={`${afterAddress}${
                afterZipCode ? ` ( ${afterZipCode})` : ""
              }`}
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
          <MoveDateInputComponent
            title={"접수일"}
            dateData={receptionDate}
            setDateData={setReceptionDate}
            // readOnly={true}
          ></MoveDateInputComponent>
          {/* 계약 확정 시 input */}
          {statusCode === 22 ? (
            <MoveDateInputComponent
              title={"계약일"}
              dateData={contractDate}
              setDateData={setContractDate}
              readOnly={true}
            ></MoveDateInputComponent>
          ) : (
            <MoveDateInputComponent
              title={"계약일"} // 가계약 Input
              dateData={fakeContractDate}
              setDateData={setFakeContractDate}
              // readOnly={true}
            ></MoveDateInputComponent>
          )}
        </MoveDateContainer>
        <MoveDateContainer>
          <MoveDateInputComponent
            title={"상담일"}
            dateData={consultationDate}
            setDateData={setConsultationDate}
          ></MoveDateInputComponent>
          <MoveDateInputComponent
            title={"이사일"}
            dateData={movingDate}
            setDateData={setMovingDate}
          ></MoveDateInputComponent>
        </MoveDateContainer>
        <MoveDateContainer>
          {/* 새로 추가한 항목/ 수정예정 */}
          <MoveDateInputComponent
            title={"포장일"}
            dateData={packageDate}
            setDateData={setPackageDate}
          ></MoveDateInputComponent>
          <MoveDateInputComponent
            title={"운반일"}
            dateData={carryDate}
            setDateData={setCarryDate}
          ></MoveDateInputComponent>
        </MoveDateContainer>
        <MoveDateContainer>
          <MoveDateInputComponent
            title={"정리일"}
            dateData={cleanDate}
            setDateData={setCleanDate}
          ></MoveDateInputComponent>
        </MoveDateContainer>
        {/* <MoveBtnContainer>
          <MoveBtnTitle>{"가정이사"}</MoveBtnTitle>
          <MoveBtnBox>
            <MoveTypeMenu>
              {homeMove.map((item: any, index: number) => (
                <li
                  key={index}
                  className={
                    index === homeMovecurrentTab ? "submenu focused" : "submenu"
                  }
                  onClick={() => selectHomeMoveHandler(item, index)}
                >
                  {item.name}
                </li>
              ))}
            </MoveTypeMenu>
          </MoveBtnBox>
        </MoveBtnContainer>
        <MoveBtnContainer>
          <MoveBtnTitle>{"보관이사"}</MoveBtnTitle>
          <MoveBtnBox>
            <MoveTypeMenu>
              {storageMove.map((item: any, index: number) => (
                <li
                  key={index}
                  className={
                    index === storageMovecurrentTab
                      ? "submenu focused"
                      : "submenu"
                  }
                  onClick={() => selectStorageMoveHandler(item, index)}
                >
                  {item.name}
                </li>
              ))}
            </MoveTypeMenu>
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
