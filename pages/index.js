import Image from "next/image";
import styles from "@/styles/Home.module.css";
import CustomBtnMini from "@/components/CustomBtnMini";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.background}>
      <div className={styles.top}>
        <div className={styles.docthruLogo}>
          <Image
            src="/icons/docthru.svg"
            width={20}
            height={22}
            alt="독스루 로고 아이콘"
          />
          <div className={styles.docthru}>Docthru</div>
        </div>
        <div className={styles.topTitle}>
          함께 번역하며 성장하는
          <br />
          개발자의 새로운 영어 습관
        </div>
        <CustomBtnMini
          text="번역 시작하기"
          color="white"
          className={styles.translationBtn}
          onClick={() => {
            router.push("/login");
          }}
        />
      </div>
      <div className={styles.home}>
        <div className={styles.section}>
          <div className={styles.content}>
            <Image
              className={styles.icon}
              src="/icons/ic_ranking_cup.svg"
              width={24}
              height={24}
              alt="섹션 아이콘"
            />
            <div className={styles.title}>
              혼자서는 막막했던 번역,
              <br /> 챌린지로 함께 완성하기
            </div>
            <div className={styles.text}>
              중요한 건 꺾이지 않는 마음! 동료들과 함께
              <br /> 기술 문서를 번역해 보세요.
            </div>
          </div>
          <Image
            src="/images/landing_img1.png"
            width={570}
            height={411}
            alt="섹션 이미지"
          />
        </div>
        <div className={styles.line}></div>
        <div className={styles.section}>
          <div className={styles.content}>
            <Image
              className={styles.icon}
              src="/icons/ic_chatting.svg"
              width={24}
              height={24}
              alt="섹션 아이콘"
            />
            <div className={styles.title}>
              내가 좋아하는 기술 번역,
              <br /> 내가 필요한 기술 번역
            </div>
            <div className={styles.text}>
              이미 진행 중인 번역 챌린지에 참여하거나,
              <br /> 새로운 번역 챌린지를 시작해 보세요.
            </div>
          </div>
          <Image
            src="/images/landing_img2.png"
            width={570}
            height={411}
            alt="섹션 이미지"
            priority={true}
          />
        </div>
        <div className={styles.line}></div>
        <div className={styles.section}>
          <div className={styles.content}>
            <Image
              className={styles.icon}
              src="/icons/ic_heart.svg"
              width={24}
              height={24}
              alt="섹션 아이콘"
            />
            <div className={styles.title}>피드백으로 함께 성장하기</div>
            <div className={styles.text}>
              번역 작업물에 대해 피드백을 주고 받으며
              <br /> 영어 실력은 물론, 개발 실력까지 키워 보세요
            </div>
          </div>
          <Image
            src="/images/landing_img3.png"
            width={570}
            height={411}
            alt="섹션 이미지"
          />
        </div>

        <div className={styles.lastMent}>
          <div>함께 번역하고 성장하세요!</div>
          <CustomBtnMini
            text="번역 시작하기"
            color="black"
            className={styles.translationBlackBtn}
            onClick={() => {
              router.push("/login");
            }}
          />
        </div>
      </div>
    </div>
  );
}
