import styles from "@/styles/ChallengesIdPage.module.css";
import ChallengeNotice from "../../components/challengeId/ChallengeNotice";
import ChallengeDetail from "../../components/challengeId/ChallengeDetail";
import { getChallengesDetail } from "@/mock/challengesDetailMock";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ChallengesIdPage() {
  const router = useRouter();
  const { id: challengeId } = router.query;
  const [challenge, setChallenge] = useState({});
  const getChallengeById = async () => {
    try {
      const res = await getChallengesDetail(challengeId);
      setChallenge(res);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getChallengeById(challengeId);
  }, [challengeId]);

  // 아직 데이터 로딩이 되지 않았거나, 존재하지 않는 id로 접근했을 때 페이지
  if (!challenge || Object.keys(challenge).length === 0) {
    return <div>챌린지가 없습니다.</div>;
  }

  const date =
    challenge.isAdmitted === "deleted"
      ? challenge.deletedAt
      : challenge.isAdmitted === "rejected"
      ? challenge.rejectedAt
      : undefined;

  console.log(challenge.isAdmitted);

  // 진행 중인 챌린지일 때의 페이지 렌더링
  if (challenge.isAdmitted === "accepted") {
    return <div>진행중</div>;
  }

  // 거절, 삭제, 승인 대기 중인 챌린지 일 때의 페이지 렌더링
  return (
    <div className={styles.PageWrapper}>
      <ChallengeNotice type={challenge.isAdmitted} date={date} />
      <ChallengeDetail challenge={challenge} />
    </div>
  );
}
