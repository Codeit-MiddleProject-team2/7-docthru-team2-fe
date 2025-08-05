import { useState } from "react";

export default function FeedbackForm({ workId, currentUserId, onAddFeedback }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newFeedback = {
      id: Date.now(),
      userId: currentUserId,
      nickname: "유저3", // 실제론 유저 정보에서 가져올 것
      content,
      createdAt: new Date().toISOString(),
    };

    onAddFeedback(newFeedback);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="피드백을 입력하세요"
        rows={4}
        style={{ width: "100%", padding: "10px" }}
      />
      <button
        type="submit"
        disabled={!content.trim()}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: content.trim() ? "#333" : "#ccc",
          color: "#fff",
          border: "none",
          cursor: content.trim() ? "pointer" : "not-allowed",
        }}
      >
        등록
      </button>
    </form>
  );
}
