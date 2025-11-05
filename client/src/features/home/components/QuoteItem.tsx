import { Box, IconButton, TextField, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import CustomTextField from "src/globalComponents/CustomTextfield";
import { useState } from "react";
import ColorPickerPopover from "./ColorPickerPopover";

const QuoteItem = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  return (
    <Box
      sx={{
        backgroundColor: "#1e1e1e",
        borderRadius: "12px",
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        minHeight: "150px",
        position: "relative",
      }}
    >
      {/* Top icons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "end",
          position: "absolute",
          top: "2%",
          right: "2%",
          zIndex: 2,
        }}
      >
        <Tooltip title="更改顏色">
          <IconButton
            onClick={handleOpen}
            sx={{ "& svg": { cursor: "pointer" } }}
          >
            <ColorLensIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="更改內容">
          <IconButton sx={{ "& svg": { cursor: "pointer" } }}>
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="刪除臺詞">
          <IconButton sx={{ "& svg": { cursor: "pointer" } }}>
            <CancelIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Middle text input */}
      <CustomTextField
        placeholder="寫些什麽吧..."
        sx={{ flexGrow: 1, mt: 1 }}
        fullWidth
        multiline
        minRows={2}
      />

      {/* Bottom movie input */}
      <Box sx={{ position: "absolute", bottom: 0, right: 0 }}>
        <CustomTextField
          placeholder="電影名字"
          sx={{ input: { textAlign: "right", marginRight: "8px" } }}
        />
      </Box>

      <ColorPickerPopover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
      />
    </Box>
  );
};

export default QuoteItem;
