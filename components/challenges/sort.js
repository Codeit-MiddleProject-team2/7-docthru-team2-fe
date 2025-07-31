import Image from "next/image";
import styles from "./sort.module.css";
import iconSortArrow from "../../public/icons/ic_toggle_down.svg";
import { useState } from "react";

export default function Sort() {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <>
      <div className={styles.sortEl}>
        <div className={styles.sortButton} onClick={handleOpen}>
          <span>최신순</span>
          <Image src={iconSortArrow} width={24} height={24} />
        </div>
        {isOpen && (
          <div className={styles.sortOptions}>
            <ul>
              <li>최신 순</li>
              <li>오래된 순</li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
