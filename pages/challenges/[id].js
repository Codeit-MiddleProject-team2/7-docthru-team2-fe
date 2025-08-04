import styles from "./ChallengesIdPage.module.css";
import DeletedChallengeNotice from "../../components/challengeId/DeletedChallengeNotice";
import PendingChallengeNotice from "../../components/challengeId/PendingChallengeNotice";
import RejectedChallengeNotice from "../../components/challengeId/RejectedChallengeNotice";
import ChallengeDetail from "../../components/challengeId/ChallengeDetail";

export default function ChallengesIdPage() {
  //mock data
  const challenge = {
    id: 999,
    title: "Next.js - App Router : Routing Fundamentals",
    description:
      "Next.js App Router 공식 문서 중 Routing Fundamentals 내용입니다! 라우팅에 따른 폴더와 파일이 구성되는 법칙과 컨벤션 등에 대해 공부할 수 있을 것 같아요~! 다들 챌린지 많이 참여해 주세요 :)",
    url: `http://localhost:3000/challenges/999`,
    category: "Next.js",
    type: "공식문서",
    dueDate: "2025-07-31T14:00:00Z",
    maximum: 5,
    createdAt: "2025-06-12T09:00:00Z",
    updatedAt: "2025-06-13T11:00:00Z",
    deletedAt: "2025-08-01T13:24:00Z",
    userId: 5, //소유자(만든 사람)
    isAdmitted: "deleted", // 승인 대기(pending), 승인 거절(rejected), 삭제(deleted), 승인_상태 값
  };

  let notice = null;
  if (challenge.isAdmitted === "deleted") {
    notice = (
      <div className={styles.DeletedChallengeNotice}>
        <DeletedChallengeNotice date={challenge.deletedAt} />
      </div>
    );
  } else if (challenge.isAdmitted === "rejected") {
    notice = (
      <div className={styles.RejectedChallengeNotice}>
        <RejectedChallengeNotice
          reason={challenge.rejectedReason}
          date={challenge.rejectedAt}
        />
      </div>
    );
  } else if (challenge.isAdmitted === "pending") {
    notice = (
      <div className={styles.PendingChallengeNotice}>
        <PendingChallengeNotice />
      </div>
    );
  }

  return (
    <div className={styles.PageWrapper}>
      {notice}
      <div className={styles.ChallengeDetail}>
        <ChallengeDetail challenge={challenge} />
      </div>
    </div>
  );
}
