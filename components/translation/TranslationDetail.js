import React, { useState } from "react";
import TranslationInfo from "./TranslationInfo";
import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";
import styles from "./TranslationDetail.module.css";

export default function TranslationDetail() {
  // 로그인 사용자 mock  (99=일반, 2=작성자, 999=어드민)
  const currentUser = { id: 999, isAdmin: true };

  // 번역 데이터 mock
  const translation = {
    id: 1,
    title: "React란?",
    field: "next.js",
    documentType: "공식문서",
    userId: 2,
    nickname: "독스루",
    userLevel: "전문가",
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

  const [feedbacks, setFeedbacks] = useState([
    {
      id: 101,
      content: "좋은 번역 감사합니다!",
      userId: 99,
      nickname: "일반유저",
      userLevel: "일반",
      createdAt: "2025-08-02 15:38",
    },
    {
      id: 102,
      content: "여기 오타 있어요.",
      userId: 2,
      nickname: "작성자닉네임",
      userLevel: "전문가",
      createdAt: "2025-08-03 12:20",
    },
    {
      id: 103,
      content: "이 부분은 좀 더 자세히 설명해 주세요.",
      userId: 999,
      nickname: "관리자",
      userLevel: "전문가",
      createdAt: "2025-08-04 09:10",
    },
    {
      id: 104,
      content: "피드백 감사합니다!",
      userId: 99,
      nickname: "일반유저",
      userLevel: "일반",
      createdAt: "2025-08-05 10:00",
    },
  ]);

  // 현재 유저 닉네임(데모용)
  const currentNickname =
    currentUser.id === 999
      ? "관리자"
      : currentUser.id === translation.userId
      ? "작성자닉네임"
      : "일반유저";

  // 폼 등록 콜백
  const handleFeedbackSubmitted = ({ translationId, userId, content }) => {
    const next = {
      id: Date.now(),
      content: content.trim(),
      userId,
      nickname: currentNickname,
      userLevel: currentUser.isAdmin ? "전문가" : "일반",
      createdAt: new Date().toISOString(),
    };
    setFeedbacks((prev) => [next, ...prev]);
  };

  // 수정/삭제 콜백 (서버 연동 자리 표시)
  const handleUpdate = async ({ id, content }) => {
    setFeedbacks((prev) =>
      prev.map((f) => (f.id === id ? { ...f, content } : f))
    );
  };
  const handleDelete = async ({ id /*, reason*/ }) => {
    setFeedbacks((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className={styles.container}>
      <div className={styles.translationDetail__container}>
        <TranslationInfo translation={translation} currentUser={currentUser} />

        <div className={styles.paper}>
          <p className={styles.content}>{translation.content}</p>
        </div>

        <div className={styles.line} />

        <div className={styles.section}>
          <FeedbackForm
            translationId={translation.id}
            currentUser={currentUser}
            onSubmitted={handleFeedbackSubmitted}
          />
        </div>

        <div className={styles.sectionSmall}>
          <FeedbackList
            feedbacks={feedbacks}
            currentUser={currentUser}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
