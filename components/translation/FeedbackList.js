"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import DeleteReasonModal from "./DeleteReasonModal";
import { listFeedbacks, updateFeedback, deleteFeedback } from "@/api/feedback";
import styles from "./FeedbackList.module.css";

/**
 * props:
 * - translationId: string
 * - currentUser: { id, isAdmin, nickname, tier } | null
 * - refreshSignal?: number
 */
export default function FeedbackList({
  translationId,
  currentUser,
  refreshSignal = 0,
}) {
  const isAdmin = !!currentUser?.isAdmin;
  const PAGE = 3;

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [nextOffset, setNextOffset] = useState(0);

  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [openMenuForId, setOpenMenuForId] = useState(null);
  const menusRef = useRef(new Map());

  // 관리자 삭제 모달용 상태 (관리자 전용 + 관리자 본인도 포함)
  const [adminDeleteTarget, setAdminDeleteTarget] = useState(null);

  // 최초/새로고침 로딩
  useEffect(() => {
    (async () => {
      const data = await listFeedbacks(String(translationId), 0, PAGE);
      setItems(data.items ?? []);
      setTotal(data.total ?? 0);
      setHasMore(!!data.hasMore);
      setNextOffset(data.nextOffset ?? data.items?.length ?? 0);
    })().catch((e) => {
      console.error(e);
      alert(e.message || "피드백 로딩 실패");
    });
  }, [translationId, refreshSignal]);

  // 외부 클릭 시 메뉴 닫기
  useEffect(() => {
    const onDocClick = (e) => {
      for (const el of menusRef.current.values()) {
        if (el && el.contains(e.target)) return;
      }
      setOpenMenuForId(null);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const loadMore = async () => {
    const data = await listFeedbacks(String(translationId), nextOffset, PAGE);
    setItems((prev) => [...prev, ...(data.items ?? [])]);
    setTotal(data.total ?? total);
    setHasMore(!!data.hasMore);
    setNextOffset(data.nextOffset ?? nextOffset);
  };

  const isEditing = (id) => editingId === id;
  const startEdit = (fb) => {
    setEditingId(fb.id);
    setEditValue(fb.content || "");
  };
  const cancelEdit = () => {
    setEditingId(null);
    setEditValue("");
  };

  const submitEdit = async () => {
    if (!editingId) return;
    const trimmed = editValue.trim();
    if (!trimmed) return;
    try {
      const updated = await updateFeedback(editingId, trimmed);
      setItems((prev) =>
        prev.map((f) =>
          f.id === editingId
            ? { ...f, content: updated.content, updatedAt: updated.updatedAt }
            : f
        )
      );
      cancelEdit();
    } catch (err) {
      console.error(err);
      alert(err.message || "수정 실패");
    }
  };

  /**
   * ⛳️ 작성자 삭제 흐름:
   * - 일반 유저가 자기 글 삭제 → confirm만 물어보고 빈 reason으로 보냄
   * - (중요) 관리자이지만 자기 글을 지우는 경우: 서버가 "관리자 삭제는 reason 필수" 정책이므로
   *   관리자도 자기 글을 지울 땐 모달을 띄워 reason을 받아서 보낸다.
   */
  const askOwnerDelete = async (id) => {
    const ok = window.confirm("피드백을 삭제하시겠어요?");
    if (!ok) return;
    try {
      await deleteFeedback(id, ""); // owner delete (reason 없음)
      setItems((prev) => prev.filter((f) => f.id !== id));
      setTotal((t) => Math.max(0, t - 1));
    } catch (err) {
      console.error(err);
      alert(err.message || "삭제 실패");
    }
  };

  /**
   * 관리자 삭제(타인 글 + 관리자 본인 글 모두 포함)
   * - 항상 모달에서 받은 reason을 포함해 전송
   */
  const confirmAdminDelete = async (reason) => {
    if (!adminDeleteTarget) return;
    try {
      await deleteFeedback(adminDeleteTarget.id, reason);
      setItems((prev) => prev.filter((f) => f.id !== adminDeleteTarget.id));
      setTotal((t) => Math.max(0, t - 1));
    } catch (err) {
      console.error(err);
      alert(err.message || "삭제 실패");
    } finally {
      setAdminDeleteTarget(null);
    }
  };

  // === 배지(아이콘) ===
  const badgeSrc = (fb) =>
    fb?.user?.isAdmin ? "/icons/ic_admin.svg" : "/icons/ic_member.svg";
  const badgeAlt = (fb) =>
    fb?.user?.isAdmin ? "관리자 배지" : "일반 유저 배지";

  const fmt = (ds) => {
    if (!ds) return "";
    const d = new Date(ds);
    if (isNaN(d.getTime())) return ds;
    const yy = String(d.getFullYear()).slice(2);
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const HH = String(d.getHours()).padStart(2, "0");
    const MM = String(d.getMinutes()).padStart(2, "0");
    return `${yy}/${mm}/${dd} ${HH}:${MM}`;
  };

  return (
    <section className={styles.section}>
      <div className={styles.list}>
        {items.map((fb) => {
          // 문자열 비교로 소유자 판단 (타입 불일치 방지)
          const isOwner =
            String(currentUser?.id ?? "") ===
            String(fb.userId ?? fb.user?.id ?? "");
          const showMenu = (isOwner || isAdmin) && !isEditing(fb.id);

          return (
            <article
              key={fb.id}
              className={`${styles.card} ${
                isEditing(fb.id) ? styles["card--editing"] : ""
              }`}
            >
              {/* 편집 컨트롤 */}
              {isEditing(fb.id) && (
                <div className={styles.cardControls}>
                  <button
                    type="button"
                    className={styles.ctrlBtn}
                    onClick={cancelEdit}
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    className={`${styles.ctrlBtn} ${styles["ctrlBtn--primary"]}`}
                    onClick={submitEdit}
                    disabled={!editValue.trim()}
                  >
                    수정 완료
                  </button>
                </div>
              )}

              {/* 헤더 */}
              <div className={styles.header}>
                <span className={styles.badge}>
                  <Image
                    src={badgeSrc(fb)}
                    alt={badgeAlt(fb)}
                    width={28}
                    height={28}
                  />
                </span>
                <span className={styles.name}>
                  {fb.user?.nickname ?? fb.nickname ?? `user#${fb.userId}`}
                </span>
                <span className={styles.dot} aria-hidden>
                  •
                </span>
                <time className={styles.date} dateTime={fb.createdAt}>
                  {fmt(fb.createdAt)}
                </time>
              </div>

              {/* 본문 / 편집 */}
              {!isEditing(fb.id) ? (
                <p className={styles.body}>{fb.content}</p>
              ) : (
                <textarea
                  className={styles.editArea}
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  placeholder="피드백을 수정하세요"
                  maxLength={2000}
                  autoFocus
                />
              )}

              {/* 더보기 메뉴 */}
              {showMenu && (
                <div
                  className={styles.moreWrap}
                  ref={(el) => menusRef.current.set(fb.id, el)}
                >
                  <button
                    type="button"
                    className={styles.moreBtn}
                    aria-label="더보기"
                    onClick={() =>
                      setOpenMenuForId((prev) =>
                        prev === fb.id ? null : fb.id
                      )
                    }
                  >
                    <Image
                      src="/icons/ic_more.svg"
                      alt="더보기"
                      width={24}
                      height={24}
                    />
                  </button>

                  {openMenuForId === fb.id && (
                    <div className={styles.menu} role="menu">
                      {isOwner && (
                        <button
                          type="button"
                          role="menuitem"
                          className={styles.menuItem}
                          onClick={() => {
                            setOpenMenuForId(null);
                            startEdit(fb);
                          }}
                        >
                          수정하기
                        </button>
                      )}

                      {/* 🔑 삭제 분기
                           - 관리자이면서 내 글이면: 모달 열어 reason 받기(관리자 삭제 경로)
                           - 일반 유저의 내 글: confirm 후 owner-delete(이유 없이)
                           - 관리자이고 남의 글: 모달 열기(관리자 삭제 경로)
                      */}
                      {isOwner && (
                        <button
                          type="button"
                          role="menuitem"
                          className={`${styles.menuItem} ${styles["menuItem--danger"]}`}
                          onClick={() => {
                            setOpenMenuForId(null);
                            if (isAdmin) {
                              setAdminDeleteTarget(fb); // 관리자=작성자 케이스 → 모달
                            } else {
                              askOwnerDelete(fb.id); // 일반 작성자 삭제
                            }
                          }}
                        >
                          삭제하기
                        </button>
                      )}

                      {!isOwner && isAdmin && (
                        <button
                          type="button"
                          role="menuitem"
                          className={`${styles.menuItem} ${styles["menuItem--danger"]}`}
                          onClick={() => {
                            setOpenMenuForId(null);
                            setAdminDeleteTarget(fb); // 관리자(타인 글) → 모달
                          }}
                        >
                          삭제하기
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </article>
          );
        })}

        {hasMore && (
          <div className={styles.moreListWrap}>
            <button
              type="button"
              className={styles.moreListBtn}
              onClick={loadMore}
            >
              더 보기 ({items.length}/{total})
            </button>
          </div>
        )}
      </div>

      {/* 관리자 삭제 모달 (관리자 본인/타인 모두 공통) */}
      <DeleteReasonModal
        isOpen={!!adminDeleteTarget}
        onClose={() => setAdminDeleteTarget(null)}
        onConfirm={(reason) => {
          if (!reason?.trim()) return;
          confirmAdminDelete(reason.trim());
        }}
      />
    </section>
  );
}
