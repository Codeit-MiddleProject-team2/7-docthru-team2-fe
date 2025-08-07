import React, { useState } from "react";
import DeleteReasonModal from "./DeleteReasonModal";

export default function FeedbackList({ feedbacks = [], currentUser }) {
  const [visibleCount, setVisibleCount] = useState(3);
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(null);

  const visibleFeedbacks = Array.isArray(feedbacks)
    ? feedbacks.slice(0, visibleCount)
    : [];

  const hasMore = feedbacks.length > visibleCount;

  const handleEditClick = (feedback) => {
    setEditingId(feedback.id);
    setEditContent(feedback.content);
  };

  const handleDeleteClick = (feedbackId) => {
    setSelectedFeedbackId(feedbackId);
    setDeleteModalOpen(true);
  };

  const handleDeleteConfirm = (reason) => {
    alert(`삭제 요청됨: ID ${selectedFeedbackId}, 사유 - ${reason}`);
    setDeleteModalOpen(false);
    setSelectedFeedbackId(null);
  };

  const handleUpdate = () => {
    alert(`수정 요청됨: ${editContent}`);
    setEditingId(null);
    setEditContent("");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      {visibleFeedbacks.length === 0 ? (
        <p style={{ color: "#aaa" }}>아직 피드백이 없습니다.</p>
      ) : (
        visibleFeedbacks.map((feedback) => {
          const isAuthor = feedback.userId === currentUser.id;
          const isAdmin = currentUser.isAdmin;

          return (
            <div
              key={feedback.id}
              style={{
                border: "1px solid #555",
                padding: "10px",
                marginBottom: "12px",
                borderRadius: "6px",
              }}
            >
              <p
                style={{ marginBottom: "6px", fontSize: "14px", color: "#ccc" }}
              >
                {feedback.nickname} · {feedback.createdAt}
              </p>

              {editingId === feedback.id ? (
                <>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    style={{
                      width: "100%",
                      minHeight: "80px",
                      backgroundColor: "#222",
                      color: "#fff",
                      border: "1px solid #777",
                      borderRadius: "4px",
                      padding: "10px",
                      marginBottom: "8px",
                    }}
                  />
                  <button
                    onClick={handleUpdate}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#fff",
                      color: "#000",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    전송
                  </button>
                </>
              ) : (
                <p style={{ color: "#eee" }}>{feedback.content}</p>
              )}

              {/* 버튼들 */}
              {(isAuthor || isAdmin) && (
                <div style={{ marginTop: "10px" }}>
                  {isAuthor && (
                    <button
                      onClick={() => handleEditClick(feedback)}
                      style={{
                        marginRight: "8px",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        backgroundColor: "#444",
                        color: "#fff",
                        cursor: "pointer",
                        fontSize: "12px",
                      }}
                    >
                      수정
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteClick(feedback.id)}
                    style={{
                      padding: "4px 8px",
                      borderRadius: "4px",
                      backgroundColor: "#444",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                  >
                    삭제
                  </button>
                </div>
              )}
            </div>
          );
        })
      )}

      {hasMore && (
        <button
          onClick={() => setVisibleCount(visibleCount + 3)}
          style={{
            marginTop: "12px",
            padding: "6px 12px",
            backgroundColor: "#333",
            color: "#fff",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
          }}
        >
          더보기
        </button>
      )}

      {/* 삭제 사유 모달 */}
      <DeleteReasonModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
