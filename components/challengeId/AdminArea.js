import styles from "./AdminArea.module.css";

export default function AdminArea() {
  const handleRejectModal = () => {
    console.log("거절하기");
  };
  const handleApprove = () => {
    console.log("승인하기");
  };
  return (
    <div className={styles.adminArea}>
      <button
        type="button"
        className={styles.btnReject}
        onClick={handleRejectModal}
      >
        거절하기
      </button>
      <button
        type="button"
        className={styles.btnApprove}
        onClick={handleApprove}
      >
        승인하기
      </button>
    </div>
  );
}
