import styles from "./ChallengeNotice.module.css";
import { formatDate } from "@/utils/formatDate";
import { NOTICE_CONFIG } from "@/config/notice";

export default function ChallengeNotice({ ChallengeState, date }) {
  const config = NOTICE_CONFIG[ChallengeState];

  if (!config) {
    return "잘못된 접근입니다.";
  }

  return (
    <div>
      <div className={styles[`${ChallengeState}Notice`]}>{config.title}</div>
      {ChallengeState !== "PENDING" ? (
        <div className={styles.reasonBox}>
          <div className={styles.reasonMain}>{config.reasonMain}</div>
          <div className={styles.reason}>{config.reason}</div>
          <div className={styles.notiDate}>독스루 운영진 | {date ? formatDate(date) : ""}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
