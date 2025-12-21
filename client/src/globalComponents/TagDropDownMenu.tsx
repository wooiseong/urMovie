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
import { formTag } from "src/features/home/pages/EditJournalPage";
import { useTranslation } from "react-i18next";

interface TagDropdownMenuProps {
  readonly?: boolean;
  tags: formTag[];
  onChange: (tags: formTag[]) => void;
  onClose: () => void;
}

const TagDropdownMenu: React.FC<TagDropdownMenuProps> = ({
  readonly,
  tags,
  onChange,
  onClose,
}) => {
  const [newTag, setNewTag] = useState("");
  const { t } = useTranslation();

  /** --------------------
   * 新增 Tag
   * -------------------- */
  const handleAddTag = () => {
    const name = newTag.trim();
    if (!name) return;

    const exists = tags.some((t) => t.name === name && !t.isDeleted);

    if (!exists) {
      onChange([
        ...tags,
        {
          id: crypto.randomUUID(),
          name,
          selected: false,
          isNew: true,
        },
      ]);
    } else {
      onChange(
        tags.map((t) =>
          t.name === name && !t.isDeleted
            ? {
                ...t,
                selected: true,
                isEdited: t.isNew ? false : true,
              }
            : t
        )
      );
    }

    setNewTag("");
  };

  /** --------------------
   * 設為刪除
   * -------------------- */
  const handleDelete = (name: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();

    onChange(
      tags
        .map((t) => {
          if (t.name !== name) return t;

          if (t.isNew) return null;

          return {
            ...t,
            isDeleted: true,
            selected: false,
          };
        })
        .filter((t): t is formTag => t !== null)
    );
  };

  /** --------------------
   * toggle / edit
   * -------------------- */
  const handleToggle = (name: string) => {
    onChange(
      tags.map((t) =>
        t.name === name && !t.isDeleted
          ? {
              ...t,
              selected: !t.selected,
              isEdited: t.isNew ? false : true,
            }
          : t
      )
    );
  };

  const visibleTags = tags.filter((t) => !t.isDeleted);

  return (
    <Box sx={{ p: 2, width: 300 }}>
      <Typography sx={{ fontWeight: 600, mb: 1 }}>{t("global.tag")}</Typography>

      {readonly ? null : (
        <Box display="flex" alignItems="center" gap={1} sx={{ mb: 1 }}>
          <TextField
            size="small"
            placeholder={t("global.addTagPlaceholder")}
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
          <Tooltip title={t("global.add")}>
            <IconButton onClick={handleAddTag} size="small">
              <AddCircleIcon color="primary" />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      <List dense sx={{ maxHeight: 240, overflow: "auto", p: 0 }}>
        {visibleTags.map((tag) => (
          <ListItem
            key={tag.id ?? tag.name}
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

              {readonly ? null : (
                <IconButton
                  edge="end"
                  aria-label={t("global.delete")}
                  size="small"
                  onClick={(e) => handleDelete(tag.name, e)}
                  sx={{ color: tag.selected ? "#fff" : "#888" }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TagDropdownMenu;
