import Image from "next/image";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/translationEdit.module.css";
import Header from "../../components/translationEdit/TranslationEditHeader";
import OriginSidebar from "@/components/translationEdit/originSidebar";
import { useRouter } from "next/router";
import {
  creatOrUpdateTranslation,
  getTranslationByChallengeId,
} from "@/api/translation";
import { userSetting } from "@/lib/useAuth";

const TinymceEditor = dynamic(
  () => import("../../components/translationEdit/Editor/TinymceEditor"),
  {
    ssr: false, // 이 컴포넌트를 서버에서 렌더링하지 않도록 설정
  }
);
function TranslationEditPage() {
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(null);
  const [accessTk, setAccessTk] = useState("");

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const handleOpenSidebar = () => {
    setIsOpenSidebar(true);
  };
  const router = useRouter();
  const { challengeId } = router.query;
  const [content, setContent] = useState("");
  const [translationId, setTranslationId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showDraftToast, setShowDraftToast] = useState(false);
  const [draftContent, setDraftContent] = useState(null);
  const [challengeUrl, setChallengeUrl] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  const handleLoadDraft = () => {
    setContent(draftContent);
    setShowDraftToast(false);
  };

  const handleCancelLoad = () => {
    setShowDraftToast(false);
  };

  const handleSaveOrSubmit = async (isSubmitted) => {
    try {
      const dataToSave = {
        challengeId,
        userId,
        content,
        isSubmitted,
      };

      const response = await creatOrUpdateTranslation(
        dataToSave,
        translationId
      );

      // 새로 생성된 경우에만 ID를 상태에 저장
      if (!translationId) {
        setTranslationId(response.id);
      }

      alert(
        isSubmitted
          ? "작업물이 성공적으로 제출되었습니다."
          : "저장이 완료되었습니다!"
      );
      console.log("처리 결과:", response);
    } catch (error) {
      const action = isSubmitted ? "제출" : "임시 저장";
      alert(`${action} 실패: ${error.message}`);
      console.error(error);
    }
  };

  useEffect(() => {
    if (!challengeId) return;

    const fetchInitialData = async () => {
      try {
        const data = await getTranslationByChallengeId(challengeId);

        if (data) {
          setChallengeUrl(data.challenge.url);
          setIsSubmitted(data.isSubmitted);

          if (data.isSubmitted) {
            setContent(data.content);
            setTranslationId(data.id);
          } else {
            // 임시 저장 데이터
            setDraftContent(data.content);
            setTranslationId(data.id);
            setShowDraftToast(true);
          }
        }
      } catch (error) {
        console.error("데이터 로딩 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
    // 해당 3줄 참고
    const { user: userData, accessToken: accessTk } = userSetting();
    setUser(userData);
    setAccessTk(accessTk);
    setUserId(user.id);
  }, [challengeId]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={styles.translationEditLayout}>
      <div className={styles.leftArea}>
        <Header
          onSaveOrSubmit={handleSaveOrSubmit}
          submitText={translationId && isSubmitted ? "수정하기" : "제출하기"}
        />
        <div className={styles.editorArea}>
          <TinymceEditor
            initialValue={content}
            onEditorChange={handleEditorChange}
          />
        </div>
      </div>
      {isOpenSidebar ? (
        <OriginSidebar
          isOpen={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
          challengeUrl={challengeUrl}
        />
      ) : (
        <button onClick={handleOpenSidebar} className={styles.btnOpenSidebar}>
          <Image
            src={"/icons/ic_list.svg"}
            width={24}
            height={24}
            alt="아이콘"
          />
          원문
        </button>
      )}
      {showDraftToast && (
        <div className={styles.draftToast}>
          <div>임시 저장된 작업물이 있습니다. 불러오시겠어요?</div>
          <div className={styles.toastBtnArea}>
            <button onClick={handleLoadDraft}>불러오기</button>
            <button onClick={handleCancelLoad}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
}

TranslationEditPage.useLayout = false;

export default TranslationEditPage;
