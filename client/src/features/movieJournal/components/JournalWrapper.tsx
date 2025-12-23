import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import CustomSearchBar from "src/globalComponents/CustomSearchBar";
import CustomSectionTitle from "src/globalComponents/CustomSectionTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import WindowIcon from "@mui/icons-material/Window";
import JournalSearchMenu from "./JournalSearchMenu";
import { useNavigate } from "react-router-dom";
import { JournalFilters } from "../pages/index";
import { useTranslation } from "react-i18next";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
interface JournalWrapperProps {
  filters: JournalFilters;
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (filters: Partial<JournalFilters>) => void;
  onClearFilters: () => void;
  totalCount: number;
  isListView: boolean;
  onToggleView: () => void;
}

const JournalWrapper = ({
  filters,
  searchTerm,
  onSearchChange,
  onFilterChange,
  onClearFilters,
  totalCount,
  isListView,
  onToggleView,
}: JournalWrapperProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <Box sx={{ marginBottom: "20px" }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ marginRight: "15px" }}>
            <CustomSectionTitle
              label={t("movieJournal.collectionArticles")}
            ></CustomSectionTitle>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle2">
                {t("movieJournal.total")}
                <Box component="span" fontSize="20px">
                  {totalCount}
                </Box>
                {t("movieJournal.articles")}
              </Typography>
              <IconButton
                onClick={() => {
                  navigate("/editJournal");
                }}
              >
                <AddCircleIcon />
              </IconButton>
            </Box>
          </Box>
          <Tooltip title={t("home.addQuote")}>
            <IconButton
            // onClick={handleAddQuote}
            >
              {/* <AddCircleIcon /> */}
            </IconButton>
          </Tooltip>
        </Box>
        <Box display="flex" alignItems="center">
          <CustomSearchBar
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <JournalSearchMenu
            filters={filters}
            onFilterChange={onFilterChange}
            onClearFilters={onClearFilters}
          />
          <IconButton
            sx={{
              width: 40,
              height: 40,
            }}
            onClick={onToggleView}
          >
            {isListView ? <FormatListBulletedIcon /> : <WindowIcon />}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default JournalWrapper;
