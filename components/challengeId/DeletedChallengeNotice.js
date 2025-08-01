export default function DeletedChallengeNotice({ reason, date }) {
  const DELETE_REASON =
    "독스루는 개발 문서 번역 플랫폼으로, 폭력성과 관련된 내용을 포함할 수 없을 안내드립니다. 감사합니다.";

  return (
    <div>
      <div>삭제된 챌린지입니다.</div>
      <div>삭제 내용</div>
      <div>{DELETE_REASON}</div>
      <div>{date}</div>
    </div>
  );
}
