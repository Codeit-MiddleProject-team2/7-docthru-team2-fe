import styles from "./ChallengeNotice.module.css";
import { formatDate } from "@/utils/formatDate";
import { NOTICE_CONFIG } from "@/config/notice";

export default function ChallengeNotice({ type, date }) {
  const config = NOTICE_CONFIG[type?.toLowerCase()];
  // reason prop을 받아서 있으면 우선적으로 사용
  const reason = arguments[0]?.reason || config?.reason;
  if (!config) {
    return "잘못된 접근입니다.";
  }

  return (
    <div>
      <div className={styles[`${type.toLowerCase()}Notice`]}>{config.title}</div>
      {type !== "PENDING" ? (
        <div className={styles.reasonBox}>
          <div className={styles.reasonMain}>{config.reasonMain}</div>
          <div className={styles.reason}>{reason}</div>
          <div className={styles.notiDate}>독스루 운영진 | {date ? formatDate(date) : ""}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
