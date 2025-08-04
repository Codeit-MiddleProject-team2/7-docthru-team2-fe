import LikeButton from "./LikeButton";
import ActionButtons from "./ActionButtons";

export default function TranslationDetail({ work, currentUserId, currentUserRole }) {
  const isAuthor = work.userId === currentUserId;
  const isAdmin = currentUserRole === "admin";

  return (
    <section style={{ marginTop: "30px", borderBottom: "1px solid #ccc", paddingBottom: "20px" }}>
      <p><strong>작성자:</strong> {work.author}</p>
      <p><strong>제출일:</strong> {new Date(work.submittedAt).toLocaleDateString()}</p>
      <p><strong>좋아요:</strong> {work.likes}</p>

      <div
        style={{
          marginTop: "20px",
          whiteSpace: "pre-wrap",
          background: "#f9f9f9",
          padding: "20px",
          borderRadius: "8px",
        }}
      >
        {work.content}
      </div>

      {(isAuthor || isAdmin) && (
        <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
          <LikeButton workId={work.id} />
          <ActionButtons workId={work.id} />
        </div>
      )}
    </section>
  );
}
