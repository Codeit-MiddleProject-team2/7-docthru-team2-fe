// 진행 중인 챌린지 (즉, accepted 됨)일 때 챌린지 영역입니다

import Image from "next/image";
import CustomBtnLong from "../CustomBtnLong";
import styles from "./ChallengeAcceptedSection.module.css";
import { formatDateDeadline } from "@/utils/formatDate";

export default function ChallengeAcceptedSection({ data }) {
  const isFull = data.maximum > data._count.translation;
  const toTranslation = "작업 도전하기";

  return (
    <div>
      <div>
        <div>상태 플랜카드</div>
        <div>{data.title} </div>
        <div>{data.category} </div>
        <div>{data.type} </div>
        <div>{data.description} </div>
        <Image src={data.user.img} width={24} height={24} alt="유저 프로필" />
        <div>{data.user.nickname} </div>
      </div>
      <div className={styles.translation}>
        <div>
          <div>
            <Image
              src={"/icons/ic_deadline.svg"}
              width={24}
              height={24}
              alt="마감 날짜"
            />
            {formatDateDeadline(data.dueDate)}
          </div>
          <div>
            <Image
              src={"/icons/ic_challenger.svg"}
              width={24}
              height={24}
              alt="참여 인원"
            />
            {`${data._count.translation}/${data.maximum}`}
          </div>
        </div>
        <CustomBtnLong
          text="원문 보기"
          onClick={() => {
            window.open("https://www.prisma.io/docs/orm");
          }}
          color="yellow"
          size="small"
          valid={true}
        />
        <CustomBtnLong text={toTranslation} size={"small"} valid={isFull} />
      </div>
    </div>
  );
}
