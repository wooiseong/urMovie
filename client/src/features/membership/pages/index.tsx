import { Box, Typography, useTheme } from "@mui/material";
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
  const theme = useTheme();
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
          toast.success(t("membership.successfullyUpgraded"));
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
      title: t("membership.tier1Title"),
      cardBackgroundColor:
        theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.08)" : "white",
      cardContent: [
        t("membership.tier1Content1"),
        t("membership.tier1Content2"),
      ],
      buttonColor: theme.palette.mode === "dark" ? "grey.700" : "grey.400",
      buttonTitle: t("membership.currentPlan"),
      planRole: "user",
      price: 0,
    },
    {
      title: t("membership.upgradeTitle"),

      cardBackgroundColor:
        theme.palette.mode === "dark" ? "secondary.dark" : "secondary.light",
      cardContent: [
        t("membership.upgradeContent1"),
        t("membership.upgradeContent2"),
      ],
      buttonColor: "secondary.main",
      buttonTitle: t("membership.upgradeMember"),
      planRole: "premiumUser",
      price: 200,
      onClick: handleUpgrade,
      loading,
    },
  ];

  return (
    <Box sx={{ pb: { xs: 4, md: 8 }, position: "relative" }}>
      <CustomSectionTitle label={t("membership.title")} />

      <Typography
        variant="h5"
        textAlign="center"
        mb={4}
        sx={{ fontSize: { xs: "1.25rem", md: "1.5rem" }, px: 2 }}
      >
        {t("membership.upgradePrompt")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "center",
          alignItems: { xs: "center", sm: "flex-start" },
          gap: { xs: 2, sm: 3 },
          mt: 4,
          px: { xs: 0, sm: 2 },
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
