import { useState, useEffect } from "react";
import { Box, Button, Popover, Stack } from "@mui/material";
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
  onDateChange: (startDate: string | undefined, endDate: string | undefined) => void;
}

const JournalDateMenu = ({ startDate, endDate, onDateChange }: JournalDateMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { t } = useTranslation();

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

  return (
    <Box mt={2}>
      {/* <Button variant="outlined" onClick={handleOpen}>
        開啟詳細設定
      </Button> */}

      <CustomTextField
        icon={<DateRangeIcon />}
        label={t("movieJournal.dateRange")}
        placeholder={t("movieJournal.selectDateRange")}
        value={
          selectedRange.from && selectedRange.to
            ? `${selectedRange.from.format("YYYY-MM-DD")} ~ ${selectedRange.to.format("YYYY-MM-DD")}`
            : ""
        }
        sx={{
          paddingLeft: "10px",
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#404040",
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
              p: 2,
              borderRadius: 2,
              width: 480,
            },
          },
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          {/* 左邊快捷選擇 */}
          <Stack spacing={1}>
            <Button variant="outlined" size="small" onClick={quickSelect.today}>
              {t("movieJournal.today")}
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={quickSelect.yesterday}
            >
              {t("movieJournal.yesterday")}
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={quickSelect.lastWeek}
            >
              {t("movieJournal.lastWeek")}
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={quickSelect.lastMonth}
            >
              {t("movieJournal.lastMonth")}
            </Button>
          </Stack>

          {/* 右側 DayPicker Range */}
          <Box>
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
