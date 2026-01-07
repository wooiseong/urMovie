import {
  Box,
  IconButton,
  TextField,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import CustomTextField from "src/globalComponents/CustomTextfield";
import { useState } from "react";
import ColorPickerPopover from "./ColorPickerPopover";
import { Quote } from "../pages/EditJournalPage";
import { useTranslation } from "react-i18next";

interface QuoteItemProps {
  quote: Quote;
  onUpdate?: (updatedQuote: Partial<Quote>) => void;
  onDelete?: () => void;
  readOnly?: boolean;
}

const QuoteItem: React.FC<QuoteItemProps> = ({
  quote,
  onUpdate,
  onDelete,
  readOnly,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { t } = useTranslation();
  const theme = useTheme();

  // Default background color that's visible in both light and dark modes
  const defaultBgColor = theme.palette.mode === "dark" ? "#606060" : "#e0e0e0";
  const defaultTextColor =
    theme.palette.mode === "dark" ? "#FFFFFF" : "#000000";

  const backgroundColor = quote.backgroundColor ?? defaultBgColor;
  const textColor = quote.textColor ?? defaultTextColor;
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  return (
    <Box
      sx={{
        backgroundColor: backgroundColor,
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
      {!readOnly && (
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
          <Tooltip title={t("home.changeColor")}>
            <IconButton
              onClick={handleOpen}
              sx={{ "& svg": { cursor: "pointer" } }}
            >
              <ColorLensIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={t("home.deleteQuote")}>
            <IconButton
              sx={{ "& svg": { cursor: "pointer" } }}
              onClick={onDelete}
            >
              <CancelIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {/* Middle text input */}
      {readOnly ? (
        <Typography
          sx={{
            whiteSpace: "pre-line",
            color: textColor,
            fontSize: "16px",
            mt: 1,
            ml: 1,
          }}
        >
          {quote.content}
        </Typography>
      ) : (
        <CustomTextField
          placeholder={t("home.writeSomething")}
          sx={{
            flexGrow: 1,
            mt: 1,
            "& .MuiInputBase-input": { color: textColor },
          }}
          fullWidth
          multiline
          minRows={2}
          value={quote.content ?? ""}
          onChange={(e) => onUpdate?.({ content: e.target.value })}
        />
      )}

      {/* Bottom movie input */}
      {readOnly ? (
        <Typography
          sx={{
            position: "absolute",
            bottom: 8,
            right: 12,
            fontSize: "14px",
            opacity: 0.9,
            color: textColor,
          }}
        >
          {quote.name}
        </Typography>
      ) : (
        <Box sx={{ position: "absolute", bottom: 0, right: 0 }}>
          <CustomTextField
            placeholder={t("home.movieTitle")}
            sx={{
              input: {
                textAlign: "right",
                marginRight: "8px",
              },
              "& .MuiInputBase-input": { color: textColor },
            }}
            value={quote.name ?? ""}
            onChange={(e) => onUpdate?.({ name: e.target.value })}
          />
        </Box>
      )}

      {!readOnly && (
        <ColorPickerPopover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          backgroundColor={backgroundColor}
          textColor={textColor}
          onColorChange={(bg, text) => {
            onUpdate?.({ backgroundColor: bg, textColor: text });
          }}
        />
      )}
    </Box>
  );
};

export default QuoteItem;
