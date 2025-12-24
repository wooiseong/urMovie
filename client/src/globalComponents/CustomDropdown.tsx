import {
  Box,
  Chip,
  SxProps,
  TextField,
  Theme,
  Typography,
  IconButton,
  Popover,
  InputBase,
} from "@mui/material";
import { deepmerge } from "@mui/utils";
import React, { useState } from "react";
import TagDropdownMenu from "./TagDropDownMenu";
import CloseIcon from "@mui/icons-material/Close";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { formTag } from "src/features/home/pages/EditJournalPage";

interface CustomDropdownProps {
  readonly?: boolean;
  label?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  fullWidth?: boolean;
  sx?: SxProps<Theme>;
  tagList: formTag[];
  onTagChange: (tags: formTag[]) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
  readonly,
  label,
  icon,
  placeholder,
  fullWidth = false,
  tagList,
  onTagChange,
  sx = {},
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (
    e: React.MouseEvent<HTMLElement> | React.FocusEvent<HTMLElement>
  ) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const handleRemoveTag = (tagName: string) => {
    onTagChange(
      tagList.map((t) => (t.name === tagName ? { ...t, selected: false } : t))
    );
  };

  const selectedTags = tagList.filter((t) => t.selected);

  const mergedSx = deepmerge(
    {
      backgroundColor: "background.paper",
      borderRadius: "8px",
      color: "text.primary",
      minHeight: 48,
      px: 1,
      py: 0.5,
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: 0.5,
      cursor: "text",
      "&:hover": { backgroundColor: "background.default" },
    },
    sx
  );

  return (
    <Box>
      {(label || icon) && (
        <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
          {icon}
          {label && <Typography sx={{ ml: 1 }}>{label}</Typography>}
        </Box>
      )}

      <Box sx={mergedSx} onClick={handleOpen}>
        {/* ✅ Chips直接在輸入框內 */}
        {selectedTags.map((tag) => (
          <Chip
            key={tag.name}
            label={tag.name}
            onDelete={() => handleRemoveTag(tag.name)}
            deleteIcon={<CloseIcon sx={{ color: "text.primary" }} />}
            sx={{
              backgroundColor: "background.default",
              color: "text.primary",
              height: 26,
              "& .MuiChip-deleteIcon": { color: "text.primary" },
            }}
          />
        ))}

        {/* ✅ placeholder 在沒有選中 tag 時顯示 */}
        {selectedTags.length === 0 && (
          <Typography sx={{ color: "text.secondary", fontSize: 14 }}>
            {placeholder}
          </Typography>
        )}

        {/* 隱藏 input 用於聚焦位置與開啟下拉 */}
        <InputBase
          sx={{ flex: 1, color: "transparent", cursor: "inherit" }}
          inputProps={{ readOnly: true }}
        />
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{ sx: { p: 0 } }}
      >
        <TagDropdownMenu
          readonly={readonly}
          tags={tagList}
          onChange={onTagChange}
          onClose={handleClose}
        />
      </Popover>
    </Box>
  );
};

export default CustomDropdown;
