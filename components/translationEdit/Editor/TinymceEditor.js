import React from "react";
import { Editor } from "@tinymce/tinymce-react";

const TinymceEditor = ({ initialValue, onEditorChange }) => {
  return (
    <Editor
      apiKey="b4ywfmcq9l9mge6ivya7ni3nmy4pp73gu36a5fmwe294vyd4"
      initialValue={initialValue}
      onEditorChange={onEditorChange}
      init={{
        plugins: "paste link image ",
        toolbar:
          " formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | link image ",
        menubar: false,
        skin: "oxide",
        content_css: "default",
        height: "calc(100vh - 166px)",
        style_formats: [
          { title: "헤딩 1", block: "h1" },
          { title: "헤딩 2", block: "h2" },
          { title: "헤딩 3", block: "h3" },
          { title: "헤딩 4", block: "h4" },
          { title: "헤딩 5", block: "h5" },
          { title: "본문", block: "p" },
        ],
      }}
    />
  );
};

export default TinymceEditor;
