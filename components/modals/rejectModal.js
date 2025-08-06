import Image from "next/image";
import styles from "./rejectModal.module.css";
import iconClose from "@/public/icons/ic_close.svg";
import { rejectChallenge } from "@/mock/myChallengesApply.js";
import { useRouter } from "next/router";
import { useState } from "react";

export default function RejectModal() {
  const router = useRouter();
  const { id } = router.query;
  const [reason, setReason] = useState("");

  const handleSubmit = async (e) => {
    console.log(id);
    e.preventDefault();

    try {
      const response = await rejectChallenge(id, reason);
      console.log("거절 완료", response);
    } catch (error) {
      console.error("거절 실패", error.message);
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalBg}></div>
      <div className={styles.modalBox}>
        <div className={styles.header}>
          <h3>거절 사유</h3>
          <button type="button" className={styles.btnIcClose}>
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
                <div className={styles.textArea}>
                  <textarea
                    placeholder="거절 사유를 입력해주세요"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                  ></textarea>
                </div>
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
