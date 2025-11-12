import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import {
  Box,
  TextField,
  Slider,
  IconButton,
  Typography,
  Grid,
} from "@mui/material";
import FormatColorFillIcon from "@mui/icons-material/FormatColorFill"; // 背景
import FormatColorTextIcon from "@mui/icons-material/FormatColorText"; // 字體

const presetColors = [
  "#F87171",
  "#FBBF24",
  "#34D399",
  "#60A5FA",
  "#A78BFA",
  "#F472B6",
  "#F59E0B",
  "#4ADE80",
];

const ColorPickerPlugin = ({ onChange }: any) => {
  const [color, setColor] = useState("#aabbcc");
  const [rgba, setRgba] = useState("rgba(170,187,204,1)");
  const [mode, setMode] = useState<"background" | "text">("background");

  const handleHexChange = (value: string) => {
    setColor(value);
    onChange?.(value, mode);
  };

  const handleRgbaChange = (value: string) => {
    setRgba(value);
    onChange?.(value, mode);
  };

  return (
    <Box
      sx={{
        p: 1,
        width: 230,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* 模式切換：背景 / 字體 */}
      <Box
        sx={{
          display: "flex",
          width: "100%",
          justifyContent: "left",
          alignItems: "center",
          gap: 1,
          mb: 1,
        }}
      >
        <Box>
          <IconButton
            onClick={() => setMode("background")}
            color={mode === "background" ? "primary" : "default"}
          >
            <FormatColorFillIcon />
          </IconButton>
          <IconButton
            onClick={() => setMode("text")}
            color={mode === "text" ? "primary" : "default"}
          >
            <FormatColorTextIcon />
          </IconButton>
        </Box>
      </Box>

      {/* 主色盤 */}
      <HexColorPicker color={color} onChange={handleHexChange} />

      {/* HEX 輸入 */}
      <TextField
        label="HEX"
        value={color}
        size="small"
        sx={{ mt: 3 }}
        onChange={(e) => handleHexChange(e.target.value)}
      />

      {/* 8 色 preset */}
      <Grid container spacing={2} sx={{ mt: 1 }}>
        {presetColors.map((c) => (
          <Grid
            item
            xs={3}
            key={c}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                backgroundColor: c,
                cursor: "pointer",
              }}
              onClick={() => {
                setColor(c);
                onChange(c, mode);
              }}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ColorPickerPlugin;
