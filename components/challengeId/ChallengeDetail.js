import styles from "./ChallengeDetail.module.css";
import ChallengeCard from "../challenges/card";
import CustomBtnMini from "../CustomBtnMini";
import { useRouter } from "next/router";

export default function ChallengeDetail({ challenge }) {
  const router = useRouter();

  if (!challenge) return "챌린지가 없습니다.";
  return (
    <div>
      <ChallengeCard data={challenge} type="detail" />
      <div className={styles.docLink}>
        <h3>원문 링크</h3>
        <CustomBtnMini
          text="링크 열기↗"
          onClick={() => router.push("https://www.naver.com")}
          color="white"
        />
      </div>
    </div>
  );
}
