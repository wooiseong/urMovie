import { useState, useEffect, useMemo } from "react";
import { Box, Button, Popover, Stack, useTheme } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import CustomTextField from "src/globalComponents/CustomTextfield";
import { useTranslation } from "react-i18next";
import DateRangeIcon from "@mui/icons-material/DateRange";

type DayjsRange = {
  from: Dayjs | null;
  to: Dayjs | null;
};

interface JournalDateMenuProps {
  startDate?: string;
  endDate?: string;
  onDateChange: (
    startDate: string | undefined,
    endDate: string | undefined
  ) => void;
}

const JournalDateMenu = ({
  startDate,
  endDate,
  onDateChange,
}: JournalDateMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { t } = useTranslation();
  const theme = useTheme();

  // 起訖日期
  const [selectedRange, setSelectedRange] = useState<DayjsRange>({
    from: startDate ? dayjs(startDate) : null,
    to: endDate ? dayjs(endDate) : null,
  });

  // Sync external props to internal state
  useEffect(() => {
    setSelectedRange({
      from: startDate ? dayjs(startDate) : null,
      to: endDate ? dayjs(endDate) : null,
    });
  }, [startDate, endDate]);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  // react-day-picker 會傳回 DateRange< Date >
  const handleRangeSelect = (range: DateRange | undefined) => {
    if (range?.from) {
      const newRange = {
        from: dayjs(range.from),
        to: range.to ? dayjs(range.to) : null,
      };
      setSelectedRange(newRange);
      onDateChange(
        newRange.from?.format("YYYY-MM-DD"),
        newRange.to?.format("YYYY-MM-DD")
      );
    }
  };

  /** 快速選擇（全改成 Range） */
  const quickSelect = {
    today: () => {
      const newRange = { from: dayjs(), to: dayjs() };
      setSelectedRange(newRange);
      onDateChange(
        newRange.from.format("YYYY-MM-DD"),
        newRange.to.format("YYYY-MM-DD")
      );
    },

    yesterday: () => {
      const d = dayjs().subtract(1, "day");
      const newRange = { from: d, to: d };
      setSelectedRange(newRange);
      onDateChange(d.format("YYYY-MM-DD"), d.format("YYYY-MM-DD"));
    },

    lastWeek: () => {
      const newRange = {
        from: dayjs().subtract(7, "day"),
        to: dayjs(),
      };
      setSelectedRange(newRange);
      onDateChange(
        newRange.from.format("YYYY-MM-DD"),
        newRange.to.format("YYYY-MM-DD")
      );
    },

    lastMonth: () => {
      const newRange = {
        from: dayjs().subtract(1, "month"),
        to: dayjs(),
      };
      setSelectedRange(newRange);
      onDateChange(
        newRange.from.format("YYYY-MM-DD"),
        newRange.to.format("YYYY-MM-DD")
      );
    },
  };

  // Determine which quick select is active
  const activeQuickSelect = useMemo(() => {
    if (!selectedRange.from || !selectedRange.to) return null;

    const today = dayjs();
    const yesterday = dayjs().subtract(1, "day");
    const lastWeekStart = dayjs().subtract(7, "day");
    const lastMonthStart = dayjs().subtract(1, "month");

    // Check if today
    if (
      selectedRange.from.isSame(today, "day") &&
      selectedRange.to.isSame(today, "day")
    ) {
      return "today";
    }

    // Check if yesterday
    if (
      selectedRange.from.isSame(yesterday, "day") &&
      selectedRange.to.isSame(yesterday, "day")
    ) {
      return "yesterday";
    }

    // Check if last week
    if (
      selectedRange.from.isSame(lastWeekStart, "day") &&
      selectedRange.to.isSame(today, "day")
    ) {
      return "lastWeek";
    }

    // Check if last month
    if (
      selectedRange.from.isSame(lastMonthStart, "day") &&
      selectedRange.to.isSame(today, "day")
    ) {
      return "lastMonth";
    }

    return null;
  }, [selectedRange]);

  return (
    <Box mb={2}>
      {/* <Button variant="outlined" onClick={handleOpen}>
        開啟詳細設定
      </Button> */}

      <CustomTextField
        icon={<DateRangeIcon />}
        label={t("movieJournal.dateRange")}
        placeholder={t("movieJournal.selectDateRange")}
        value={
          selectedRange.from && selectedRange.to
            ? `${selectedRange.from.format(
                "YYYY-MM-DD"
              )} ~ ${selectedRange.to.format("YYYY-MM-DD")}`
            : ""
        }
        sx={{
          width: { xs: "78%", md: "67.5%" },
          "& .MuiOutlinedInput-root": {
            backgroundColor: "background.paper",
          },
        }}
        onClick={handleOpen}
        readOnly
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        slotProps={{
          paper: {
            sx: {
              py: 1,
              px: 2,
              borderRadius: 2,
              width: 460,
              "& .rdp, & .rdp-root": {
                "--rdp-cell-size": "34px",
                "--rdp-accent-color": "#2d9d78",
                "--rdp-accent-background-color":
                  theme.palette.mode === "light"
                    ? "rgba(45, 157, 120, 0.12)"
                    : "rgba(45, 157, 120, 0.15)",
                fontSize: "14px",
                color: theme.palette.text.primary,
              },
              "& .rdp-root": {
                "--rdp-accent-color": "#2d9d78",
                "--rdp-accent-background-color":
                  theme.palette.mode === "light"
                    ? "rgba(45, 157, 120, 0.12)"
                    : "rgba(45, 157, 120, 0.15)",
              },
              "& .rdp-months": {
                fontSize: "14px",
              },
              "& .rdp-caption_label": {
                fontSize: "15px",
                fontWeight: 600,
                color: theme.palette.text.primary,
              },
              "& .rdp-head_cell": {
                fontSize: "13px",
                fontWeight: 500,
                color: theme.palette.text.secondary,
              },
              "& .rdp-cell": {
                fontSize: "12px",
              },
              "& .rdp-day": {
                fontSize: "14px",
                height: "34px",
                width: "34px",
                padding: "0 !important",
                borderRadius: "6px",
                transition: "all 0.2s ease",
              },
              "& .rdp-day_selected, & .rdp-day_selected:focus, & .rdp-day_selected:hover":
                {
                  backgroundColor: "#2d9d78 !important",
                  color: "#ffffff !important",
                  fontWeight: 600,
                },
              "& .rdp-day_range_middle": {
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "rgba(45, 157, 120, 0.12)"
                    : "rgba(45, 157, 120, 0.15)",
                color: `${theme.palette.text.primary} !important`,
              },
              "& .rdp-day_range_start, & .rdp-day_range_end": {
                backgroundColor: "#2d9d78 !important",
                color: "#ffffff !important",
                fontWeight: 600,
              },
              "& .rdp-day:hover:not(.rdp-day_selected)": {
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "rgba(45, 157, 120, 0.1)"
                    : "rgba(45, 157, 120, 0.12)",
              },
              "& .rdp-button:hover:not([disabled])": {
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "rgba(45, 157, 120, 0.1)"
                    : "rgba(45, 157, 120, 0.12)",
              },
              "& .rdp-nav_button, & .rdp-nav_button:hover, & .rdp-nav_button:focus":
                {
                  color: "#2d9d78 !important",
                  "&:hover": {
                    backgroundColor:
                      theme.palette.mode === "light"
                        ? "rgba(45, 157, 120, 0.1)"
                        : "rgba(45, 157, 120, 0.12)",
                  },
                },
              "& .rdp-nav_button svg": {
                color: "#2d9d78 !important",
                fill: "#2d9d78 !important",
              },
              "& button": {
                color: theme.palette.text.primary,
              },
              "& .rdp-button_reset": {
                color: theme.palette.text.primary,
              },
            },
          },
        }}
      >
        <Box sx={{ display: "flex", gap: 1.5, height: "100%" }}>
          {/* 左邊快捷選擇 */}
          <Stack
            sx={{
              justifyContent: "space-evenly",
              minHeight: "280px",
            }}
          >
            <Button
              variant={activeQuickSelect === "today" ? "contained" : "outlined"}
              size="small"
              onClick={quickSelect.today}
              sx={{
                fontSize: "13px",
                py: 0.75,
                ...(activeQuickSelect === "today" &&
                  theme.palette.mode === "light" && {
                    color: "#ffffff !important",
                  }),
              }}
            >
              {t("movieJournal.today")}
            </Button>
            <Button
              variant={
                activeQuickSelect === "yesterday" ? "contained" : "outlined"
              }
              size="small"
              onClick={quickSelect.yesterday}
              sx={{
                fontSize: "13px",
                py: 0.75,
                ...(activeQuickSelect === "yesterday" &&
                  theme.palette.mode === "light" && {
                    color: "#ffffff !important",
                  }),
              }}
            >
              {t("movieJournal.yesterday")}
            </Button>
            <Button
              variant={
                activeQuickSelect === "lastWeek" ? "contained" : "outlined"
              }
              size="small"
              onClick={quickSelect.lastWeek}
              sx={{
                fontSize: "13px",
                py: 0.75,
                ...(activeQuickSelect === "lastWeek" &&
                  theme.palette.mode === "light" && {
                    color: "#ffffff !important",
                  }),
              }}
            >
              {t("movieJournal.lastWeek")}
            </Button>
            <Button
              variant={
                activeQuickSelect === "lastMonth" ? "contained" : "outlined"
              }
              size="small"
              onClick={quickSelect.lastMonth}
              sx={{
                fontSize: "13px",
                py: 0.75,
                ...(activeQuickSelect === "lastMonth" &&
                  theme.palette.mode === "light" && {
                    color: "#ffffff !important",
                  }),
              }}
            >
              {t("movieJournal.lastMonth")}
            </Button>
          </Stack>

          {/* 右側 DayPicker Range */}
          <Box
            sx={{
              "& .rdp": {
                "--rdp-accent-color": "#2d9d78",
                "--rdp-accent-background-color":
                  theme.palette.mode === "light"
                    ? "rgba(45, 157, 120, 0.12)"
                    : "rgba(45, 157, 120, 0.15)",
              },
            }}
          >
            <DayPicker
              mode="range"
              selected={{
                from: selectedRange.from?.toDate(),
                to: selectedRange.to?.toDate() ?? undefined,
              }}
              onSelect={handleRangeSelect}
              numberOfMonths={1}
            />
          </Box>
        </Box>
      </Popover>
    </Box>
  );
};

export default JournalDateMenu;
