import { useState } from "react";

export default function FeedbackForm({ workId }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    // 실제 API 요청은 추후 연결 예정
    alert(`POST /feedback\n작업물 ID: ${workId}\n내용: ${content}`);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="피드백을 입력하세요"
        style={{ width: "100%", height: "80px", padding: "10px" }}
      />
      <button type="submit" disabled={!content.trim()} style={{ marginTop: "10px" }}>
        등록
      </button>
    </form>
  );
}
