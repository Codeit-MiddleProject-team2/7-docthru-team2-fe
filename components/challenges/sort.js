import Image from "next/image";
import styles from "./sort.module.css";
import iconSortArrow from "../../public/icons/ic_toggle_down.svg";
import { useState } from "react";

export default function Sort({ selected, onChange }) {
  const options = [
    { value: "latest", label: "최신순" },
    { value: "deadline", label: "마감일순" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (value) => {
    onChange(value);
    setIsOpen(false);
  };

  return (
    <>
      <div className={styles.sortEl}>
        <div className={styles.sortButton} onClick={handleOpen}>
          <span>{options.find((o) => o.value === selected).label}</span>
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
