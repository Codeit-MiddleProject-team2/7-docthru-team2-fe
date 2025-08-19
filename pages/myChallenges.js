import { useState, useEffect } from "react";
import styles from "../styles/myChallenges.module.css";
import Image from "next/image";
import iconPlus from "../public/icons/ic_plus.svg";
import ChallengeCard from "@/components/challenges/card";
import SearchBar from "@/components/challenges/searchBar";
import Sort from "@/components/challenges/sort";
import Link from "next/link";
import MyChallengeTabs from "@/components/challenges/myChallengeTabs";

const ITEMS_PER_PAGE = 5;

const fetchChallengesFromAPI = async ({ tab, page, query, sort }) => {
  const params = new URLSearchParams({
    page: page,
    pageSize: ITEMS_PER_PAGE,
    state: tab, 
  });
  if (query) {
    params.append("q", query); // 검색어는 'q' 파라미터로 전달
  }

  try {
    const response = await fetch(`/api/challenges?${params.toString()}`);
    if (!response.ok) {
      throw new Error("챌린지 데이터를 불러오는 데 실패했습니다.");
    }
    // 백엔드 컨트롤러가 { data: ... } 형태로 응답하므로 
    const responseData = await response.json();
    return responseData.data;
  } catch (error) {
    console.error(error);
    // 에러 발생 시 빈 데이터 반환
    return { challenges: [], page: 1, totalPages: 1 };
  }
};

export default function MyChallengesPage() {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [challenges, setChallenges] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("최신순"); // 기본 정렬값


  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 &&
      !isLoading &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, hasMore]);


  const loadChallenges = async (isNewSearch = false) => {
    setIsLoading(true);
    const currentPage = isNewSearch ? 1 : page;

    const responseData = await fetchChallengesFromAPI({
      tab: activeTab,
      page: currentPage,
      query: searchQuery,
      sort: sortOption,
    });
    

    if (currentPage >= responseData.totalPages) {
      setHasMore(false);
    } else {
      setHasMore(true);
    }

    if (isNewSearch) {
      setChallenges(responseData.challenges);
    } else {
      // 중복 데이터 방지를 위해 id가 없는 경우에만 추가
      setChallenges((prev) => [...prev, ...responseData.challenges.filter(newC => !prev.some(oldC => oldC.id === newC.id))]);
    }
    setIsLoading(false);
  };

  // 필터링 조건 변경 시 데이터 리프레시
  useEffect(() => {
    setChallenges([]);
    setPage(1);
    setHasMore(true);
    loadChallenges(true);
  }, [activeTab, searchQuery, sortOption]);
  
  useEffect(() => {
    if (page > 1) {
      loadChallenges();
    }
  }, [page]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSortChange = (option) => {
    setSortOption(option);
  };
  
  const tabInfo = {
    ongoing: {
      sortOptions: ["마감일 가까운 순", "최신 참여 순", "최신 작업 순"],
      buttonText: "도전 계속하기", buttonLink: "/task-submit",
    },
    completed: {
      sortOptions: ["최신순", "오래된순", "인기순"],
      buttonText: "내 작업물 보기", buttonLink: "/submissions",
    },
    applied: {
      sortOptions: [],
      buttonText: "신청 현황 보기", buttonLink: "/apply-status",
    },
  };

  return (
    <div className={styles.container}>
      <div className={styles.pageTopArea}>
        <div className={styles.titleArea}>
          <h2>나의 챌린지</h2>
          <div>
            <Link href="/challengeApply" className={styles.btn}>
              신규 챌린지 신청
              <Image src={iconPlus} width={16} height={16} alt="신규 챌린지 신청" />
            </Link>
          </div>
        </div>
        <div>
          <MyChallengeTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
      <div className={styles.challengeArea}>
        <div className={styles.dataOptionsArea}>
          <Sort options={tabInfo[activeTab].sortOptions} onSortChange={handleSortChange} />
          <SearchBar value={searchQuery} onChange={handleSearch} />
        </div>
        <div className={styles.challengeCardList}>
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              data={challenge}
              buttonText={tabInfo[activeTab].buttonText}
              buttonLink={`${tabInfo[activeTab].buttonLink}/${challenge.id}`}
            />
          ))}
        </div>
        <div style={{ height: "50px", textAlign: "center" }}>
          {isLoading && <p>로딩 중...</p>}
          {!hasMore && challenges.length > 0 && <p>모든 챌린지를 불러왔습니다.</p>}
        </div>
      </div>
    </div>
  );
}