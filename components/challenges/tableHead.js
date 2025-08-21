import styles from "./table.module.css";

export default function TableHead({}) {
  return (
    <>
      <div className={styles.tableHead}>
        <div className={styles.row}>
          <div className={`${styles.column} ${styles.category}`}>분야</div>
          <div className={`${styles.column} ${styles.type}`}>카테고리</div>
          <div className={`${styles.column} ${styles.title}`}>챌린지 제목</div>
          <div className={`${styles.column} ${styles.numberOfPeople}`}>
            모집 인원
          </div>
          <div className={`${styles.column} ${styles.date}`}>신청일</div>
          <div className={`${styles.column} ${styles.date}`}>마감일</div>
          <div className={`${styles.column} ${styles.status}`}>상태</div>
        </div>
      </div>
    </>
  );
}
