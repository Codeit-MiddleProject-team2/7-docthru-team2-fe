import styles from "./CustomBtnMini.module.css";

export default function CustomBtnMini({
  text,
  color = "white",
  onClick = () => {},
}) {
  const handleClick = (e) => {
    e.preventDefault();
    console.log("customBtnMini 클릭됨");
    onClick();
  };

  const customStyle = color === "white" ? styles.whiteBtn : styles.blackBtn;

  return (
    <div className={customStyle} onClick={handleClick}>
      {text}
    </div>
  );
}
