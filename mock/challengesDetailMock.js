import userImg from "@/public/icons/ic_profile.svg";

const challenges = [
  {
    id: 999,
    title: "Next.js - App Router : Routing Fundamentals",
    description:
      "Next.js App Router 공식 문서 중 Routing Fundamentals 내용입니다! 라우팅에 따른 폴더와 파일이 구성되는 법칙과 컨벤션 등에 대해 공부할 수 있을 것 같아요~! 다들 챌린지 많이 참여해 주세요 :)",
    url: `http://localhost:3000/challenges/999`,
    category: "Next.js",
    type: "공식문서",
    dueDate: "2025-07-31T14:00:00Z",
    maximum: 5,
    createdAt: "2025-06-12T09:00:00Z",
    updatedAt: "2025-06-13T11:00:00Z",
    deletedAt: "2025-08-01T13:24:00Z",
    rejectedAt: "2025-08-02T15:35:00Z",
    userId: 5,
    isAdmitted: "deleted",
  },
  {
    id: 1000,
    title: "React 상태 관리 완전 정복",
    description: "React의 다양한 상태 관리 방법을 실습하고 비교합니다.",
    url: `http://localhost:3000/challenges/1000`,
    category: "React",
    type: "블로그",
    dueDate: "2025-08-10T18:00:00Z",
    maximum: 8,
    createdAt: "2025-07-01T09:00:00Z",
    updatedAt: "2025-07-02T11:00:00Z",
    deletedAt: "2025-08-11T13:24:00Z",
    rejectedAt: "2025-08-12T15:35:00Z",
    userId: 7,
    isAdmitted: "pending",
  },
  {
    id: 1001,
    title: "Vue.js 컴포넌트 구조 마스터",
    description: "Vue.js의 컴포넌트 구조와 재사용 패턴을 학습합니다.",
    url: `http://localhost:3000/challenges/1001`,
    category: "Vue.js",
    type: "공식문서",
    dueDate: "2025-09-01T14:00:00Z",
    maximum: 6,
    createdAt: "2025-08-01T09:00:00Z",
    updatedAt: "2025-08-02T11:00:00Z",
    deletedAt: "2025-09-02T13:24:00Z",
    rejectedAt: "2025-09-03T15:35:00Z",
    userId: 8,
    isAdmitted: "rejected",
  },
  {
    id: 500,
    title: "PRISMA 공식 문서 번역",
    description: "PRISMA 이용 실력을 길러봅시다",
    url: "https://www.prisma.io/docs/orm",
    category: "prisma",
    type: "공식문서",
    dueDate: "2025-09-01T14:00:00Z",
    maximum: 15,
    createdAt: "2025-08-01T09:00:00Z",
    updatedAt: "2025-08-02T11:00:00Z",
    deletedAt: "2025-09-02T13:24:00Z",
    rejectedAt: "2025-09-03T15:35:00Z",
    userId: "yewon",
    user: {
      id: "yewon",
      nickname: "yewon",
      img: userImg,
    },
    isAdmitted: "accepted",
    isClosed: false,
    _count: {
      translation: 0,
    },
  },
];

export function getChallengesDetail(challengeId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const challenge = challenges.find(
        (challenge) => challenge.id === Number(challengeId)
      );
      resolve(challenge);
    }, 500);
  });
}
