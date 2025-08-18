import Image from "next/image";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import styles from "@/styles/translationEdit.module.css";
import Header from "../components/translationEdit/TranslationEditHeader";
import OriginSidebar from "@/components/translationEdit/originSidebar";

const TinymceEditor = dynamic(
  () => import("../components/translationEdit/Editor/TinymceEditor"),
  {
    ssr: false, // 이 컴포넌트를 서버에서 렌더링하지 않도록 설정
  }
);
function TranslationEditPage() {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const handleOpenSidebar = () => {
    setIsOpenSidebar(true);
  };

  const [content, setContent] = useState("");

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };
  return (
    <div className={styles.translationEditLayout}>
      <div className={styles.leftArea}>
        <form>
          <Header />
          <div className={styles.editorArea}>
            <TinymceEditor
              initialValue="초기값"
              onEditorChange={handleEditorChange}
            />
          </div>
        </form>
      </div>
      {isOpenSidebar ? (
        <OriginSidebar
          isOpen={isOpenSidebar}
          setIsOpenSidebar={setIsOpenSidebar}
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
    </div>
  );
}

TranslationEditPage.useLayout = false;

export default TranslationEditPage;
