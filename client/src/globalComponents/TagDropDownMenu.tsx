import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Tooltip,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import React, { useState } from "react";
import { TagItem } from "src/features/home/pages/EditJournalPage";

interface TagDropdownMenuProps {
  tags: TagItem[];
  onChange: (tags: TagItem[]) => void;
  onClose: () => void;
}

const TagDropdownMenu: React.FC<TagDropdownMenuProps> = ({
  tags,
  onChange,
  onClose,
}) => {
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    const name = newTag.trim();
    if (!name) return;
    const exists = tags.some((t) => t.name === name);
    if (!exists) {
      onChange([...tags, { name, selected: false }]);
      setNewTag("");
    } else {
      // 如果已存在則把它設為 selected
      onChange(
        tags.map((t) => (t.name === name ? { ...t, selected: true } : t))
      );
      setNewTag("");
    }
  };

  const handleDelete = (name: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    onChange(tags.filter((t) => t.name !== name));
  };

  const handleToggle = (name: string) => {
    onChange(
      tags.map((t) => (t.name === name ? { ...t, selected: !t.selected } : t))
    );
  };

  return (
    <Box sx={{ p: 2, width: 300 }}>
      <Typography sx={{ fontWeight: 600, mb: 1 }}>標籤管理</Typography>

      <Box display="flex" alignItems="center" gap={1} sx={{ mb: 1 }}>
        <TextField
          size="small"
          placeholder="新增標籤..."
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddTag();
            }
          }}
          sx={{ flex: 1 }}
        />
        <Tooltip title="新增">
          <IconButton onClick={handleAddTag} size="small">
            <AddCircleIcon color="primary" />
          </IconButton>
        </Tooltip>
      </Box>

      <List dense sx={{ maxHeight: 240, overflow: "auto", p: 0 }}>
        {tags.map((tag) => (
          <ListItem
            key={tag.name}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              bgcolor: tag.selected ? "#1976d2" : "transparent",
              color: tag.selected ? "#fff" : "inherit",
              borderRadius: 1,
              mb: 0.5,
              px: 1,
              py: 0.5,
              cursor: "pointer",
              "&:hover": { bgcolor: tag.selected ? "#1565c0" : "#f5f5f5" },
            }}
            onClick={() => handleToggle(tag.name)}
          >
            <ListItemText primary={tag.name} />
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {tag.selected && <CheckCircleIcon sx={{ color: "#fff" }} />}
              {/* 刪除按鈕：真正刪除 tag（停止冒泡，避免觸發 toggle） */}
              <IconButton
                edge="end"
                aria-label="delete"
                size="small"
                onClick={(e) => handleDelete(tag.name, e)}
                sx={{ color: tag.selected ? "#fff" : "#888" }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TagDropdownMenu;
