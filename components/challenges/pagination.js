import Image from "next/image";
import styles from "./pagination.module.css";
import iconArrowLeft from "../../public/icons/ic_pagenaiton_arrow_left.svg";
import iconArrowRight from "../../public/icons/ic_pagenaiton_arrow_right.svg";

export const Pagination = ({ currentPage, total, limit, onPageChange }) => {
  const totalPages = Math.ceil(total / limit);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (pageNum) => {
    if (pageNum !== currentPage) {
      onPageChange(pageNum);
    }
  };

  return (
    <>
      <ul className={styles.pagination}>
        <li>
          <button
            type="button"
            onClick={handlePrev}
            className={styles.pageArrow}
            disabled={currentPage === 1}
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
                onClick={() => handlePageClick(page)}
                className={`${styles.pageNumber} ${
                  page === currentPage ? styles.active : ""
                }`}
              >
                {page}
              </button>
            </li>
          );
        })}
        <li>
          <button
            type="button"
            onClick={handleNext}
            className={styles.pageArrow}
            disabled={currentPage === totalPages}
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
