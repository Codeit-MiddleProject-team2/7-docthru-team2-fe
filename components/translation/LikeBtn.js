import React, { useState } from "react";
import Image from "next/image";
import styles from "./LikeBtn.module.css";

import heartFilled from "../../public/icons/ic_heart_filled.svg";
import heartOutline from "../../public/icons/ic_heart_outline.svg";

export default function LikeBtn({
  translationId,
  initialLiked = false,
  initialCount = 0,
  currentUserId,
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  const handleClick = () => {
    if (!currentUserId) {
      alert("로그인이 필요합니다.");
      return;
    }

    if (liked) {
      setLiked(false);
      setCount((prev) => Math.max(prev - 1, 0));
      // TODO: DELETE /hearts/:heartId
    } else {
      setLiked(true);
      setCount((prev) => prev + 1);
      // TODO: POST /hearts
    }
  };

  return (
    <button
      type="button"
      className={`${styles.likeButton} ${
        liked ? styles["likeButton--liked"] : ""
      }`}
      onClick={handleClick}
      aria-pressed={liked}
      aria-label={liked ? "좋아요 취소" : "좋아요"}
    >
      <span className={styles.likeButton__icon}>
        <Image
          src={liked ? heartFilled : heartOutline}
          alt={liked ? "좋아요 취소" : "좋아요"}
          width={24}
          height={24}
          priority={false}
        />
      </span>

      {/*  카운트 표시 */}
      <span className={styles.likeButton__count}>{count.toLocaleString()}</span>
    </button>
  );
}
