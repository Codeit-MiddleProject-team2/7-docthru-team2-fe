import Image from "next/image";
import { useRouter } from "next/router";
import styles from "./ParticipationList.module.css";
import { userImgSetting } from "@/utils/userImgDefault";

function ParticipationListItem({ participation, rank }) {
  const router = useRouter();
  return (
    <div className={styles.participation}>
      <div className={styles.ranking}>
        {rank === 1 && (
          <Image
            className={styles.crown}
            src="/icons/ic_crown.svg"
            width={16}
            height={16}
            alt="왕관"
          />
        )}
        <div className={styles.rankingText}>{rank}</div>
      </div>
      <div className={styles.user}>
        <Image
          className={styles.userImg}
          src={userImgSetting(participation.img)}
          width={24}
          height={24}
          alt="유저 이미지"
        />
        <div className={styles.userInfo}>
          <div className={styles.nickname}>{participation.nickname} </div>
          <div className={styles.userLevel}>{participation.userLevel} </div>
        </div>
      </div>
      <div className={styles.left}>
        <div className={styles.hearts}>
          <Image
            src={"/icons/ic_heart_filled.svg"}
            width={16}
            height={16}
            alt="하트 아이콘"
          />
          {participation.hearts_count}
        </div>
        <div
          className={styles.goWork}
          onClick={() => {
            router.push(`/translation/${participation.id}`);
          }}
        >
          <div className={styles.goWorkText}>작업물 보기</div>
          <Image
            src="/icons/ic_pagenaiton_arrow_right.svg"
            width={16}
            height={16}
            alt="작업물 보기"
          />
        </div>
      </div>
    </div>
  );
}

export default function ParticipationList({ data, page }) {
  if (data.length === 0) {
    return (
      <div className={styles.noParticipation}>
        아직 참여한 도전자가 없어요, <br />
        지금 바로 도전해보세요!
      </div>
    );
  }

  let num = 0;

  return data.map((participation) => {
    num += 1;
    return (
      <ParticipationListItem
        key={`${participation.id}participation`}
        participation={participation}
        rank={(page - 1) * 5 + num}
      />
    );
  });
}
