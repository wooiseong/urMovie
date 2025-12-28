import { Theme } from "@emotion/react";
import { Button, SxProps, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
interface CustomNavButtonProps {
  icon?: React.ReactNode;
  label: string;
  isActive?: boolean;
  to?: string;
  sx?: SxProps<Theme>;
  onClick?: () => void;
}

const CustomNavButton: React.FC<CustomNavButtonProps> = ({
  icon,
  label,
  to,
  sx,
  onClick,
}) => {
  const location = useLocation();
  const isActive = to && location.pathname === to;

  return (
    <Button
      component={to ? RouterLink : "button"}
      to={to}
      onClick={onClick}
      sx={{
        mx: "auto",
        borderRadius: "10px",
        color: (theme) => (theme.palette.mode === 'dark' ? '#fff' : '#000'),
        ...(isActive && {
          backgroundColor: "primary.main",
          color: "primary.contrastText",
          "&:hover": {
            backgroundColor: "primary.dark",
            color: "primary.contrastText",
          },
        }),
        textTransform: "none",
        "&:hover": {
          color: "primary.main",
        },
        ...sx,
      }}
    >
      {icon}
      <Typography sx={{ marginLeft: "5px", color: "inherit" }}> {label}</Typography>
    </Button>
  );
};

export default CustomNavButton;
