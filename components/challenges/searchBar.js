import Image from "next/image";
import styles from "./searchBar.module.css";
import iconSearch from "../../public/icons/ic_search.svg";
import { useState } from "react";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <form className={styles.searchBar}>
        <div className={`${styles.searchBox}`}>
          <Image src={iconSearch} width={24} height={24} />
          <input
            type="text"
            id="keyword"
            name="keyword"
            placeholder="챌린지 이름을 검색해보세요"
            autoComplete="off"
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
      </form>
    </>
  );
}
