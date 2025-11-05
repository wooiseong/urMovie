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
};

const ColorPickerPopover = ({
  open,
  anchorEl,
  onClose,
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
        <Typography sx={{ fontWeight: 600, mb: 1 }}>請選擇顏色</Typography>
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
                  onClick={() => console.log("Selected color:", color)}
                />
              </Grid>
            ))
          ) : (
            <ColorPickerPlugin
              onChange={(value: any, mode: any) => {
                if (mode === "background") {
                  console.log("背景色:", value);
                  // update note bg color mutation...
                } else {
                  console.log("字體色:", value);
                  // update font color mutation...
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
              升級獲得更多顔色
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
