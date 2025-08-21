import styles from "@/styles/ChallengesIdPage.module.css";
import ChallengeNotice from "../../components/challengeId/ChallengeNotice";
import ChallengeDetail from "../../components/challengeId/ChallengeDetail";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ChallengeAcceptedSection from "@/components/challengeId/ChallengeAcceptedSection";
import ParticipationSection from "@/components/challengeId/ParticipationSection";
import { getChallengeView, createChallengeStatus } from "@/api/challengeId";
import { userSetting } from "@/lib/useAuth";
import BestTranslation from "@/components/challengeId/BestTranslation";
import AdminArea from "@/components/challengeId/AdminArea";
import RejectModal from "@/components/modals/rejectModal";

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

  const handleChallengeStatus = async (state, reason) => {
    try {
      await createChallengeStatus(challengeId, state, reason);
      alert(
        `챌린지가 성공적으로 ${
          state === "ACCEPTED" ? "승인" : "거절"
        }되었습니다.`
      );
      refreshChallengeData();
    } catch (error) {
      alert(`상태 변경 실패: ${error.message}`);
    }
  };

  // 상태 변경 후 페이지 데이터 새로고침
  const refreshChallengeData = () => {
    if (challengeId) {
      getChallengeById(challengeId);
    }
  };

  // 거절 사유 모달
  const [isOpen, setIsOpen] = useState(false);

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

  const date = ["DELETED", "REJECTED"].includes(challengeState)
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
          <ChallengeAcceptedSection data={challenge} isFinished={isFinished} />
          {isFinished && <BestTranslation challengeId={challengeId} />}
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
      {challengeState === "PENDING" && user.isAdmin && (
        <AdminArea
          setIsOpen={setIsOpen}
          challengeId={challengeId}
          onAccept={() => handleChallengeStatus("ACCEPTED")}
        />
      )}
      {isOpen && (
        <RejectModal
          onClose={() => setIsOpen(false)}
          onReject={(reason) => handleChallengeStatus("REJECTED", reason)}
        />
      )}
    </div>
  );
}
