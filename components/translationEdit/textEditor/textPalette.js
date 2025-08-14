/* 편의성을 위해 텍스트 팔레트의 css 파일을 분리해두었습니다. 
해당 컴포먼트는 컬러 팔레트 아이콘을 클릭할 시 나오게 되는 컴포먼트이며 
유저가 색상을 선택할 시 닫히도록 되어있습니다. 
기본적으로 색상은 검정, 회색, 빨강, 노랑, 녹색, 파랑, 보라 로 지정해두었으며. 
번역 시 주석 혹은 강조 목적으로 쓰일 것으로 생각해 부러 많은 색상을 추가하지 않았습니다. 
또한, 부러 원색의 경우 눈 피로도를 고려해 선택 색상의 채도를 낮추어 가능한 편의성을 고려했습니다. */

import styles from './TextPalette.module.css';

const COLORS = [
  '#000000', 
  '#6C757D', 
  '#E57373',
  '#FFB74D', 
  '#81C784', 
  '#64B5F6', 
  '#9575CD',
];

function TextPalette({ editor, onClose }) {
  if (!editor) return null;

  return (
    <div className={styles.palette}>
      {COLORS.map((color) => (
        <button
          key={color}
          onClick={() => {
            editor.chain().focus().setColor(color).run();
            onClose?.();
          }}
          className={styles.colorButton}
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}

export default TextPalette;