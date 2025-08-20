import Image from "next/image";
import styles from "./searchBar.module.css";
import iconSearch from "../../public/icons/ic_search.svg";
import { useState, useEffect } from "react";

export default function SearchBar({ value, onChange }) {
  const [inputValue, setInputValue] = useState(value || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onChange(inputValue);
  };

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);
  return (
    <>
      <form className={styles.searchBar} onSubmit={handleSubmit}>
        <div className={`${styles.searchBox}`}>
          <Image src={iconSearch} width={24} height={24} alt="검색창" />
          <input
            type="text"
            id="keyword"
            name="keyword"
            placeholder="챌린지 이름을 검색해보세요"
            autoComplete="off"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      </form>
    </>
  );
}
