import styles from "@/styles/myChallengesApply.module.css";
import Image from "next/image";
import iconPlus from "@/public/icons/ic_plus.svg";
import { Pagination } from "@/components/challenges/pagination";
import SearchBar from "@/components/challenges/searchBar";
import Sort from "@/components/challenges/sort";
import Link from "next/link";
import TableRow from "@/components/challenges/tableRow";
import { getMyChallengesApply } from "@/mock/myChallengesApply.js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MyChallengeTabs from "@/components/challenges/myChallengeTabs";
import TableHead from "@/components/challenges/tableHead";

const statusOptions = [
  { value: "", label: "전체" },
  { value: "pending", label: "승인 대기" },
  { value: "approved", label: "신청 승인" },
  { value: "rejected", label: "신청 거절" },
  { value: "deleted", label: "챌린지 삭제" },
];

export default function MyChallengesApplyPage() {
  const router = useRouter();
  const { status = "", keyword = "", page: pageNum = 1 } = router.query;
  const page = Number(pageNum);

  const [challenges, setChallenges] = useState([]);
  const [total, setTotal] = useState(0);
  //const [status, setStatus] = useState("");
  //const [keyword, setKeyword] = useState("");
  //const [page, setPage] = useState(1);
  const limit = 10;

  const handleMyChallenges = async () => {
    const res = await getMyChallengesApply({
      status,
      keyword,
      page,
      limit,
    });

    setChallenges(res.data);
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
    handleMyChallenges({ status, keyword, page, limit });
  }, [status, keyword, page]);
  return (
    <>
      <div className={styles.contaniner}>
        <div className={styles.pageTopArea}>
          <div className={styles.titleArea}>
            <h2>나의 챌린지</h2>
            <div>
              <Link href={"/"} className={styles.btn}>
                신규 챌린지 신청
                <Image src={iconPlus} width={16} height={16} />
              </Link>
            </div>
          </div>
          <MyChallengeTabs />
        </div>
        <div className={styles.challengeArea}>
          <div className={styles.dataOptionsArea}>
            <Sort
              options={statusOptions}
              selected={status}
              onChange={(value) => updateQuery({ status: value, page: 1 })}
            />
            <SearchBar
              value={keyword}
              onChange={(value) => updateQuery({ keyword: value, page: 1 })}
            />
          </div>
          {challenges.length > 0 ? (
            <>
              <div className={styles.challengeTable}>
                <TableHead />
                <div className={styles.tableBody}>
                  {challenges.map((challenge) => {
                    return (
                      <TableRow key={challenge.no} challenge={challenge} />
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
            <p className={styles.nodata}>개설한 챌린지가 없어요 :(</p>
          )}
        </div>
      </div>
    </>
  );
}
