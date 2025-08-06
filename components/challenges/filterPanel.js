import {useState} from 'react';
import styles from './FilterPanel.module.css';

//필터 항목 정의. 배열로 했는데 나중에 DB 설계에 따라 API로 빼야하는지?
const CATEGORY_OPTIONS = ['next.js','Modern JS', 'API', 'Career' ];
const TYPE_OPTIONS = ['공식문서', '블로그', '기타'];
const STATE_OPTIONS = ['진행중', '마감']

//
//분야(카테고리)는 다중선택 가능. 위에 배열로 해서 일단 배열로.
export default function FilterPanel({ selected = {}, onApply }) {
    const [category, setCategory] = useState(
        Array.isArray(selected.category)
          ? selected.category
          : [selected.category].filter(Boolean) // 
      );
    //하나만 선택 가능하게 단일 문자열 상태로 관리
    const [type, setType] = useState(selected.type || '');
    const [state, setState] = useState(selected.state || '');

    //클릭시 체크박스가 이미 체크되어있으면 제거, 없으면 추가됨.
    const toggleCategory = (value) => {
        setCategory((prev) =>
            prev.includes(value) 
            ? prev.filter((v) => v !== value) //체크되어있으면 제거
            : [...prev, value] // 없으면 추가
        );
    };



    //적용
    const handleApply = () => {
        onApply({ category, tyle, state});
    };

    return (
        <div className={styles.panel}>
        <div className={styles.header}>
          <span>필터</span>
          <button className={styles.closeBtn} onClick={handleReset}>✕</button>
        </div>
  
        <div className={styles.section}>
          <div className={styles.label}>분야</div>
          <div className={styles.options}>
            {CATEGORY_OPTIONS.map((item) => (
              <label key={item} className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={category.includes(item)}
                  onChange={() => toggleCategory(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
  
        <div className={styles.section}>
          <div className={styles.label}>문서 타입</div>
          <div className={styles.options}>
            {TYPE_OPTIONS.map((item) => (
              <label key={item} className={styles.radio}>
                <input
                  type="radio"
                  name="type"
                  checked={type === item}
                  onChange={() => setType(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
  
        <div className={styles.section}>
          <div className={styles.label}>상태</div>
          <div className={styles.options}>
            {STATE_OPTIONS.map((item) => (
              <label key={item} className={styles.radio}>
                <input
                  type="radio"
                  name="state"
                  checked={state === item}
                  onChange={() => setState(item)}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
  
        <div className={styles.actions}>
          <button className={styles.resetBtn} onClick={handleReset}>초기화</button>
          <button className={styles.applyBtn} onClick={handleApply}>적용하기</button>
        </div>
      </div>
    );

};