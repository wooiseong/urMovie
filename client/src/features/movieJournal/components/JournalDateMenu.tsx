import { useState } from "react";
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

const JournalDateMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { t } = useTranslation();

  // 起訖日期
  const [selectedRange, setSelectedRange] = useState<DayjsRange>({
    from: dayjs(),
    to: dayjs(),
  });

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);

  // react-day-picker 會傳回 DateRange< Date >
  const handleRangeSelect = (range: DateRange | undefined) => {
    if (range?.from) {
      setSelectedRange({
        from: dayjs(range.from),
        to: range.to ? dayjs(range.to) : null,
      });
    }
  };

  /** 快速選擇（全改成 Range） */
  const quickSelect = {
    today: () => setSelectedRange({ from: dayjs(), to: dayjs() }),

    yesterday: () => {
      const d = dayjs().subtract(1, "day");
      setSelectedRange({ from: d, to: d });
    },

    lastWeek: () =>
      setSelectedRange({
        from: dayjs().subtract(7, "day"),
        to: dayjs(),
      }),

    lastMonth: () =>
      setSelectedRange({
        from: dayjs().subtract(1, "month"),
        to: dayjs(),
      }),
  };

  return (
    <Box mt={2}>
      {/* <Button variant="outlined" onClick={handleOpen}>
        開啟詳細設定
      </Button> */}

      <CustomTextField
        icon={<DateRangeIcon />}
        label={t("home.movieName")}
        placeholder={t("home.movieName")}
        sx={{
          paddingLeft: "10px",
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#404040",
          },
        }}
        // onClick={handleOpen}
      ></CustomTextField>

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
              今天
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={quickSelect.yesterday}
            >
              昨天
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={quickSelect.lastWeek}
            >
              過去 1 星期
            </Button>
            <Button
              variant="outlined"
              size="small"
              onClick={quickSelect.lastMonth}
            >
              過去 1 個月
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
