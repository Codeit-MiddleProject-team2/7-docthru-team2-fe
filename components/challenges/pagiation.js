import Image from "next/image";
import styles from "./pagination.module.css";
import iconArrowLeft from "../../public/icons/ic_pagenaiton_arrow_left.svg";
import iconArrowRight from "../../public/icons/ic_pagenaiton_arrow_right.svg";

export const Pagination = ({ pages = [] }) => {
  const handlePageClick = () => {
    console.log("누르면 반응하는지 테스트");
    return;
  };

  return (
    <>
      <ul className={styles.pagination}>
        <li>
          <button
            type="button"
            onClick={handlePageClick}
            className={styles.pageArrow}
          >
            <Image
              src={iconArrowLeft}
              width={40}
              height={40}
              alt="이전 페이지 화살표"
            />
          </button>
        </li>
        {pages.map((page) => {
          return (
            <li key={page}>
              <button
                type="button"
                onClick={handlePageClick}
                className={`${styles.pageNumber}`}
              >
                {page}
              </button>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            onClick={handlePageClick}
            className={styles.pageArrow}
          >
            <Image
              src={iconArrowRight}
              width={40}
              height={40}
              alt="다음 페이지 화살표"
            />
          </button>
        </li>
      </ul>
    </>
  );
};
