import Image from "next/image";
import styles from "./sort.module.css";
import iconSortArrow from "../../public/icons/ic_toggle_down.svg";
import { useState } from "react";

export default function Sort({ options = [], selected, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  console.log(options);
  console.log(selected);

  return (
    <>
      <div className={styles.sortEl}>
        <div className={styles.sortButton} onClick={handleOpen}>
          <span>
            {selected
              ? options.find((o) => o.value === selected)?.label
              : "전체"}
          </span>
          <Image src={iconSortArrow} width={24} height={24} alt="정렬 옵션" />
        </div>
        {isOpen && (
          <div className={styles.sortOptions}>
            <ul>
              {options.map(({ value, label }) => (
                <li key={value} onClick={() => handleSelect(value)}>
                  {label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
