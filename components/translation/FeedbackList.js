export default function FeedbackList({ feedbacks, currentUserId, currentUserRole }) {
  if (!feedbacks || feedbacks.length === 0) {
    return <p style={{ marginTop: "30px" }}>아직 피드백이 없습니다.</p>;
  }

  return (
    <section style={{ marginTop: "30px" }}>
      <h3>피드백 목록</h3>
      <ul style={{ paddingLeft: "0" }}>
        {feedbacks.map((fb) => {
          const isAuthor = fb.userId === currentUserId;
          const isAdmin = currentUserRole === "admin";

          return (
            <li key={fb.id} style={{ marginBottom: "15px", listStyle: "none", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>
              <p><strong>{fb.nickname}</strong> ({new Date(fb.createdAt).toLocaleDateString()})</p>
              <p>{fb.content}</p>
              {(isAuthor || isAdmin) && (
                <div style={{ marginTop: "5px", display: "flex", gap: "5px" }}>
                  <button>수정</button>
                  <button>삭제</button>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
