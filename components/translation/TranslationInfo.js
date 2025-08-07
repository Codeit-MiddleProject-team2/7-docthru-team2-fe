import React from "react";

export default function TranslationInfo({ translation }) {
  return (
    <>
      <h2>{translation.title}</h2>
      <p>
        분야: {translation.field} / 문서유형: {translation.documentType}
      </p>
      <p>
        작성자: {translation.nickname} / 좋아요: {translation.likeCount} / 작성일:{" "}
        {translation.createdAt}
      </p>
    </>
  );
}
