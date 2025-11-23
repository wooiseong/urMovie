import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import Color from "@tiptap/extension-color";
import { useMemo, useEffect } from "react";
import { TextStyle } from "@tiptap/extension-text-style";

export const useTiptapHtml = (content: any, editable = false) => {
  const editor = useEditor({
    content,
    editable,
    extensions: [StarterKit, TextStyle, Color],
  });

  // 🔥 當 content 改變時更新 editor 內容
  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [editor, content]);

  return editor ? <EditorContent editor={editor} /> : null;
};
