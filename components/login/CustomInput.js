import Image from "next/image";
import { checkBlank } from "@/utils/checkValidInput";
import styles from "./CustomInput.module.css";
import { useState } from "react";

export default function CustomInput({ object, password, long = object.long }) {
  const { element, checkValid, invalidText } = object;
  const [isVisible, setIsVisible] = useState(false);

  const isValid = password ? !checkValid(password) : !checkValid();
  const inputStyles =
    isValid && !checkBlank(element)
      ? `${styles.input} ${styles.invalid}`
      : styles.input;
  const inputType = object.secret && !isVisible ? "password" : object.type;

  const IcVisible = isVisible
    ? "icons/btn_visibility_on_24px.svg"
    : "icons/btn_visibility_off_24px.svg";

  const onVisible = () => {
    setIsVisible((prev) => {
      return !prev;
    });
  };

  const handleChange = (e) => {
    const value = e.target.value;
    object.setElement(value);
  };

  if (long) {
    return (
      <div className={styles.customInput}>
        <label className={styles.text}>{object.korText}</label>
        <textarea
          className={`${inputStyles} ${long ? styles.long : ""}`}
          placeholder={object.placeholderText}
          value={object.element}
          onChange={handleChange}
          type={inputType}
        />
        {object.secret && (
          <Image
            className={styles.icVisible}
            src={IcVisible}
            width={24}
            height={24}
            alt="비밀번호 숨기기"
            onClick={onVisible}
          />
        )}
        {isValid && !checkBlank(element) && (
          <div className={styles.invalidText}>{invalidText}</div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.customInput}>
      <label className={styles.text}>{object.korText}</label>
      <input
        className={`${inputStyles} ${long ? styles.long : ""}`}
        placeholder={object.placeholderText}
        value={object.element}
        onChange={handleChange}
        type={inputType}
      />
      {object.secret && (
        <Image
          className={styles.icVisible}
          src={IcVisible}
          width={24}
          height={24}
          alt="비밀번호 숨기기"
          onClick={onVisible}
        />
      )}
      {isValid && !checkBlank(element) && (
        <div className={styles.invalidText}>{invalidText}</div>
      )}
    </div>
  );
}
