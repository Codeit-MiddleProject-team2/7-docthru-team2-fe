import React, { useState } from "react";

export default function FeedbackList({ feedbacks = [], currentUserId, currentUserRole }) {
  const [visibleCount, setVisibleCount] = useState(3);
  const visibleFeedbacks = feedbacks.slice(0, visibleCount);
  const hasMore = feedbacks.length > visibleCount;

  return (
    <div>
      <h3>피드백</h3>

      {visibleFeedbacks.length === 0 ? (
        <p style={{ color: "#888" }}>아직 피드백이 없습니다</p>
      ) : (
        visibleFeedbacks.map((fb) => (
          <div key={fb.id} style={{ marginBottom: "16px", border: "1px solid #555", padding: "12px", borderRadius: "6px" }}>
            <p><strong>{fb.nickname}</strong> · {fb.createdAt}</p>
            <p>{fb.content}</p>

            {/* 조건 분리 */}
            {(fb.userId === currentUserId || currentUserRole === "admin") && (
              <div style={{ marginTop: "6px" }}>
                {fb.userId === currentUserId && <button style={{ marginRight: "8px" }}>수정</button>}
                <button>삭제</button>
              </div>
            )}
          </div>
        ))
      )}

      {hasMore && (
        <button onClick={() => setVisibleCount(visibleCount + 3)}>
          더보기
        </button>
      )}
    </div>
  );
}
