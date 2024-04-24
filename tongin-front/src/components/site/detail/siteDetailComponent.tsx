import { userInfo } from "os";
import React from "react";
import styled from "styled-components";
import { useState } from "react";
import react, { useEffect } from "react";
import CustomButton from "../../common/customButton";
import PostModalComponent from "../../detail/postModalComponent";
import DateModalComponent from "../../detail/dateModalComponent";
import { format } from "date-fns";
// import DetailViewComponent from "./detailViewComponent";
// import DetailEditComponent from "./detailEditComponent";
// import { Toast } from "../common/toastMessegeComponent";

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 0 0 0.7vw 0.7vw;
  background-color: white;
  /* outline: 0.2vw solid gray; */
  /* margin: 0.7vh 0vh 0.7vh 0vh; */
  box-shadow: 0 0.5vh 0.5vh rgba(0, 0, 0, 0.01),
    0 0.5vh 0.5vh rgba(0, 0, 0, 0.003);
`;

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
export default function SiteDetailComponent(props: any) {
  const { detailData, setDetailData, getDetailList } = props;
  const [isDetailEdit, setIsDetailEdit] = useState(false);
  const [postData, setPostData] = useState<any>([]);
  const [addressType, setAddressType] = useState();
  const [dateType, setDateType] = useState();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState<boolean>(false);

  const [fetchStatus, setFetchStatus] = useState(false); // toast messege
  const [status, setStatus] = useState(false); // toast messege

  ////////////////////Data////////////////////
  const siteDetailData = {
    receiptDetail: {
      name: "ㅇㅇㅇ",
      contact: "",
      statusCode: "",
      preZipCode: "",
      preAddress: "",
      preAddressDetail: "",
      afterZipCode: "",
      afterAddress: "",
      afterAddressDetail: "",
      receptionDate: "", // 접수일
      consultationScheduledDate: "", // 상담 예정일
      consultationDate: "", // 상담일
      contractDate: "", // 계약일
      movingDate: "", //이사일
    },
  };
  ////////////////////Data state////////////////////
  const [name, setName] = useState<any>(siteDetailData.receiptDetail.name);
  const [contact, setContact] = useState<any>(
    siteDetailData.receiptDetail.contact
  );
  const [statusCode, setStatusCode] = useState<any>(
    siteDetailData.receiptDetail.statusCode
  );
  const [preZipCode, setPreZipCode] = useState<any>(
    siteDetailData.receiptDetail.preZipCode
  );
  const [preAddress, setPreAddress] = useState<any>(
    siteDetailData.receiptDetail.preAddress
  );
  const [preAddressDetail, setPreAddressDetail] = useState<any>(
    siteDetailData.receiptDetail.preAddressDetail
  );
  const [afterZipCode, setAfterZipCode] = useState<any>(
    siteDetailData.receiptDetail.afterZipCode
  );
  const [afterAddress, setAfterAddress] = useState<any>(
    siteDetailData.receiptDetail.afterAddress
  );
  const [afterAddressDetail, setAfterAddressDetail] = useState<any>(
    siteDetailData.receiptDetail.receptionDate
  );
  const [receptionDate, setReceptionDate] = useState<any>(
    siteDetailData.receiptDetail.afterAddressDetail
  );
  const [consultationScheduledDate, setConsultationScheduledDate] =
    useState<any>(siteDetailData.receiptDetail.consultationScheduledDate);
  const [consultationDate, setConsultationDate] = useState<any>(
    siteDetailData.receiptDetail.consultationDate
  );
  const [contractDate, setContractDate] = useState<any>(
    siteDetailData.receiptDetail.contractDate
  );
  const [movingDate, setMovingDate] = useState<any>(
    siteDetailData.receiptDetail.movingDate
  );
  /////////////////////////////////////////////////////
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
  //주소 입력 핸들러
  const postValueInput = (data: any) => {
    setPostData(data);

    if (addressType === "prev") {
      setPreAddress(
        `${data.address}${data.buildingName ? " " + data.buildingName : ""}`
      );
      setPreZipCode(data.zonecode);
    } else if (addressType === "after") {
      setAfterAddress(
        `${data.address}${data.buildingName ? " " + data.buildingName : ""}`
      );
      setAfterZipCode(data.zonecode);
    }
  };
  ////////////////////////////////////////////////////

  ////////////////////날짜 모달 시작////////////////////
  // 날짜 모달 열기 핸들러
  const dateHandleOpenModal = (type: any) => {
    setIsDateModalOpen(true);
    setDateType(type);
  };

  // 날짜 모달 닫기 핸들러
  const dateHandleCloseModal = () => {
    setIsDateModalOpen(false);
  };
  // 날짜 입력
  const dateValueInput = (data: any) => {
    console.log("dateValueInput", data);
    const myData = new Date(data);
    // setDateData(data);
    console.log("myData", myData);
    console.log(format(myData, "yMMdd"));
    if (!Number.isNaN(new Date(myData).getTime())) {
      if (dateType === "reception") {
        setReceptionDate(format(myData, "yMMdd"));
      } else if (dateType === "moving") {
        setMovingDate(format(myData, "yMMdd"));
      } else if (dateType === "consultation") {
        setConsultationDate(format(myData, "yMMdd"));
      } else if (dateType === "contract") {
        setContractDate(format(myData, "yMMdd"));
      } else {
        return "";
      }
    } else {
      return "";
    }
  };
  // 날짜 삭제
  const deteValueDelete = () => {
    if (dateType === "reception") {
      setReceptionDate("");
    } else if (dateType === "moving") {
      setMovingDate("");
    } else if (dateType === "consultation") {
      setConsultationDate("");
    } else {
      return "";
    }
    dateHandleCloseModal();
  };
  ////////////////////////////////////////////////////
  const detailEditVisible = (mode: any) => {
    console.log(mode);
    if (mode) {
      setIsDetailEdit(true);
    } else if (mode === false) {
      setIsDetailEdit(false);
    }
  };

  // const fetchData = async () => {
  //   const response: any = await API.get("receipt/detail/12");
  //   if (response.status === 200) {
  //     console.log(response.data.receiptDetail);
  //     setDetailData(response.data.receiptDetail);
  //   } else {
  //     console.log("에러");
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  //전화번호 정규식 수정
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
    setContact(e.target.value);
  };

  // const response: any = await API.put(
  //   `/receipt/detail/${reNum}`,
  //   requestPram
  // );
  // if (response.status === 200) {
  //   console.log(response);
  //   setStatus("SUCCESS");
  //   setFetchStatus(true);

  //   detailEditVisible(false);
  //   getDetailList();
  // } else if (response.statusCode === 400) {
  //   setStatus("FAIL");
  //   alert("Fail to getDetailList()");
  // }

  // 에러방지를 위한 onChangeHandle
  const onChangeHandle = () => {};

  //날짜 정규식 [ 0000-00-00 ] 형태
  const formattedDate = /^(\d{4})(\d{2})(\d{2})$/;
  return (
    <>
      {isModalOpen && (
        <PostModalComponent
          onClose={postHandleCloseModal}
          postValueInput={postValueInput}
          addressType={addressType}
        />
      )}
      {isDateModalOpen && (
        <DateModalComponent
          value={"20240408"}
          dateValueInput={dateValueInput}
          onClose={dateHandleCloseModal}
          deteValueDelete={deteValueDelete}
        />
      )}
      <ContentBox>
        <ContentTop>
          <ContentTopLFBox>
            <ContentTopLF>
              <InfoLfBox>
                <InfoLfTitle>고객명</InfoLfTitle>
                <InfoLfEditContent>
                  <InputBox
                    placeholder="고객명을 입력해 주세요"
                    defaultValue={name}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  ></InputBox>
                </InfoLfEditContent>
              </InfoLfBox>
              {/* <InfoLfBox>
                <InfoLfTitle>계약번호</InfoLfTitle>
                <InfoLfContent>
                  {siteDetailData?.receiptDetail?.preAddress}
                </InfoLfContent>
              </InfoLfBox> */}
            </ContentTopLF>
            <ContentTopLF>
              <InfoLfBox>
                <InfoLfTitle>전화번호</InfoLfTitle>
                <InfoLfEditContent>
                  <InputBox
                    placeholder="전화번호를 입력해 주세요"
                    defaultValue={contact}
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
                <InfoRhContent>{""}</InfoRhContent>
              </InfoRhBox>
              <InfoRhBox>
                <InfoRhTitle>담당자연락처</InfoRhTitle>
                <InfoRhContent>{""}</InfoRhContent>
              </InfoRhBox>
            </ContentTopRh>
            <ContentTopRh>
              <InfoRhBox>
                {/* <InfoRhTitle>진행상태</InfoRhTitle>
                <InfoRhContent>
                  <UserStatus>
                    <DetailEditSelectBoxComponent
                      // statusCode={statusCode}
                      // setStatusCode={setStatusCode}
                      // onSelectStatus={onSelectStatus}
                      setFinishContract={setFinishContract}
                      setCompletionContract={setCompletionContract}
                    /> */}
                {/* 현재:{statusCode} */}
                {/* {detailData?.status} */}
                {/* </UserStatus>
                </InfoRhContent> */}
              </InfoRhBox>
              <InfoRhBox>
                <InfoRhTitle>지점명</InfoRhTitle>
                {/* <InfoRhContent>{detailData?.branch?.region}</InfoRhContent> */}
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
                value={`${preAddress} ${preZipCode ? `( ${preZipCode} )` : ""}`}
              ></InputBox>
            </UserAddressEditInput>
            <UserAddressEditInput>
              <InputBox
                placeholder="전 상세주소를 입력해 주세요"
                defaultValue={preAddressDetail}
                onChange={(e) => {
                  setPreAddressDetail(e.target.value);
                }}
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
                value={`${afterAddress} ${
                  afterZipCode ? `( ${afterZipCode} )` : ""
                }`}
                // onChange={onChangeHandle}
              ></InputBox>
            </UserAddressEditInput>
            <UserAddressEditInput>
              <InputBox
                placeholder="후 상세주소를 입력해 주세요"
                defaultValue={afterAddressDetail}
                onChange={(e) => {
                  setAfterAddressDetail(e.target.value);
                }}
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
                  value={receptionDate.replace(formattedDate, "$1-$2-$3")}
                ></InputBox>
              </MoveDateInput>
            </MoveDateBox>
            <MoveDateBox>
              <MoveDateTitle>계약일</MoveDateTitle>
              <MoveDateInput
                onClick={() => {
                  dateHandleOpenModal("contract");
                }}
              >
                <InputBox
                  placeholder="--"
                  readOnly
                  disabled
                  value={contractDate.replace(formattedDate, "$1-$2-$3")}
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
                  value={consultationDate.replace(formattedDate, "$1-$2-$3")}
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
                  value={movingDate.replace(formattedDate, "$1-$2-$3")}
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
              width={"100%"}
              height={"6vw"}
              text={`완료하기`}
              size={"2vw"}
              radius={"0.6vw"}
              // onClick={() => detailPageSave()}
            ></CustomButton>
          </BtnBox>
        </ContentBottom>
      </ContentBox>
    </>
  );
}
