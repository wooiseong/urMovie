import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomSearchBar from "src/globalComponents/CustomSearchBar";
import QuoteItem from "./QuoteItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const QuoteBoard = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#404040",
        marginTop: "30px",
        px: "20px",
        pt: "10px",
        pb: "30px",
        borderRadius: "10px",
        position: "relative",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box>
            <Typography variant="subtitle1" fontSize="18px">
              經典臺詞
            </Typography>
            <Typography variant="subtitle2">
              共{" "}
              <Box component="span" fontSize="20px">
                10
              </Box>{" "}
              篇内容
            </Typography>
          </Box>
          <Tooltip title="新增臺詞">
            <IconButton>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <CustomSearchBar />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 2,
          mt: 2,
        }}
      >
        <Box sx={{ flex: "1 1 calc(33.33% - 16px)" }}>
          <QuoteItem />
        </Box>
        <Box sx={{ flex: "1 1 calc(33.33% - 16px)" }}>
          <QuoteItem />
        </Box>
        <Box sx={{ flex: "1 1 calc(33.33% - 16px)" }}>
          <QuoteItem />
        </Box>
      </Box>
      <IconButton
        sx={{
          position: "absolute",
          bottom: "-3%",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "#606060",
          padding: "0px 10px",
          borderRadius: "8px",
        }}
      >
        <KeyboardArrowDownIcon fontSize="medium" />
      </IconButton>
    </Box>
  );
};

export default QuoteBoard;
