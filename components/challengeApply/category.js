import { useEffect, useState } from "react";
import { getCategory } from "@/mock/categoryMock";
import styles from "./category.module.css";
import Image from "next/image";

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

  useEffect(() => {
    // api 흉내로 키워드 검색 실행. 비동기. 검색어(value)가 바뀔 때마다 실행.
    const searchByValue = async () => {
      setIsLoading(true);
      try {
        const res = await getCategory(value);
        setCategorys(res);
        return res;
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    searchByValue();
  }, [value]);

  console.log(category);

  if (category) {
    return (
      <div className={styles.category}>
        <label className={styles.text}>분야</label>
        <div className={styles.input}>
          <div className={styles.filteredCategory}>
            {category}
            <Image
              className={styles.deleteBtn}
              onClick={() => {
                setValue("");
                setCategory("");
              }}
              src={"/icons/ic_plus.svg"}
              width={16}
              height={16}
              alt="분야 삭제"
            />
          </div>
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
          {!isLoading &&
            categorys.map((category) => {
              return (
                <div
                  className={styles.filteredCategory}
                  key={category.id}
                  onClick={handleCategoryClick}
                >
                  {category.name}
                  <Image
                    className={styles.plusBtn}
                    src={"/icons/ic_plus.svg"}
                    width={16}
                    height={16}
                    alt="분야 추가"
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
