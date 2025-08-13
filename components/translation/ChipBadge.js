import React from "react";
import Image from "next/image";
import styles from "./ChipBadge.module.css";

/**
 * kind: "type" | "category"
 * value: API 원본 값 (예: "Next.js", "API", "Career", "Modern JS", "Web", "공식문서", "블로그")
 * alt  : 이미지 대체 텍스트 (기본은 value)
 */

const TYPE_MAP = {
  "next.js": "nextjs",
  nextjs: "nextjs",
  api: "api",
  career: "career",
  "modern js": "modern-js",
  web: "web",
};

const CATEGORY_MAP = {
  공식문서: "official",
  블로그: "blog",
};

function norm(raw) {
  if (!raw) return "";
  return String(raw)
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\s/g, "-")
    .replace(/\.js$/, "js");
}

export default function ChipBadge({ kind = "type", value, alt }) {
  if (!value) return null;

  const n = norm(value);
  const file =
    kind === "type"
      ? TYPE_MAP[value?.toLowerCase?.()] || TYPE_MAP[n] || n
      : CATEGORY_MAP[value] || n;

  const src =
    kind === "type" ? `/chips/type/${file}.png` : `/chips/category/${file}.png`;

  const size = 26; // 세로 고정
  const width = Math.round(size * 2.2); // 비율 유지

  return (
    <span className={styles.chip} data-kind={kind}>
      <Image src={src} alt={alt ?? String(value)} width={width} height={size} />
    </span>
  );
}
