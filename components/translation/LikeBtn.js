"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./LikeBtn.module.css";

import heartFilled from "../../public/icons/ic_heart_filled.svg";
import heartOutline from "../../public/icons/ic_heart_outline.svg";

import {
  getHeartCount,
  getMyHeartStatus,
  addHeart,
  removeHeart,
} from "../../api/hearts.js";

/**
 * props:
 * - translationId: string|number (필수)
 * - currentUserId: string|number|null (로그인 안되어 있으면 null/undefined)
 * - initialLiked?: boolean (있으면 초기 표시로 사용; 없으면 서버 조회)
 * - initialCount?: number  (있으면 초기 표시로 사용; 없으면 서버 조회)
 */
export default function LikeBtn({
  translationId,
  currentUserId,
  initialLiked,
  initialCount,
}) {
  const [liked, setLiked] = useState(!!initialLiked);
  const [count, setCount] = useState(
    typeof initialCount === "number" ? initialCount : 0
  );
  const [loading, setLoading] = useState(false);

  // 최초 마운트 시 서버에서 liked / count 동기화
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [c, s] = await Promise.all([
          getHeartCount(String(translationId)),
          currentUserId
            ? getMyHeartStatus(String(translationId), String(currentUserId))
            : Promise.resolve(false),
        ]);
        if (!alive) return;
        setCount(Number(c ?? 0));
        setLiked(!!s);
      } catch (_) {
        // 조회 실패면 initial 값 유지
      }
    })();
    return () => {
      alive = false;
    };
  }, [translationId, currentUserId]);

  const handleClick = async () => {
    if (!currentUserId) {
      alert("로그인이 필요합니다.");
      return;
    }
    if (loading) return;

    try {
      setLoading(true);

      // 낙관적 업데이트
      setLiked((v) => !v);
      setCount((c) => c + (liked ? -1 : 1));

      // 서버 반영
      const res = liked
        ? await removeHeart(String(translationId), String(currentUserId))
        : await addHeart(String(translationId), String(currentUserId));

      // 서버 응답으로 정정
      setLiked(!!res.liked);
      setCount(Number(res.count ?? 0));
    } catch (e) {
      // 실패 롤백
      setLiked((v) => !v);
      setCount((c) => c + (liked ? 1 : -1));

      alert(
        e?.response?.data?.message ||
          e?.message ||
          "좋아요 처리에 실패했습니다."
      );
    } finally {
      setLoading(false);
    }
  };

  const icon = liked ? heartFilled : heartOutline;
  const alt = liked ? "좋아요 취소" : "좋아요";

  return (
    <button
      type="button"
      className={`${styles.likeButton} ${
        liked ? styles["likeButton--liked"] : ""
      }`}
      onClick={handleClick}
      aria-pressed={liked}
      aria-label={alt}
      disabled={loading}
      title={alt}
    >
      <span className={styles.likeButton__icon}>
        <Image src={icon} alt={alt} width={24} height={24} />
      </span>
      <span className={styles.likeButton__count}>
        {Number(count).toLocaleString()}
      </span>
    </button>
  );
}
