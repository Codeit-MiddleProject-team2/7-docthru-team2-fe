import React, { useState } from "react";
import closeIcon from "../..//public/icons/ic_close.svg";
import Image from "next/image";

export default function DeleteReasonModal({ isOpen, onClose, onConfirm }) {
  const [reason, setReason] = useState("");

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={onClose} // 바깥 영역 클릭 시 닫기
    >
      <div
        style={{
          width: "400px",
          background: "#fff",
          borderRadius: "8px",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
          position: "relative",
        }}
        onClick={(e) => e.stopPropagation()} //  내부 클릭 시 닫힘 방지
      >
        {/* X 닫기 버튼 */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "none",
            border: "none",
            cursor: "pointer",
          }}
          aria-label="닫기"
        >
          <Image src={closeIcon} alt="닫기" width={24} height={24} />
        </button>

        <h3 style={{ marginBottom: "10px", color: "#111" }}>삭제 사유</h3>
        <p style={{ marginBottom: "8px", color: "#111" }}>내용</p>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="삭제 사유를 입력해주세요"
          style={{
            color: "#fff",
            width: "100%",
            minHeight: "120px",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          onClick={() => {
            onConfirm(reason);
            setReason("");
          }}
          disabled={!reason.trim()}
          style={{
            marginTop: "12px",
            width: "100%",
            padding: "10px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: "#000",
            color: "#fff",
            cursor: reason.trim() ? "pointer" : "not-allowed",
          }}
        >
          전송
        </button>
      </div>
    </div>
  );
}
