import { useEffect, useState } from "react";
import Link from "next/link";
import Category from "@/components/challengeApply/category";
import Sort from "@/components/challenges/sort";
import SearchBar from "@/components/challenges/searchBar";
import ChallengeCard from "@/components/challenges/card";
import { Pagination } from "@/components/challenges/pagination";
import styles from "@/styles/challenges.module.css";
import axios from "axios";

export default function ChallengesPage() {
  // 컴포넌트 상태 관리: challenges 목록, 로딩 상태, 페이지네이션 정보를 관리.
  const [challenges, setChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("latest");
  const challengeSortOptions = [
    { value: "latest", label: "최신순" },
    { value: "deadline", label: "마감일순" },
    { value: "popular", label: "인기순" },
  ];
  const [paginationInfo, setPaginationInfo] = useState({ totalCount: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // 페이지당 아이템 수는 프론트/백엔드가 동일하게 알고 있어야 함

  //currentPage나 searchQuery가 바뀔 때마다 API를 호출.
  useEffect(() => {
    const fetchChallenges = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          page: currentPage,
          pageSize: itemsPerPage,
          sort: sortOption,
        });
        if (searchQuery) {
          params.append("q", searchQuery);
        }

        // 백엔드 API에 데이터를 요청
        const res = await axios.get(`http://localhost:5000/challenge`, {
          params,
        });
        console.log(res);
        if (res.statusText !== "OK") {
          throw new Error("챌린지 데이터를 불러오는 데 실패했습니다.");
        }

        // 백엔드에서 받은 데이터로 상태 업데이트
        setChallenges(res.data.challenges);
        setPaginationInfo(res.data);
      } catch (error) {
        console.error(error);
        setChallenges([]); // 에러 발생 시 목록을 비웁니다.
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, [currentPage, searchQuery, sortOption]); // currentPage나 searchQuery가 변경될 때마다 이 useEffect 다시 실행

  // 핸들러 함수들: 상태 변경시 데이터를 다시 불러옴
  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // 검색 시 항상 첫 페이지부터
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (selectedValue) => {
    setSortOption(selectedValue);
    setCurrentPage(1); // 정렬 변경 시 항상 첫 페이지부터
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <span className={styles.title}>챌린지 목록</span>
        <div className={styles.headerControls}>
          <Link href="/challengeApply">
            <button className={styles.applyButton}>신규 챌린지 신청</button>
          </Link>
        </div>
      </header>
      <div className={styles.controls}>
        <div className={styles.topControls}>
          <Sort
            options={challengeSortOptions}
            onSortChange={handleSortChange}
          />
          <SearchBar value={searchQuery} onChange={handleSearch} />
        </div>
        <Category />
      </div>

      <main className={styles.mainContent}>
        {challenges.length > 0 ? (
          <div className={styles.cardGrid}>
            {challenges.map((challenge) => (
              <ChallengeCard key={challenge.id} data={challenge} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyContainer}>
            <p>
              {searchQuery
                ? `'${searchQuery}'에 대한 검색 결과가 없습니다.`
                : "아직 챌린지가 없어요. 지금 바로 챌린지를 신청해보세요!"}
            </p>
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        {challenges.length > 0 && (
          <Pagination
            limit={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageClick}
            total={paginationInfo.totalCount}
          />
        )}
      </footer>
    </div>
  );
}
