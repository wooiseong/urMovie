import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { GetAdminStatsQuery } from "src/generated/graphql";
import UserDistributionChart from "./UserDistributionChart";
import { useTranslation } from "react-i18next";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

interface AdminStatsProps {
  getAdminStats: GetAdminStatsQuery["getAdminStats"];
}

const AdminStats = ({ getAdminStats }: AdminStatsProps) => {
  const { t } = useTranslation();
  if (!getAdminStats) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h5" sx={{ marginY: "20px" }}>
        {t("admin.adminStatistics")}
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t("admin.totalMembers")}
              </Typography>
              <Typography variant="h5">{getAdminStats.totalMembers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t("admin.regularUsers")}
              </Typography>
              <Typography variant="h5">{getAdminStats.totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t("admin.premiumUsers")}
              </Typography>
              <Typography variant="h5">
                {getAdminStats.totalPremiumUsers}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t("admin.totalJournals")}
              </Typography>
              <Typography variant="h5">
                {getAdminStats.totalJournals}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Chart and Salary Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          mb: 4,
        }}
      >
        {/* Salary Card - Shows on top for mobile, right side for desktop */}
        <Box
          sx={{
            order: { xs: 1, md: 2 },
            flex: { md: "0 0 300px" },
            display: "flex",
            alignItems: "stretch",
          }}
        >
          <Card
            sx={{
              width: "100%",
              background:
                "linear-gradient(135deg, #0fc387ff 0%, #058c61ff 100%)",
              color: "white",
              boxShadow: "0 8px 16px rgba(16, 185, 129, 0.3)",
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Money Icon in top right - Large and semi-transparent */}
            <Box
              sx={{
                position: "absolute",
                top: -10,
                right: -10,
                opacity: 0.3,
                zIndex: 0,
              }}
            >
              <AttachMoneyIcon sx={{ fontSize: 140 }} />
            </Box>

            <CardContent
              sx={{
                textAlign: "center",
                py: 4,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                position: "relative",
                zIndex: 1,
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    mb: 2,
                    fontWeight: 500,
                    opacity: 0.9,
                  }}
                >
                  {t("admin.estimatedSalary")}
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 1.5,
                  }}
                >
                  ${getAdminStats.totalSalary}
                </Typography>
                <Box
                  sx={{
                    width: 80,
                    height: 4,
                    background: "white",
                    borderRadius: 2,
                    opacity: 0.7,
                  }}
                />
              </Box>

              {/* Percentage Change at Bottom */}
              <Box
                sx={{
                  mt: 3,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0.5,
                  }}
                >
                  {getAdminStats.salaryPercentageChange >= 0 ? (
                    <TrendingUpIcon sx={{ fontSize: 22 }} />
                  ) : (
                    <TrendingDownIcon sx={{ fontSize: 22 }} />
                  )}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                    }}
                  >
                    {getAdminStats.salaryPercentageChange >= 0 ? "+" : ""}
                    {getAdminStats.salaryPercentageChange}%
                  </Typography>
                </Box>
                <Typography
                  variant="body2"
                  sx={{
                    opacity: 0.9,
                    mt: 0.5,
                  }}
                >
                  vs last week
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Chart - Shows on bottom for mobile, left side for desktop */}
        <Box
          sx={{
            order: { xs: 2, md: 1 },
            flex: 1,
          }}
        >
          <UserDistributionChart
            totalUsers={getAdminStats.totalUsers}
            totalPremiumUsers={getAdminStats.totalPremiumUsers}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminStats;
