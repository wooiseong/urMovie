import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomSearchBar from "src/globalComponents/CustomSearchBar";
import QuoteItem from "./QuoteItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { JournalFormData } from "../pages/EditJournalPage";
import { Quote } from "src/generated/graphql";
import InboxIcon from "@mui/icons-material/Inbox";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";

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
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useTranslation();

  // Filter quotes based on search term (search in name and content)
  const filteredQuotes = useMemo(() => {
    if (!searchTerm.trim()) {
      return quote;
    }

    const lowerSearch = searchTerm.toLowerCase();
    return quote.filter((q) => {
      const matchesName = q.name?.toLowerCase().includes(lowerSearch);
      const matchesContent = q.content?.toLowerCase().includes(lowerSearch);
      return matchesName || matchesContent;
    });
  }, [quote, searchTerm]);

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
              {t("home.classicLines")}
            </Typography>
            <Typography variant="subtitle2">
              {t("home.totalEntries")}{" "}
              <Box component="span" fontSize="20px">
                {searchTerm.trim() ? filteredQuotes.length : quote.length}
              </Box>{" "}
              {t("home.entries")}
              {searchTerm.trim() && quote.length !== filteredQuotes.length && (
                <Box component="span" sx={{ color: "#aaa", ml: 0.5 }}>
                  ({t("home.totalEntries")} {quote.length} {t("home.entries")})
                </Box>
              )}
            </Typography>
          </Box>
          {!readOnly && (
            <Tooltip title={t("home.addQuote")}>
              <IconButton onClick={handleAddQuote}>
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <CustomSearchBar
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t("home.searchQuotePlaceholder")}
        />
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
            {t("home.noContentYet")}
          </Typography>
        </Box>
      ) : filteredQuotes.length === 0 ? (
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
            {t("home.noMatchingQuotes")}{searchTerm}"
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
          {filteredQuotes.map((item, index) => {
            // Find the original index in the quote array
            const originalIndex = quote.findIndex((q) => q === item);
            return (
              <Box
                key={originalIndex}
                sx={{
                  width: "32%",
                  minWidth: "280px",
                  boxSizing: "border-box",
                }}
              >
                <QuoteItem
                  quote={item}
                  onUpdate={(updatedQuote) =>
                    handleUpdateQuote(originalIndex, updatedQuote)
                  }
                  onDelete={() => handleDeleteQuote(originalIndex)}
                  readOnly={readOnly}
                />
              </Box>
            );
          })}
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
