import { Typography, Box, Popover, Button, Grid } from "@mui/material";
import CustomActionButton from "src/globalComponents/CustomActionButton";
import BoltIcon from "@mui/icons-material/Bolt";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "src/store/hook";
import ColorPickerPlugin from "./ColorPickerPlugin";
type ColorPickerPopoverProps = {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  backgroundColor?: string;
  textColor?: string;
  onColorChange?: (bg?: string, text?: string) => void;
};

const ColorPickerPopover = ({
  open,
  anchorEl,
  onClose,
  backgroundColor,
  textColor,
  onColorChange,
}: ColorPickerPopoverProps) => {
  const colors = [
    "#F87171",
    "#FBBF24",
    "#34D399",
    "#60A5FA",
    "#A78BFA",
    "#F472B6",
    "#F59E0B",
    "#4ADE80",
  ]; // 8 colors

  const { t } = useTranslation();
  const userRole = useAppSelector((state) => state.user.role);
  const isUser = userRole === "user";

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "left" }}
      slotProps={{ paper: { sx: { p: 2 } } }}
    >
      <Box>
        <Typography sx={{ fontWeight: 600, mb: 1 }}>請選擇背景顏色</Typography>
        <Grid container sx={{ my: isUser ? "20px" : undefined }}>
          {isUser ? (
            colors.map((color) => (
              <Grid
                item
                xs={3}
                key={color}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    backgroundColor: color,
                    cursor: "pointer",
                    mb: "8px",
                    transition: "box-shadow 0.25s ease, transform 0.25s ease",
                    "&:hover": {
                      boxShadow: `0 0 8px 8px ${color}50`,
                      transform: "scale(1.1)",
                    },
                  }}
                  // 🧩 點擊時呼叫父層傳入的 onColorChange
                  onClick={() => {
                    onColorChange?.(color, "#FFFFFF"); // 預設字體白色
                    onClose(); // 關閉 popover
                  }}
                />
              </Grid>
            ))
          ) : (
            <ColorPickerPlugin
              onChange={(value: string, mode: "background" | "text") => {
                if (mode === "background") {
                  onColorChange?.(value, textColor); // 自訂背景色
                } else {
                  onColorChange?.(backgroundColor, value); // 自訂文字色
                }
              }}
            />
          )}
        </Grid>

        {isUser && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{ fontSize: "12px", color: "gray", marginRight: "10px" }}
            >
              升級獲得更多顏色
            </Typography>
            <CustomActionButton
              onClick={onClose}
              icon={<BoltIcon />}
              label={t("operation.submit")}
              sx={{
                backgroundColor: "#FFD700",
                color: "#000",
                padding: "6px 12px",
              }}
            />
          </Box>
        )}
      </Box>
    </Popover>
  );
};

export default ColorPickerPopover;
