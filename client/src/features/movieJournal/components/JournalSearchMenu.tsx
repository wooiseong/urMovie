import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useState, useMemo } from "react";
import { DynamicMenuItem } from "src/globalComponents/DynamicMenuItem";
import { useTranslation } from "react-i18next";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import CustomDropdown from "src/globalComponents/CustomDropdown";
import CustomTextField from "src/globalComponents/CustomTextfield";
import JournalDateMenu from "./JournalDateMenu";
import { JournalFilters } from "../pages/index";
import { useGetTagsQuery } from "src/generated/graphql";
import { formTag } from "src/features/home/pages/EditJournalPage";

interface JournalSearchMenuProps {
  filters: JournalFilters;
  onFilterChange: (filters: Partial<JournalFilters>) => void;
  onClearFilters: () => void;
}

const JournalSearchMenu = ({
  filters,
  onFilterChange,
  onClearFilters,
}: JournalSearchMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const { t } = useTranslation();
  const { data: tagData } = useGetTagsQuery();

  // Convert string[] tags from filters to formTag[] format for CustomDropdown
  const formattedTags = useMemo((): formTag[] => {
    const allTags = tagData?.getTags ?? [];
    const selectedTagNames = filters.tag ?? [];

    return allTags.map((tag) => ({
      id: tag.id,
      name: tag.name,
      selected: selectedTagNames.includes(tag.name),
    }));
  }, [tagData, filters.tag]);

  // Handle tag changes: convert formTag[] back to string[] for filters
  const handleTagChange = (updatedTags: formTag[]) => {
    const selectedTagNames = updatedTags
      .filter((tag) => tag.selected)
      .map((tag) => tag.name);

    onFilterChange({ tag: selectedTagNames });
  };

  return (
    <Box>
      <IconButton sx={{ width: 40, height: 40 }} onClick={handleOpen}>
        <FilterAltIcon />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            p: 2, // padding
            borderRadius: 2,
            width: 400, // 想要可以調整
          },
        }}
      >
        {/* 自由填內容 */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "bottom",
          }}
        >
          <Typography variant="h6">{t("搜尋篩選")}</Typography>
          <Button onClick={onClearFilters}>清除條件</Button>
        </Box>
        <Box>
          <CustomDropdown
            readonly
            label={t("home.tag")}
            icon={<LocalOfferIcon />}
            placeholder={t("home.tag")}
            fullWidth
            tagList={formattedTags}
            onTagChange={handleTagChange}
          />
          <JournalDateMenu
            startDate={filters.startDate}
            endDate={filters.endDate}
            onDateChange={(startDate, endDate) =>
              onFilterChange({ startDate, endDate })
            }
          />
        </Box>
      </Popover>
    </Box>
  );
};

export default JournalSearchMenu;
