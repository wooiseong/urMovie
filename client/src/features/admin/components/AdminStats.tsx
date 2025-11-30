import { Grid, Card, CardContent, Typography } from "@mui/material";
import { GetAdminStatsQuery } from "src/generated/graphql";
import UserDistributionChart from "./UserDistributionChart";

interface AdminStatsProps {
  getAdminStats: GetAdminStatsQuery["getAdminStats"];
}

const AdminStats = ({ getAdminStats }: AdminStatsProps) => {
  if (!getAdminStats) {
    return null;
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Admin Statistics
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Members
              </Typography>
              <Typography variant="h5">{getAdminStats.totalMembers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Regular Users
              </Typography>
              <Typography variant="h5">{getAdminStats.totalUsers}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Premium Users
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
                Total Journals
              </Typography>
              <Typography variant="h5">
                {getAdminStats.totalJournals}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Estimated Salary
              </Typography>
              <Typography variant="h5">${getAdminStats.totalSalary}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <UserDistributionChart
            totalUsers={getAdminStats.totalUsers}
            totalPremiumUsers={getAdminStats.totalPremiumUsers}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default AdminStats;
