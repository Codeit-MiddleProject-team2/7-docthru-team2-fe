import Image from "next/image";
import styles from "./originSidbar.module.css";
import Link from "next/link";

const OriginSidebar = ({ isOpen, setIsOpenSidebar }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.opened : ""}`}>
      <nav>
        <button
          className={styles.closeButton}
          onClick={() => {
            setIsOpenSidebar(false);
          }}
        >
          <Image
            src={"/icons/ic_close.svg"}
            width={24}
            height={24}
            alt="닫기 버튼 아이콘"
          />
        </button>
        <Link href={""} className={styles.linkButton}>
          링크열기
          <Image
            src={"/icons/ic_out_link.svg"}
            width={24}
            height={24}
            alt="외부링크 아이콘"
          />
        </Link>
      </nav>

      <div className={styles.originArea}>
        <iframe
          src={"https://nextjs.org/docs/app/getting-started/layouts-and-pages"}
          width="100%"
          height="auto"
          title="문서 미리보기"
          tabIndex={-1}
          scrolling="yes"
        />
      </div>
    </div>
  );
};

export default OriginSidebar;
