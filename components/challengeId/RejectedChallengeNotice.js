export default function RejectedChallengeNotice({ reason, date }) {
  const DETAIL_REASON =
    "독스루는 개발 문서 번역 플랫폼으로, 다른 종류의 번역 챌린지를 개최할 수 없음을 알려드립니다. 감사합니다.";

  return (
    <div>
      <div>신청이 거절되었습니다.</div>
      <div>신청 거절 사유</div>
      <div>{DETAIL_REASON}</div>
      <div>{date}</div>
    </div>
  );
}
