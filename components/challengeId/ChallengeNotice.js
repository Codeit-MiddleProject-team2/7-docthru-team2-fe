import styles from "./ChallengeNotice.module.css";
import { formatDate } from "@/utils/formatDate";

const NOTICE_CONFIG = {
  deleted: {
    title: "삭제된 챌린지입니다.",
    reasonMain: "삭제 사유",
    reason: "독스루는 개발 문서 번역 플랫폼으로, 폭력성과 관련된 내용을 포함할 수 없을 안내드립니다. 감사합니다.",
  },
  rejected: {
    title: "신청이 거절되었습니다.",
    reasonMain: "신청 거절 사유",
    reason: "독스루는 개발 문서 번역 플랫폼으로, 다른 종류의 번역 챌린지를 개최할 수 없음을 알려드립니다. 감사합니다.",
  },
  pending: {
    title: "승인 대기 중입니다.",
  },
};

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
          <div className={styles.notiDate}>독스루 운영진 | {date ? formatDate(date) : ""}</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
