import React from "react";
import Image from "next/image";
import LikeBtn from "./LikeBtn";
import ChipBadge from "./ChipBadge";
import TranslationActions from "./TranslationActions";
import styles from "./TranslationInfo.module.css";

function formatDate(dateString) {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return "";
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yy}/${mm}/${dd}`;
}

export default function TranslationInfo({ translation, currentUser }) {
  // 등급: "전문가"면 admin 아이콘, 그 외는 member
  const isExpert = translation?.userLevel === "전문가";
  const badgeSrc = isExpert ? "/icons/ic_admin.svg" : "/icons/ic_member.svg";
  const badgeAlt = isExpert ? "전문가 배지" : "일반 유저 배지";

  return (
    <div className={styles.wrap}>
      <div className={styles.line} />

      <div className={styles.head}>
        <h2 className={styles.title}>{translation.title}</h2>
        <TranslationActions
          translation={translation}
          currentUser={currentUser}
        />
      </div>

      {/* 칩(아이콘)만 노출 */}
      <div className={styles.badges}>
        <ChipBadge
          kind="type"
          value={translation.field}
          alt={translation.field}
        />
        <ChipBadge
          kind="category"
          value={translation.documentType}
          alt={translation.documentType}
        />
      </div>

      <div className={styles.line} />

      {/* 작성자/좋아요 */}
      <div className={styles.meta}>
        <div className={styles.authorLike}>
          <span className={styles.badge}>
            <Image src={badgeSrc} alt={badgeAlt} width={28} height={28} />
          </span>
          <span className={styles.name}>{translation.nickname}</span>

          <LikeBtn
            translationId={translation.id}
            initialLiked={false} /* TODO: 서버 데이터로 교체 */
            initialCount={translation.likeCount || 0}
            currentUserId={currentUser?.id}
          />
        </div>

        <time className={styles.date} dateTime={translation.createdAt}>
          {formatDate(translation.createdAt)}
        </time>
      </div>

      <div className={styles.line} />
    </div>
  );
}
