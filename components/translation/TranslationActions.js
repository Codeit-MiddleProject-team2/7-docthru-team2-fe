import React, { useState, useRef, useEffect } from "react";
import DeleteReasonModal from "./DeleteReasonModal";
import Image from "next/image";
import moreIcon from "@/public/icons/ic_more.svg";
import styles from "./TranslationActions.module.css";

export default function TranslationActions({ translation, currentUser }) {
  const isOwner = currentUser?.id === translation?.userId;
  const isAdmin = !!currentUser?.isAdmin;

  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const menuRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!menuRef.current) return;
      if (
        !menuRef.current.contains(e.target) &&
        !triggerRef.current?.contains(e.target)
      ) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setModalOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleDelete = (reason) => {
    setModalOpen(false);
    alert(`삭제 요청됨: 사유 - ${reason}`);
  };

  if (!currentUser || (!isOwner && !isAdmin)) return null;

  return (
    <div className={styles.ta} aria-live="polite">
      <button
        ref={triggerRef}
        type="button"
        className={styles.ta__trigger}
        aria-haspopup="menu"
        aria-expanded={menuOpen}
        aria-label="더보기 메뉴 열기"
        onClick={() => setMenuOpen((v) => !v)}
      >
        <Image src={moreIcon} alt="더보기" width={24} height={24} />
      </button>

      {menuOpen && (
        <div
          ref={menuRef}
          className={styles.ta__menu}
          role="menu"
          aria-label="번역 작업 액션 메뉴"
        >
          {isOwner && (
            <button
              type="button"
              role="menuitem"
              className={styles.ta__item}
              onClick={() => {
                setMenuOpen(false);
                alert("수정하기 클릭");
              }}
            >
              수정하기
            </button>
          )}

          <button
            type="button"
            role="menuitem"
            className={`${styles.ta__item} ${styles["ta__item--danger"]}`}
            onClick={() => {
              setMenuOpen(false);
              setModalOpen(true);
            }}
          >
            삭제하기
          </button>
        </div>
      )}

      <DeleteReasonModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
