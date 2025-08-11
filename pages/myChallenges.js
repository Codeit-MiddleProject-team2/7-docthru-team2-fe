import styles from "../styles/myChallenges.module.css";
import Image from "next/image";
import iconPlus from "../public/icons/ic_plus.svg";
import ChallengeCard from "@/components/challenges/card";
import SearchBar from "@/components/challenges/searchBar";
import Sort from "@/components/challenges/sort";
import Link from "next/link";
import { useState, useEffect } from "react";
import MyChallengeTabs from "@/components/challenges/myChallengeTabs";


export default function MyChallengesPage() {
  const challenge = {
    id: 2,
    title: "React 상태 관리 완전 정복",
    description: "React의 다양한 상태 관리 방법을 실습하고 비교합니다.",
    url: `http://localhost:3000/challenges/2`,
    category: "React",
    type: "블로그",
    dueDate: "2025-08-10T18:00:00Z",
    maximum: 8,
    createdAt: "2025-07-01T09:00:00Z",
    updatedAt: "2025-07-02T11:00:00Z",
    deletedAt: "2025-08-11T13:24:00Z",
    rejectedAt: "2025-08-12T15:35:00Z",
    userId: 5,
    isAdmitted: "accepted",
  };

  const [challenges, setChallenges] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("마감일 가까운 순");

  //무한스크롤 형식
  const handleScroll = () => {
    // 스크롤이 맨 아래 근처에 왔고, 로딩 중이 아니며, 더 불러올 데이터가 있을 때만 실행
       if (
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 &&
      !isLoading &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  // 3. 스크롤 이벤트를 등록하고 해제하는 useEffect
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // 컴포넌트가 사라질 때 이벤트 리스너를 정리
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, hasMore]); // isLoading, hasMore가 바뀔 때마다 조건을 다시 확인

  // 데이터 소스(탭, 검색어, 정렬)가 바뀔 때 데이터를 새로 불러오는 useEffect
  useEffect(() => {
    setChallenges([]);
    setPage(1);
    setHasMore(true);
    // loadChallenges(true);
  }, [searchQuery, sortOption]);
  
  // page 상태가 바뀔 때 추가 데이터를 불러오는 useEffect
  // useEffect(() => {
  //   if (page > 1) {
  //     // loadChallenges();
  //   }
  // }, [page]);
  


  return (
    <>
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
            <MyChallengeTabs />
          </div>
        </div>
  
        <div className={styles.challengeArea}>
          <div className={styles.dataOptionsArea}>
            <Sort />
            <SearchBar />
          </div>
  
          <div className={styles.challengeCardList}>
              <ChallengeCard
                data={challenge}
              />
          </div>
  
          <div style={{ height: "50px", textAlign: "center" }}>
            {isLoading && <p>로딩 중...</p>}
            {!hasMore && challenges.length > 0 && <p>모든 챌린지를 불러왔습니다.</p>}
          </div>
        </div> 
      </div>  
    </>
  ) }