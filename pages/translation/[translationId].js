import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TranslationDetail from "@/components/translation/TranslationDetail";
import FeedbackList from "@/components/translation/FeedbackList";
import FeedbackForm from "@/components/translation/FeedbackForm";

export default function TranslationDetailPage() {
  const router = useRouter();
  const { translationId } = router.query;
  const [work, setWork] = useState(null);

  // 임시 유저 정보 (로그인 중이라고 가정)
  const currentUserId = 3;
  const currentUserRole = "user"; // 또는 "admin"

  useEffect(() => {
    if (!router.isReady) return;

    const mockWork = {
      id: translationId,
      userId: 3, // 작성자 id
      title: "React Server Components",
      author: "유저3",
      submittedAt: "2025-07-30T13:00:00Z",
      likes: 12,
      content: `React Server Components는 서버에서 렌더링되는 컴포넌트입니다.`,
      feedbacks: [
        {
          id: 1,
          userId: 2,
          nickname: "피드백유저1",
          content: "좋은 번역이네요!",
          createdAt: "2025-07-31T12:00:00Z",
        },
        {
          id: 2,
          userId: 3,
          nickname: "유저3",
          content: "제가 작성한 피드백입니다.",
          createdAt: "2025-08-01T09:00:00Z",
        },
      ],
    };

    setWork(mockWork);
  }, [router.isReady, translationId]);

  if (!work) return <p>Loading...</p>;

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{work.title}</h1>
      <TranslationDetail
        work={work}
        currentUserId={currentUserId}
        currentUserRole={currentUserRole}
      />
      <FeedbackList
        feedbacks={work.feedbacks}
        currentUserId={currentUserId}
        currentUserRole={currentUserRole}
      />
      <FeedbackForm workId={work.id} />
    </div>
  );
}
