import {
  Box,
  InputAdornment,
  SxProps,
  TextField,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import { deepmerge } from "@mui/utils";
import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";

interface CustomSearchBarProps {
  label?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  variant?: "outlined" | "filled" | "standard";
  fullWidth?: boolean;
  multiline?: boolean;
  minRows?: number;
  sx?: SxProps<Theme>;
  size?: "small" | "medium";
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomSearchBar: React.FC<CustomSearchBarProps> = ({
  label,
  icon,
  placeholder,
  variant = "outlined",
  minRows,
  sx = {},
  size = "small",
  inputProps,
  value,
  onChange,
}) => {
  // 預設樣式
  const { t } = useTranslation();
  const defaultSx: SxProps<Theme> = {
    color: "text.primary",
    input: {
      color: "text.primary",
      backgroundColor: "transparent",
      padding: "8px 12px",
    },
    textarea: {
      color: "text.primary",
      lineHeight: 1.6,
    },
    "& .MuiInputBase-input::placeholder": {
      color: "text.secondary",
      opacity: 1,
    },
    width: "100%",
    borderRadius: "10px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      "& fieldset": {},
      "&:hover fieldset": {},
      "&.Mui-focused fieldset": {},
    },
    "& input": {},
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
        size={size}
        placeholder={placeholder ?? t("navBar.search")}
        variant={variant}
        minRows={minRows}
        inputProps={inputProps}
        sx={mergedSx}
        value={value}
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Tooltip title="">
                <SearchIcon sx={{ color: "text.secondary" }} />
              </Tooltip>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default CustomSearchBar;

// <TextField
//   size="small"
//   sx={{
//     margin: "10px",
//     width: "100%",
//     borderRadius: "10px",
//     "& .MuiOutlinedInput-root": {
//       borderRadius: "10px",
//       "& fieldset": {},
//       "&:hover fieldset": {},
//       "&.Mui-focused fieldset": {},
//     },
//     "& input": {},
//   }}
//   name="search"
//   placeholder={t("navBar.search")}
//   type="text"
//   variant="outlined"
//   fullWidth
//   InputProps={{
//     startAdornment: (
//       <InputAdornment position="start">
//         <Tooltip title="">
//           <SearchIcon
//             sx={
//               {
//                 // color: "#a8a8a8"
//               }
//             }
//           />
//         </Tooltip>
//       </InputAdornment>
//     ),
//   }}
// />
