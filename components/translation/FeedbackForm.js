import React, { useState } from "react";

export default function FeedbackForm({ translationId, currentUser }) {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) return;
    alert(`피드백 전송: ${content}`);
    setContent("");
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        style={{ width: "100%", padding: "10px", borderRadius: "5px" }}
        placeholder="피드백을 입력하세요"
      />
      <button
        onClick={handleSubmit}
        disabled={!content.trim()}
        style={{
          marginTop: "8px",
          padding: "8px 16px",
          borderRadius: "6px",
          backgroundColor: "#333",
          color: "#fff",
        }}
      >
        등록
      </button>
    </div>
  );
}
