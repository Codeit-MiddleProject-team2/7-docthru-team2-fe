import React, { useState } from "react";

export default function LikeButton({ translationId }) {
  const [liked, setLiked] = useState(false);

  const handleClick = () => {
    setLiked((prev) => !prev);
    // TODO: 서버에 좋아요 상태 전송
  };

  return (
    <button onClick={handleClick}>
      {liked ? "💖 좋아요 취소" : "🤍 좋아요"}
    </button>
  );
}
