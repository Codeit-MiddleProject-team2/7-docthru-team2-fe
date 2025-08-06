

import { useRouter } from 'next/router';
import Link from 'next/link';
import { challenges as mockChallenges } from '@/mockData/mockChallenges';

import FilterPanel from '@/components/challenges/filterPanel'; 
import Sort from '@/components/challenges/sort';     
import SearchBar from '@/components/challenges/searchBar'; 
import ChallengeCard from '@/components/challenges/card';
import styles from '@/styles/challenges.module.css'; 




export async function getStaticProps() {
    const challenges = mockChallenges;
  
    // 최신순으로 정렬
    const sortedChallenges = challenges.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  
    return {
      props: {
        challenges: sortedChallenges,
      },
    };
  }
  
  // getStaticProps에서 받은 데이터를 화면에 그리는 컴포넌트
  export default function ChallengesPage({ challenges }) {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <span className={styles.title}>챌린지 목록</span>
            <button className={styles.applyButton}>신규 챌린지 신청</button>
        </header>
  
        {/* 이미 만들어진 컴포넌트들을 배치 */}
        <div className={styles.controls}>
          <FilterPanel />
          <Sort />
          <SearchBar />
        </div>
  
        {/* 챌린지 카드 */}
        <main className={styles.cardGrid}>
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
        </main>
  
        {/* 페이지네이션 컴포넌트를 배치 */}
        <footer className={styles.footer}>

        </footer>
      </div>
    );
  }