import Image from "next/image";
import Link from "next/link";
import styles from "./card.module.css";
import iconChallenger from "../../public/icons/ic_challenger.svg";
import iconDeadline from "../../public/icons/ic_deadline.svg";
import iconFilled from "../../public/icons/ic_filled.svg";
import iconArrowRight from "../../public/icons/ic_arrow_right.svg";
import BtnOptions from "./btnOptions.js";
import { formatDateDeadline } from "@/utils/formatDate";

// title에 href="#" 용도가 뭔가요

export default function ChallengeCard({ data, type = "default" }) {
  return (
    <>
      <div className={styles.item}>
        <div className={styles.itemTopArea}>
          <div className={``}>
            {type !== "detail" && (
              <span className={`${styles.chip} ${styles.cardStatus}`}>
                <Image
                  src={iconFilled}
                  width={16}
                  height={16}
                  alt="모집 완료"
                />
                모집이 완료된 상태에요
              </span>
            )}
            <p className={styles.title}>
              <a href="#">{data.title}</a>
            </p>
            <BtnOptions />
          </div>

          <div className={styles.docTypeInfo}>
            <span className={`${styles.chip} ${styles.type}`}>
              {data.category}
            </span>
            <span className={`${styles.chip} ${styles.category}`}>
              {data.type}
            </span>
          </div>
        </div>
        <div className={styles.itemBottomArea}>
          <div className={styles.challengeInfo}>
            <p>
              <Image
                src={iconDeadline}
                width={24}
                height={24}
                alt="마감 기한"
              />
              {formatDateDeadline(data.dueDate)}
            </p>
            <p>
              <Image
                src={iconChallenger}
                width={24}
                height={24}
                alt="인원 수"
              />
              {data.maximum}
            </p>
          </div>
          {type !== "detail" && (
            <div>
              <Link href="#" className={``}>
                도전 계속하기{" "}
                <Image
                  src={iconArrowRight}
                  width={24}
                  height={24}
                  alt="도전 계속하기"
                />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
