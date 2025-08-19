import { useState } from "react";
import Pagenation from "./Pagenation";
import ParticipationList from "./ParticipationList";
import styles from "./ParticipationSection.module.css";
import { getAllTranslations } from "@/api/translation.js";
import { useGetData } from "@/lib/useGetData";
import BestTranslation from "./BestTranslation";

export default function ParticipationSection({
  challengeId,
  count,
  isFinished,
}) {
  const [page, setPage] = useState(1);
  const maxPage = parseInt(count / 5) + 1;

  const { data, isLoading, setData } = useGetData(
    () => {
      return getAllTranslations(challengeId, page);
    },
    [],
    [page]
  );

  if (isLoading) {
    return <div></div>;
  }

  return (
    <div>
      {isFinished && <BestTranslation challengeId={challengeId} />}
      <div className={styles.box}>
        <div>
          <div className={styles.current}>참여 현황</div>
          {maxPage >= 2 && (
            <Pagenation page={page} maxPage={maxPage} setPage={setPage} />
          )}
        </div>
        <ParticipationList data={data} />
      </div>
    </div>
  );
}
