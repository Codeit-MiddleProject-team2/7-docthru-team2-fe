import styles from "@/styles/myChallengesApply.module.css";
import Image from "next/image";
import iconPlus from "@/public/icons/ic_plus.svg";
import { Pagination } from "@/components/challenges/pagiation";
import SearchBar from "@/components/challenges/searchBar";
import Sort from "@/components/challenges/sort";
import Link from "next/link";
import TableRow from "@/components/challenges/tableRow";
import { getMyChallengesApply } from "@/mock/myChallengesApply.js";
import { useEffect, useState } from "react";

export default function MyChallengesApplyPage() {
  const [challenges, setChallenges] = useState([]);
  const handleMyChallenges = async () => {
    const data = await getMyChallengesApply();
    console.log(data);
    setChallenges(data);
  };
  useEffect(() => {
    handleMyChallenges();
  }, []);
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
              <li>
                <Link href={`/`}>완료한 챌린지</Link>
              </li>
              <li className={styles.active}>
                <Link href={`/`}>개설한 챌린지</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.challengeArea}>
          <div className={styles.dataOptionsArea}>
            <Sort />
            <SearchBar />
          </div>
          <div className={styles.challengeTable}>
            {challenges.length > 0 ? (
              <>
                <div className={styles.tableHead}>
                  <div className={styles.row}>
                    <div className={`${styles.column} ${styles.no}`}>No.</div>
                    <div className={`${styles.column} ${styles.category}`}>
                      분야
                    </div>
                    <div className={`${styles.column} ${styles.type}`}>
                      카테고리
                    </div>
                    <div className={`${styles.column} ${styles.title}`}>
                      챌린지 제목
                    </div>
                    <div
                      className={`${styles.column} ${styles.numberOfPeople}`}
                    >
                      모집 인원
                    </div>
                    <div className={`${styles.column} ${styles.date}`}>
                      신청일
                    </div>
                    <div className={`${styles.column} ${styles.date}`}>
                      마감일
                    </div>
                    <div className={`${styles.column} ${styles.status}`}>
                      상태
                    </div>
                  </div>
                </div>
                <div>
                  {challenges.map((challenge) => {
                    return (
                      <TableRow key={challenge.no} challenge={challenge} />
                    );
                  })}
                </div>
              </>
            ) : (
              <p>데이터가 없습니다</p>
            )}
          </div>
          <Pagination pages={[1, 2, 3]} />
        </div>
      </div>
    </>
  );
}
