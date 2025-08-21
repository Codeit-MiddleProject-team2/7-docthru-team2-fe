"use client";

import React, { useEffect, useState } from "react";
import TranslationInfo from "./TranslationInfo";
import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";
import { getTranslationDetail } from "@/api/translation";
import { userSetting } from "@/lib/useAuth"; // ← 팀원 util 그대로 사용
import styles from "./TranslationDetail.module.css";

function normalizeTier(rawTier, isAdmin = false) {
  const v = (rawTier ?? "").toString().toLowerCase();
  if (v === "pro" || v === "basic") return v;
  if (v === "전문가") return "pro";
  if (v === "일반" || v === "basic") return "basic";
  return isAdmin ? "pro" : "basic";
}

// API 응답을 화면 모델로 정규화
function adaptTranslation(dto = {}) {
  const author = dto.user || dto.author || {};
  const rawTier =
    author.tier ??
    dto.tier ??
    author.userLevel ?? // 한글 값 대응
    dto.userLevel ??
    author.level ??
    dto.level;

  const tier = normalizeTier(rawTier, !!author.isAdmin);
  const userLevel = tier === "pro" ? "전문가" : "일반"; // TranslationInfo가 한글을 쓰더라도 대응

  return {
    id: String(dto.id ?? dto.translationId ?? dto._id ?? ""),
    title: dto.title ?? dto.name ?? "(제목 없음)",
    field: dto.field ?? "",
    documentType: dto.documentType ?? dto.type ?? "",
    userId: String(dto.userId ?? author.id ?? ""),
    nickname:
      author.nickname ??
      author.name ??
      dto.nickname ??
      `user#${dto.userId ?? ""}`,
    tier, // ← "pro" | "basic"
    userLevel, // ← "전문가" | "일반"  (기존 컴포넌트 호환용)
    likeCount: dto.likeCount ?? dto.likes ?? 0,
    createdAt: dto.createdAt ?? dto.submittedAt ?? "",
    content: dto.content ?? dto.body ?? "",
    challenge: dto.challenge,
  };
}

// 로컬스토리지 user를 화면에서 쓸 형태로 정규화
function normalizeUser(raw) {
  if (!raw) return null;
  const id = String(raw.id ?? raw.userId ?? "");
  const nickname = raw.nickname ?? raw.name ?? `user#${id}`;
  const tier = normalizeTier(raw.tier ?? raw.userLevel, !!raw.isAdmin);
  return { id, nickname, isAdmin: !!raw.isAdmin, tier };
}

export default function TranslationDetail({ translationId }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [translation, setTranslation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshTick, setRefreshTick] = useState(0);

  // 로그인 사용자 읽기 (팀원 util 활용)
  useEffect(() => {
    const { user } = userSetting();
    setCurrentUser(normalizeUser(user));
  }, []);

  // 번역 상세 불러오기
  useEffect(() => {
    if (!translationId) return;
    (async () => {
      try {
        setLoading(true);
        const dto = await getTranslationDetail(String(translationId));
        setTranslation(adaptTranslation(dto));
      } catch (err) {
        console.error("[translation detail] error:", err);
        alert(err.message || "번역 상세 조회 실패");
      } finally {
        setLoading(false);
      }
    })();
  }, [translationId]);

  if (loading) return <div className={styles.container}>로딩 중…</div>;
  if (!translation)
    return <div className={styles.container}>데이터가 없습니다.</div>;

  return (
    <div className={styles.container}>
      <div className={styles["translationDetail__container"]}>
        <TranslationInfo translation={translation} currentUser={currentUser} />

        <div className={styles.paper}>
          <p className={styles.content}>{translation.content}</p>
        </div>

        <div className={styles.line} />

        <div className={styles.section}>
          <FeedbackForm
            translationId={translation.id}
            currentUser={currentUser}
            onSubmitted={() => setRefreshTick((t) => t + 1)}
          />
        </div>

        <div className={styles.sectionSmall}>
          <FeedbackList
            translationId={translation.id}
            currentUser={currentUser}
            refreshSignal={refreshTick}
          />
        </div>
      </div>
    </div>
  );
}
