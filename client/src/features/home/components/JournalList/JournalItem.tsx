import { useRef } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import defaultBackground from "src/assets/images/default-background.png";

import { GetJournalQuery, GetJournalsQuery } from "src/generated/graphql";
import { useTiptapHtml } from "src/globalHooks/useTipTapHtml";
import JournalMenu from "./JournalMenu";
import { useLocation } from "react-router-dom";

interface JournalItemProps {
  journal: NonNullable<GetJournalsQuery["journals"]>[number];
  onClick?: () => void;
  isListView?: boolean; // New prop for list view
}

const JournalItem = ({ journal, onClick, isListView }: JournalItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const journalContent = useTiptapHtml(journal.content, false);
  const { pathname } = useLocation();

  // pathname === "/movieJournal"
  // normalize if you want lowercase match
  const isMovieJournal = pathname.toLowerCase() === "/moviejournal";

  return (
    <Card
      onClick={onClick}
      sx={{
        width: isListView ? "100%" : 280,
        height: isListView ? 150 : 450,
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
            justifyContent: "space-between",
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

            {!isListView && (
              <Box
                ref={contentRef}
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  paddingRight: isMovieJournal ? 0 : 3,
                }}
              >
                {journalContent}
              </Box>
            )}
          </Box>

          {/* 日期 */}
          <Box
            sx={{
              mt: "auto",
              pt: 1,
              position: "absolute",
              right: isMovieJournal ? "1%" : "12%",
              bottom: isMovieJournal ? 0 : "10%",
            }}
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
