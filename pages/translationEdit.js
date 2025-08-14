import { useState } from 'react';
import dynamic from 'next/dynamic';
import OriginSidebar from '../components/translationEdit/originSidebar'
const EditorTool = dynamic(() => import('@/components/translationEdit/textEditor/EditorTool'), {
  ssr: false, 
});

/* 사이드바를 열고 닫는 함수를 변수에 저장*/
function TranslationEditPage() {
  const [isOriginSidebarOpen, setIsOriginSidebarOpen] = useState(false);
  const openOriginSidebar = () => {
    setIsOriginSidebarOpen(true);
  }
  const closeOriginSidebar = () => {
    setIsOriginSidebarOpen(false);
  };
  return (
    <>
     <div>
        {/* 사이드바를 여는 버튼에 함수를 통해 사이드바를 열고 닫을 수 있도록 함 */}
        <button onClick={openOriginSidebar}>
          원문 보기
        </button>
        {/* 에디터툴 임포트(이미 만들어진 툴바 컴포먼트) */}
        <EditorTool/>
      </div>
     <OriginSidebar isOpen={isOriginSidebarOpen} onClose={closeOriginSidebar} />
    </>
  );
}

TranslationEditPage.useLayout = false;

export default TranslationEditPage;