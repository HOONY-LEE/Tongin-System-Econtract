import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100%;
`;

const Wrapper = styled.div`
  margin-top: 4vw;
  margin-bottom: 4vw;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 90vw;
  height: 100%;
  background-color: #f3f3f3;
  padding: 4vw;
  border-radius: 1vw;
`;

const TitleArea = styled.div`
  margin-top: 2vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentsArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  width: 100%;
`;

const Title = styled.div`
  font-size: 4vw;
  font-weight: 800;
`;

const Subtitle = styled.div`
  font-size: 3vw;
  font-weight: 400;
`;

const Text1 = styled.p`
  margin-top: 6vw;
  font-size: 2.8vw;
  font-weight: 600;
  width: 100%;
  display: flex;
  justify-content: center;
`;
const Text2 = styled.p`
  margin-top: 2vw;
  margin-bottom: 1vw;
  font-size: 2.2vw;
  font-weight: 500;
  width: 100%;
`;
const Text3 = styled.p`
  margin-top: 1vw;
  font-size: 2vw;
  font-weight: 400;
  width: 100%;
  line-height: 3vw;
  text-align: start;
`;
const Text4 = styled.p`
  margin-top: 1vw;
  margin-left: 2vw;
  font-size: 2vw;
  font-weight: 400;
  width: 100%;
  line-height: 3vw;
  text-align: start;
