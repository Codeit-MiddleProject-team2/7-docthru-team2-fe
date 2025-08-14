import { useState } from 'react';
import dynamic from 'next/dynamic';
import Header from "../components/translationEdit/header";
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
    <div><Header/></div>
<div style={{ paddingTop: '60px' }}>
  <EditorTool />
</div>
    
     <div>
        {/* 구조화 시 컴포먼트끼리 서로를 가려 임시로 간단한 css 적용 */}
        <button onClick={openOriginSidebar}
        style={{
          position: 'fixed',   
          top: '80px',         
          right: '0px',     
          zIndex: 2000,        
          background: '#fff',  
          padding: '8px 12px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer'
      }}>
          원문 보기
        </button>
      </div>
     <OriginSidebar isOpen={isOriginSidebarOpen} onClose={closeOriginSidebar} />
    </>
  );
}

TranslationEditPage.useLayout = false;

export default TranslationEditPage;