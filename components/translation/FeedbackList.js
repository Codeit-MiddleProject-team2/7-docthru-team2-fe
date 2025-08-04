import React, { useState } from "react";

const MOCK_FEEDBACKS = [
  {
    id: 1,
    user: { id: 100, nickname: "피드백유저1" },
    content: "좋은 번역이네요!",
    createdAt: "2025-07-31T10:00:00Z",
  },
  {
    id: 2,
    user: { id: 101, nickname: "유저3" },
    content: "제가 작성한 피드백입니다.",
    createdAt: "2025-08-01T12:00:00Z",
  },
];

export default function FeedbackList({ translationId, user }) {
  const [feedbacks, setFeedbacks] = useState(MOCK_FEEDBACKS);

  return (
    <div style={{ marginTop: "40px" }}>
      <h4>피드백 목록</h4>
      {feedbacks.map((fb) => (
        <div key={fb.id} style={{ marginBottom: "20px" }}>
          <strong>{fb.user.nickname}</strong> (
          {new Date(fb.createdAt).toLocaleDateString()})
          <p>{fb.content}</p>

          {(user?.id === fb.user.id || user?.isAdmin) && (
            <>
              <button>수정</button>
              <button>삭제</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
