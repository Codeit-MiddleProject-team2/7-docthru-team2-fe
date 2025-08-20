import React from "react";
import Image from "next/image";
import styles from "./AuthorMeta.module.css";

export default function AuthorMeta({
  author = {},
  hearts = 0,
  onToggleHeart,
  className = "",
}) {
  // 어드민 여부만으로 배지 결정
  const isAdmin = !!author?.isAdmin;

  const badgeSrc = isAdmin ? "/icons/ic_admin.svg" : "/icons/ic_member.svg";
  const badgeAlt = isAdmin ? "관리자 배지" : "일반 유저 배지";

  return (
    <div className={`${styles.am} ${className}`}>
      <span className={styles.am__name}>
        {author?.nickname ?? "알 수 없음"}
      </span>

      <span className={styles.am__badge}>
        <Image src={badgeSrc} alt={badgeAlt} width={28} height={28} />
      </span>

      <button
        type="button"
        className={styles.am__heart}
        aria-label="좋아요"
        onClick={onToggleHeart}
      >
        <span className={styles.am__heartIcon}>♡</span>
        <span className={styles.am__heartCnt}>{hearts}</span>
      </button>
    </div>
  );
}
