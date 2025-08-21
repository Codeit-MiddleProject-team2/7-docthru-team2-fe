import Image from "next/image";
import { useState } from "react";
import styles from "./DropOptions.module.css";
import { useRouter } from "next/router";

export default function DropOptions({ data }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={styles.drops}
      onClick={() => {
        setIsOpen((prev) => !prev);
      }}
    >
      <Image
        className={styles.dots}
        src={"/icons/ic_vertical_dot.svg"}
        width={24}
        height={24}
        alt="수정 삭제 옵션"
      />
      {isOpen && (
        <div className={styles.text}>
          <div
            className={styles.update}
            onClick={() => {
              window.sessionStorage.setItem("challenge", JSON.stringify(data));
              router.push(`/challengeApply`);
            }}
          >
            수정하기
          </div>
          <div className={styles.delete}>삭제하기</div>
        </div>
      )}
    </div>
  );
}
