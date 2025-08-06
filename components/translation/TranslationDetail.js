import React from "react";
import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";

export default function TranslationDetail() {
  //  MOCK 로그인된 사용자
  const currentUser = {
    // 일반 사용자	  { id: 99, isAdmin: false }	  피드백 작성만 가능, 수정/삭제 버튼 없음
    // 글 작성자	   { id: 2, isAdmin: false }	   수정/삭제 버튼 표시됨
    // 관리자(어드민)	{ id: 999, isAdmin: true }	  모든 작업물에 삭제 버튼 표시됨
    id: 999,           // 작성자 테스트: translation.userId 와 동일하게 설정 
    isAdmin: false,  // 어드민 테스트하려면 true로 변경
  };

  //  MOCK 번역 작업물 데이터
  const translation = {
    id: 1,
    title: "React란?",
    field: "프론트엔드",
    documentType: "기술문서",
    userId: 2, // 작성자 ID
    nickname: "독스루",
    likeCount: 5,
    createdAt: "2025-08-01",
    content: "React는 UI 라이브러리입니다.",
  };

  //  MOCK 피드백 데이터
  const feedbacks = [
    {
      id: 101,
      content: "좋은 번역 감사합니다!",
      userId: 99,
      nickname: "일반유저",
      createdAt: "2025-08-02",
    },
    {
      id: 102,
      content: "여기 오타 있어요.",
      userId: 2, // 작성자 본인이 쓴 피드백
      nickname: "작성자닉네임",
      createdAt: "2025-08-03",
    },
  ];

  const isOwner = currentUser.id === translation.userId;
  const isAdmin = currentUser.isAdmin;

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h2>{translation.title}</h2>
      <p>
        분야: {translation.field} / 문서유형: {translation.documentType}
      </p>
      <p>
        작성자: {translation.nickname} / 좋아요: {translation.likeCount} / 작성일:{" "}
        {translation.createdAt}
      </p>

      {/* 작성자 or 어드민일 때만 드롭다운 버튼 표시 */}
      {(isOwner || isAdmin) && (
        <div style={{ marginTop: "10px" }}>
          {isOwner && <button>수정하기</button>}
          <button>삭제하기</button>
        </div>
      )}

      {/* 번역 내용 */}
      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          background: "#f9f9f9",
          borderRadius: "10px",
        }}
      >
        <p>{translation.content}</p>
      </div>

      {/* 피드백 목록 */}
      <div style={{ marginTop: "20px" }}>
        <FeedbackList
          feedbacks={feedbacks}
          currentUserId={currentUser.id}
          currentUserRole={isAdmin ? "admin" : "user"}
        />
      </div>
    </div>
  );
}
