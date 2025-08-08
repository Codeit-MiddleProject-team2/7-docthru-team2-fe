import dynamic from 'next/dynamic';
const EditorTool = dynamic(() => import('@/components/translationEdit/textEditor/EditorTool'), {
  ssr: false, 
});

function TranslationEditPage() {
  return (
    <>
      <div>
      <EditorTool/>
    </div>
    
    </>
  );
}

TranslationEditPage.useLayout = false;

export default TranslationEditPage;