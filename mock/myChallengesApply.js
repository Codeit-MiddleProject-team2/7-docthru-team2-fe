const mockChallenges = [
  {
    id: 1020,
    type: "블로그",
    category: "Next.js",
    title: "Next.js - App Router?",
    people: 10,
    createdAt: "2024-01-16T09:00:00Z",
    dueDate: "2024-01-16T09:00:00Z",
    isAdmitted: "pending",
  },
  {
    id: 1021,
    type: "공식문서",
    category: "Next.js",
    title: "Next.js - App Router?",
    people: 10,
    createdAt: "2024-01-15T09:00:00Z",
    dueDate: "2024-01-16T09:00:00Z",
    isAdmitted: "deleted",
  },
  {
    id: 1022,
    type: "공식문서",
    category: "Next.js",
    title: "Next.js - App Router?",
    people: 10,
    createdAt: "2024-01-14T09:00:00Z",
    dueDate: "2024-01-16T09:00:00Z",
    isAdmitted: "deleted",
  },
  {
    id: 1023,
    type: "공식문서",
    category: "Next.js",
    title: "Next.js - App Router: Routing Fundamentals",
    people: 10,
    createdAt: "2024-01-13T09:00:00Z",
    dueDate: "2024-01-16T09:00:00Z",
    isAdmitted: "approved",
  },
  {
    id: 1024,
    type: "블로그",
    category: "React",
    title: "React Hooks 완전 정복",
    people: 12,
    createdAt: "2024-02-01T09:00:00Z",
    dueDate: "2024-02-28T09:00:00Z",
    isAdmitted: "rejected",
  },
  {
    id: 1025,
    type: "공식문서",
    category: "JavaScript",
    title: "자바스크립트 ES6 문법 정리",
    people: 15,
    createdAt: "2024-02-02T09:00:00Z",
    dueDate: "2024-02-28T09:00:00Z",
    isAdmitted: "pending",
  },
  {
    id: 1026,
    type: "블로그",
    category: "CSS",
    title: "CSS Flexbox 완벽 가이드",
    people: 8,
    createdAt: "2024-02-03T09:00:00Z",
    dueDate: "2024-02-28T09:00:00Z",
    isAdmitted: "approved",
  },
  {
    id: 1027,
    type: "공식문서",
    category: "HTML",
    title: "HTML 시맨틱 태그",
    people: 7,
    createdAt: "2024-02-04T09:00:00Z",
    dueDate: "2024-02-28T09:00:00Z",
    isAdmitted: "deleted",
  },
  {
    id: 1028,
    type: "블로그",
    category: "Node.js",
    title: "Express.js 서버 만들기",
    people: 11,
    createdAt: "2024-02-05T09:00:00Z",
    dueDate: "2024-02-28T09:00:00Z",
    isAdmitted: "rejected",
  },
  {
    id: 1029,
    type: "공식문서",
    category: "MongoDB",
    title: "MongoDB 기본 쿼리 배우기",
    people: 9,
    createdAt: "2024-02-06T09:00:00Z",
    dueDate: "2024-02-28T09:00:00Z",
    isAdmitted: "pending",
  },
  {
    id: 1030,
    type: "공식문서",
    category: "React",
    title: "React Router v6 가이드",
    people: 14,
    createdAt: "2024-02-07T09:00:00Z",
    dueDate: "2024-02-28T09:00:00Z",
    isAdmitted: "approved",
  },
  {
    id: 1031,
    type: "블로그",
    category: "Next.js",
    title: "Next.js Image 최적화",
    people: 6,
    createdAt: "2024-02-08T09:00:00Z",
    dueDate: "2024-02-28T09:00:00Z",
    isAdmitted: "pending",
  },
  {
    id: 1032,
    type: "강의",
    category: "TypeScript",
    title: "타입스크립트 기초 다지기",
    people: 13,
    createdAt: "2024-02-09T09:00:00Z",
    dueDate: "2024-02-28T09:00:00Z",
    isAdmitted: "deleted",
  },
  {
    id: 1033,
    type: "공식문서",
    category: "CSS",
    title: "CSS Grid Layout 가이드",
    people: 10,
    createdAt: "2024-02-10T09:00:00Z",
    dueDate: "2024-02-28T09:00:00Z",
    isAdmitted: "approved",
  },
  {
    id: 1034,
    type: "블로그",
    category: "React",
    title: "React Context API 완벽 이해",
    people: 15,
    createdAt: "2024-02-11T09:00:00Z",
    dueDate: "2024-02-28T09:00:00Z",
    isAdmitted: "rejected",
  },
  {
    id: 1035,
    type: "공식문서",
    category: "Next.js",
    title: "Next.js 서버 액션(Server Actions) 배우기",
    people: 12,
    createdAt: "2024-02-12T09:00:00Z",
    dueDate: "2024-02-28T09:00:00Z",
    isAdmitted: "pending",
  },
  {
    id: 1036,
    type: "블로그",
    category: "JavaScript",
    title: "비동기 프로그래밍(Aync/Await) 완벽 가이드",
    people: 11,
    createdAt: "2024-02-13T09:00:00Z",
    dueDate: "2024-02-28T09:00:00Z",
    isAdmitted: "approved",
  },
  {
    id: 1037,
    type: "공식문서",
    category: "React",
    title: "React Suspense 개념 정리",
    people: 8,
    createdAt: "2024-02-14T09:00:00Z",
    dueDate: "2024-02-28T09:00:00Z",
    isAdmitted: "deleted",
  },
  {
    id: 1038,
    type: "블로그",
    category: "TypeScript",
    title: "타입스크립트 유틸리티 타입 정리",
    people: 10,
    createdAt: "2024-02-15T09:00:00Z",
    dueDate: "2024-02-28T09:00:00Z",
    isAdmitted: "approved",
  },
  {
    id: 1039,
    type: "블로그",
    category: "MongoDB",
    title: "MongoDB Aggregation Framework",
    people: 9,
    createdAt: "2024-02-16T09:00:00Z",
    dueDate: "2024-02-28T09:00:00Z",
    isAdmitted: "rejected",
  },
  {
    id: 1040,
    type: "블로그",
    category: "CSS",
    title: "CSS 애니메이션 기초",
    people: 7,
    createdAt: "2024-02-17T09:00:00Z",
    dueDate: "2024-02-28T09:00:00Z",
    isAdmitted: "pending",
  },
];
export function getMyChallengesApply({
  status,
  keyword,
  page = 1,
  limit = 10,
} = {}) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let result = [...mockChallenges];

      result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      if (status) {
        result = result.filter((item) => item.isAdmitted === status);
      }

      if (keyword) {
        result = result.filter((item) =>
          item.title.toLowerCase().includes(keyword.toLowerCase())
        );
      }

      const total = result.length;
      const startIndex = (page - 1) * limit;
      result = result.slice(startIndex, startIndex + limit);

      resolve({
        total,
        data: result,
      });
    }, 500);
  });
}

export async function rejectChallenge(challengeId, reason) {
  // mock delay
  await new Promise((res) => setTimeout(res, 500));

  // 목 데이터 로직
  if (!challengeId || !reason) {
    throw new Error("challengeId와 reason은 필수입니다.");
  }

  return {
    challengeId,
    status: "rejected",
    reason,
    updatedAt: new Date().toISOString(),
  };
}
