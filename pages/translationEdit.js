import { useState } from 'react';
import dynamic from 'next/dynamic';
import Sidebar from '../components/translationEdit/originSidebar'
const EditorTool = dynamic(() => import('@/components/translationEdit/textEditor/EditorTool'), {
  ssr: false, 
});

function TranslationEditPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const openSidebar = () => {
    setIsSidebarOpen(true);
  }
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
  return (
    <>
     <div>
        {/* 사이드바를 여는 버튼 */}
        <button onClick={openSidebar}>
          원문 보기
        </button>
        <EditorTool/>
      </div>
     <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </>
  );
}

TranslationEditPage.useLayout = false;

export default TranslationEditPage;