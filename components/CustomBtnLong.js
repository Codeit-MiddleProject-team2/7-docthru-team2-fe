import styles from "./CustomBtnLong.module.css";

export default function CustomBtnLong({
  text,
  onClick,
  color,
  size,
  valid = false,
}) {
  const handleButtonClick = (e) => {
    e.preventDefault();
    if (valid) {
      onClick();
    }
  };

  const stylesOption = valid ? "" : styles.invalid;
  const colorOption = color === "yellow" ? styles.yellow : "";
  const sizeOption = size === "small" ? styles.small : "";

  return (
    <button
      className={`${styles.btn} ${colorOption} ${sizeOption} ${stylesOption}`}
      onClick={handleButtonClick}
    >
      {text}
    </button>
  );
}

// 비활성화 되면 스타일 변화
