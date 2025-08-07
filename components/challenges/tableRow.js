import Link from "next/link";
import styles from "./table.module.css";

const statusTexts = {
  deleted: "챌린지 삭제",
  rejected: "신청 거절",
  pending: "승인 대기",
  approved: "신청 승인",
};

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date
    .toLocaleDateString("ko-KR", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/\./g, "/")
    .replace(/\/$/, "")
    .replace(/\s/g, "");
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
          {formatDate(challenge.createdAt)}
        </div>
        <div className={`${styles.column} ${styles.dueDate}`}>
          {formatDate(challenge.dueDate)}
        </div>
        <div className={`${styles.column} ${styles.status}`}>
          <span className={`${styles.chip} ${styles[challenge.isAdmitted]}`}>
            {statusTexts[challenge.isAdmitted] || "-"}
          </span>
        </div>
      </div>
    </>
  );
}
