import { useState, useEffect } from "react";
import styles from "../styles/myChallenges.module.css";
import Image from "next/image";
import iconPlus from "../public/icons/ic_plus.svg";
import ChallengeCard from "@/components/challenges/card";
import SearchBar from "@/components/challenges/searchBar";
import Link from "next/link";
import MyChallengeTabs from "@/components/challenges/myChallengeTabs";
import { userSetting } from "@/lib/useAuth";
import { getMyChallenges } from "@/api/myChallenges";
import { useRouter } from "next/router";

export default function MyChallengesPage() {
  const [activeTab, setActiveTab] = useState("ongoing");
  const [challenges, setChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState([]);
  const [access, setAccess] = useState("");
  const router = useRouter();

  const fetchChallenges = async (accessToken) => {
    setIsLoading(true);
    try {
      const res = await getMyChallenges({ searchQuery }, accessToken);
      console.log(res.data);
      setChallenges(res.data.challenges);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const { user, accessToken } = userSetting();

    if (!accessToken) {
      router.push("/");
    }

    setUser(user);
    setAccess(accessToken);

    fetchChallenges(accessToken);
  }, [hasMore]);

  // 필터링 조건 변경 시 데이터 리프레시

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.pageTopArea}>
        <div className={styles.titleArea}>
          <h2>나의 챌린지</h2>
          <div>
            <Link href="/challengeApply" className={styles.btn}>
              신규 챌린지 신청
              <Image
                src={iconPlus}
                width={16}
                height={16}
                alt="신규 챌린지 신청"
              />
            </Link>
          </div>
        </div>
        <div>
          <MyChallengeTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
      <div className={styles.challengeArea}>
        <div className={styles.dataOptionsArea}>
          <SearchBar value={searchQuery} onChange={handleSearch} />
        </div>
        <div className={styles.challengeCardList}>
          {challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} data={challenge} />
          ))}
        </div>
        <div style={{ height: "50px", textAlign: "center" }}>
          {isLoading && <p>로딩 중...</p>}
          {!hasMore && challenges.length > 0 && (
            <p>모든 챌린지를 불러왔습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
