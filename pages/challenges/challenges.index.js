import { useRouter } from 'next/router';
import { getPublicChallenges } from '@/lib/api';
import Card from '@/components/challenges/card';
import Pagination from '@/components/challenges/pagination';
import SearchBar from '@/components/challenges/searchBar';
import FilterPanel from '@/components/challenges/filterPanel'; // 새로 만들 컴포넌트
import styles from './challenges.module.css';

export async function getServerSideProps(context) {
  try {
    const params = new URLSearchParams(context.query);
    const data = await getPublicChallenges(params);
    return { props: { initialData: data } };
  } catch (error) {
    console.error(error);
    return {
      props: {
        initialData: {
          challenges: [],
          totalPages: 0,
          totalCount: 0,
        },
      },
    };
  }
}

export default function ChallengesPage({ initialData }) {
  const router = useRouter();
  const { challenges, totalPages, totalCount } = initialData;

  const handleFilterChange = (filters) => {
    const params = new URLSearchParams(router.query);

    Object.keys(filters).forEach((key) => {
      const value = filters[key];
      if (value === undefined || value === null || value === '' || value.length === 0) {
        params.delete(key);
      } else if (Array.isArray(value)) {
        params.delete(key);
        value.forEach((v) => params.append(key, v));
      } else {
        params.set(key, value);
      }
    });

    params.set('page', '1');
    router.push(`/challenges?${params.toString()}`);
  };

  const handlePageChange = (page) => {
    const params = new URLSearchParams(router.query);
    params.set('page', page);
    router.push(`/challenges?${params.toString()}`);
  };

  const showEmptyState = totalCount === 0 && Object.keys(router.query).length > 0;

  return (
    <div className={styles.container}>
      <h1>챌린지 목록</h1>

      <div className={styles.controls}>
        <SearchBar
          defaultValue={router.query.q || ''}
          onSearch={(q) => handleFilterChange({ q })}
        />
        <FilterPanel
          selected={{
            category: router.query.category || [],
            type: router.query.type || '',
            state: router.query.state || '',
          }}
          onApply={handleFilterChange}
          onReset={() => handleFilterChange({ category: [], type: '', state: '' })}
        />
      </div>

      {showEmptyState ? (
        <div className={styles.empty}>조건에 맞는 챌린지가 없습니다.</div>
      ) : (
        <div className={styles.grid}>
          {challenges.map((challenge) => (
            <Card key={challenge.id} challenge={challenge} />
          ))}
        </div>
      )}

      <Pagination
        currentPage={Number(router.query.page) || 1}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}