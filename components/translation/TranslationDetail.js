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
    id: 2,
    isAdmin: false, // 어드민 테스트 true, 나머지는 false
  };

  // 번역 데이터 mock
  // 요구사항 정리한 내용에 따라 mock 데이터 생성 했는데 스키마랑은 달라요
  // 이 점은 백엔드 할 때 상의해서 조정해야 할 것 같아요
  const translation = {
    id: 1,
    title: "React란?",
    field: "프론트엔드",
    documentType: "기술문서",
    userId: 2,
    nickname: "독스루",
    likeCount: 5,
    createdAt: "2025-08-01",
    content: `
일반적으로 개발자는 일련의 하드 스킬을 가지고 있어야 커리어에서 경력과 전문성을 쌓을 수 있습니다. 하지만 이에 못지 않게 개인 브랜드 구축도 만족스럽고 성취감 있는 경력을 쌓기 위해 중요하며 이를 쌓기는 더 어려울 수 있습니다.

- 다른 사람들과의 차별화
- 신뢰감을 줄 수 있음
- 인맥을 쌓을 수 있는 기회
- 이름을 알릴 수 있음

이렇게 개인 브랜드는 경력을 결정짓는 수많은 중요한 방법으로 여러분을 도울 수 있습니다. 하지만 본인의 실력을 뽐내는 데 익숙하지 않거나 마케팅 개념에 한 번도 접근해보지 않은 사람은 브랜드 구축을 부담스럽거나 어렵게 느낄 수 있습니다. 이 가이드에서는 브랜드 구축을 위한 몇 가지 실용적인 전략을 소개합니다!
  `,
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
    {
      id: 103,
      content: "이 부분은 좀 더 자세히 설명해 주세요.",
      userId: 999,
      nickname: "관리자",
      createdAt: "2025-08-04",
    },
    {
      id: 104,
      content: "피드백 감사합니다!",
      userId: 99,
      nickname: "일반유저",
      createdAt: "2025-08-05",
    },
  ];

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "80px" }}>
      <TranslationActions translation={translation} currentUser={currentUser} />
      <TranslationInfo translation={translation} />

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          background: "#f9f9f9",
          borderRadius: "10px",
          background: "#fff",
          borderRadius: "12px",
          padding: "24px",
          whiteSpace: "pre-line", // 줄바꿈 처리
          color: "#111",
          fontSize: "16px",
          lineHeight: "1.6",
        }}
      >
        <p style={{ color: "#111" }}>{translation.content}</p>
      </div>

      <div style={{ marginTop: "40px" }}>
        <FeedbackForm
          translationId={translation.id}
          currentUser={currentUser}
        />
      </div>

      <div style={{ marginTop: "20px" }}>
        <FeedbackList
          feedbacks={feedbacks}
          currentUser={currentUser}
          currentUserId={currentUser.id}
          currentUserRole={currentUser.isAdmin ? "admin" : "user"}
        />
      </div>
    </div>
  );
}
