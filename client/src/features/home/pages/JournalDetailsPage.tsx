import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Chip,
  CardMedia,
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "src/store/hook";
import { useTiptapHtml } from "src/globalHooks/useTipTapHtml";
import QuoteBoard from "../components/QuoteBoard";
import CustomActionButton from "src/globalComponents/CustomActionButton";
import { useTranslation } from "react-i18next";
import { setSelectedJournal } from "src/store/modules/journalSlice";
import { useDeleteJournalMutation } from "src/generated/graphql";
import { useGraphQLErrorMessage } from "src/globalHooks/useGraphQLErrorMessage";
import toast from "react-hot-toast";
import ConfirmDialog from "src/globalComponents/ConfirmDialog";

const JournalDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const getGraphQLErrorMessage = useGraphQLErrorMessage();
  const journal = useAppSelector((state) => state.journal.selectedJournal);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const journalContent = useTiptapHtml(journal?.content, false);

  const [deleteJournal] = useDeleteJournalMutation({
    onCompleted: () => {
      toast.success("日誌已成功刪除！");
      dispatch(setSelectedJournal(null));
      navigate(-1);
    },
    onError: (err) => {
      const msg = getGraphQLErrorMessage(err);
      toast.error(msg);
    },
  });

  const handleEdit = () => {
    if (journal) {
      navigate("/editJournal");
    }
  };

  const handleBack = () => {
    dispatch(setSelectedJournal(null));
    navigate(-1);
  };

  const handleDelete = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (journal) {
      deleteJournal({
        variables: { id: journal.id },
        update(cache) {
          const normalizedId = cache.identify({
            id: journal.id,
            __typename: "Journal",
          });
          cache.evict({ id: normalizedId });
          cache.gc();
        },
      });
    }
    setConfirmDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setConfirmDialogOpen(false);
  };

  if (!journal) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography>No journal selected</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {/* Header with back, edit and delete buttons */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pt: 1,
          pb: 3,
        }}
      >
        <IconButton
          onClick={handleBack}
          sx={{
            "&:hover": { backgroundColor: "rgba(0,0,0,0.05)" },
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Box sx={{ display: "flex", gap: 2 }}>
          <CustomActionButton
            icon={<EditIcon />}
            label={t("home.edit")}
            onClick={handleEdit}
            sx={{}}
          />
          <CustomActionButton
            icon={<DeleteOutlineIcon />}
            label={t("home.delete")}
            onClick={handleDelete}
            color="error"
            sx={{}}
          />
        </Box>
      </Box>

      {/* Top section: Image + Movie Info */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 3, md: 4 },
          mb: 4,
        }}
      >
        {/* Image */}
        {journal.image && (
          <Box
            sx={{
              width: { xs: "100%", sm: "200px", md: "250px" },
              height: { xs: "auto", sm: "300px", md: "350px" },
              flexShrink: 0,
              mr: { sm: 2, md: 3 },
              mb: { xs: 3, sm: 0 },
              mx: { xs: "auto", sm: 0 },
              maxWidth: { xs: "300px", sm: "100%" },
            }}
          >
            <CardMedia
              component="img"
              image={journal.image}
              alt={journal.movieName}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: { xs: "contain", sm: "cover" },
                borderRadius: 2,
                bgcolor: "background.default",
              }}
            />
          </Box>
        )}

        {/* Movie Info - Name, Director, Actor, Tags */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            gap: 2,
          }}
        >
          {/* Movie Name */}
          <Typography variant="h4" fontWeight={700}>
            {journal.movieName}
          </Typography>

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
              {journal.director?.join(", ") || "-"}
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
              {journal.actor?.join(", ") || "-"}
            </Typography>
          </Box>

          {/* Tags */}
          {journal.tag && journal.tag.length > 0 && (
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

      {/* Content Section */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{
            textTransform: "uppercase",
            fontWeight: 600,
            display: "block",
            mb: 2,
          }}
        >
          {t("home.content") || "Content"}
        </Typography>
        <Box
          sx={{
            "& p": {
              mb: 1,
            },
          }}
        >
          {journalContent}
        </Box>
      </Box>

      {/* Divider */}
      {journal.quote && journal.quote.length > 0 && <Divider sx={{ mb: 4 }} />}

      {/* Quote Board */}
      {journal.quote && journal.quote.length > 0 && (
        <Box>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{
              textTransform: "uppercase",
              fontWeight: 600,
              display: "block",
              mb: 2,
            }}
          >
            {t("home.quotes") || "Quotes"}
          </Typography>
          <QuoteBoard quote={journal.quote} readOnly />
        </Box>
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={confirmDialogOpen}
        title={t("home.deleteJournalTitle") || "Delete Journal"}
        message={
          t("home.deleteJournalMessage") ||
          "Are you sure you want to delete this journal? This action cannot be undone."
        }
        confirmText={t("home.delete") || "Delete"}
        cancelText={t("home.cancel") || "Cancel"}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmColor="error"
      />
    </Box>
  );
};

export default JournalDetailsPage;
