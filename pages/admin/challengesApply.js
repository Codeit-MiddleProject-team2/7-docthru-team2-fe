import styles from "@/styles/myChallengesApply.module.css";
import { Pagination } from "@/components/challenges/pagination";
import SearchBar from "@/components/challenges/searchBar";
import Sort from "@/components/challenges/sort";
import TableRow from "@/components/challenges/tableRow";
import { getMyChallengesApply } from "@/api/myChallenges";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TableHead from "@/components/challenges/tableHead";
import { userSetting } from "@/lib/useAuth";

const statusFilterOptions = [
  { value: "", label: "전체" },
  { value: "PENDING", label: "승인 대기" },
  { value: "ACCEPTED", label: "신청 승인" },
  { value: "REJECTED", label: "신청 거절" },
  { value: "DELETED", label: "챌린지 삭제" },
];

const orderByOptions = [
  { value: "latest", label: "신청기한 최신순" },
  { value: "oldest", label: "신청기한 오래된순" },
  { value: "deadlineLatest", label: "마감기한 최신순" },
  { value: "deadlineOldest", label: "마감기한 오래된순" },
];

export default function AdminChallengesApplyPage() {
  // 해당 두 줄 참고
  const [user, setUser] = useState({});
  const [accessTk, setAccessTk] = useState("");

  const router = useRouter();
  const { status = "", keyword = "", page: pageNum = 1, orderBy = "" } = router.query;
  const page = Number(pageNum);

  const [challenges, setChallenges] = useState([]);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const handleMyChallenges = async () => {
    const res = await getMyChallengesApply({
      status,
      keyword,
      page,
      limit,
      orderBy,
      isAdmin: true,
    });

    setChallenges(res.challenges);
    setTotal(res.total);
  };

  const updateQuery = (params) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, ...params },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    // 해당 3줄 참고
    const { user: userData, accessToken } = userSetting();
    setUser(userData);
    setAccessTk(accessToken);

    if (!accessToken) {
      router.push("/login");
    }
    if (!userData.isAdmin) {
      alert("해당 페이지는 어드민만 접근만 가능합니다.");
      router.push("/");
    }

    handleMyChallenges({ status, keyword, page, limit });
  }, [status, keyword, page, orderBy]);
  return (
    <>
      <div className={styles.contaniner}>
        <div className={styles.pageTopArea}>
          <div className={styles.titleArea}>
            <h2>챌린지 신청 관리</h2>
          </div>
        </div>
        <div className={styles.challengeArea}>
          <div className={styles.dataOptionsArea}>
            <SearchBar
              value={keyword}
              onChange={(value) => updateQuery({ keyword: value, page: 1 })}
            />
            <Sort
              options={statusFilterOptions}
              selected={status}
              onChange={(value) => updateQuery({ status: value, page: 1 })}
            />
            <Sort
              options={orderByOptions}
              selected={orderBy}
              onChange={(value) => updateQuery({ orderBy: value, page: 1 })}
            />
          </div>
          {total > 0 ? (
            <>
              <div className={styles.challengeTable}>
                <TableHead />
                <div className={styles.tableBody}>
                  {challenges.map((challenge) => {
                    return (
                      <TableRow
                        key={challenge.id}
                        challenge={challenge}
                      />
                    );
                  })}
                </div>
              </div>
              <Pagination
                currentPage={page}
                total={total}
                limit={limit}
                onPageChange={(page) => updateQuery({ page })}
              />
            </>
          ) : (
            <p className={styles.nodata}>신청한 챌린지가 없어요 :(</p>
          )}
        </div>
      </div>
    </>
  );
}
