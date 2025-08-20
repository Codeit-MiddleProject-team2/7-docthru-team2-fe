import styles from "./AdminArea.module.css";

export default function AdminArea({ setIsOpen, onAccept }) {
  const handleRejectModal = () => {
    setIsOpen(true);
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
      <button type="button" className={styles.btnApprove} onClick={onAccept}>
        승인하기
      </button>
    </div>
  );
}
