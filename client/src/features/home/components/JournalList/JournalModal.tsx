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

import { Journal } from "src/generated/graphql";
import { useTiptapHtml } from "src/globalHooks/useTipTapHtml";
import QuoteBoard from "../QuoteBoard";
import CustomActionButton from "src/globalComponents/CustomActionButton";
import { useTranslation } from "react-i18next";

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
  width: "80%",
  maxWidth: 1100,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 2,
  p: 2,
  border: "none",
  outline: "none",
};

const JournalModal: React.FC<JournalModalProps> = ({
  open,
  onClose,
  journal,
  onEdit,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [showExpandBtn, setShowExpandBtn] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const journalContent = useTiptapHtml(journal?.content, false);
  const { t } = useTranslation();
  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight || "16");
      const maxLines = 4;
      if (el.scrollHeight > lineHeight * maxLines) {
        setShowExpandBtn(true);
      }
    }
  }, [journalContent]);

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        {/* Top-right edit button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
          <CustomActionButton
            icon={<EditIcon />}
            label={t("home.edit")}
            sx={{}}
          />
        </Box>

        {/* Image + info row */}
        <Box sx={{ display: "flex", mb: 2 }}>
          {journal?.image && (
            <CardMedia
              component="img"
              image={journal.image}
              alt={journal.movieName}
              sx={{ width: 200, height: 200, borderRadius: 1, mr: 2 }}
            />
          )}
          <Box sx={{ flex: 1 }}>
            <Typography variant="h5" fontWeight={600}>
              {journal?.movieName}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Director: {journal?.director?.join(", ")}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Actor: {journal?.actor?.join(", ")}
            </Typography>
            {journal?.tag && journal?.tag?.length > 0 && (
              <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {journal.tag.map((t: any) => (
                  <Chip
                    key={t.id}
                    label={t.name}
                    size="small"
                    sx={{ backgroundColor: "#404040", color: "#fff" }}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Box>

        {/* Journal content like JournalItem */}
        <Box
          ref={contentRef}
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: expanded ? "none" : 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {journalContent}
        </Box>

        {showExpandBtn && (
          <IconButton size="small" onClick={toggleExpand} sx={{ mt: 1 }}>
            {expanded ? "Collapse" : "Expand"}
          </IconButton>
        )}
        {journal?.quote && journal.quote.length > 0 && (
          <QuoteBoard quote={journal.quote} readOnly />
        )}
      </Box>
    </Modal>
  );
};

export default JournalModal;
