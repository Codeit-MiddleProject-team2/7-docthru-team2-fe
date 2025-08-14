'use client';
import { useState } from 'react';
import TextPalette from './textPalette'; 

// 툴바 컴포넌트
function ToolBar({ editor }) {
  const [showPalette, setShowPalette] = useState(false);
  const togglePalette = () => setShowPalette((prev) => !prev);

  if (!editor) {
    return null;
  }

  return (
    <div style={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 10, padding: '8px', borderBottom: '1px solid #ccc' }}>
      <div style={{ display: 'flex', gap: '6px' }}>
        <button onClick={() => editor.chain().focus().toggleBold().run()}>B</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>I</button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>U</button>
        <button onClick={() => editor.chain().focus().setTextAlign('left').run()}>좌</button>
        <button onClick={() => editor.chain().focus().setTextAlign('center').run()}>중</button>
        <button onClick={() => editor.chain().focus().setTextAlign('right').run()}>우</button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>123</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}>•목록</button>
        <button onClick={togglePalette}>🎨</button>
            </div>
            {showPalette && <TextPalette editor={editor} onClose={() => setShowPalette(false)} />}
        </div>
    );
}

export default ToolBar;
