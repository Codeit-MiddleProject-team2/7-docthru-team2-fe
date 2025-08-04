export function getMyChallengesApply() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 1020,
          type: "블로그",
          category: "Next.js",
          title: "Next.js - App Router?",
          people: 10,
          createdAt: "24/01/16",
          dueDate: "24/01/16",
          isAdmitted: "pending",
        },
        {
          id: 1021,
          type: "공식문서",
          category: "Next.js",
          title: "Next.js - App Router?",
          people: 10,
          createdAt: "24/01/16",
          dueDate: "24/01/16",
          isAdmitted: "deleted",
        },
        {
          id: 1022,
          type: "공식문서",
          category: "Next.js",
          title: "Next.js - App Router?",
          people: 10,
          createdAt: "24/01/16",
          dueDate: "24/01/16",
          isAdmitted: "deleted",
        },
        {
          id: 1023,
          type: "공식문서",
          category: "Next.js",
          title: "Next.js - App Router: Routing Fundamentals",
          people: 10,
          createdAt: "24/01/16",
          dueDate: "24/01/16",
          isAdmitted: "approved",
        },
        {
          id: 1024,
          type: "블로그",
          category: "React",
          title: "React Hooks 완전 정복",
          people: 12,
          createdAt: "24/02/01",
          dueDate: "24/02/28",
          isAdmitted: "rejected",
        },
      ]);
    }, 500); // 지연 시뮬레이션
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
