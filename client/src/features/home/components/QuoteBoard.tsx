import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomSearchBar from "src/globalComponents/CustomSearchBar";
import QuoteItem from "./QuoteItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { JournalFormData } from "../pages/EditJournalPage";
import { Quote } from "src/generated/graphql";
import InboxIcon from "@mui/icons-material/Inbox";
interface QuoteBoardProps {
  quote: Quote[];
  setFormData?: React.Dispatch<React.SetStateAction<JournalFormData>>;
  readOnly?: boolean;
}

const QuoteBoard: React.FC<QuoteBoardProps> = ({
  quote,
  setFormData,
  readOnly,
}) => {
  const handleAddQuote = () => {
    if (!setFormData) return;
    setFormData((prev) => ({
      ...prev,
      quote: [
        ...prev.quote,
        {
          name: "",
          content: "",
          backgroundColor: "#1e1e1e",
          textColor: "#ffffff",
        },
      ],
    }));
  };

  const handleDeleteQuote = (index: number) => {
    if (!setFormData) return;
    setFormData((prev) => ({
      ...prev,
      quote: prev.quote.filter((_, i) => i !== index),
    }));
  };

  const handleUpdateQuote = (index: number, updatedQuote: Partial<Quote>) => {
    if (!setFormData) return;
    setFormData((prev) => ({
      ...prev,
      quote: prev.quote.map((q, i) =>
        i === index ? { ...q, ...updatedQuote } : q
      ),
    }));
  };

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
      {/* 標題區 */}
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ marginRight: "15px" }}>
            <Typography variant="subtitle1" fontSize="18px">
              經典臺詞
            </Typography>
            <Typography variant="subtitle2">
              共{" "}
              <Box component="span" fontSize="20px">
                {quote.length}
              </Box>{" "}
              篇内容
            </Typography>
          </Box>
          {!readOnly && (
            <Tooltip title="新增臺詞">
              <IconButton onClick={handleAddQuote}>
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <CustomSearchBar />
      </Box>

      {/* 內容區 */}
      {quote.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "gray",
            height: "165px",
          }}
        >
          <InboxIcon sx={{ fontSize: 60, mb: 1 }} />
          <Typography variant="body1">
            暫無內容，點擊上方「＋」新增台詞
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            mt: 2,
            justifyContent: "flex-start",
          }}
        >
          {quote.map((item, index) => (
            <Box
              key={index}
              sx={{
                width: "32%",
                minWidth: "280px",
                boxSizing: "border-box",
              }}
            >
              <QuoteItem
                quote={item}
                onUpdate={(updatedQuote) =>
                  handleUpdateQuote(index, updatedQuote)
                }
                onDelete={() => handleDeleteQuote(index)}
                readOnly={readOnly}
              />
            </Box>
          ))}
        </Box>
      )}

      {/* 展開按鈕 */}
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
