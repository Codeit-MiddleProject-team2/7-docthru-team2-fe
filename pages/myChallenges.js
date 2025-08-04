import styles from "../styles/myChallenges.module.css";
import Image from "next/image";
import iconPlus from "../public/icons/ic_plus.svg";
import ChallengeCard from "@/components/challenges/card";
import { Pagination } from "@/components/challenges/pagiation";
import SearchBar from "@/components/challenges/searchBar";
import Sort from "@/components/challenges/sort";
import Link from "next/link";

export default function MyChallengesPage() {
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
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />
            <ChallengeCard />
          </div>
          <Pagination pages={[1, 2, 3]} />
        </div>
      </div>
    </>
  );
}
