import React, { useState } from "react";
import Image from "next/image";
import { createFeedback } from "@/api/feedback";
import styles from "./FeedbackForm.module.css";

/**
 * props:
 * - translationId
 * - currentUser: { id, tier?: "pro"|"basic", isAdmin? }
 * - onSubmitted?: () => void  // 성공 후 리스트 리로드용 신호
 */
export default function FeedbackForm({
  translationId,
  currentUser,
  onSubmitted,
}) {
  const [value, setValue] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const disabled = !value.trim() || submitting;
  const iconSrc = disabled
    ? "/icons/ic_feedback_off.svg"
    : "/icons/ic_feedback_on.svg";
  const iconAlt = disabled ? "피드백 제출 (비활성)" : "피드백 제출 (활성)";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (disabled) return;

    try {
      setSubmitting(true);
      await createFeedback({
        translationId,
        userId: currentUser?.id,
        content: value.trim(),
      });
      setValue("");
      onSubmitted?.(); // 상위에 리로드 신호
    } catch (err) {
      console.error(err);
      alert(err.message || "피드백 등록 실패");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.ff} onSubmit={handleSubmit}>
      <div className={styles.box}>
        <textarea
          className={styles.ta}
          placeholder="피드백을 남겨주세요"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={2000}
        />
      </div>

      <button
        type="submit"
        className={styles.btn}
        disabled={disabled}
        aria-label="피드백 등록"
        title="피드백 등록"
      >
        <Image src={iconSrc} alt={iconAlt} width={40} height={40} />
      </button>
    </form>
  );
}
