import styles from "./ChallengesIdPage.module.css";
import ChallengeNotice from "../../components/challengeId/ChallengeNotice";
import ChallengeDetail from "../../components/challengeId/ChallengeDetail";
import { useQuery } from "@tanstack/react-query";
import { getChallengesDetail } from "@/mock/challengesDetailMock";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function ChallengesIdPage() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ChallengesIdPageInner />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

function ChallengesIdPageInner() {
  const challengeId = 999;
  const {
    data: challenge,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["challengeDetail", challengeId],
    queryFn: async () => {
      const data = await getChallengesDetail();
      return data.find((c) => c.id === challengeId) || null;
    },
  });

  if (!challenge) {
    return <div>챌린지가 없습니다.</div>;
  }

  //하위 코드 참고: {notice && <ChallengeNotice />} 이렇게 변경해서 쓰는건?
  let notice = null;
  if (["deleted", "rejected", "pending"].includes(challenge.isAdmitted)) {
    notice = (
      <div className={styles.ChallengeNotice}>
        <ChallengeNotice
          type={challenge.isAdmitted}
          date={
            challenge.isAdmitted === "deleted"
              ? challenge.deletedAt
              : challenge.isAdmitted === "rejected"
              ? challenge.rejectedAt
              : undefined
          }
        />
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
