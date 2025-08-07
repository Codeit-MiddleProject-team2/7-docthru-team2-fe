import ParticipationList from "./ParticipationList";
import userImg from "@/public/icons/ic_profile.svg";

const data = [
  {
    id: 1,
    challengeId: 500,
    user: {
      nickname: "코딩왕",
      userLevel: "전문가",
      img: userImg,
    },
    _count: {
      hearts: 999,
    },
  },
  {
    id: 2,
    challengeId: 500,
    user: {
      nickname: "초보",
      userLevel: "일반",
      img: userImg,
    },
    _count: {
      hearts: 888,
    },
  },
  {
    id: 3,
    challengeId: 500,
    user: {
      nickname: "코테준비중",
      userLevel: "전문가",
      img: userImg,
    },
    _count: {
      hearts: 777,
    },
  },
];

export default function ParticipationSection() {
  return (
    <div>
      <div>참여 현황</div>
      <ParticipationList data={[]} />
    </div>
  );
}
