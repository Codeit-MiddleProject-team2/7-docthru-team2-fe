import React from "react";
import LikeButton from "./LikeButton";
import ActionButtons from "./ActionButtons";
import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";
import Image from "next/image";

export default function TranslationDetail({ translation, user }) {
  const isOwner = user?.id === translation?.userId;
  const isAdmin = user?.isAdmin;

  return (
    <div style={{ maxWidth: "800px", margin: "60px auto", padding: "40px 0" }}>
      <h2>{translation?.title}</h2>
      <div>
        <p>
          작성자: {translation?.user?.nickname} <br />
          제출일: {new Date(translation?.createdAt).toLocaleDateString()} <br />
          좋아요: {translation?.hearts?.length ?? 0}
        </p>
      </div>

      <div
        style={{
          background: "var(--background)",
          color: "var(--foreground)",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "20px",
        }}
      >
        {translation?.content ? (
          <p>{translation.content}</p>
        ) : (
          <div style={{ textAlign: "center", color: "#888" }}>
            <Image
              src="../../public/images/no-translation.png"
              alt="아직 번역 없음"
              width={300}
              height={200}
            />
            <p>아직 아무런 번역을 진행하지 않았어요!</p>
          </div>
        )}
      </div>

      <div style={{ marginTop: "10px" }}>
        <LikeButton translationId={translation.id} />
        {(isOwner || isAdmin) && <ActionButtons translation={translation} user={user} />}
      </div>

      <div style={{ marginTop: "40px" }}>
        <FeedbackList translationId={translation.id} user={user} />
      </div>
    </div>
  );
}