`;

export default function Terms() {
  return (
    <Container>
      <Wrapper>
        <TitleArea>
          <Title>이사화물 표준약관</Title>
          <Subtitle>(제 10035호)</Subtitle>
        </TitleArea>
        <ContentsArea>
          <Text1>제1장 총 칙</Text1>
          <Text2>제1조(목적)</Text2>
          <Text3>
            이 약관은 이사화물(이삿짐)의 운송을 취급하는 사업자(이하 ‘사업자’라
            합니다)와 이사화물(이삿짐)의 운송을 의뢰하는 고객간의 이사화물의
            운송 및 이에 부대 하는 포장, 보관, 정리 등에 관한 계약사항을 정함을
            목적으로 합니다.
          </Text3>
          <Text2>제2조(용어의 정의)</Text2>
          <Text3>
            ① 이 약관에서 ‘포장’이라 함은 발송장소에서 운송을 위하여 이사화물을
            싸고 꾸리는 것을 말하고, ‘보관’이라 함은 발송장소와 도착장소가 아닌
            사업자의 창고 등과 같은 제3의 장소에서 이사화물을 적재하고 보존하는
            것을 말하며, ‘정리’라 함은 도착장소에서 이사화물을 풀어서 고객의
            의사에 따라 배치하고 정돈하는 것을 말합니다.
          </Text3>
          <Text3>
            ② 이 약관에서 ‘일반이사’라 함은 고객이 이사화물의 포장과 정리를 맡고
            사업자는 이사화물의 운송만을 맡아서 하는 이사를 말하고, ‘포장이사’라
            함은 고객이 이사화물의 포장과 정리를 사업자에게 의뢰하여 사업자가
            이사화물의 포장, 운송, 정리를 모두 맡아서 하는 이사를 말하며,
            ‘보관이사’라 함은 일반이사 또는 포장이사를 하는 경우에 사업자가
            고객의 의뢰에 따라 이사화물을 일정 기간 보관한 후에 인도하는 이사를
            말합니다.
          </Text3>
          <Text3>
            ③ 이 약관에서 ‘인수’라 함은 사업자가 운송을 위하여 이사화물을
            발송장소에서 고객으로부터 수령하는 것을 말하고, ‘인도’라 함은
            사업자가 운송한 이사화물을 도착장소에서 고객에게 반환하는 것을
            말합니다.
          </Text3>
          <Text3>
            ④ 이 약관에서 ‘운임 등’이라 함은 이사화물의 운송에 대한 운임과,
            고객이 이사화물의 포장, 정리, 보관 등을 사업자에게 의뢰한 경우 각
            해당 업무에 대한 포장료, 정리료, 보관료 등의 부대요금을 포함한
            금액을 말합니다.
          </Text3>
          <Text2>제3조(적용범위)</Text2>
          <Text3>
            ① 이 약관은 이사화물의 발송장소와 도착장소가 모두 국내인 일반이사,
            포장이사 또는 보관이사에 적용합니다.
          </Text3>
          <Text3>
            ② 이 약관에서 정하지 않은 사항은 민법, 상법, 화물자동차운수사업법,
            약관의규제에관한법률 등 관련법규와 일반적으로 통용되는 공정 타당한
            관례에 따릅니다.
          </Text3>
          <Text1>제2장 견적 및 계약</Text1>
          <Text2>제4조(견적)</Text2>
          <Text3>
            사업자는 고객의 요청이 있으면 운임 등을 견적하고, 다음 각 호의
            사항을 기재한 견적서를 작성하여 고객에게 교부합니다.
          </Text3>
          <Text4>
            1. 사업자의 상호, 사업자등록번호, 대표자, 주소, 전화번호 및 견적서를
            작성한 담당자의 성명
          </Text4>
          <Text4> 2. 고객의 성명, 주소, 전화번호</Text4>
          <Text4>
            3. 이사화물의 인수․인도일시, 발송․도착장소, 주요 내역(종류․무게․부피
            등) 및 운임단가
          </Text4>
          <Text4>
            4. 작업조건(운송자동차의 종류 및 대수, 작업인원, 포장 및 정리 여부,
            장비사용 내역)
          </Text4>
          <Text4>5. 보관이사의 경우 보관장소, 보관기간 및 보관료</Text4>
          <Text4>6. 운임 등의 합계액 및 그 내역</Text4>
          <Text4>7. 기타 필요한 사항</Text4>
          <Text2>제5조(계약)</Text2>
          <Text3>
            ① 사업자는 고객으로부터 이사화물의 운송을 의뢰 받는 때에는 다음 각
            호의 규정을 고객이 이해할 수 있도록 설명하고, 이 약관을 고객에게
            명시합니다. 이 경우 고객의 요구가 있을 시에는 이 약관의 사본을
            교부합니다. 다만, 계약서의 이 약관의 전부가 기재된 경우에는 계약서의
            교부로 약관사본의 교부에 갈음합니다.
          </Text3>
          <Text4>
            1. 이 약관 제6조, 제7조, 제9조, 제12조, 제13조, 제14조, 제15조 및
            제18조의 규정 내용.
          </Text4>
          <Text4>
            2. 고객이 피해를 당하였을 경우 피해 구제방법 및 관련기관의 명칭과
            전화번호
          </Text4>
          <Text3>
            ② 사업자는 제1항의 규정에 의한 이 약관의 설명 등을 끝낸 후에 다음 각
            호의 사항을 기재한 계약서(별지서식-예시)를 작성하여 고객에게
            교부합니다.
          </Text3>
          <Text4>
            1. 제4조 제1호 내지 제6호에서 규정한 사항. 다만, ‘견적서를 작성한
            담당자의 성명’ 대신에 ‘계약서를 작성한 담당자의 성명’을 기재한다.
          </Text4>
          <Text4>2. 계약금 및 운임 등의 잔액</Text4>
          <Text4>
            {" "}
            3. 운송상 특별한 주의사항(파손되기 쉬운 물건의 기재 등) 및 고객의
            특별한 요청사항
          </Text4>
          <Text4>4. 기타 필요한 사항</Text4>
          <Text3>
            ③ 사업자는 운임 등에 대해 견적서에 기재된 금액을 초과하여 계약서에
            기재하지 아니합니다. 다만, 고객의 요청에 의해 이사화물의 내역,
            보관기간 또는 포장과 정리 등 운임 등의 산정에 관련된 사항이
            변경됨으로 인해 견적서에 기재된 금액을 초과하는 경우에는, 그
            초과금액을 미리 고객에게 고지한 경우에 한해 초과된 금액을 기재할 수
            있습니다.
          </Text3>
          <Text2>제6조(계약금)</Text2>
          <Text3>
            사업자는 계약서를 고객에게 교부할 때 계약금으로 운임 등의 합계액의
            10%에 해당하는 금액을 청구할 수 있습니다.
          </Text3>
          <Text2>제7조(인수거절)</Text2>
          <Text3>
            ① 이사화물이 다음 각 호의 하나에 해당될 때에는 사업자는 그 인수를
            거절할 수 있습니다.
          </Text3>
          <Text4>
            {" "}
            1. 현금, 유가증권, 귀금속, 예금통장, 신용카드, 인감 등 고객이 휴대할
            수 있는 귀중품
          </Text4>
          <Text4>
            2. 위험품, 불결한 물품 등 다른 화물에 손해를 끼칠 염려가 있는 물건
          </Text4>
          <Text4>
            3. 동식물, 미술품, 골동품 등 운송에 특수한 관리를 요하기 때문에 다른
            화물과 동시에 운송하기에 적합하지 않은 물건
          </Text4>
          <Text4>
            4. 고객이 제10조 제1항의 규정에 의한 사업자의 포장 요청을 거절한
            물건
          </Text4>
          <Text3>
            {" "}
            ② 제1항 각 호에 해당되는 이사화물이더라도 사업자는 그 운송을 위한
            특별한 조건을 고객과 합의한 경우에는 이를 인수할 수 있습니다.
          </Text3>
          <Text2>제8조(운임 등의 청구)</Text2>
          <Text3>
            ① 사업자는 고객이 이사화물의 전부의 인도를 확인한 때(일반이사의
            경우) 또는 이사화물의 전부의 정리를 확인한 때(포장이사의 경우), 운임
            등에서 이미 지급한 계약금을 제외한 잔액을 청구할 수 있습니다.
            보관이사의 경우 보관료의 청구도 다른 약정이 없는 한 이에 따릅니다.
          </Text3>
          <Text2>제8조(운임 등의 청구)</Text2>
          <Text3>
            ① 사업자는 고객이 이사화물의 전부의 인도를 확인한 때(일반이사의
            경우) 또는 이사화물의 전부의 정리를 확인한 때(포장이사의 경우), 운임
            등에서 이미 지급한 계약금을 제외한 잔액을 청구할 수 있습니다.
            보관이사의 경우 보관료의 청구도 다른 약정이 없는 한 이에 따릅니다.
          </Text3>
          <Text3>
            ② 사업자는 운임 등에 대해 계약서에 기재된 금액을 초과하여 청구하지
            아니합니다. 다만, 고객의 책임 있는 사유로 이사화물의 내역, 보관기간
            또는 포장과 정리 등 운임 등의 산정에 관련된 사항이 변경됨으로 인해
            계약서에 기재된 금액을 초과하게 되는 경우에는, 그 변경 시에
            초과금액을 미리 고객에게 고지한 경우에 한해 초과된 금액을 청구할 수
            있습니다.
          </Text3>
          <Text3>
            ③ 사업자는 제1항과 제2항의 규정에 의한 금액 이외에 수고비등 어떠한
            명목의 금액도 추가로 청구하지 아니합니다.
          </Text3>
          <Text2>제9조(계약해제)</Text2>
          <Text3>
            ① 고객이 그의 책임 있는 사유로 계약을 해제한 경우에는 다음 각 호의
            규정에 의한 손해배상액을 사업자에게 지급해야 합니다. 다만, 고객이
            이미 지급한 계약금이 있는 경우에는 그 금액을 공제할 수 있습니다.
          </Text3>
          <Text4>
            1. 고객이 약정된 이사화물의 인수일 1일전까지 해제를 통지한 경우:
            계약금
          </Text4>
          <Text4>
            2. 고객이 약정된 이사화물의 인수일 당일에 해제를 통지한 경우:
            계약금의 배액
          </Text4>
          <Text3>
            ② 사업자가 그의 책임 있는 사유로 계약을 해제한 경우에는 다음 각 호의
            규정에 의한 손해배상액을 고객에게 지급해야 합니다. 다만, 고객이 이미
            지급한 계약금이 있는 경우에는 손해배상액과는 별도로 그 금액도
            반환해야 합니다.
          </Text3>
          <Text4>
            1. 사업자가 약정된 이사화물의 인수일 2일전까지 해제를 통지한 경우 :
            계약금의 배액{" "}
          </Text4>
          <Text4>
            2. 사업자가 약정된 이사화물의 인수일 1일전까지 해제를 통지한 경우 :
            계약금의 4배액{" "}
          </Text4>
          <Text4>
            3. 사업자가 약정된 이사화물의 인수일 당일에 해제를 통지한 경우 :
            계약금의 6배액
          </Text4>
          <Text4>
            4. 사업자가 약정된 이사화물의 인수일 당일에도 해제를 통지하지 않은
            경우 : 계약금의 10배액
          </Text4>
          <Text3>
            ③ 이사화물의 인수가 사업자의 귀책사유로 약정된 인수일시로부터 2시간
            이상 지연된 경우에는 고객은 계약을 해제하고 이미 지급한 계약금의
            반환 및 계약금의 6배액의 손해배상을 청구할 수 있습니다.{" "}
          </Text3>
          <Text1>제3장 포장 및 인수․인도</Text1>
          <Text2>제10조(포장)</Text2>
          <Text3>
            ① 일반이사의 경우에는 고객이 이사화물의 종류, 무게, 부피, 운송거리
            등에 따라 운송에 적합하도록 포장하여야 합니다. 이 경우 사업자는
            이사화물의 포장이 운송에 적합하지 않을 때에는 고객에게 적합한 포장을
            요청할 수 있습니다.
          </Text3>
          <Text3>
            {" "}
            ② 포장이사의 경우에는 사업자가 이사화물의 종류, 무게, 부피, 운송거리
            등에 따라 운송에 적합하도록 포장합니다.
          </Text3>
          <Text2>제11조(인수․인도)</Text2>
          <Text3>
            사업자는 다른 약정이 없는 한 이사화물을 계약서에 기재된 인수일시와
            발송장소에서 인수하고, 계약서에 기재된 인도일시와 도착장소에서
            인도합니다.
          </Text3>
          <Text2>제12조(인도할 수 없는 경우의 조치)</Text2>
          <Text3>
            ① 사업자가 이사화물의 전부 또는 일부를 고객의 수령거절 또는 고객의
            부재 등으로 인한 수령불능 등 사업자의 책임 없는 사유로 고객에게
            인도할 수 없는 경우에는, 그 이사화물을 공탁하거나 제2항의 규정에
            의하여 경매할 수 있습니다. 보관이사의 경우 약정된 보관기간이 경과한
            후에 사업자의 책임 없는 사유로 인도할 수 없는 경우에도 그러합니다.
          </Text3>
          <Text3>
            ② 사업자는 2개월 이상의 기간(최고기간)을 정하여 그 기간 내에 고객이
            이사화물의 인도를 청구하지 아니하면 경매를 한다는 뜻을 명시하여
            최고하고, 그 최고가 고객에게 도달된 날로부터 최고기간이 경과할
            때까지 고객의 인도청구가 없으면 경매를 할 수 있습니다. 다만,
            이사화물의 전부 또는 일부가 멸실․훼손될 염려가 있는 경우에는 그
            이사화물에 대해서는 고객의 이익을 위해 최고 없이 즉시 경매할 수
            있습니다.
          </Text3>
          <Text3>
            ③ 사업자는 공탁 또는 경매를 할 때까지 이사화물을 보관해야 하며, 공탁
            또는 경매를 한 때에는 지체 없이 그 사실을 고객에게 통지합니다.
          </Text3>
          <Text3>
            ④ 사업자의 고객에 대한 최고나 통지는 이사화물의 도착장소로 합니다.
            다만, 사업자가 최고나 통지를 할 때 고객이 다른 장소에 거주하고 있는
            사실을 안 경우에는 그 장소로 합니다.{" "}
          </Text3>
          <Text3>
            ⑤ 사업자가 이사화물을 공탁한 경우에는 이사화물의 보관․공탁, 공탁의
            통지 등에 소요되는 비용과 지급되지 아니한 운임 등을 고객에게 청구할
            수 있습니다.
          </Text3>
          <Text3>
            ⑥ 사업자가 이사화물을 경매한 경우에는 그 대금을 이사화물의
            보관․경매, 인도청구의 최고, 경매의 통지 등에 소요되는 비용과
            지급되지 아니한 운임 등에 충당하고, 부족한 때에는 고객에게 그 지급을
            청구하며, 남는 때에는 반환합니다. 이 경우 고객에게 반환해야 할
            잔액을 고객이 수령하지 않거나 수령할 수 없는 때에는, 공탁에 과다한
            비용이 소요되지 않는 한, 그 금액을 공탁합니다.
          </Text3>
          <Text2>제13조(공동운송 또는 타 운송수단의 이용)</Text2>
          <Text3>
            {" "}
            ① 사업자는 소비자의 이익을 해치지 않는 범위 내에서 인수한 이사화물을
            다른 사업자와 공동운송협정을 체결하여 운송하거나 다른 사업자의
            운송수단을 이용하여 운송할 수 있습니다. 다만 사업자는 이 약관
            제5조에 의한 계약사항을 변경하고자 하는 경우에는 사전에 고객의
            동의를 얻어야 합니다.
          </Text3>
          <Text3>
            ② 사업자가 전항에 의해 공동운송을 하거나 타 운송수단을 이용하는
            경우에도 고객에 대해서 이 약관의 규정에 의한 사업자로서의 책임을
            면하지 못합니다.
          </Text3>
          <Text1>제4장 책 임 </Text1>
          <Text2>제14조(손해배상)</Text2>
          <Text3>
            ① 사업자는 자기 또는 사용인 기타 이사화물의 운송을 위하여 사용한
            자가 이사화물의 포장, 운송, 보관, 정리 등에 관하여 주의를 게을리
            하지 않았음을 증명하지 못하는 한, 다음의 제2항 및 제3항의 규정에
            의하여 고객에게 이사화물의 멸실, 훼손 또는 연착으로 인한 손해를
            배상할 책임을 집니다.
          </Text3>
          <Text3>
            ② 사업자의 손해배상은 다음 각 호에 의합니다. 다만, 사업자가 보험에
            가입하여 고객이 직접 보험회사로부터 보험금을 받은 경우에는, 사업자는
            다음 각 호의 금액에서 그 보험금을 공제한 잔액을 지급합니다.
          </Text3>
          <Text3>1. 연착되지 않은 경우 </Text3>
          <Text4>
            가. 전부 또는 일부 멸실된 경우: 약정된 인도일과 도착장소에서의
            이사화물의 가액을 기준으로 산정한 손해액의 지급
          </Text4>
          <Text4>
            나. 훼손된 경우: 수선이 가능한 경우에는 수선해 주고, 수선이 불가능한
            경우에는 ‘가’목의 규정에 의함
          </Text4>
          <Text3>2. 연착된 경우</Text3>
          <Text4>
            가. 멸실 및 훼손되지 않은 경우 : 계약금의 10배액 한도에서 약정된
            인도일시로부터 연착된 1시간마다 계약금의 반액을 곱한 금액(연착 시간
            수×계약금×1/2)의 지급. 다만, 연착시간 수의 계산에서 1시간 미만의
            시간은 산입하지 않음
          </Text4>
          <Text4>
            나. 일부 멸실된 경우: 제1호 ‘가’목의 금액 및 제2호 ‘가’목의 금액의
            지급{" "}
          </Text4>
          <Text4>
            다. 훼손된 경우: 수선이 가능한 경우에는 수선해 주고 제2호 ‘가’목의
            금액의 지급, 수선이 불가능한 경우에는 제2호 ‘나’목의 규정에 의함
          </Text4>
          <Text3>
            ③ 이사화물의 멸실, 훼손 또는 연착이 사업자 또는 그의 사용인 등의
            고의 또는 중대한 과실로 인하여 발생한 때 또는 고객이 이사화물의
            멸실, 훼손 또는 연착으로 인하여 실제 발생한 손해액을 입증한 경우에는
            사업자는 제2항의 규정에도 불구하고 민법 제393조의 규정에 따라 그
            손해를 배상합니다.
          </Text3>
          <Text2>제15조(고객의 손해배상)</Text2>
          <Text3>
            ① 고객의 책임 있는 사유로 이사화물의 인수가 지체된 경우에는, 고객은
            약정된 인수일시로부터 지체된 1시간마다 계약금의 반액을 곱한
            금액(지체 시간 수×계약금×1/2)을 손해배상액으로 사업자에게 지급해야
            합니다. 다만, 계약금의 배액을 한도로 하며, 지체시간수의 계산에서
            1시간 미만의 시간은 산입하지 않습니다.
          </Text3>
          <Text3>
            ② 고객의 귀책사유로 이사화물의 인수가 약정된 일시로부터 2시간 이상
            지체된 경우에는, 사업자는 계약을 해제하고 계약금의 배액을
            손해배상으로 청구할 수 있습니다. 이 경우 고객은 그가 이미 지급한
            계약금이 있는 경우에는 손해배상액에서 그 금액을 공제할 수 있습니다.
          </Text3>
          <Text2>제16조(면책)</Text2>
          <Text3>
            사업자는 이사화물의 멸실, 훼손 또는 연착이 다음 각 호의 사유로 인한
            경우에는 그 손해를 배상할 책임을 지지 아니합니다. 다만, 제1호 내지
            제3호의 사유의 발생에 대해서는 자신의 책임이 없음을 입증해야 합니다.
          </Text3>
          <Text4>1. 이사화물의 결함, 자연적 소모</Text4>
          <Text4>
            2. 이사화물의 성질에 의한 발화, 폭발, 물그러짐, 곰팡이 발생, 부패,
            변색 등
          </Text4>
          <Text4>
            3. 법령 또는 공권력의 발동에 의한 운송의 금지, 개봉, 몰수, 압류 또는
            제3자에 대한 인도
          </Text4>
          <Text4>4. 천재지변 등 불가항력적인 사유</Text4>
          <Text2>제17조(멸실․훼손과 운임 등)</Text2>
          <Text3>
            ① 이사화물이 천재지변 등 불가항력적 사유 또는 고객의 책임 없는
            사유로 전부 또는 일부 멸실되거나 수선이 불가능할 정도로 훼손된
            경우에는, 사업자는 그 멸실․훼손된 이사화물에 대한 운임 등은 이를
            청구하지 못합니다. 사업자가 이미 그 운임 등을 받은 때에는 이를
            반환합니다.
          </Text3>
          <Text3>
            ②이사화물이 그 성질이나 하자 등 고객의 책임 있는 사유로 전부 또는
            일부 멸실되거나 수선이 불가능할 정도로 훼손된 경우에는, 사업자는 그
            멸실․훼손된 이사화물에 대한 운임 등도 이를 청구할 수 있습니다.
          </Text3>
          <Text2>제18조(책임의 특별소멸사유와 시효)</Text2>
          <Text3>
            ① 이사화물의 일부 멸실 또는 훼손에 대한 사업자의 손해배상책임은,
            고객이 이사화물을 인도받은 날로부터 30일 이내에 그 일부 멸실 또는
            훼손의 사실을 사업자에게 통지하지 아니하면 소멸합니다.{" "}
          </Text3>
          <Text3>
            ② 이사화물의 멸실, 훼손 또는 연착에 대한 사업자의 손해배상책임은,
            고객이 이사화물을 인도받은 날로부터 1년이 경과하면 소멸합니다. 다만,
            이사화물이 전부 멸실된 경우에는 약정된 인도일부터 기산합니다.{" "}
          </Text3>
          <Text3>
            ③ 제1항, 제2항의 규정은 사업자 또는 그 사용인이 이사화물의 일부 멸실
            또는 훼손의 사실을 알면서 이를 숨기고 이사화물을 인도한 경우에는
            적용되지 아니합니다. 이 경우에는 사업자의 손해배상책임은 고객이
            이사화물을 인도받은 날로부터 5년간 존속합니다.
          </Text3>
          <Text2>제19조(사고증명서의 발행)</Text2>
          <Text3>
            이사화물이 운송 중에 멸실, 훼손 또는 연착된 경우 사업자는 고객의
            요청이 있으면 그 멸실․훼손 또는 연착된 날로부터 1년에 한하여
            사고증명서를 발행합니다.
          </Text3>
          <Text2>제20조(관할법원)</Text2>
          <Text3>
            사업자와 고객간의 소송은 민사소송법상의 관할에 관한 규정에 따릅니다.
          </Text3>
        </ContentsArea>
      </Wrapper>
    </Container>
  );
}
