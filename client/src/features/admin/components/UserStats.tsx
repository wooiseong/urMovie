import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { GetUsersWithStatsQuery } from "src/generated/graphql";

interface UserStatsProps {
  getUsersWithStats: GetUsersWithStatsQuery["getUsersWithStats"];
}

const UserStats = ({ getUsersWithStats }: UserStatsProps) => {
  if (!getUsersWithStats) {
    return null;
  }

  return (
    <>
      <Typography variant="h5" gutterBottom>
        User Details
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell align="right">Journals Created</TableCell>
              <TableCell>Tags (name: count)</TableCell>
              <TableCell>Last Publish</TableCell>
              <TableCell>Registration Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getUsersWithStats.map((user: any) => (
              <TableRow key={user._id}>
                <TableCell component="th" scope="row">
                  {user.username}
                </TableCell>
                <TableCell align="right">{user.journalCount}</TableCell>
                <TableCell>
                  {user.tags
                    .map((t: any) => `${t.name}: ${t.count}`)
                    .join(", ")}
                </TableCell>
                <TableCell>
                  {user.lastJournalDate
                    ? dayjs(user.lastJournalDate).format("YYYY-MM-DD")
                    : "N/A"}
                </TableCell>
                <TableCell>
                  {user.createdAt
                    ? dayjs(user.createdAt).format("YYYY-MM-DD")
                    : "N/A"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserStats;
