import Image from "next/image";
import styles from "./ConditionCard.module.css";

export default function ConditionCard({ isFinished, isFull }) {
  if (isFinished) {
    return (
      <div className={styles.finished}>
        <Image
          className={styles.icon}
          src="/icons/ic_deadline.svg"
          width={16}
          height={16}
          alt="챌린지 마감"
        />
        <div className={styles.text}>챌린지가 마감되었어요</div>
      </div>
    );
  } else if (isFull) {
    return (
      <div className={styles.full}>
        <Image
          className={styles.icFull}
          src="/icons/ic_challenger.svg"
          width={16}
          height={16}
          alt="모집 완료"
        />
        <div className={styles.fullText}>모집이 완료된 상태에요</div>
      </div>
    );
  }
}
