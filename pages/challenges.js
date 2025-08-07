import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { challenges as mockChallenges } from '@/mock/mockChallenges';
import Category from "@/components/challengeApply/category";
import Sort from '@/components/challenges/sort';     
import SearchBar from '@/components/challenges/searchBar'; 
import ChallengeCard from '@/components/challenges/card';
import { Pagination } from "@/components/challenges/pagination";
import styles from '@/styles/challenges.module.css'; 

export async function getStaticProps() {
    const challenges = mockChallenges; 
    // 최신순으로 정렬
    const sortedChallenges = challenges.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    return {
      props: { 
        challenges: sortedChallenges } };
  }
  
  // 챌린지보기 메인페이지 5개씩 보기
  export default function ChallengesPage({ challenges }) {
    //페이지 상태 결정
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    //serchQuerry가 비어있으면 모든 challenge가 그대로 반환됨
    const filteredChallenges = challenges.filter((challenge) =>
      challenge.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    //필터링 결과 기준 페이지네이션 계산
    const itemsPerPage = 5; //5개씩
    const totalPages = Math.ceil(challenges.length / itemsPerPage); //전체 페이지 수
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentChallenges = challenges.slice(indexOfFirstItem, indexOfLastItem);

    //검색 핸들러 : 검색어 상태 업데이트, 페이지는 1로 리셋
    const hadleSearch = (querry) => {
      setSearchQuery(querry);
      setCurrentPage(1);
    }
    
    //페이지 번호 목록을 배열로 생성
    const pageNumber = Array.from({length:totalPages}, (_, i) => i +1);

    //페이지 번호 클릭시 currentPage 상태 변경
    const handlePageClick = (page) => {
      setCurrentPage(page);
    };


    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.title}>챌린지 목록</span>
          <div className={styles.headerControls}>
            <SearchBar onSearch={hanleSearch} />
            <Link href="/challengeApply">
              <button className={styles.applyButton}>
                신규 챌린지 신청
              </button>
            </Link>
          </div>
        </header>
  
        <div className={styles.controls}>
          <Category />
          <Sort />
          <SearchBar />
        </div>
  
        {/* 현재 페이지에 해당하는 챌린지 카드만 보여줌 */}

        <main className={styles.mainContent}>
        
        {/*검색 결과 유무 */}
        {filteredChallenges.length > 0 ? (
          <div className={styles.cardGrid}>
          {currentChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
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

        {/* 페이지네이션 컴포넌트 배치 */}
        <footer className={styles.footer}>
          {filteredChallenges.length > 0 && (
            <Pagination 
              pages={pageNumber}
              currentPage={currentPage}
              onPageClick={handlePageClick}
            />
          )}
        </footer>
      </div>
    );
  }
