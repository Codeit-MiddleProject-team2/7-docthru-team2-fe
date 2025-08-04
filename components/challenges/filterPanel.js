import {useState} from 'react';
import styles from './FilterPanel.module.css';

//필터 항목 정의. 배열로 했는데 나중에 DB 설계에 따라 API로 빼야하는지?
const CATEGORY_OPTIONS = ['next.js','Modern JS', 'API', 'Career' ];
const TYPE_OPTIONS = ['공식문서', '블로그', '기타'];
const STATE_OPTIONS = []

//
//분야(카테고리)는 다중선택 가능. 위에 배열로 해서 일단 배열로.
export default function FilterPanel({ selected, onApply, onReset}) {
    // const [category, setCategory] = useState(
    // Array.inArry(selected.category) ? [selected.category].filter(boolean)
    // );
    // //하나만 선택 가능하게 단일 문자열 상태로 관리
    // const [type, setType] = useState(selected.type || '');
    // const [state, setState] = useState(selected.state || '');

    // //클릭시 체크박스가 이미 체크되어있으면 제거, 없으면 추가됨.
    // const toggleCategory = (value) => {
    //     setCategory((prev) =>
    //         prev.includes(value) ? prev.filter((v) => v !== : [...prev.value])
    //     );
    // };

    //초기화
    const handleReset = () => {
        setCategory([]);
        setType('')
        setState('')
        onReset();
    };

    //적용
    const handleApply = () => {
        onApply({ category, tyle, state});
    };

    return 


};