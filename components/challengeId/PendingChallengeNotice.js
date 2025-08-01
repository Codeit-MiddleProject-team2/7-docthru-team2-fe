export default function PendingChallengeNotice() {
  return (
    <div>
      <div>승인 대기 중입니다.</div>
      <div>{reason}</div>
      <div>{date}</div>
    </div>
  );
}
