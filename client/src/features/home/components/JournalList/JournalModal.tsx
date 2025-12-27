import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  Box,
  IconButton,
  Typography,
  Chip,
  CardMedia,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

import { Journal } from "src/generated/graphql";
import { useTiptapHtml } from "src/globalHooks/useTipTapHtml";
import QuoteBoard from "../QuoteBoard";
import CustomActionButton from "src/globalComponents/CustomActionButton";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/store/hook";
import { setSelectedJournal } from "src/store/modules/journalSlice";

interface JournalModalProps {
  open: boolean;
  onClose: () => void;
  journal: Journal | null;
  onEdit?: () => void;
}

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {
    xs: "calc(100% - 32px)", // 320px+ screens
    sm: "90%", // 600px+ screens
    md: "85%", // 900px+ screens
    lg: "80%", // 1200px+ screens
  },
  maxWidth: 1100,
  maxHeight: "90vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: { xs: 2, sm: 3, md: 4 },
  border: "none",
  outline: "none",
  overflow: "auto",
  // Custom scrollbar styling
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: "transparent",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: "4px",
    "&:hover": {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
  },
  // For Firefox
  scrollbarWidth: "thin",
  scrollbarColor: "rgba(0, 0, 0, 0.2) transparent",
};

const JournalModal: React.FC<JournalModalProps> = ({
  open,
  onClose,
  journal,
  onEdit,
}) => {
  const journalContent = useTiptapHtml(journal?.content, false);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleEdit = () => {
    if (journal) {
      dispatch(setSelectedJournal(journal));
      navigate("/editJournal");
      onClose();
    }
    if (onEdit) {
      onEdit();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        {/* Header with close and edit buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" fontWeight={700} sx={{ flex: 1 }}>
            {journal?.movieName}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <CustomActionButton
              icon={<EditIcon />}
              label={t("home.edit")}
              onClick={handleEdit}
              sx={{}}
            />
            <IconButton
              onClick={onClose}
              sx={{
                "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Main content area */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", lg: "row" },
            gap: { xs: 3, lg: 4 },
            mb: 3,
          }}
        >
          {/* Left side: Image + Info */}
          <Box
            sx={{
              width: { xs: "100%", lg: "380px" },
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {/* Image */}
            {journal?.image && (
              <Box
                sx={{
                  width: "100%",
                  minHeight: { xs: "250px", sm: "300px", lg: "300px" },
                  maxHeight: { xs: "300px", sm: "350px", lg: "400px" },
                }}
              >
                <CardMedia
                  component="img"
                  image={journal.image}
                  alt={journal.movieName}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    borderRadius: 2,
                    bgcolor: "background.default",
                  }}
                />
              </Box>
            )}

            {/* Info section */}
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {/* Director */}
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ textTransform: "uppercase", fontWeight: 600 }}
                >
                  {t("home.director")}
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {journal?.director?.join(", ") || "-"}
                </Typography>
              </Box>

              {/* Actor */}
              <Box>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ textTransform: "uppercase", fontWeight: 600 }}
                >
                  {t("home.actor")}
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {journal?.actor?.join(", ") || "-"}
                </Typography>
              </Box>

              {/* Tags */}
              {journal?.tag && journal?.tag?.length > 0 && (
                <Box>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      textTransform: "uppercase",
                      fontWeight: 600,
                      display: "block",
                      mb: 1,
                    }}
                  >
                    {t("home.tags") || "Tags"}
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {journal.tag.map((t: any) => (
                      <Chip
                        key={t.id}
                        label={t.name}
                        size="small"
                        sx={{
                          backgroundColor: (theme) =>
                            theme.palette.mode === "dark"
                              ? "rgba(255, 255, 255, 0.08)"
                              : "rgba(0, 0, 0, 0.06)",
                          color: "text.primary",
                          fontWeight: 500,
                          borderRadius: 1,
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>

          {/* Right side: Content */}
          <Box
            sx={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                textTransform: "uppercase",
                fontWeight: 600,
                display: "block",
                mb: 1,
              }}
            >
              {t("home.content") || "Content"}
            </Typography>
            <Box
              sx={{
                minHeight: { xs: "auto", lg: "200px" },
                maxHeight: { xs: "none", lg: "500px" },
                overflow: { xs: "visible", lg: "auto" },
                pr: { xs: 0, lg: 1 },
                "& p": {
                  mb: 1,
                },
                // Custom scrollbar for content
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  borderRadius: "3px",
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                  },
                },
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(0, 0, 0, 0.2) transparent",
              }}
            >
              {journalContent}
            </Box>
          </Box>
        </Box>

        {/* Quote board */}
        {journal?.quote && journal.quote.length > 0 && (
          <Box>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                textTransform: "uppercase",
                fontWeight: 600,
                display: "block",
                mb: 1,
              }}
            >
              {t("home.quotes") || "Quotes"}
            </Typography>
            <QuoteBoard quote={journal.quote} readOnly />
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default JournalModal;
