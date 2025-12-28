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
        px: 2,
        py: 1,
        borderRadius: "10px",
        textTransform: "none",
        "&: hover": {
          opacity: "0.9",
        },
        ...sx,
      }}
    >
      {loading ? (
        <CircularProgress
          size={24}
          sx={{ color: "white", marginRight: "8px" }}
        />
      ) : (
        icon
      )}
      <Typography sx={{ marginLeft: "5px" }}> {label}</Typography>
    </Button>
  );
};

export default CustomActionButton;
