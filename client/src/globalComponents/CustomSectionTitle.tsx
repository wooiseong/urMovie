import { SxProps, Theme, Typography } from "@mui/material";

interface CustomSectionTitleProps {
  label: string;
  sx?: SxProps<Theme>;
}

const CustomSectionTitle: React.FC<CustomSectionTitleProps> = ({
  label,
  sx,
}) => {
  return (
    <Typography
      sx={{ fontSize: "1.8rem", fontWeight: "bold", lineHeight: 2, ...sx }}
    >
      {label}
    </Typography>
  );
};

export default CustomSectionTitle;
