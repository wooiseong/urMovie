import { Theme } from "@emotion/react";
import { Button, SxProps, Typography } from "@mui/material";
interface CustomActionButtonProps {
  icon: React.ReactNode;
  label: string;
  sx?: SxProps<Theme>;
  onClick?: () => void;
}

const CustomActionButton: React.FC<CustomActionButtonProps> = ({
  icon,
  label,
  sx,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        px: 2,
        py: 1,
        borderRadius: "10px",
        textTransform: "none",
        color: "#fff",
        backgroundColor: "#0075F9",
        "&: hover": {
          opacity: "0.9",
        },
        ...sx,
      }}
    >
      {icon}
      <Typography sx={{ marginLeft: "5px" }}> {label}</Typography>
    </Button>
  );
};

export default CustomActionButton;
