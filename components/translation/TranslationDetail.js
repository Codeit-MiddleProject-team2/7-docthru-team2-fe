import React from "react";
import TranslationInfo from "./TranslationInfo";
import TranslationActions from "./TranslationActions";
import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";

export default function TranslationDetail() {
  //  로그인 사용자 mock
  // 일반 사용자	  { id: 99, isAdmin: false }	  피드백 작성만 가능, 수정/삭제 버튼 없음
  // 글 작성자	   { id: 2, isAdmin: false }	   수정/삭제 버튼 표시됨
  // 관리자(어드민)	{ id: 999, isAdmin: true }	  모든 작업물에 삭제 버튼 표시됨
  const currentUser = {
    id: 99,
    isAdmin: false, // 어드민 테스트 true, 나머지는 false
  };

  // 번역 데이터 mock
  const translation = {
    id: 1,
    title: "React란?",
    field: "프론트엔드",
    documentType: "기술문서",
    userId: 2,
    nickname: "독스루",
    likeCount: 5,
    createdAt: "2025-08-01",
    content: "React는 UI 라이브러리입니다.",
  };

  // 피드백 mock
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
      userId: 2,
      nickname: "작성자닉네임",
      createdAt: "2025-08-03",
    },
  ];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <TranslationInfo translation={translation} />
      <TranslationActions translation={translation} currentUser={currentUser} />

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

      <div style={{ marginTop: "40px" }}>
        <FeedbackForm translationId={translation.id} currentUser={currentUser} />
      </div>

      <div style={{ marginTop: "20px" }}>
        <FeedbackList
          feedbacks={feedbacks}
          currentUserId={currentUser.id}
          currentUserRole={currentUser.isAdmin ? "admin" : "user"}
        />
      </div>
    </div>
  );
}
