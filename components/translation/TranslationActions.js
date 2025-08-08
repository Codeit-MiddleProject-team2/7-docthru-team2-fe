import React, { useState, useRef, useEffect } from "react";
import DeleteReasonModal from "./DeleteReasonModal";
import Image from "next/image";
import moreIcon from "../../public/icons/ic_more.svg"; //  next/image용 import 경로 정리

export default function TranslationActions({ translation, currentUser }) {
  const isOwner = currentUser?.id === translation.userId;
  const isAdmin = currentUser?.isAdmin;
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDelete = (reason) => {
    setModalOpen(false);
    alert(`삭제 요청됨: 사유 - ${reason}`);
  };

  // currentUser가 제대로 전달되지 않으면 아무것도 렌더링하지 않도록 안전 처리
  if (!currentUser || (!isOwner && !isAdmin)) return null;

  return (
    <div
      style={{ position: "relative", display: "inline-block", float: "right" }}
      ref={menuRef}
    >
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
      >
        <Image src={moreIcon} alt="더보기" width={24} height={24} />
      </button>

      {menuOpen && (
        <div
          style={{
            color: "#111",
            position: "absolute",
            top: "30px",
            right: 0,
            background: "#fff",
            border: "1px solid #ccc",
            borderRadius: "6px",
            zIndex: 1000,
            padding: "4px 0",
            minWidth: "100px",
            boxShadow: "0 0 6px rgba(0,0,0,0.2)",
          }}
        >
          {isOwner && (
            <div style={{ padding: "8px 12px", cursor: "pointer" }}>
              수정하기
            </div>
          )}
          <div
            style={{ padding: "8px 12px", cursor: "pointer" }}
            onClick={() => {
              setModalOpen(true);
              setMenuOpen(false);
            }}
          >
            삭제하기
          </div>
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
