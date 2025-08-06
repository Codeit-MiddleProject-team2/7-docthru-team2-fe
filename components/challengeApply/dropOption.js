import { useState } from "react";
import styles from "./dropOption.module.css";
import Image from "next/image";

function Option({ text, setValue, setOpen }) {
  const handleOption = () => {
    setValue(text);
    setOpen(false);
  };

  return (
    <div className={styles.dropOption} onClick={handleOption}>
      {text}
    </div>
  );
}

export default function DropOption({ value, setValue }) {
  const [isDropOpen, setIsDropOpen] = useState(false);

  return (
    <div className={styles.background}>
      <div className={styles.text}>문서 타입</div>
      <div>
        <div
          className={styles.typeText}
          onClick={() => {
            setIsDropOpen((prev) => !prev);
          }}
        >
          {value}
          <Image
            className={styles.icDown}
            src="/icons/ic_chevron_down.svg"
            width={48}
            height={48}
            alt="문서 타입 카테고리"
          />
        </div>
        {isDropOpen && (
          <div className={styles.dropList}>
            <Option
              text="공식 문서"
              setValue={setValue}
              setOpen={setIsDropOpen}
            />
            <Option text="블로그" setValue={setValue} setOpen={setIsDropOpen} />
            <Option text="기타" setValue={setValue} setOpen={setIsDropOpen} />
          </div>
        )}
      </div>
    </div>
  );
}
