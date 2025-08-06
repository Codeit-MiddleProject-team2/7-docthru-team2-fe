import styles from "./ChallengeNotice.module.css";
import { formatDate } from "@/utils/formatDate";
import { NOTICE_CONFIG } from "@/config/notice";

export default function ChallengeNotice({ type, date }) {
  const config = NOTICE_CONFIG[type];

  if (!config) {
    return "잘못된 접근입니다.";
  }

  return (
    <div>
      <div className={styles[`${type}Notice`]}>{config.title}</div>
      {type !== "pending" ? (
        <div className={styles.reasonBox}>
          <div className={styles.reasonMain}>{config.reasonMain}</div>
          <div className={styles.reason}>{config.reason}</div>
          <div className={styles.notiDate}>
            독스루 운영진 | {date ? formatDate(date) : ""}
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
