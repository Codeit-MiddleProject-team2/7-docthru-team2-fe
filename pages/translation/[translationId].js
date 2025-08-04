import React from "react";
import TranslationDetail from "@/components/translation/TranslationDetail";

export default function TranslationDetailPage() {
  // 목업 사용자 정보
  const mockUser = {
    id: 101,
    nickname: "유저3",
    isAdmin: false,
  };

  // 목업 번역 데이터
  const mockTranslation = {
    id: 1,
    title: "React Server Components",
    content: "React Server Components는 서버에서 렌더링되는 컴포넌트입니다.",
    userId: 101,
    user: { id: 101, nickname: "유저3" },
    createdAt: "2025-07-30T10:00:00Z",
    canceled: false,
    hearts: [1, 2, 3],
  };

  return <TranslationDetail translation={mockTranslation} user={mockUser} />;
}
