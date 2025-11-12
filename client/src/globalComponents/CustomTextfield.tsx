import { Box, SxProps, TextField, Theme, Typography } from "@mui/material";
import { deepmerge } from "@mui/utils";

interface CustomTextFieldProps {
  label?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  variant?: "outlined" | "filled" | "standard";
  fullWidth?: boolean;
  multiline?: boolean;
  minRows?: number;
  sx?: SxProps<Theme>;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  label,
  icon,
  placeholder,
  variant = "outlined",
  fullWidth = false,
  multiline = false,
  minRows,
  sx = {},
  inputProps,
  value,
  onChange,
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
    <Box display="flex" alignItems="center">
      {(label || icon) && (
        <Box sx={{ display: "flex", marginRight: "12px" }}>
          {icon}
          <Typography sx={{ mx: "5px" }}>{label}</Typography>
        </Box>
      )}
      <TextField
        placeholder={placeholder}
        variant={variant}
        fullWidth={fullWidth}
        multiline={multiline}
        minRows={minRows}
        inputProps={inputProps}
        sx={mergedSx}
        value={value}
        onChange={onChange}
      />
    </Box>
  );
};

export default CustomTextField;
