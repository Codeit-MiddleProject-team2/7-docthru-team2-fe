import Image from "next/image";
import Link from "next/link";
import styles from "./card.module.css";
import iconChallenger from "../../public/icons/ic_challenger.svg";
import iconDeadline from "../../public/icons/ic_deadline.svg";
import iconFilled from "../../public/icons/ic_filled.svg";
import iconArrowRight from "../../public/icons/ic_arrow_right.svg";
import BtnOptions from "./btnOptions.js";
import { formatDateDeadline } from "@/utils/formatDate";
import CustomBtnMini from "../CustomBtnMini";
import CheckModal from "../modals/checkModal";
import { useState } from "react";
import { Router, useRouter } from "next/router";

export default function ChallengeCard({ data, type = "default" }) {
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  // 챌린지 취소 핸들러 함수 수정: 환경변수 적용
  const handleCancelChallenge = async () => {
    try {
      await fetch(`${API_URL}/challenge/${data.id}/view`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ChallengeState: "DELETED",
          reason: "챌린지 개설을 취소하였습니다.",
        }),
      });
      setShowCancelModal(false);
      window.location.reload(); // 취소 후 페이지 자동 새로고침
    } catch (e) {
      console.error(e);
    }
  };
  // 챌린지 상태값을 challengeState로 선언
  const challengeState = data.challengeState;
  const [showCancelModal, setShowCancelModal] = useState(false);
  const handleCancelClick = () => {
    setShowCancelModal(true);
  };

  return (
    <>
      {showCancelModal && (
        <CheckModal
          onClose={() => setShowCancelModal(false)}
          onConfirm={handleCancelChallenge}
        />
      )}
      <div
        className={`${styles.item} ${
          type === "detail" ? styles.itemDetail : ""
        }`}
        onClick={() => {
          router.push(`/challenges/${data.id}`);
        }}
      >
        <div className={styles.itemTopArea}>
          <div className={``}>
            {/* ChallengeDetail.js 적용 */}
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
            {/* ChallengeDetail.js 적용 */}
            {(type !== "detail" ||
              (type === "detail" && challengeState === "PENDING")) && (
              <BtnOptions />
            )}
          </div>
          <div className={styles.docTypeInfoArea}>
            <div className={styles.docTypeInfo}>
              <span className={`${styles.chip} ${styles.type}`}>
                {data.category}
              </span>
              <span className={`${styles.chip} ${styles.category}`}>
                {data.type}
              </span>
            </div>
            {/* ChallengeDetail.js 적용 */}
            {type === "detail" && challengeState === "PENDING" && (
              <CustomBtnMini text="취소하기" onClick={handleCancelClick} />
            )}
          </div>
        </div>
        {/* ChallengeDetail.js 적용 */}
        {type === "detail" && data.description && (
          <div className={styles.description}>{data.description}</div>
        )}
        <div
          className={`${styles.itemBottomArea} ${
            type === "detail" ? styles.itemBtnAreaDetail : ""
          }`}
        >
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
          {/* ChallengeDetail.js 적용 제외 */}
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
