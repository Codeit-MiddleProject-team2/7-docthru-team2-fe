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
    userId: 5, //소유자(만든 사람)
    isAdmitted: "deleted", // 승인 대기(pending), 승인 거절(rejected), 삭제(deleted), 승인_상태 값
  };

  if (challenge.isAdmitted === "deleted") {
    return (
      <div>
        <DeletedChallengeNotice date={challenge.deletedAt} />
        <ChallengeDetail challenge={challenge} />
      </div>
    );
  }

  if (challenge.isAdmitted === "rejected") {
    return (
      <div>
        <RejectedChallengeNotice
          reason={challenge.rejectedReason}
          date={challenge.rejectedAt}
        />
        <ChallengeDetail challenge={challenge} />
      </div>
    );
  }

  if (challenge.isAdmitted === "pending") {
    return (
      <div>
        <PendingChallengeNotice />;
        <ChallengeDetail challenge={challenge} />
      </div>
    );
  }

  return <ChallengeDetail challege={challenge} />;
}
