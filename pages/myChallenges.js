import styles from "../styles/myChallenges.module.css";
import Image from "next/image";
import iconPlus from "../public/icons/ic_plus.svg";
import ChallengeCard from "@/components/challenges/card";
import { Pagination } from "@/components/challenges/pagination";
import SearchBar from "@/components/challenges/searchBar";
import Sort from "@/components/challenges/sort";
import Link from "next/link";

export default function MyChallengesPage() {
  const sample = {
    id: 2,
    title: "React 상태 관리 완전 정복",
    description: "React의 다양한 상태 관리 방법을 실습하고 비교합니다.",
    url: `http://localhost:3000/challenges/2`,
    category: "React",
    type: "블로그",
    dueDate: "2025-08-10T18:00:00Z",
    maximum: 8,
    createdAt: "2025-07-01T09:00:00Z",
    updatedAt: "2025-07-02T11:00:00Z",
    deletedAt: "2025-08-11T13:24:00Z",
    rejectedAt: "2025-08-12T15:35:00Z",
    userId: 5,
    isAdmitted: "accepted",
  };

  return (
    <>
      <div className={styles.contaniner}>
        <div className={styles.pageTopArea}>
          <div className={styles.titleArea}>
            <h2>나의 챌린지</h2>
            <div>
              <Link href={"/"} className={styles.btn}>
                신규 챌린지 신청
                <Image src={iconPlus} width={16} height={16} />
              </Link>
            </div>
          </div>
          <div>
            <ul className={styles.tabMenuEl}>
              <li>
                <Link href={`/`}>참여중인 챌린지</Link>
              </li>
              <li className={styles.active}>
                <Link href={`/`}>완료한 챌린지</Link>
              </li>
              <li>
                <Link href={`/`}>신청한 챌린지</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.challengeArea}>
          <div className={styles.dataOptionsArea}>
            <Sort />
            <SearchBar />
          </div>
          <div className={styles.challengeCardList}>
            <ChallengeCard data={sample} />
            <ChallengeCard data={sample} />
            <ChallengeCard data={sample} />
            <ChallengeCard data={sample} />
          </div>
          <Pagination pages={[1, 2, 3]} />
        </div>
      </div>
    </>
  );
}
