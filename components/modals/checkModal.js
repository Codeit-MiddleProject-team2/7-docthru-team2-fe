import styles from "./checkModal.module.css";
import Image from "next/image";

export default function CheckModal({ onClose, onConfirm }) {
  return (
    <>
      <div className={styles.pageArea}>
        <div className={styles.modalArea}>
          <div className={styles.checkIcon}>
            <Image
              src="/icons/ic_check.svg"
              width={12}
              height={12}
              alt="체크 아이콘"
            />
          </div>
          <span className={styles.checkText}>정말 취소하시겠어요?</span>
          <div className={styles.btArea}>
            <button
              className={styles.checkNo}
              type="button"
              onClick={onClose}
            >
              아니요
            </button>
            <button
              className={styles.checkYes}
              type="button"
              onClick={onConfirm}
            >
              네
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
