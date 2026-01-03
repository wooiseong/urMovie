import { Box, Button, Typography } from "@mui/material";

interface MembershipCardPlanProps {
  title: string;
  titleBackgroundColor?: string;
  cardBackgroundColor: string;
  cardContent: string[];
  buttonColor: string;
  buttonTitle: string;
  userRole: "user" | "premiumUser" | "admin";
  planRole: "user" | "premiumuser" | string;
  index: number;
  price: number;
  onClick?: () => void;
}

const MembershipCardPlan = ({
  title,
  titleBackgroundColor,
  cardBackgroundColor,
  cardContent,
  buttonColor,
  buttonTitle,
  userRole,
  planRole,
  price,
  onClick,
}: MembershipCardPlanProps) => {
  const isDisabled =
    userRole === "admin" || userRole === "premiumUser" || userRole === planRole;

  return (
    <Box
      sx={(theme) => ({
        width: 260,
        height: 340,
        p: 3,
        borderRadius: 2,
        backgroundColor: cardBackgroundColor,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      })}
    >
      {/* 標題 */}
      <Typography
        variant="h6"
        fontWeight="bold"
        textAlign="center"
        sx={{
          backgroundColor: titleBackgroundColor || "transparent",
          py: 1,
          borderRadius: titleBackgroundColor ? 4 : 0,
          mb: 1,
        }}
      >
        {title}
      </Typography>

      {/* 價格 */}
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          my: 2,
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: "1.125rem",
            fontWeight: 600,
            mr: 0.5,
          }}
        >
          $
        </Typography>
        <Typography
          sx={{
            fontSize: "3rem",
            lineHeight: 1,
          }}
        >
          {price}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            fontSize: "1rem",
            fontWeight: 500,
            ml: 1,
          }}
        >
          NTD/月
        </Typography>
      </Box>

      {/* 內容容器 - 使用 flex: 1 來占據剩餘空間並垂直居中 */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          width: "100%",
        }}
      >
        {cardContent.map((item, idx) => (
          <Typography
            key={idx}
            variant="body1"
            textAlign="center"
            sx={{ mb: idx === cardContent.length - 1 ? 0 : 1 }}
          >
            ・{item}
          </Typography>
        ))}
      </Box>

      {/* 按鈕 */}
      <Button
        variant="contained"
        fullWidth
        disabled={isDisabled}
        sx={{
          mt: 2,
          borderRadius: 2,
          backgroundColor: buttonColor,
          color: "text.primary",
          cursor: isDisabled ? "default" : "pointer",
          "&:hover": {
            backgroundColor: buttonColor,
          },
        }}
        onClick={onClick}
      >
        {buttonTitle}
      </Button>
    </Box>
  );
};

export default MembershipCardPlan;
