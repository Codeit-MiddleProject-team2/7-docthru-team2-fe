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
  getTranslationByIdAuth,
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
  const router = useRouter();
  const { translationId } = router.query;

  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
  };

  useEffect(() => {
    if (!translationId) return;

    const fetchInitialData = async () => {
      setIsLoading(true);
      try {
        const data = await getTranslationByIdAuth(translationId);
        console.log(data);

        setContent(data.content);
      } catch (error) {
        console.error("데이터 로딩 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchInitialData();
    // 해당 3줄 참고
  }, [translationId]);

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className={styles.translationEditLayout}>
      <div className={styles.editorArea}>
        <textarea value={content} onChange={handleContentChange} />
      </div>
    </div>
  );
}

TranslationEditPage.useLayout = false;

export default TranslationEditPage;
