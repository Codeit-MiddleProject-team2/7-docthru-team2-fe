import styles from "@/styles/ChallengesIdPage.module.css";
import ChallengeNotice from "../../components/challengeId/ChallengeNotice";
import ChallengeDetail from "../../components/challengeId/ChallengeDetail";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ChallengeAcceptedSection from "@/components/challengeId/ChallengeAcceptedSection";
import ParticipationSection from "@/components/challengeId/ParticipationSection";
import { getChallengeView } from "@/api/challengeId";
import { userSetting } from "@/lib/useAuth";

export default function ChallengesIdPage() {
  // 해당 두 줄 참고
  const [user, setUser] = useState({});
  const [accessTk, setAccessTk] = useState("");

  const router = useRouter();
  const { id: challengeId } = router.query;
  const [challenge, setChallenge] = useState({});
  const getChallengeById = async () => {
    try {
      const res = await getChallengeView(challengeId);
      setChallenge(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    // 해당 3줄 참고
    const { user: userData, accessToken } = userSetting();
    setUser(userData);
    setAccessTk(accessToken);

    if (!accessToken) {
      router.push("/");
    }

    if (!challengeId) return;
    getChallengeById(challengeId);
  }, [challengeId]);

  // 아직 데이터 로딩이 되지 않았거나, 존재하지 않는 id로 접근했을 때 페이지
  if (!challenge || Object.keys(challenge).length === 0) {
    return <div>챌린지가 없습니다.</div>;
  }

  const challengeState = challenge.challengeState;

  const date =
    challengeState === "DELETED"
      ? challenge.updatedAt
      : challengeState === "REJECTED"
      ? challenge.updatedAt
      : undefined;

  // 종료되었는가? (boolean)
  const now = new Date();
  const dueDate = new Date(challenge.dueDate);
  const isFinished = now.getTime() > dueDate.getTime();

  // 진행 중인 챌린지일 때의 페이지 렌더링
  if (challengeState === "ACCEPTED") {
    return (
      <div className={styles.background}>
        <div className={styles.content}>
          <ChallengeAcceptedSection
            data={challenge}
            user={user}
            isFinished={isFinished}
          />
          <ParticipationSection
            challengeId={challengeId}
            count={challenge._count.Translation}
            isFinished={isFinished}
          />
        </div>
      </div>
    );
  }

  // 거절, 삭제, 승인 대기 중인 챌린지 일 때의 페이지 렌더링
  return (
    <div className={styles.PageWrapper}>
      <ChallengeNotice
        type={challengeState}
        date={date}
        reason={challenge.reason}
      />
      <ChallengeDetail challenge={challenge} />
    </div>
  );
}
