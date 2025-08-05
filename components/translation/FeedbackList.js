import { useState } from "react";

export default function FeedbackList({ feedbacks, currentUserId, currentUserRole }) {
  const [visibleCount, setVisibleCount] = useState(3);

  // 배열 안전 처리
  const safeFeedbacks = Array.isArray(feedbacks) ? feedbacks : [];
  const visibleFeedbacks = safeFeedbacks.slice(0, visibleCount);
  const hasMore = safeFeedbacks.length > visibleCount;

  return (
    <div style={{ marginTop: "40px" }}>
      <h3>피드백</h3>

      {safeFeedbacks.length === 0 ? (
        <p style={{ color: "#888", marginTop: "12px" }}>아직 피드백이 없습니다.</p>
      ) : (
        <>
          {visibleFeedbacks.map((fb) => (
            <div
              key={fb.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "6px",
                padding: "12px",
                marginBottom: "10px",
              }}
            >
              <p>
                <strong>{fb.nickname}</strong> ·{" "}
                {new Date(fb.createdAt).toLocaleDateString()}
              </p>
              <p>{fb.content}</p>

              {(fb.userId === currentUserId || currentUserRole === "admin") && (
                <div style={{ marginTop: "10px" }}>
                  <button style={{ marginRight: "10px" }}>수정</button>
                  <button>삭제</button>
                </div>
              )}
            </div>
          ))}

          {hasMore && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 3)}
              style={{ marginTop: "10px" }}
            >
              더보기
            </button>
          )}
        </>
      )}
    </div>
  );
}
