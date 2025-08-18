import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TranslationDetail from "@/components/translation/TranslationDetail";
import FeedbackList from "@/components/translation/FeedbackList";
import FeedbackForm from "@/components/translation/FeedbackForm";

export default function TranslationDetailPage() {
  const router = useRouter();
  const { translationId } = router.query;
  const [translation, setTranslation] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);

  const currentUserId = 3;
  const currentUserRole = "user"; // 또는 "admin"

  useEffect(() => {
    if (!router.isReady) return;

    // ✅ translation이라는 이름으로 목 데이터 정의
    const mockTranslation = {
      id: translationId,
      userId: 3,
      title: "React Server Components",
      author: "유저3",
      submittedAt: "2025-07-30T13:00:00Z",
      likes: 12,
      content: "React Server Components는 서버에서 렌더링되는 컴포넌트입니다.",
    };

    const mockFeedbacks = [
      {
        id: 1,
        userId: 5,
        nickname: "유저5",
        content: "좋은 번역이네요!",
        createdAt: "2025-08-01T10:00:00Z",
      },
      {
        id: 2,
        userId: 3,
        nickname: "유저3",
        content: "수정이 필요할 수도 있어요.",
        createdAt: "2025-08-02T12:30:00Z",
      },
    ];

    setTranslation(mockTranslation);
    setFeedbacks(mockFeedbacks);
  }, [router.isReady, translationId]);

  const handleAddFeedback = (newFeedback) => {
    setFeedbacks((prev) => [newFeedback, ...prev]);
  };

  if (!translation) return <p>Loading...</p>;

  return (
    <div style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{translation.title}</h1>
      <TranslationDetail
        translation={translation}
        currentUserId={currentUserId}
        currentUserRole={currentUserRole}
      />
      <FeedbackForm
        translationId={translation.id}
        currentUserId={currentUserId}
        onAddFeedback={handleAddFeedback}
      />
      <FeedbackList
        feedbacks={feedbacks}
        currentUserId={currentUserId}
        currentUserRole={currentUserRole}
      />
    </div>
  );
}
