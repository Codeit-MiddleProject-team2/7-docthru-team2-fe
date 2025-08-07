import styles from "./ChallengeDetail.module.css";
import ChallengeCard from "../challenges/card";
import CustomBtnMini from "../CustomBtnMini";
import { useRouter } from "next/router";

export default function ChallengeDetail({ challenge }) {
  const router = useRouter();

  if (!challenge) return "챌린지가 없습니다.";
  return (
    <div>
      <ChallengeCard
        data={challenge}
        type="detail"
      />
      <div className={styles.docLink}>
        <h3>원문 링크</h3>
        <CustomBtnMini
          text="링크 열기↗"
          onClick={() => router.push(challenge.link)}
          color="white"
        />
      </div>
      <div className={styles.docLinkView}>
        <iframe
          src={challenge.link}
          width="100%"
          height="400px"
          title="문서 미리보기"
          style={{ border: "none" }}
          tabIndex={-1}
          scrolling="no"
        />
        <div className={styles.overlay} />
      </div>
    </div>
  );
}
