import React from "react";

export default function ActionButtons({ translation, user }) {
  const handleDelete = () => {
    alert("삭제 기능 (모달 등 연결 예정)");
    // TODO: 삭제 처리
  };

  return (
    <>
      {user?.id === translation?.userId && (
        <>
          <button>수정</button>
          <button onClick={handleDelete}>삭제</button>
        </>
      )}
      {user?.isAdmin && !translation?.canceled && (
        <button onClick={handleDelete}>[어드민] 삭제</button>
      )}
    </>
  );
}
