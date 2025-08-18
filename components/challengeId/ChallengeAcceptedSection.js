// 진행 중인 챌린지 (즉, accepted 됨)일 때 챌린지 영역입니다

import Image from "next/image";
import CustomBtnLong from "../CustomBtnLong";
import styles from "./ChallengeAcceptedSection.module.css";
import { formatDateDeadline } from "@/utils/formatDate";
import { userSetting } from "@/lib/useAuth";
import { userImgSetting } from "@/utils/userImgDefault";

export default function ChallengeAcceptedSection({ data }) {
  const { user } = userSetting();
  // 지금은 test지만 나중에는 실제로 백엔드에서 값을 받아오고
  // 백엔드에서 받아온 챌린지 데이터 중에서
  // 현재 사이트를 보고 있는 사용자의 아이디(user.id)가 참가자로 포함되어 있는지 boolean으로 판단할 것
  const isParticipater = false;

  // 참가자이거나 혹은 맥시멈 인원을 다 채우지 못 했을 때 도전하기 버튼이 유효함
  const isValid = isParticipater || data.maximum > data._count.Translation;

  const toTranslation = isParticipater ? "도전 계속하기" : "작업 도전하기";

  return (
    <div className={styles.accepted}>
      <div className={styles.challenge}>
        <div className={styles.header}>
          <div>상태 플랜카드</div>
          <div className={styles.title}>{data.title} </div>
          <div className={styles.tags}>
            <div className={styles.category}>{data.category} </div>
            <div className={styles.type}>{data.type} </div>
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
          <CustomBtnLong text={toTranslation} size={"small"} valid={isValid} />
        </div>
      </div>
    </div>
  );
}
