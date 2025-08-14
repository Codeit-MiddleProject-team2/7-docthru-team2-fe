import styles from "./ChallengeDetail.module.css";
import ChallengeCard from "../challenges/card";
import CustomBtnMini from "../CustomBtnMini";
import { useRouter } from "next/router";

export default function ChallengeDetail({ challenge }) {
  const router = useRouter();

  if (!challenge) return "챌린지가 없습니다.";
  return (
    <>
      <div className={styles.challengeCard}>
        <ChallengeCard
          data={challenge}
          type="detail"
        />
      </div>
      <div className={styles.docLink}>
        <h3>원문 링크</h3>
      </div>
      <div className={styles.docLinkView}>
        <div className={styles.linkBtn}>
          <CustomBtnMini
            text="링크 열기↗"
            onClick={() => window.open(challenge.url, "_blank", "noopener,noreferrer")}
            color="white"
          />
        </div>
        <iframe
          src={challenge.url}
          width="100%"
          height="400px"
          title="문서 미리보기"
          style={{ border: "none" }}
          tabIndex={-1}
          scrolling="no"
        />
        <div className={styles.overlay} />
      </div>
    </>
  );
}
