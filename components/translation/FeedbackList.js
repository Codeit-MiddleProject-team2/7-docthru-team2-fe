import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import DeleteReasonModal from "./DeleteReasonModal";
import styles from "./FeedbackList.module.css";

/**
 * props:
 * - feedbacks: Array<{
 *     id: number|string,
 *     content: string,
 *     userId: number|string,
 *     nickname: string,
 *     userLevel?: "일반" | "전문가",
 *     createdAt: string
 *   }>
 * - currentUser: { id: number|string, isAdmin?: boolean }
 * - onUpdate?: ({ id, content }) => Promise<void> | void
 * - onDelete?: ({ id, reason?: string }) => Promise<void> | void
 */
export default function FeedbackList({
  feedbacks = [],
  currentUser,
  onUpdate,
  onDelete,
}) {
  const isAdmin = !!currentUser?.isAdmin;

  /* 피드백 리스트 더보기 */
  const PAGE = 3;
  const [visibleCount, setVisibleCount] = useState(PAGE);
  useEffect(() => {
    setVisibleCount((prev) => Math.min(Math.max(PAGE, prev), feedbacks.length));
  }, [feedbacks.length]);
  const visibleItems = useMemo(
    () => feedbacks.slice(0, visibleCount),
    [feedbacks, visibleCount]
  );
  const hasMore = visibleCount < feedbacks.length;
  const handleLoadMore = () =>
    setVisibleCount((c) => Math.min(c + PAGE, feedbacks.length));

  /* ─ Editing ─ */
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");
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
    await onUpdate?.({ id: editingId, content: trimmed });
    setEditingId(null);
    setEditValue("");
  };

  /*  더보기 메뉴  */
  const [openMenuForId, setOpenMenuForId] = useState(null);
  const menusRef = useRef(new Map());
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

  /* ─ Admin delete modal ─ */
  const [adminDeleteTarget, setAdminDeleteTarget] = useState(null);
  const openAdminDeleteModal = (fb) => setAdminDeleteTarget(fb);
  const closeAdminDeleteModal = () => setAdminDeleteTarget(null);
  const confirmAdminDelete = async (reason) => {
    if (!adminDeleteTarget) return;
    await onDelete?.({ id: adminDeleteTarget.id, reason: reason?.trim() });
    setAdminDeleteTarget(null);
  };

  /* ─ Utils ─ */
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
  const badgeSrc = (level) =>
    level === "전문가" ? "/icons/ic_admin.svg" : "/icons/ic_member.svg";
  const badgeAlt = (level) =>
    level === "전문가" ? "전문가 배지" : "일반 유저 배지";

  return (
    <section className={styles.section}>
      <div className={styles.list}>
        {visibleItems.map((fb) => {
          const isOwner = currentUser?.id === fb.userId;
          const showMenu = isOwner || isAdmin;

          return (
            <article
              key={fb.id}
              className={`${styles.card} ${
                isEditing(fb.id) ? styles["card--editing"] : ""
              }`}
            >
              {/* 피드백 카드 우상단: 편집 컨트롤 (편집 중일 때만) */}
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
                    src={badgeSrc(fb.userLevel)}
                    alt={badgeAlt(fb.userLevel)}
                    width={28}
                    height={28}
                  />
                </span>
                <span className={styles.name}>{fb.nickname}</span>
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

              {/* 피드백 수정하기/더보기 */}
              {showMenu && !isEditing(fb.id) && (
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

                      {isOwner && (
                        <button
                          type="button"
                          role="menuitem"
                          className={`${styles.menuItem} ${styles["menuItem--danger"]}`}
                          onClick={async () => {
                            setOpenMenuForId(null);
                            const ok =
                              window.confirm("피드백을 삭제하시겠어요?");
                            if (!ok) return;
                            await onDelete?.({ id: fb.id });
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
                            openAdminDeleteModal(fb);
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

        {/* 피드백 리스트 더보기 */}
        {hasMore && (
          <div className={styles.moreListWrap}>
            <button
              type="button"
              className={styles.moreListBtn}
              onClick={handleLoadMore}
            >
              더 보기
            </button>
          </div>
        )}
      </div>

      {/* 어드민 삭제 모달 */}
      <DeleteReasonModal
        isOpen={!!adminDeleteTarget}
        onClose={closeAdminDeleteModal}
        onConfirm={confirmAdminDelete}
      />
    </section>
  );
}
