import Image from "next/image";
import styles from "./rejectModal.module.css";
import iconClose from "@/public/icons/ic_close.svg";
import { useState } from "react";

export default function RejectModal({ onClose, onReject }) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!reason.trim()) {
      setError("거절 사유를 입력해주세요.");
      return;
    }

    onReject(reason);
    onClose();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalBg}></div>
      <div className={styles.modalBox}>
        <div className={styles.header}>
          <h3>거절 사유</h3>
          <button type="button" className={styles.btnIcClose} onClick={onClose}>
            <Image src={iconClose} width={24} height={24} />
          </button>
        </div>
        <div className={styles.body}>
          <form onSubmit={handleSubmit}>
            <dl>
              <dt>
                <span>내용</span>
              </dt>
              <dd>
                <div
                  className={`${styles.textArea} ${
                    error && styles.errorTextArea
                  }`}
                >
                  <textarea
                    placeholder="거절 사유를 입력해주세요"
                    value={reason}
                    onChange={(e) => {
                      setReason(e.target.value);
                      if (e.target.value.trim()) {
                        setError("");
                      }
                    }}
                  ></textarea>
                </div>
                {error && <p className={styles.errorText}>{error}</p>}
              </dd>
            </dl>
            <div className={styles.btnArea}>
              <button type="submit" className={styles.btn}>
                전송
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
