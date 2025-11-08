import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Color from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";

import {
  Tooltip,
  IconButton,
  Box,
  Select,
  MenuItem,
  Autocomplete,
  TextField,
} from "@mui/material";

import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import StrikethroughSIcon from "@mui/icons-material/StrikethroughS";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import Looks3Icon from "@mui/icons-material/Looks3";
import { FontSize, TextStyle } from "@tiptap/extension-text-style";
import CustomTextField from "src/globalComponents/CustomTextfield";

const JournalContentEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Placeholder.configure({ placeholder: "寫下你的影評、心得..." }),
      Image,
      Highlight,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      FontSize.configure({ types: ["textStyle"] }),
    ],
    content: "",
  });

  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("貼上圖片網址");
    if (url) editor.chain().focus().setImage({ src: url }).run();
  };

  const fontSizes = [12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 48];

  return (
    <Box>
      <CustomTextField
        placeholder={"文章題目"}
        sx={{
          mt: "30px",
          mb: "10px",
          width: "30%",
          input: { fontSize: "1.3rem" },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#404040",
          },
        }}
      />
      <Box
        sx={{
          background: "#404040",
          padding: "12px",
          borderRadius: "8px",
        }}
      >
        {/* Toolbar */}
        <Box
          sx={{
            marginBottom: "10px",
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {/* Headings */}
          <Tooltip title="H1">
            <IconButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 1 }).run()
              }
              color={
                editor.isActive("heading", { level: 1 }) ? "primary" : "default"
              }
            >
              <LooksOneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="H2">
            <IconButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              color={
                editor.isActive("heading", { level: 2 }) ? "primary" : "default"
              }
            >
              <LooksTwoIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="H3">
            <IconButton
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 3 }).run()
              }
              color={
                editor.isActive("heading", { level: 3 }) ? "primary" : "default"
              }
            >
              <Looks3Icon />
            </IconButton>
          </Tooltip>
          {/* Font Size */}

          <Autocomplete
            freeSolo
            options={fontSizes.map((size) => size.toString())}
            value={
              editor?.getAttributes("textStyle").fontSize
                ? (
                    editor.getAttributes("textStyle").fontSize as string
                  ).replace("px", "")
                : "16"
            }
            onInputChange={(_, value) => {
              const fontSize = value.endsWith("px") ? value : value + "px";
              editor?.commands.setMark("textStyle", { fontSize }); // 不 focus editor
            }}
            openOnFocus
            disablePortal
            onClick={(e) => {
              e.stopPropagation();
              // 點擊 input 無論有值沒值都打開下拉
              const input = e.currentTarget.querySelector("input");
              if (input) input.focus();
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                variant="outlined"
                sx={{ width: 80 }}
                onClick={(e) => e.stopPropagation()} // 避免冒泡搶焦
              />
            )}
          />

          {/* Marks */}
          <Tooltip title="粗體">
            <IconButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              color={editor.isActive("bold") ? "primary" : "default"}
            >
              <FormatBoldIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="斜體">
            <IconButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              color={editor.isActive("italic") ? "primary" : "default"}
            >
              <FormatItalicIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="刪除線">
            <IconButton
              onClick={() => editor.chain().focus().toggleStrike().run()}
              color={editor.isActive("strike") ? "primary" : "default"}
            >
              <StrikethroughSIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="清除格式">
            <IconButton
              onClick={() =>
                editor.chain().focus().unsetAllMarks().clearNodes().run()
              }
            >
              <ClearAllIcon />
            </IconButton>
          </Tooltip>

          {/* Alignment */}
          <Tooltip title="左對齊">
            <IconButton
              onClick={() => editor.chain().focus().setTextAlign("left").run()}
              color={
                editor.isActive({ textAlign: "left" }) ? "primary" : "default"
              }
            >
              <FormatAlignLeftIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="置中">
            <IconButton
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              color={
                editor.isActive({ textAlign: "center" }) ? "primary" : "default"
              }
            >
              <FormatAlignCenterIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="右對齊">
            <IconButton
              onClick={() => editor.chain().focus().setTextAlign("right").run()}
              color={
                editor.isActive({ textAlign: "right" }) ? "primary" : "default"
              }
            >
              <FormatAlignRightIcon />
            </IconButton>
          </Tooltip>

          {/* Lists / Block */}
          <Tooltip title="項目符號">
            <IconButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              color={editor.isActive("bulletList") ? "primary" : "default"}
            >
              <FormatListBulletedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="編號列表">
            <IconButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              color={editor.isActive("orderedList") ? "primary" : "default"}
            >
              <FormatListNumberedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="引用">
            <IconButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              color={editor.isActive("blockquote") ? "primary" : "default"}
            >
              <FormatQuoteIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Editor */}
        <EditorContent
          editor={editor}
          // data-placeholder="寫下你的影評、心得..."
          style={{
            background: "#1e1e1e",
            minHeight: "200px",
            padding: "10px 30px",
            borderRadius: "6px",
            color: "white",
            border: "none",
          }}
        />

        {/* 自定義引用樣式 */}
        <style>
          {`
            /* Remove white focus border */
            .ProseMirror:focus {
              outline: none;
              border: none;
            }

            /* placeholder style */
            .ProseMirror p.is-editor-empty:first-child::before {
              color: #aaa; /* 淺灰色，Tailwind gray-400 */
              content: attr(data-placeholder);
              float: left;
              pointer-events: none;
              height: 0;
            }
          `}
        </style>
      </Box>
    </Box>
  );
};

export default JournalContentEditor;
