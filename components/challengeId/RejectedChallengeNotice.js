export default function RejectedChallengeNotice({ reason, date }) {
  return (
    <div>
      <div>신청이 거절되었습니다.</div>
      <div>{reason}</div>
      <div>{date}</div>
    </div>
  );
}
