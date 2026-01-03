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
import { useState, useMemo, useEffect } from "react";
import CustomSearchBar from "src/globalComponents/CustomSearchBar";
import CustomPagination from "src/globalComponents/CustomPagination";
import { useTranslation } from "react-i18next";

interface UserStatsProps {
  getUsersWithStatsResponse: GetUsersWithStatsQuery["getUsersWithStats"];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

type SortField = "username" | "journalCount" | "lastJournalDate" | "createdAt";
type SortOrder = "asc" | "desc";

const UserStats = ({
  getUsersWithStatsResponse,
  currentPage,
  itemsPerPage,
  onPageChange,
}: UserStatsProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const { t } = useTranslation();

  const getUsersWithStats = getUsersWithStatsResponse?.users || [];
  const totalCount = getUsersWithStatsResponse?.totalCount || 0;

  // Reset page when search term or sorting changes
  useEffect(() => {
    onPageChange(1);
  }, [searchTerm, sortField, sortOrder]);

  // Handle sort toggle
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      // Toggle sort order
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      // Set new field and default to descending for immediate visible change
      setSortField(field);
      setSortOrder("desc");
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
          mb: 3,
        }}
      >
        <Typography variant="h5">
          {t("admin.userDetails")}
          <Typography
            component="span"
            variant="subtitle1"
            sx={{ ml: 2, color: "#aaa" }}
          >
            (
            {searchTerm.trim()
              ? filteredAndSortedUsers.length
              : totalCount}{" "}
            {t("admin.users")}
            {searchTerm.trim() &&
              filteredAndSortedUsers.length !== totalCount && (
                <>
                  {" "}
                  / {totalCount} {t("admin.total")}
                </>
              )}
            )
          </Typography>
        </Typography>
        <Box sx={{ width: "400px" }}>
          <CustomSearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("admin.searchUserPlaceholder")}
          />
        </Box>
      </Box>
      <TableContainer
        component={Paper}
        sx={{
          overflow: "auto",
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "background.default",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "action.hover",
            borderRadius: "4px",
            "&:hover": {
              backgroundColor: "action.selected",
            },
          },
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ width: "27.33%" }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {t("admin.username")}
                  <IconButton
                    size="small"
                    onClick={() => handleSort("username")}
                  >
                    {sortField === "username" && sortOrder === "desc" ? (
                      <ArrowDownwardIcon fontSize="small" />
                    ) : (
                      <ArrowUpwardIcon fontSize="small" />
                    )}
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ width: "14.33%" }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {t("admin.journalsCreated")}
                  <IconButton
                    size="small"
                    onClick={() => handleSort("journalCount")}
                  >
                    {sortField === "journalCount" && sortOrder === "desc" ? (
                      <ArrowDownwardIcon fontSize="small" />
                    ) : (
                      <ArrowUpwardIcon fontSize="small" />
                    )}
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ width: "30.67%" }}>
                {t("admin.tags")}
              </TableCell>
              <TableCell align="center" sx={{ width: "13.33%" }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {t("admin.lastPublish")}
                  <IconButton
                    size="small"
                    onClick={() => handleSort("lastJournalDate")}
                  >
                    {sortField === "lastJournalDate" && sortOrder === "desc" ? (
                      <ArrowDownwardIcon fontSize="small" />
                    ) : (
                      <ArrowUpwardIcon fontSize="small" />
                    )}
                  </IconButton>
                </Box>
              </TableCell>
              <TableCell align="center" sx={{ width: "13.33%" }}>
                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {t("admin.registrationDate")}
                  <IconButton
                    size="small"
                    onClick={() => handleSort("createdAt")}
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
                  {t("admin.noUsersFound")}"{searchTerm}"
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedUsers.map((user: any) => (
                <TableRow key={user._id}>
                  <TableCell align="center" component="th" scope="row">
                    {user.username}
                  </TableCell>
                  <TableCell align="center">{user.journalCount}</TableCell>
                  <TableCell align="center">
                    {user.tags
                      .map((t: any) => `${t.name}: ${t.count}`)
                      .join(", ")}
                  </TableCell>
                  <TableCell align="center">
                    {user.lastJournalDate
                      ? dayjs(user.lastJournalDate).format("YYYY-MM-DD")
                      : t("admin.notAvailable")}
                  </TableCell>
                  <TableCell align="center">
                    {user.createdAt
                      ? dayjs(user.createdAt).format("YYYY-MM-DD")
                      : t("admin.notAvailable")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {!searchTerm.trim() && (
        <CustomPagination
          currentPage={currentPage}
          totalItems={totalCount}
          itemsPerPage={itemsPerPage}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};

export default UserStats;
