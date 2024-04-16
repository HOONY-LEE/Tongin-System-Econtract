export const optionData = {
  beforeWorkCondition: {
    id: 1,
    transportationMethod: 3,
    pyeong: 33,
  },
  afterWorkCondition: {
    id: 2,
    transportationMethod: 0,
    pyeong: 40,
  },
  livingService: {
    movingCleaningService: {
      id: 1,
      serviceName: "입주청소서비스",
      serviceType: 0,
      serviceTypeName: "입주크리닝",
      serviceRequestDate: "20240305",
      servicePayment: 1000000,
      selected: true,
    },
    deodorizationService: {
      id: 1,
      serviceName: "탈취살균서비스",
      serviceRequestDate: "20240305",
      servicePayment: 100000,
      selected: false,
    },
    organizationStorageService: {
      id: 2,
      serviceName: "정리수납서비스",
      serviceRequestDate: "",
      servicePayment: 0,
      selected: false,
    },
    paymentMethod: 0,
  },
  optionService: [
    {
      id: 1,
      optionType: 1,
      optionName: "조립장롱",
      decomposition: false,
      installation: false,
      optionPayment: 0,
      selected: false,
    },
    {
      id: 2,
      optionType: 2,
      optionName: "에어컨",
      decomposition: false,
      installation: false,
      optionPayment: 0,
      selected: false,
    },
    {
      id: 3,
      optionType: 3,
      optionName: "냉장고",
      decomposition: true,
      installation: true,
      optionPayment: 100000,
      selected: true,
    },
    {
      id: 4,
      optionType: 4,
      optionName: "식기세척기",
      decomposition: true,
      installation: true,
      optionPayment: 100000,
      selected: true,
    },
    {
      id: 5,
      optionType: 5,
      optionName: "PDP/LCD",
      decomposition: true,
      installation: true,
      optionPayment: 100000,
      selected: true,
    },
    {
      id: 6,
      optionType: 6,
      optionName: "홈시어터/오디오",
      decomposition: true,
      installation: true,
      optionPayment: 100000,
      selected: true,
    },
    {
      id: 7,
      optionType: 7,
      optionName: "돌침대(1인/2인)",
      decomposition: true,
      installation: true,
      optionPayment: 100000,
      selected: true,
    },
    {
      id: 8,
      optionType: 8,
      optionName: "기타",
      decomposition: false,
      installation: false,
      optionPayment: 0,
      selected: false,
    },
  ],
};
