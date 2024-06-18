import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import API from "./API";
import axios from "axios";

const makeHtmltoImage = {
  _makeImageHandler: async (reNum: string) => {
    // const imageFiles = await makeHtmltoImage._convertToImg();
    // await makeHtmltoImage._sendImgToServer(imageFiles, reNum);
  },
  _convertToImg: async (className: string) => {
    // html to imageFile
    const page: any = document.querySelector(className);

    const canvas = await html2canvas(page, {
      scale: 2, // 해상도를 두 배로 설정
      logging: true, // 로깅 활성화하여 디버그 정보 확인
      width: page.offsetWidth, // 너비를 두 배로 설정
      height: page.offsetHeight, // 높이를 두 배로 설정
      useCORS: true, // CORS를 사용하여 이미지 그리기
      allowTaint: true, // 불러오지 않은 이미지에 대한 허용
      backgroundColor: null, // 배경색 지정하지 않음
    });

    const imageFile = canvas.toDataURL("image/png", 1.0);

    return imageFile;
  },

  _sendImgToServer: async (imageFileDataUrl: string[], reNum: string) => {
    // Data URL을 Blob 객체로 변환
    const blob1 = await fetch(imageFileDataUrl[0]).then((res) => res.blob());
    const blob2 = await fetch(imageFileDataUrl[1]).then((res) => res.blob());

    // FormData 생성 및 Blob 추가
    const formData = new FormData();
    formData.append("imageData", blob1, "Page1.png");
    formData.append("type", "png");
    formData.append("imageData", blob2, "Page2.png");
    formData.append("type", "png");
    const accessToken = localStorage.getItem("accessToken");
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`, // 토큰 넣어주기
        "Content-Type": "multipart/form-data", // 데이터 형식 지정
      },
    };

    const response = await axios.post(
      `https://homenmove.net/v1/api/receipt/contract-image/${reNum}`,
      formData,
      config
    );

    if (response) {
      alert("성공적으로 PDF저장");
    } else {
      alert("PDF 저장 실패!");
    }
  },
};

export default makeHtmltoImage;
