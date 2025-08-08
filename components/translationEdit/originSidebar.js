import styles from './originSidbar.module.css';

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
      <button className={styles.closeButton} onClick={onClose}>
        X
      </button>
      <nav>
          <p>여기에 사이드바 아이프레임이 구현됩니다</p>
      </nav>
    </div>
  );
};

export default Sidebar;