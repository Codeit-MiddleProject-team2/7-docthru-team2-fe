import Image from "next/image";
import styles from "./Pagenation.module.css";

export default function Pagenation({ page, maxPage, setPage }) {
  return (
    <div className={styles.container}>
      <div className={styles.pageBox}>
        <div className={styles.textBox}>
          <span className={styles.page}>{page}</span>/
          <span className={styles.maxPage}>{maxPage}</span>
        </div>
      </div>
      <div className={styles.arrows}>
        <Image
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
          src="/icons/ic_pagenaiton_arrow_left.svg"
          width={32}
          height={32}
          alt="페이지 왼쪽 이동"
        />
        <Image
          onClick={() => {
            if (page < maxPage) {
              setPage(page + 1);
            }
          }}
          src="/icons/ic_pagenaiton_arrow_right.svg"
          width={32}
          height={32}
          alt="페이지 오른쪽 이동"
        />
      </div>
    </div>
  );
}
