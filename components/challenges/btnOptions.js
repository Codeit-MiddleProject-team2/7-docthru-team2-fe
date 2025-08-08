import Image from "next/image";
import styles from "./btnOptions.module.css";
import iconVerticalDot from "../../public/icons/ic_vertical_dot.svg";
import { useState } from "react";

export default function BtnOptions() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <div className={styles.btnEl}>
        <div
          className={styles.btnShowoptions}
          onClick={handleOpen}
        >
          <Image
            src={iconVerticalDot}
            width={24}
            height={24}
            alt="버튼 옵션"
          />
        </div>
        {isOpen && (
          <div className={styles.btnOptions}>
            <ul>
              <li>수정하기</li>
              <li>삭제하기</li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
