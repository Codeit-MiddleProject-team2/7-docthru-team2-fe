import React, { useState } from "react";
import Image from "next/image";
import styles from "./FeedbackForm.module.css";

/**
 * props:
 * - translationId
 * - currentUser
 * - onSubmitted?: (payload) => void
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
      // TODO: 실제 API 연동
      // await api.post(`/translations/${translationId}/feedbacks`, { content: value.trim() });

      onSubmitted?.({
        translationId,
        userId: currentUser?.id,
        content: value.trim(),
      });
      setValue("");
    } catch (err) {
      console.error(err);
      alert("피드백 등록에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className={styles.ff} onSubmit={handleSubmit}>
      {/* 입력창 박스 */}
      <div className={styles.box}>
        <textarea
          className={styles.ta}
          placeholder="피드백을 남겨주세요"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          maxLength={2000}
        />
      </div>

      {/* 등록 버튼  */}
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
