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
  getDraftsByChallengeId,
  deleteTranslationsByChallengeId,
} from "@/api/translation";
import { userSetting } from "@/lib/useAuth";
import DraftModal from "@/components/modals/draftModal";

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

  const [isLoading, setIsLoading] = useState(true);
  const [content, setContent] = useState("");
  const [initialEditorContent, setInitialEditorContent] = useState("");
  const [translationId, setTranslationId] = useState(null);
  const [showDraftToast, setShowDraftToast] = useState(false);
  const [challengeUrl, setChallengeUrl] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // 임시저장 목록 + 모달
  const [draftList, setDraftList] = useState([]);
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  const handleLoadDrafts = async () => {
    try {
      const drafts = await getDraftsByChallengeId(challengeId);

      setDraftList(drafts);
      setShowDraftToast(false);
      setIsDraftModalOpen(true);
    } catch (error) {
      console.error("임시저장 목록 로딩 실패:", error);
      alert("임시저장 목록을 불러오지 못했습니다.");
    }
  };

  const handleSelectDraft = (draft) => {
    setInitialEditorContent(draft.content);
    setContent(draft.content);
    setTranslationId(draft.id);
    setIsDraftModalOpen(false);
  };

  const handleCancelLoad = () => {
    setShowDraftToast(false);
  };
  const handleCloseDraftModal = () => {
    setIsDraftModalOpen(false);
  };

  const handleSaveOrSubmit = async (isSubmitted) => {
    if (!content.trim()) {
      return;
    }
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
          : "임시저장이 완료되었습니다!"
      );
      console.log("처리 결과:", response);
    } catch (error) {
      const action = isSubmitted ? "제출" : "임시 저장";
      alert(`${action} 실패: ${error.message}`);
      console.error(error);
    }
  };

  const handleGiveUp = async () => {
    if (window.confirm("정말 포기하시겠습니까? 모든 작업물이 삭제됩니다.")) {
      try {
        await deleteTranslationsByChallengeId(challengeId);
        alert("모든 번역물이 삭제되었습니다.");
        router.push("/challenges");
      } catch (error) {
        alert(`포기하기 실패: ${error.message}`);
      }
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
            setInitialEditorContent(data.content);
            setTranslationId(data.id);
          } else {
            // 임시 저장 데이터 유무 확인
            //setDraftContent(data.content);
            //setTranslationId(data.id);
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
          onGiveUp={handleGiveUp}
          submitText={
            translationId
              ? isSubmitted
                ? "수정하기"
                : "수정/제출하기"
              : "제출하기"
          }
        />
        <div className={styles.editorArea}>
          <TinymceEditor
            initialValue={initialEditorContent}
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
            <button onClick={handleLoadDrafts}>불러오기</button>
            <button onClick={handleCancelLoad}>취소</button>
          </div>
        </div>
      )}
      {isDraftModalOpen && (
        <DraftModal
          drafts={draftList}
          onSelect={handleSelectDraft}
          onClose={handleCloseDraftModal}
        />
      )}
    </div>
  );
}

TranslationEditPage.useLayout = false;

export default TranslationEditPage;
