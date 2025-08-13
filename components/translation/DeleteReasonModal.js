import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import closeIcon from "@/public/icons/ic_close.svg";
import styles from "./DeleteReasonModal.module.css";

export default function DeleteReasonModal({ isOpen, onClose, onConfirm }) {
  const [reason, setReason] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textareaRef.current?.focus(), 0);
    }
  }, [isOpen]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose?.();
    }
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const submit = () => {
    const v = reason.trim();
    if (!v) return;
    onConfirm?.(v);
    setReason("");
  };

  return (
    <div
      className={styles.drm}
      role="dialog"
      aria-modal="true"
      aria-labelledby="drm-title"
      onClick={onClose}
    >
      <div className={styles.drm__panel} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.drm__close}
          aria-label="닫기"
          onClick={onClose}
        >
          <Image src={closeIcon} alt="닫기" width={24} height={24} />
        </button>

        <h3 id="drm-title" className={styles.drm__title}>
          삭제 사유
        </h3>

        <label className={styles.drm__label} htmlFor="drm-reason">
          내용
        </label>
        <textarea
          id="drm-reason"
          ref={textareaRef}
          className={styles.drm__textarea}
          placeholder="삭제 사유를 입력해주세요"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        <div className={styles.drm__footer}>
          <button type="button" className={styles.drm__btn} onClick={onClose}>
            취소
          </button>
          <button
            type="button"
            className={`${styles.drm__btn} ${styles["drm__btn--primary"]}`}
            disabled={!reason.trim()}
            onClick={submit}
          >
            전송
          </button>
        </div>
      </div>
    </div>
  );
}
