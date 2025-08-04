import Image from "next/image";
import Link from "next/link";
import styles from "./card.module.css";
import iconChallenger from "../../public/icons/ic_challenger.svg";
import iconDeadline from "../../public/icons/ic_deadline.svg";
import iconFilled from "../../public/icons/ic_filled.svg";
import iconArrowRight from "../../public/icons/ic_arrow_right.svg";
import BtnOptions from "./btnOptions.js";

export default function ChallengeCard() {
  return (
    <>
      <div className={styles.item}>
        <div className={styles.itemTopArea}>
          <div className={``}>
            <span className={`${styles.chip} ${styles.cardStatus}`}>
              <Image src={iconFilled} width={16} height={16} />
              모집이 완료된 상태에요
            </span>
            <p className={styles.title}>
              <a href="#">개발자로써 자신만의 브랜드를 구축하는 방법</a>
            </p>
            <BtnOptions />
          </div>

          <div className={styles.docTypeInfo}>
            <span className={`${styles.chip} ${styles.type}`}>Next.js</span>
            <span className={`${styles.chip} ${styles.category}`}>
              공식문서
            </span>
          </div>
        </div>
        <div className={styles.itemBottomArea}>
          <div className={styles.challengeInfo}>
            <p>
              <Image src={iconDeadline} width={24} height={24} />
              2025년 07월 31일 마감
            </p>
            <p>
              <Image src={iconChallenger} width={24} height={24} />
              5/5 참여 완료
            </p>
          </div>
          <div>
            <Link href="#" className={``}>
              도전 계속하기{" "}
              <Image src={iconArrowRight} width={24} height={24} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
