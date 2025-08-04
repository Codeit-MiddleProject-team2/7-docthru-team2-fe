import React, { useState } from "react";

export default function FeedbackForm({ translationId }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    console.log("POST 피드백:", text);
    setText("");
    // TODO: 서버에 POST 요청
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
      <textarea
        placeholder="피드백을 입력하세요"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={3}
        style={{ width: "100%", borderRadius: "5px", padding: "10px", background: "var(--background)",
          color: "var(--foreground)", border: "1px solid #ccc" }}
      />
      <button type="submit" disabled={!text.trim()}>
        등록
      </button>
    </form>
  );
}
