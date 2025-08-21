import Image from "next/image";
import styles from "./draftModal.module.css";
import iconClose from "@/public/icons/ic_close.svg";
import { rejectChallenge } from "@/mock/myChallengesApply.js";
import { useState } from "react";

export default function DraftModal({ drafts, onSelect, onClose }) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalBg}></div>
      <div className={styles.modalBox}>
        <div className={styles.header}>
          <h3>임시저장 목록</h3>
          <button type="button" className={styles.btnIcClose} onClick={onClose}>
            <Image src={iconClose} width={24} height={24} />
          </button>
        </div>
        <div className={styles.body}>
          <p className={styles.totalText}>총 {drafts.length || 0}개의 글</p>
          <ul className={styles.draftList}>
            {drafts.map((draft) => (
              <li
                className={styles.draftItem}
                key={draft.id}
                onClick={() => onSelect(draft)}
              >
                <p>{draft.title.substring(0, 30)}...</p>
                <span>{new Date(draft.updatedAt).toLocaleString()}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
