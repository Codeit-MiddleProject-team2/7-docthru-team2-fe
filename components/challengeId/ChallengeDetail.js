import styles from "./ChallengeDetail.module.css";
import Image from "next/image";
import iconChallenger from "../../public/icons/ic_challenger.svg";
import iconDeadline from "../../public/icons/ic_deadline.svg";
import { formatDateDeadline } from "@/utils/formatDate";
import Link from "next/link";

export default function ChallengeDetail({ challenge }) {
  if (!challenge) return "챌린지가 없습니다.";
  return (
    <div>
      <div className={styles.detailArea}>
        <div className={styles.titleArea}>
          <div className={styles.titleInfo}>
            <h2>{challenge.title}</h2>
            <div className={styles.docTypeInfo}>
              <div className={styles.cardChip}>
                <span className={`${styles.chip} ${styles.category}`}>{challenge.category}</span>
                <span className={`${styles.chip} ${styles.type}`}>{challenge.type}</span>
              </div>
              {challenge.isAdmitted === "pending" && <button className={styles.cancelBt}>취소하기</button>}
            </div>
          </div>
        </div>

        <div className={styles.description}>{challenge.description}</div>
        <div className={styles.challengeInfo}>
          <div className={styles.deadline}>
            <Image
              src={iconDeadline}
              width={24}
              height={24}
            />
            <div className={styles.dueDate}>{formatDateDeadline(challenge.dueDate)} 마감</div>
          </div>
          <div className={styles.challenger}>
            <Image
              src={iconChallenger}
              width={24}
              height={24}
            />
            <div>{challenge.maximum}명</div>
          </div>
        </div>
      </div>
      <div className={styles.docLink}>
        <h3>원문 링크</h3>
        <Link
          className={styles.docLinkBt}
          href={"https://www.naver.com"}
        >
          링크 열기↗
        </Link>
      </div>
    </div>
  );
}
