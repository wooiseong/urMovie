import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";
import { useApolloClient } from "@apollo/client";
import { useUpgradeToPremiumMutation } from "src/generated/graphql";
import CustomSectionTitle from "src/globalComponents/CustomSectionTitle";
import { useAppDispatch, useAppSelector } from "src/store/hook";
import { setUser } from "src/store/modules/userSlice";
import MembershipCardPlan from "../components/MembershipPlanCard";
import { useNavigate } from "react-router-dom";

const MembershipPage = () => {
  const { t } = useTranslation();
  const userRole = useAppSelector((state) => state.user.role);
  const dispatch = useAppDispatch();
  const [upgradeToPremium, { loading }] = useUpgradeToPremiumMutation();
  const navigate = useNavigate();
  const handleUpgrade = async () => {
    try {
      const { data } = await upgradeToPremium();

      if (data?.upgradeToPremium) {
        const { message, user } = data.upgradeToPremium;

        if (message.includes("success")) {
          toast.success("Successfully upgraded!");
          if (user) {
            dispatch(setUser(user as any));
          }
          navigate("/", { state: { upgraded: true } });
        } else {
          toast.error(message);
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        toast.error(e.message);
      }
    }
  };

  const plans = [
    {
      title: "1星會員",
      titleBackgroundColor: "#000",
      cardBackgroundColor: "#404040",
      cardContent: ["10次金句使用次數", "限制8種顏色設定"],
      buttonColor: "grey.400",
      buttonTitle: "目前方案",
      planRole: "user",
    },
    {
      title: "升級方案",
      titleBackgroundColor: "#720e9e",
      cardBackgroundColor: "#4B0082",
      cardContent: ["你可以自行改寫功能內容", "再增加更多會員功能"],
      buttonColor: "#1976d2",
      buttonTitle: "升級會員",
      planRole: "premiumUser",
      onClick: handleUpgrade,
      loading,
    },
  ];

  return (
    <Box sx={{ pb: "70px", position: "relative" }}>
      <CustomSectionTitle label={t("home.createEdit")} />

      <Typography variant="h5" textAlign="center" mb={4}>
        已有30位會員升級，趕快解鎖以獲得更多功能吧！
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 3,
          mt: 4,
        }}
      >
        {plans.map((plan, index) => (
          <MembershipCardPlan
            key={index}
            index={index}
            userRole={userRole}
            {...plan}
          />
        ))}
      </Box>
    </Box>
  );
};

export default MembershipPage;
