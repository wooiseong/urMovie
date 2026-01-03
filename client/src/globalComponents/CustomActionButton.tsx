import { Theme } from "@emotion/react";
import { Button, SxProps, Typography, CircularProgress } from "@mui/material";
interface CustomActionButtonProps {
  icon: React.ReactNode;
  label: string;
  sx?: SxProps<Theme>;
  onClick?: () => void;
  loading?: boolean;
  color?: "primary" | "secondary" | "error" | "warning" | "info" | "success";
}

const CustomActionButton: React.FC<CustomActionButtonProps> = ({
  icon,
  label,
  sx,
  onClick,
  loading,
  color = "primary",
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={loading}
      variant="contained"
      color={color}
      sx={{
        px: { xs: 1, sm: 2 },
        py: 1,
        borderRadius: "10px",
        textTransform: "none",
        minWidth: { xs: "auto", sm: "64px" },
        "&: hover": {
          opacity: "0.9",
        },
        ...sx,
      }}
    >
      {loading ? (
        <CircularProgress
          size={24}
          sx={{ color: "white", marginRight: { xs: 0, sm: "8px" } }}
        />
      ) : (
        icon
      )}
      <Typography sx={{ marginLeft: { xs: 0, sm: "5px" }, display: { xs: "none", sm: "block" } }}> {label}</Typography>
    </Button>
  );
};

export default CustomActionButton;
