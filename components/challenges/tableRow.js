import Link from "next/link";
import styles from "./tableRow.module.css";

const statusTexts = {
  deleted: "챌린지 삭제",
  rejected: "신청 거절",
  pending: "승인 대기",
  approved: "신청 승인",
};

export default function TableRow({ challenge }) {
  return (
    <>
      <div
        className={`${styles.row} ${
          challenge.isAdmitted === "deleted" ? styles.deleted : ""
        }`}
      >
        <div className={`${styles.column} ${styles.no}`}>{challenge.id}</div>
        <div className={`${styles.column} ${styles.category}`}>
          {challenge.category}
        </div>
        <div className={`${styles.column} ${styles.type}`}>
          {challenge.type}
        </div>
        <div className={`${styles.column} ${styles.title}`}>
          <Link href={``}>{challenge.title}</Link>
        </div>
        <div className={`${styles.column} ${styles.numberOfPeople}`}>
          {challenge.people}
        </div>
        <div className={`${styles.column} ${styles.applyDate}`}>
          {challenge.createdAt}
        </div>
        <div className={`${styles.column} ${styles.dueDate}`}>
          {challenge.dueDate}
        </div>
        <div className={`${styles.column} ${styles.status}`}>
          <span className={`${styles.chip} ${styles[challenge.isAdmitted]}`}>
            {statusTexts[challenge.isAdmitted] || "알 수 없음"}
          </span>
        </div>
      </div>
    </>
  );
}
