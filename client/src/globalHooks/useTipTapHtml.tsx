import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Color from "@tiptap/extension-color";
import { useMemo } from "react";
import { TextStyle } from "@tiptap/extension-text-style";

export const useTiptapHtml = (content: any, editable = false) => {
  const editor = useEditor({
    content,
    editable,
    extensions: [StarterKit, TextStyle, Color],
  });

  const html = useMemo(() => {
    if (!editor) return null;
    // 返回 EditorContent 讓 React 可以渲染
    return <EditorContent editor={editor} />;
  }, [editor]);

  return html;
};
