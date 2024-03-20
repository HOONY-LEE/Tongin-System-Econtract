import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import API from "./API";
import axios from "axios";

const makeHtmltoImage = {
  viewWithPdf: async (reNum: string) => {
    // html to imageFile
    const imageFiles = await makeHtmltoImage._convertToImg(reNum);
    await makeHtmltoImage._sendImgToServer(imageFiles, reNum);

    // const pdf = makePdf._converToPdf(imageFile, reNum);
  },
  _convertToImg: async (reNum: string) => {
    // html to imageFile
    const firstPage: any = document.querySelector(".firstPageBox");
    const secondPage: any = document.querySelector(".secondPageBox");

    const canvas1 = await html2canvas(firstPage);
    const canvas2 = await html2canvas(secondPage);
    const imageFiles = [
      canvas1.toDataURL("image/png", 1.0),
      canvas2.toDataURL("image/png", 1.0),
    ];
    return imageFiles;
  },
  // _converToPdf: (imageFile: any, reNum: string) => {
  //   // imageFile to pdf

  //   const doc = new jsPDF("p", "mm", "a4");

  //   const pageWidth = doc.internal.pageSize.getWidth();
  //   const pageHeight = doc.internal.pageSize.getHeight();

  //   doc.addImage(imageFile, "JPEG", 0, 0, pageWidth, pageHeight);

  //   // doc.save("test.pdf");

  //   window.open(doc.output("bloburl"));

  //   const pdf = new File([doc.output("blob")], "test.pdf", {
  //     type: "application/pdf",
  //   });

  //   return pdf;
  // },
  // _sendToServer: async (pdf: any, reNum: string) => {
  //   const formData = new FormData();
  //   formData.append("file", pdf);
  //   formData.append("type", "pdf");
  //   const accessToken = localStorage.getItem("accessToken");
  //   console.log(formData);
  //   const config = {
  //     headers: {
  //       Authorization: accessToken,
  //       ContentType: "multipart/form-data",
  //     },
  //     body: {
  //       imageData: formData,
  //     },
  //   };

  //   const response = await axios.post(
  //     `https://homenmove.net/v1/api/receipt/contract-image/${reNum}`,
  //     formData,
  //     config
  //   );

  //   if (response.status === 200) {
  //     alert("성공적으로 PDF저장");
  //   } else {
  //     alert("PDF 저장 실패!");
  //   }
  // },

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
    console.log(formData);
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
