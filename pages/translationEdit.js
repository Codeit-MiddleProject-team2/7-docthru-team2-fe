'use client';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle, Color } from '@tiptap/extension-text-style'
import { useState } from 'react';

// 작업 메모
// 색상 팔레트 형태에서 색상 클릭 시 적용 가능한 버튼 형태로 바꿈 
// 편집 에디터 툴바를 컴포먼트로 뗴서 따로 분리하는 게 좋아보임. 
// 색상 역시 클릭하면 나오는 모달형태로 바꿔서 컬러 팔레트 모달 컴포먼트를 추가하는 방향으로 개선해보는 걸로 구상
// 리스트< 아직 안 됨............. 
// 색상<클릭하면 오류 남 (왜)
// 네이밍 메모
// temporaryStorage : 임시저장 
// temporaryStorageList : 임시저장글 
// originSidebar : 원문 사이드 바
// 툴바 컴포먼트 이름은 텍스트에디터툴바
// 하단 에디터 기능 간략 마크업 구성 


const COLORS = [
  '#000000', // 기본 검정
  '#6C757D', // 회색
  '#E57373', // 빨강 
  '#81C784', // 초록 
  '#64B5F6', // 파랑 
  '#FFB74D', // 주황 톤 노랑
  '#9575CD', // 보라 
];

function TranslationEditPage() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Color,
      TextStyle,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '<p>번역 내용을 적어주세요</p>',
    immediatelyRender: false,
  });
/* 인풋 형태로 바꾸거나 해야할 듯, '텍스트를 입력하세요' 클릭 시 해당 글자가 지워지며 안 떠야함. 
현재는 단순히 작성과 편집만 가능하게 되어있어서 해당 글자도 지울 수 있는 상태 (수정 예정) */
  const [selectedColor, setSelectedColor] = useState('#000000');

  if (!editor) return null;

  return (
    <div>
      {/* 툴바 <역시 따로 분리해서 컴포먼트로 나눌 예정 */}
      <div>
        {/* 텍스트 스타일 버튼 */}
        <button onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'font-bold text-black' : ''}>
          B
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'italic text-black' : ''}>
          I
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}
                className={editor.isActive('underline') ? 'underline text-black' : ''}>
          U
        </button>

        {/* 정렬 */}
        <button onClick={() => editor.chain().focus().setTextAlign('left').run()}>좌</button>
        <button onClick={() => editor.chain().focus().setTextAlign('center').run()}>중</button>
        <button onClick={() => editor.chain().focus().setTextAlign('right').run()}>우</button>

        {/* 리스트 */}
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>123</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>•목록</button>

        {/* 색상 버튼 팔레트 */}
        {/* 컬러 파레트 부분 따로 모달로 분리해서 
        페인트 아이콘 클릭 시 나타나도록 컴포먼트 분리 예정  */}
        <div>
          {COLORS.map((color) => (
            <button
              key={color}
              onClick={() => {
                setSelectedColor(color);
                editor.chain().focus().setColor(color).run();
              }}
              style={{
                backgroundColor: color,
                width: '24px',
                height: '24px',
                border: selectedColor === color ? '2px solid #333' : '1px solid #ccc',
              }}
            />
          ))}
        </div>
      </div>
                      
      {/* 에디터 */}
      <EditorContent editor={editor} className="min-h-[150px] border p-2 rounded" />
    </div>
  );
}

TranslationEditPage.useLayout = false;

export default TranslationEditPage;