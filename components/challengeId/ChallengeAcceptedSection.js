// 진행 중인 챌린지 (즉, accepted 됨)일 때 챌린지 영역입니다

import Image from "next/image";
import CustomBtnLong from "../CustomBtnLong";
import styles from "./ChallengeAcceptedSection.module.css";
import { formatDateDeadline } from "@/utils/formatDate";
import { userImgSetting } from "@/utils/userImgDefault";
import ConditionCard from "./ConditionCard";
import { formatDoctype } from "@/utils/formatDoctype";
import { getTranslationByChallengeId } from "@/api/translation";
import { useEffect, useState } from "react";
import { useGetData } from "@/lib/useGetData";
import { useRouter } from "next/router";
import BtnOptions from "../challenges/btnOptions";
import DropOptions from "./DropOptions";

export default function ChallengeAcceptedSection({ data, isFinished }) {
  const router = useRouter();
  // 마감되었는가? (boolean)
  const isFull = data.maximum <= data._count.Translation;

  const { data: myTranslation } = useGetData(async () => {
    return await getTranslationByChallengeId(data.id);
  }, [data]);

  // 이 사용자가 이 챌린지에 참여한 적 있는지?
  const isParticipater = Boolean(myTranslation);

  // 참가자이거나 혹은 맥시멈 인원을 다 채우지 못 했을 때 도전하기 버튼이 유효함
  const isValid = !isFinished && (isParticipater || !isFull);

  const toTranslation =
    !isFinished && isParticipater ? "도전 계속하기" : "작업 도전하기";

  return (
    <div className={styles.accepted}>
      <div className={styles.challenge}>
        <div className={styles.header}>
          <ConditionCard isFinished={isFinished} isFull={isFull} />
          <div className={styles.title}>
            <div>{data.title} </div>
            <DropOptions data={data} />
          </div>
          <div className={styles.tags}>
            <div className={styles.category}>{data.category} </div>
            <div className={styles.type}>{formatDoctype(data.type)} </div>
          </div>
        </div>
        <div className={styles.content}>
          <div className={styles.description}>{data.description} </div>
          <div className={styles.user}>
            <Image
              src={userImgSetting(data.user.img)}
              width={24}
              height={24}
              alt="유저 프로필"
            />
            <div className={styles.nickname}>{data.user.nickname} </div>
          </div>
        </div>
      </div>
      <div className={styles.translation}>
        <div className={styles.info}>
          <Image
            className={styles.IcDeadline}
            src={"/icons/ic_deadline.svg"}
            width={24}
            height={24}
            alt="마감 날짜"
          />
          <div className={styles.infoText}>
            {formatDateDeadline(data.dueDate)}
          </div>
          <Image
            className={styles.IcChallenger}
            src={"/icons/ic_challenger.svg"}
            width={24}
            height={24}
            alt="참여 인원"
          />
          <div
            className={styles.infoText}
          >{`${data._count.Translation}/${data.maximum}`}</div>
        </div>
        <div className={styles.btns}>
          <CustomBtnLong
            text="원문 보기"
            onClick={() => {
              window.open("https://www.prisma.io/docs/orm");
            }}
            color="yellow"
            size="small"
            valid={true}
          />
          <CustomBtnLong
            text={toTranslation}
            onClick={() => {
              router.push(`/translationEdit/${data.id}`);
            }}
            size={"small"}
            valid={isValid}
          />
        </div>
      </div>
    </div>
  );
}
