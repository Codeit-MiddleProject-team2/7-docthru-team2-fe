import { useEffect, useState } from "react";
import Link from "next/link";
import Category from "@/components/challengeApply/category";
import Sort from "@/components/challenges/sort";
import SearchBar from "@/components/challenges/searchBar";
import ChallengeCard from "@/components/challenges/card";
import { Pagination } from "@/components/challenges/pagination";
import styles from "@/styles/challenges.module.css";
import axios from "axios";
import { userSetting } from "@/lib/useAuth";
import { useRouter } from "next/router";
import { getChallenges } from "@/api/challenges";

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortOption, setSortOption] = useState("latest");
  const [paginationInfo, setPaginationInfo] = useState({ totalCount: 0 });
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [category, setCategory] = useState("");

  const router = useRouter();
  const { user, accessToken } = userSetting();

  useEffect(() => {
    const { user, accessToken } = userSetting();

    if (!accessToken) {
      router.push("/");
    }

    const fetchChallenges = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          page: currentPage,
          pageSize: itemsPerPage,
          sort: sortOption,
        });
        if (searchQuery) params.append("q", searchQuery);
        if (category) params.append("category", category);

        const res = await getChallenges(params);
        setChallenges(res.data.challenges);
        setPaginationInfo(res.data);
      } catch (error) {
        console.error("챌린지 데이터 페칭 에러:", error);
        setChallenges([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchChallenges();
  }, [currentPage, searchQuery, sortOption, category, accessToken, router]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleSortChange = (selectedValue) => {
    setSortOption(selectedValue);
    setCurrentPage(1);
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
    setCurrentPage(1);
  };

  // 인증 정보 로딩 중일 때도 로딩 화면 표시
  if (accessToken === undefined || (isLoading && challenges.length === 0)) {
    return <div>로딩 중...</div>;
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
          <Sort selected={sortOption} onChange={handleSortChange} />
          <SearchBar value={searchQuery} onChange={handleSearch} />
        </div>
        <Category category={category} setCategory={handleCategoryChange} />
      </div>

      <main className={styles.mainContent}>
        {challenges.length > 0 ? (
          <div className={styles.cardGrid}>
            {challenges.map((challenge) => (
              <ChallengeCard
                key={challenge.id}
                userId={user?.id}
                accessToken={accessToken}
                data={challenge}
              />
            ))}
          </div>
        ) : (
          !isLoading && (
            <div className={styles.emptyContainer}>
              <p>
                {searchQuery || category
                  ? "선택한 조건의 챌린지가 없습니다."
                  : "아직 챌린지가 없어요. 지금 바로 챌린지를 신청해보세요!"}
              </p>
            </div>
          )
        )}
      </main>

      <footer className={styles.footer}>
        {challenges.length > 0 && !isLoading && (
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