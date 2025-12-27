import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  useTheme,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CustomSearchBar from "src/globalComponents/CustomSearchBar";
import QuoteItem from "./QuoteItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { JournalFormData } from "../pages/EditJournalPage";
import { Quote } from "src/generated/graphql";
import InboxIcon from "@mui/icons-material/Inbox";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "src/store/hook";

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
  const [showLimitWarning, setShowLimitWarning] = useState(false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const userRole = useAppSelector((state) => state.user.role);
  const theme = useTheme();

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

    // Check if user role is "user" and limit to 3 quotes
    if (userRole === "user" && quote.length >= 3) {
      setShowLimitWarning(true);
      return;
    }

    // Set default colors based on theme mode
    const defaultBgColor =
      theme.palette.mode === "dark" ? "#606060" : "#e0e0e0";
    const defaultTextColor =
      theme.palette.mode === "dark" ? "#FFFFFF" : "#000000";

    setFormData((prev) => ({
      ...prev,
      quote: [
        ...prev.quote,
        {
          name: "",
          content: "",
          backgroundColor: defaultBgColor,
          textColor: defaultTextColor,
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
        backgroundColor: "background.paper",
        marginTop: 3,
        px: { xs: 2, sm: 2.5, md: 3 },
        pt: 2,
        pb: 4,
        borderRadius: 2,
        position: "relative",
        boxShadow: 2,
      }}
    >
      {/* Title and Search Section */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          gap: 2,
          mb: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="subtitle1"
              fontSize={{ xs: "16px", md: "18px" }}
              fontWeight={600}
            >
              {t("home.classicLines")}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{ fontSize: { xs: "0.75rem", md: "0.875rem" } }}
            >
              {t("home.totalEntries")}{" "}
              <Box
                component="span"
                fontSize={{ xs: "18px", md: "20px" }}
                fontWeight="bold"
              >
                {searchTerm.trim() ? filteredQuotes.length : quote.length}
              </Box>{" "}
              {t("home.entries")}
              {searchTerm.trim() && quote.length !== filteredQuotes.length && (
                <Box component="span" sx={{ color: "text.secondary", ml: 0.5 }}>
                  ({t("home.totalEntries")} {quote.length} {t("home.entries")})
                </Box>
              )}
            </Typography>
          </Box>
          {!readOnly && (
            <Tooltip title={t("home.addQuote")}>
              <IconButton onClick={handleAddQuote} color="primary" size="small">
                <AddCircleIcon />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        <Box
          sx={{
            width: { xs: "100%", md: "300px" },
            minWidth: { xs: "100%", md: "250px" },
          }}
        >
          <CustomSearchBar
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t("home.searchQuotePlaceholder")}
          />
        </Box>
      </Box>

      {/* 內容區 */}
      {quote.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "text.secondary",
            height: "165px",
          }}
        >
          <InboxIcon sx={{ fontSize: 60, mb: 1 }} />
          <Typography variant="body1">{t("home.noContentYet")}</Typography>
        </Box>
      ) : filteredQuotes.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "text.secondary",
            height: "165px",
          }}
        >
          <InboxIcon sx={{ fontSize: 60, mb: 1 }} />
          <Typography variant="body1">
            {t("home.noMatchingQuotes")}
            {searchTerm}"
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
                  width: {
                    xs: "100%",
                    sm: "calc(50% - 8px)",
                    md: "calc(33.333% - 11px)",
                    lg: "calc(33.333% - 11px)",
                  },
                  minWidth: { xs: "100%", sm: "250px" },
                  maxWidth: { xs: "100%", sm: "none" },
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
          backgroundColor: "background.default",
          padding: "0px 10px",
          borderRadius: "8px",
        }}
      >
        <KeyboardArrowDownIcon fontSize="medium" />
      </IconButton>

      {/* Quote Limit Warning Modal */}
      <Dialog
        open={showLimitWarning}
        onClose={() => setShowLimitWarning(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1,
          },
        }}
      >
        <DialogTitle
          sx={{ textAlign: "center", fontWeight: 600, fontSize: "1.25rem" }}
        >
          {t("home.quoteLimitTitle")}
        </DialogTitle>
        <DialogContent>
          <Typography
            variant="body1"
            sx={{ textAlign: "center", color: "text.secondary", mb: 2 }}
          >
            {t("home.quoteLimitReached")}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pb: 3, gap: 1 }}>
          <Button variant="outlined" onClick={() => setShowLimitWarning(false)}>
            {t("global.cancel")}
          </Button>
          <Button
            variant="contained"
            startIcon={<OfflineBoltIcon />}
            onClick={() => {
              setShowLimitWarning(false);
              navigate("/membership");
            }}
            sx={{
              color: "white",
              backgroundColor: "secondary.main",
              "&:hover": {
                backgroundColor: "secondary.dark",
              },
            }}
          >
            {t("navBar.upgrade")}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default QuoteBoard;
