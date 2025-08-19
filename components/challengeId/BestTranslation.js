import { getBestTranslations } from "@/api/translation";
import { useGetData } from "@/lib/useGetData";
import { userImgSetting } from "@/utils/userImgDefault";
import Image from "next/image";
import styles from "./BestTranslation.module.css";
import { userLevelKor } from "@/utils/userLevelKor";
import { formatDate } from "@/utils/formatDate";

export default function BestTranslation({ challengeId }) {
  const { data: BestTranslation, isLoading } = useGetData(() => {
    return getBestTranslations(challengeId);
  }, []);

  if (isLoading) {
    return <div>로딩 중</div>;
  }

  const data = BestTranslation[0];
  console.log(data);

  return (
    <div className={styles.background}>
      <div className={styles.bestTag}>
        <Image
          src={"/icons/ic_medal.svg"}
          width={16}
          height={16}
          alt="최다 추천작"
        />
        <div className={styles.bestText}>최다 추천 번역</div>
      </div>
      <div className={styles.header}>
        <div className={styles.info}>
          <div className={styles.user}>
            <Image
              src={userImgSetting(data.img)}
              width={24}
              height={24}
              alt="유저 아이콘"
            />
            <div className={styles.nickname}>{data.nickname} </div>
            <div className={styles.userLevel}>
              {userLevelKor(data.userLevel)}
            </div>
          </div>
          <div className={styles.heartsCount}>{data.hearts_count}</div>
        </div>
        <div className={styles.date}>{formatDate(data.submittedAt)}</div>
      </div>
      <div className={styles.content}>{data.content}</div>
    </div>
  );
}
