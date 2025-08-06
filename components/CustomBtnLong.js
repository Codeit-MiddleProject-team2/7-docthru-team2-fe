import styles from "./CustomBtnLong.module.css";

export default function CustomBtnLong({ text, onClick, valid = false }) {
  const handleButtonClick = (e) => {
    e.preventDefault();
    if (valid) {
      onClick();
    }
  };

  const stylesOption = valid ? "" : styles.invalid;

  return (
    <button
      className={`${stylesOption} ${styles.btn}`}
      onClick={handleButtonClick}
    >
      {text}
    </button>
  );
}

// 비활성화 되면 스타일 변화
