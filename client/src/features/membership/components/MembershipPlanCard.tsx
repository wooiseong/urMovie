import { Box, Button, Typography } from "@mui/material";

interface MembershipCardPlanProps {
  title: string;
  titleBackgroundColor: string;
  cardBackgroundColor: string;
  cardContent: string[];
  buttonColor: string;
  buttonTitle: string;
  userRole: "user" | "premiumUser" | "admin";
  planRole: "user" | "premiumuser" | string;
  index: number;
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
  onClick,
}: MembershipCardPlanProps) => {
  const isDisabled =
    userRole === "admin" || userRole === "premiumUser" || userRole === planRole;

  // boxShadow 規則：
  // - admin -> 沒陰影
  // - 只有當 userRole === planRole 時顯示陰影（代表現在的方案）
  const showShadow = userRole !== "admin" && userRole === planRole;

  return (
    <Box
      sx={(theme) => ({
        width: 260,
        p: 3,
        borderRadius: 3,
        boxShadow: showShadow
          ? `0 0 12px 4px ${theme.palette.primary.main}`
          : "none",
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
          backgroundColor: titleBackgroundColor,
          py: 1,
          px: 2,
          borderRadius: 4,
          mb: 1,
        }}
      >
        {title}
      </Typography>

      {/* 內容 */}
      {cardContent.map((item, idx) => (
        <Typography
          key={idx}
          variant="body1"
          textAlign="center"
          sx={{ mb: idx === cardContent.length - 1 ? 3 : 1 }}
        >
          ・{item}
        </Typography>
      ))}

      {/* 按鈕 */}
      <Button
        variant="contained"
        fullWidth
        disabled={isDisabled}
        sx={{
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
