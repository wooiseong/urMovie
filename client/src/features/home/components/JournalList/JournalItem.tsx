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
import dayjs from "dayjs";
import defaultBackground from "src/assets/images/default-background.png";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

import { GetJournalQuery, GetJournalsQuery } from "src/generated/graphql";
import { useTiptapHtml } from "src/globalHooks/useTipTapHtml";
import JournalMenu from "./JournalMenu";

interface JournalItemProps {
  journal: NonNullable<GetJournalsQuery["journals"]>[number];
  onClick?: () => void;
  isListView?: boolean; // New prop for list view
}

const JournalItem = ({ journal, onClick, isListView }: JournalItemProps) => {
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
      onClick={onClick}
      sx={{
        width: isListView ? "100%" : 280,
        minHeight: isListView ? 150 : "auto",
        maxHeight: isListView ? 150 : 600,
        borderRadius: 1.5,
        position: "relative",
        boxShadow: 2,
        flexShrink: 0,
        mb: 2,
        cursor: "pointer",
        overflow: "visible", // Ensure popup is not clipped
        transition: "box-shadow 0.2s ease-in-out",
        "&:hover": {
          boxShadow: 4,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: isListView ? "row" : "column",
          height: "100%",
          // To ensure the card keeps its shape in grid view
          minHeight: isListView ? "100%" : 400,
          p: isListView ? 1.5 : 1.5,
          gap: isListView ? 2 : 0,
        }}
      >
        {/* 圖片 - Framed */}
        <Box
          sx={{
            width: isListView ? "150px" : "100%",
            height: isListView ? "120px" : "180px",
            flexShrink: 0,
            borderRadius: 1,
            overflow: "hidden",
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
            }}
            image={journal.image ?? defaultBackground}
            alt={journal.movieName}
          />
        </Box>
        <CardContent
          sx={{
            flexGrow: 1,
            position: "relative",
            width: "100%", // Let flexbox handle the width
            display: "flex",
            flexDirection: "column",
            justifyContent: isListView ? undefined : "space-between",
            p: isListView ? 1.5 : 2,
            pt: isListView ? 1.5 : 2,
            "&:last-child": {
              pb: isListView ? 1.5 : 2,
            },
          }}
        >
          <Box>
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
                sx={{
                  mt: 1,
                  mb: 1,
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark"
                      ? "rgba(255, 255, 255, 0.08)"
                      : "rgba(0, 0, 0, 0.06)",
                  color: "text.primary",
                  fontWeight: 500,
                  borderRadius: 1,
                }}
              />
            )}

            <Box
              ref={contentRef}
              sx={{
                display: "-webkit-box",
                WebkitLineClamp: expanded ? "none" : 2, // Reduced lines for list view
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                maxHeight: "3rem", // fallback for non-webkit browsers
              }}
            >
              {journalContent}
            </Box>
          </Box>

          {/* 展開/收起按鈕 */}
          {showExpandBtn &&
            !isListView && ( // Hide expand button in list view for simplicity
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand();
                }}
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
            sx={{
              marginTop: isListView ? "auto" : undefined,
              alignSelf: "flex-end", // Align date to bottom right in list view
              mt: 1, // Margin top for spacing
            }}
            textAlign="left"
          >
            <Typography variant="caption" color="text.disabled">
              {dayjs(journal.updatedAt).format("YYYY-MM-DD")}
            </Typography>
          </Box>
        </CardContent>
      </Box>
      {/* setting icon */}
      <JournalMenu journal={journal} />
    </Card>
  );
};

export default JournalItem;
