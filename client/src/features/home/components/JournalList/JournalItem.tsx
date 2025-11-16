import { useState, useRef, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Typography,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import JournalMenu from "./JournalMenu";
import { GetJournalQuery, GetJournalsQuery } from "src/generated/graphql";
import { useTiptapHtml } from "src/globalHooks/useTipTapHtml";

interface JournalItemProps {
  journal: NonNullable<GetJournalsQuery["journals"]>[number];
}

const JournalItem = ({ journal }: JournalItemProps) => {
  const [expanded, setExpanded] = useState(false);
  const [showExpandBtn, setShowExpandBtn] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const journalContent = useTiptapHtml(journal.content, false);
  useEffect(() => {
    const el = contentRef.current;
    if (el) {
      // 判斷內容實際高度是否超過 clamp 限制
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight || "16");
      const maxLines = 3;
      if (el.scrollHeight > lineHeight * maxLines) {
        setShowExpandBtn(true);
      }
    }
  }, []);

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <Card
      sx={{
        width: 280,
        minHeight: 400,
        maxHeight: 600,
        borderRadius: 3,
        position: "relative",
        boxShadow: 3,
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        mb: 2,
      }}
    >
      {/* setting icon */}
      <JournalMenu journalId={journal.id} />

      {/* 圖片 */}
      <CardMedia
        component="img"
        height="160"
        image={journal.image ?? undefined}
        alt={journal.movieName}
      />
      <CardContent sx={{ flexGrow: 1, position: "relative" }}>
        <Typography variant="h6" fontWeight={600}>
          {journal.movieName}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          {journal.director}
        </Typography>
        {journal.tag && journal.tag.length > 0 && (
          <Chip
            label={journal.tag?.map((t) => t.name).join(", ") ?? ""}
            size="small"
            sx={{ mt: 1, mb: 1, backgroundColor: "#404040" }}
          />
        )}

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

        {/* 展開/收起按鈕 */}
        {showExpandBtn && (
          <IconButton
            size="small"
            onClick={toggleExpand}
            sx={{
              position: "absolute",
              bottom: 0,
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        )}

        {/* 日期 */}
        <Box
          sx={{ position: "absolute", right: "3%", bottom: "1%" }}
          textAlign="left"
        >
          <Typography variant="caption" color="text.disabled">
            {journal.date}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JournalItem;
