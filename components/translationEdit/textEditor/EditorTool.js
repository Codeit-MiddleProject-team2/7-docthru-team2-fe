
'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import {TextStyle} from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import ToolBar from './toolBar';

function EditorTool() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Color,
      TextStyle,
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
      <EditorContent editor={editor} />
    </div>
  );
}

export default EditorTool;