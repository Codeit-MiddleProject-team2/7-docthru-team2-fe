
'use client';
/* 팁탭 라이브러리를 인스톨하여 필요한 명령어와 함수를 공식문서에서 참조해 작성하였습니다. 
@tiptap/extension이 붙은 임포트문은 팁탭의 명령어 임포트입니다. 
공식문서의 extension 목록을 확인해보면 됩니다. 
필요한 기능을 인스톨해서 임포트 후 사용하는 방식이기 때문에 만일 해당 부분을 수정하거나 제가 미처 확인하지 못한 오류가 있다면
해당 문서를 참조하여 작성해야 합니다. 

해당 컴포넌트는 Tiptap 기반의 텍스트 에디터 도구입니다. 글 작성/편집 기능을 제공합니다.
- @tiptap/react : Tiptap의 React 훅(`useEditor`)과 렌더링 컴포넌트(`EditorContent`) 제공
- @tiptap/starter-kit : 기본 편집 기능(굵게, 기울임, 제목, 리스트 등)
- @tiptap/extension-* : 기능 확장을 위한 모듈
- underline : 밑줄
- text-style : 텍스트 스타일 속성 지원(텍스트 색상 변경 등)
- text-align : 문단 정렬(좌,중,우) 
- 새로운 편집 기능 추가 시 공식문서의 Extensions 목록 확인 후 설치 및 인스톨, 임포트가 필요합니다.  
- 기존 extension 수정/삭제 시 타 컴포먼트(툴바)에서도 기능 버튼이 정상 작동하는지 확인 필요
- `content`는 기본 문구로 설정되어 있으며, 외부 데이터 연동 시 초기값을 변경하면 됩니다.
- `immediatelyRender: false` 옵션은 초기 렌더링 시점 지연을 방지하기 위해 추가되어있습니다. 
해당 줄을 지울 시 렌더링이 되지 않으니 주의해주세요

리스트 시 - 이나 글머리 기호 등이 되지 않는 현상을 늦었지만 확인했습니다.
위 경우 css 작성을 하지 않아 나타나는 오류로 css 적용을 해야 공백이나 목록기호가 정상적으로 작동합니다.

공식 문서 참조:https://tiptap.dev/docs/editor/extensions/  */


import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color'
import { TextStyle } from '@tiptap/extension-text-style'
import ToolBar from './toolBar';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
import { BulletList, ListItem, OrderedList } from '@tiptap/extension-list'
import styles from './EditorTool.module.css';



function EditorTool() {
  const editor = useEditor({
    extensions: [
    StarterKit,
      Document,
      Text,
      Underline,
      BulletList,
      ListItem,
      OrderedList,
      TextStyle,
       Color,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: '<p> 내용을 입력하세요 </p>',
    editorProps: {
    }, immediatelyRender: false, 
  });

  if (!editor) {
    return null;
  }

  return (
    <div>
       <ToolBar editor={editor} />
      <EditorContent editor={editor} className={styles.editorContent} />
    </div>
  );
}

export default EditorTool;