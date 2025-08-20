import { getBestTranslations } from "@/api/translation";
import { useGetData } from "@/lib/useGetData";
import { userImgSetting } from "@/utils/userImgDefault";
import Image from "next/image";
import styles from "./BestTranslation.module.css";
import { userLevelKor } from "@/utils/userLevelKor";
import { formatDate } from "@/utils/formatDate";
import { useEffect, useState } from "react";

export default function BestTranslation({ challengeId }) {
  const [num, setNum] = useState(0);
  const { data: BestTranslation, isLoading } = useGetData(() => {
    return getBestTranslations(challengeId);
  }, [num]);

  if (isLoading) {
    return <div>로딩 중</div>;
  }

  const data = BestTranslation[num];
  const maxNum = BestTranslation.length - 1;

  const leftArrow =
    num > 0
      ? "/icons/ic_pagenaiton_arrow_left.svg"
      : "/icons/ic_arrow_left_blur.svg";
  const rightArrow =
    num < maxNum
      ? "/icons/ic_pagenaiton_arrow_right.svg"
      : "/icons/ic_arrow_right_blur.svg";

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
      <div className={styles.btns}>
        <Image
          onClick={() => {
            if (num > 0) {
              setNum((prev) => prev - 1);
            }
          }}
          src={leftArrow}
          width={32}
          height={32}
          alt="페이지 왼쪽 이동"
        />
        <Image
          onClick={() => {
            if (num < maxNum) {
              setNum((prev) => prev + 1);
            }
          }}
          src={rightArrow}
          width={32}
          height={32}
          alt="페이지 오른쪽 이동"
        />
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
