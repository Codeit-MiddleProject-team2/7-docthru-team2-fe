import React from "react";

export default function TranslationActions({ translation, currentUser }) {
  const isOwner = currentUser.id === translation.userId;
  const isAdmin = currentUser.isAdmin;

  if (!isOwner && !isAdmin) return null;

  return (
    <div style={{ marginTop: "10px" }}>
      {isOwner && <button>수정하기</button>}
      <button>삭제하기</button>
    </div>
  );
}
