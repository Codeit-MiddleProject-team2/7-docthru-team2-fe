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
  // 작성자 객체: /translation/:id 응답에 user가 있으면 우선 사용
  const author = translation?.user ?? {
    id: translation?.userId,
    nickname: translation?.nickname,
    isAdmin: translation?.isAdmin,
    userLevel: translation?.userLevel,
  };

  // 배지 규칙: 어드민만 다른 아이콘
  const isAdmin = author?.isAdmin === true || author?.userLevel === "전문가";
  const badgeSrc = isAdmin ? "/icons/ic_admin.svg" : "/icons/ic_member.svg";
  const badgeAlt = isAdmin ? "관리자 배지" : "일반 유저 배지";

  // (있는 경우에만) 초기 표시 값. 실제 값은 LikeBtn에서 서버로 재동기화함
  const initialLiked =
    translation?.likedByMe ?? translation?.isLiked ?? undefined;
  const initialCount =
    typeof translation?.likeCount === "number"
      ? translation.likeCount
      : undefined;

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
          category={undefined}
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

          <span className={styles.name}>
            {author?.nickname ?? "알 수 없음"}
          </span>

          {/* 초기값이 있으면 넘기되, LikeBtn이 서버에서 다시 동기화함 */}
          <LikeBtn
            translationId={translation.id}
            currentUserId={currentUser?.id}
            initialLiked={initialLiked}
            initialCount={initialCount}
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
