import { useEffect, useState } from "react";
import { getCategory } from "@/mock/categoryMock";
import styles from "./category.module.css";
import Image from "next/image";
import { getCategorys } from "@/api/challenges";

function CategoryTag({ text, onPlus, onDelete, style = "plus" }) {
  return (
    <div className={styles.filteredCategory} onClick={onPlus}>
      {text}
      <Image
        className={style === "plus" ? styles.plusBtn : styles.deleteBtn}
        onClick={onDelete}
        src={"/icons/ic_plus.svg"}
        width={16}
        height={16}
        alt="분야 추가 혹은 삭제"
      />
    </div>
  );
}

export default function Category({ category, setCategory }) {
  // value = 분야에 입력되고 있는 값, categorys = api에서 키워드 검색으로 불러온 데이터 목록, isLoading = 로딩 중에 화면 노출 x
  const [value, setValue] = useState("");
  const [categorys, setCategorys] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 인풋값 제어
  // 영어 소문자, 숫자, 특수기호 일부 가능
  // 공백, 띄어쓰기 불가
  const handleChange = (e) => {
    const value = e.target.value
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9.+]/g, "");
    setValue(value);
  };

  //검색 결과 중 하나를 선택할 때
  const handleCategoryClick = (e) => {
    console.log(e);
    const value = e.target.innerText;
    setCategory(value);
  };

  // 선택한 분야 태그 삭제할 때
  const handleCategoryDelete = () => {
    setValue("");
    setCategory("");
  };

  useEffect(() => {
    // api 흉내로 키워드 검색 실행. 비동기. 검색어(value)가 바뀔 때마다 실행.
    const searchByValue = async () => {
      setIsLoading(true);
      try {
        const data = await getCategorys(value);
        setCategorys(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    searchByValue();
  }, [value]);

  //상황이 1. 선택한 카테고리가 있을 때.
  // 2. 선택한 카테고리가 없고, 입력했을 때 선택할 수 있는 검색 결과가 있을 때
  // 3. 선택한 카테고리가 없고, 입력했을 때 선택할 수 있는 검색 결과가 없을 때

  // 1번 상황
  if (category) {
    return (
      <div className={styles.category}>
        <label className={styles.text}>분야</label>
        <div className={styles.input}>
          <CategoryTag
            text={category}
            onDelete={handleCategoryDelete}
            style="delete"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.category}>
      <label className={styles.text}>분야</label>
      <input className={styles.input} value={value} onChange={handleChange} />
      <div className={styles.searchResult}>
        <div className={styles.text}>추천 분야</div>
        <div className={styles.categoryList}>
          {(!isLoading &&
            categorys.length &&
            categorys.map((category) => {
              return (
                <CategoryTag
                  text={category.name}
                  key={category.key}
                  onPlus={handleCategoryClick}
                />
              );
            })) ||
            (!categorys.length && (
              <CategoryTag text={value} onPlus={handleCategoryClick} />
            ))}
        </div>
      </div>
    </div>
  );
}
