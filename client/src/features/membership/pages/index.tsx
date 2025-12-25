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
      titleBackgroundColor: "background.paper",
      cardBackgroundColor: "background.default",
      cardContent: [t("membership.tier1Content1"), t("membership.tier1Content2")],
      buttonColor: "grey.400",
      buttonTitle: t("membership.currentPlan"),
      planRole: "user",
    },
    {
      title: t("membership.upgradeTitle"),
      titleBackgroundColor: "secondary.main",
      cardBackgroundColor: "secondary.dark",
      cardContent: [t("membership.upgradeContent1"), t("membership.upgradeContent2")],
      buttonColor: "primary.main",
      buttonTitle: t("membership.upgradeMember"),
      planRole: "premiumUser",
      onClick: handleUpgrade,
      loading,
    },
  ];

  return (
    <Box sx={{ pb: { xs: 4, md: 8 }, position: "relative" }}>
      <CustomSectionTitle label={t("home.createEdit")} />

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
