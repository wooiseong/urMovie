import { SxProps, TextField, Theme } from "@mui/material";
import { deepmerge } from "@mui/utils";

interface CustomTextFieldProps {
  placeholder?: string;
  variant?: "outlined" | "filled" | "standard";
  fullWidth?: boolean;
  multiline?: boolean;
  minRows?: number;
  sx?: SxProps<Theme>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  placeholder,
  variant = "outlined",
  fullWidth = false,
  multiline = false,
  minRows,
  sx = {},
  inputProps,
}) => {
  // 預設樣式
  const defaultSx: SxProps<Theme> = {
    color: "#fff",
    "& .MuiOutlinedInput-root": {
      "& fieldset": { border: "none" },
      "&:hover fieldset": { border: "none" },
      "&.Mui-focused fieldset": { border: "none" },
    },
    input: {
      color: "#fff",
      backgroundColor: "transparent",
      padding: "8px 12px",
    },
    textarea: {
      color: "#fff",
      lineHeight: 1.6,
    },
    "& .MuiInputBase-input::placeholder": {
      color: "#aaa",
      opacity: 1,
    },
  };

  const mergedSx = deepmerge(defaultSx, sx);

  return (
    <TextField
      placeholder={placeholder}
      variant={variant}
      fullWidth={fullWidth}
      multiline={multiline}
      minRows={minRows}
      inputProps={inputProps}
      sx={mergedSx}
    />
  );
};

export default CustomTextField;
