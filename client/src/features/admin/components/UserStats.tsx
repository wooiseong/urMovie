import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import dayjs from "dayjs";
import { GetUsersWithStatsQuery } from "src/generated/graphql";
import { useState, useMemo } from "react";
import CustomSearchBar from "src/globalComponents/CustomSearchBar";

interface UserStatsProps {
  getUsersWithStats: GetUsersWithStatsQuery["getUsersWithStats"];
}

type SortField = "username" | "journalCount" | "lastJournalDate" | "createdAt";
type SortOrder = "asc" | "desc";

const UserStats = ({ getUsersWithStats }: UserStatsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  // Handle sort toggle
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle sort order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortOrder("asc");
    }
  };

  // Filter and sort users
  const filteredAndSortedUsers = useMemo(() => {
    if (!getUsersWithStats) {
      return [];
    }

    // First, filter
    let result = getUsersWithStats;

    if (searchTerm.trim()) {
      const lowerSearch = searchTerm.toLowerCase();
      result = getUsersWithStats.filter((user: any) => {
        // Search in username
        const matchesUsername = user.username
          ?.toLowerCase()
          .includes(lowerSearch);

        // Search in tags
        const matchesTags = user.tags?.some((tag: any) =>
          tag.name?.toLowerCase().includes(lowerSearch)
        );

        // Search in dates
        const lastPublish = user.lastJournalDate
          ? dayjs(user.lastJournalDate).format("YYYY-MM-DD")
          : "";
        const registrationDate = user.createdAt
          ? dayjs(user.createdAt).format("YYYY-MM-DD")
          : "";
        const matchesDates =
          lastPublish.includes(lowerSearch) ||
          registrationDate.includes(lowerSearch);

        return matchesUsername || matchesTags || matchesDates;
      });
    }

    // Then, sort
    if (sortField) {
      result = [...result].sort((a: any, b: any) => {
        let aValue: any;
        let bValue: any;

        switch (sortField) {
          case "username":
            aValue = a.username?.toLowerCase() || "";
            bValue = b.username?.toLowerCase() || "";
            break;
          case "journalCount":
            aValue = a.journalCount || 0;
            bValue = b.journalCount || 0;
            break;
          case "lastJournalDate":
            aValue = a.lastJournalDate
              ? new Date(a.lastJournalDate).getTime()
              : 0;
            bValue = b.lastJournalDate
              ? new Date(b.lastJournalDate).getTime()
              : 0;
            break;
          case "createdAt":
            aValue = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            bValue = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            break;
          default:
            return 0;
        }

        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [getUsersWithStats, searchTerm, sortField, sortOrder]);

  if (!getUsersWithStats) {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5">
          User Details
          <Typography
            component="span"
            variant="subtitle1"
            sx={{ ml: 2, color: "#aaa" }}
          >
            (
            {searchTerm.trim()
              ? filteredAndSortedUsers.length
              : getUsersWithStats.length}{" "}
            users
            {searchTerm.trim() &&
              filteredAndSortedUsers.length !== getUsersWithStats.length && (
                <> / {getUsersWithStats.length} total</>
              )}
            )
          </Typography>
        </Typography>
        <Box sx={{ width: "400px" }}>
          <CustomSearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search username, tags, or dates"
          />
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  Username
                  <IconButton
                    size="small"
                    onClick={() => handleSort("username")}
                    sx={{
                      color:
                        sortField === "username"
                          ? "primary.main"
                          : "text.secondary",
                    }}
                  >
                    {sortField === "username" && sortOrder === "desc" ? (
                      <ArrowDownwardIcon fontSize="small" />
                    ) : (
                      <ArrowUpwardIcon fontSize="small" />
                    )}
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell align="right">
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    justifyContent: "flex-end",
                  }}
                >
                  Journals Created
                  <IconButton
                    size="small"
                    onClick={() => handleSort("journalCount")}
                    sx={{
                      color:
                        sortField === "journalCount"
                          ? "primary.main"
                          : "text.secondary",
                    }}
                  >
                    {sortField === "journalCount" && sortOrder === "desc" ? (
                      <ArrowDownwardIcon fontSize="small" />
                    ) : (
                      <ArrowUpwardIcon fontSize="small" />
                    )}
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell>Tags (name: count)</TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  Last Publish
                  <IconButton
                    size="small"
                    onClick={() => handleSort("lastJournalDate")}
                    sx={{
                      color:
                        sortField === "lastJournalDate"
                          ? "primary.main"
                          : "text.secondary",
                    }}
                  >
                    {sortField === "lastJournalDate" && sortOrder === "desc" ? (
                      <ArrowDownwardIcon fontSize="small" />
                    ) : (
                      <ArrowUpwardIcon fontSize="small" />
                    )}
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  Registration Date
                  <IconButton
                    size="small"
                    onClick={() => handleSort("createdAt")}
                    sx={{
                      color:
                        sortField === "createdAt"
                          ? "primary.main"
                          : "text.secondary",
                    }}
                  >
                    {sortField === "createdAt" && sortOrder === "desc" ? (
                      <ArrowDownwardIcon fontSize="small" />
                    ) : (
                      <ArrowUpwardIcon fontSize="small" />
                    )}
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedUsers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  align="center"
                  sx={{ py: 4, color: "gray" }}
                >
                  No users found matching "{searchTerm}"
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedUsers.map((user: any) => (
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
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UserStats;
