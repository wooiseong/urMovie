import React, { useRef, useState } from "react";
import { Box, IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import JournalItem from "./JournalItem";
import { GetJournalsQuery } from "src/generated/graphql";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/store/hook";
import { setSelectedJournal } from "src/store/modules/journalSlice";

interface JournalListProps {
  journals: NonNullable<GetJournalsQuery["journals"]["journals"]>;
}

const JournalList = ({ journals }: JournalListProps) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // indicate begin or end of the list
  const [isAtBeginning, setIsAtBeginning] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  // Navigate to journal details
  const handleJournalClick = (journal: any) => {
    dispatch(setSelectedJournal(journal));
    navigate(`/journalDetails/${journal.id}`);
  };

  return (
    <Box position="relative" width="100%" sx={{ py: 2 }}>
      {/* Prev button */}
      <IconButton
        ref={prevRef}
        className="journal-prev-btn"
        sx={{
          position: "absolute",
          left: -15,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
          backgroundColor: "rgba(255,255,255,0.2)",
          boxShadow: 1,
          "&:hover": { backgroundColor: "rgba(255,255,255,0.4)" },
          visibility: isAtBeginning ? "hidden" : "visible",
          pointerEvents: isAtBeginning ? "none" : "auto",
        }}
        aria-label="previous"
      >
        <ChevronLeftIcon />
      </IconButton>

      {/* Next button */}
      <IconButton
        ref={nextRef}
        className="journal-next-btn"
        sx={{
          position: "absolute",
          right: -15,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 2,
          backgroundColor: "rgba(255,255,255,0.2)",
          boxShadow: 1,
          "&:hover": { backgroundColor: "rgba(255,255,255,0.4)" },
          visibility: isAtEnd ? "hidden" : "visible",
          pointerEvents: isAtEnd ? "none" : "auto",
        }}
        aria-label="next"
      >
        <ChevronRightIcon />
      </IconButton>

      {/* Swiper */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView="auto"
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        grabCursor={false}
        style={{
          padding: "0 20px",
        }}
        onBeforeInit={(swiper: any) => {
          if (!swiper.params) return;
          if (!swiper.params.navigation) swiper.params.navigation = {};
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          try {
            swiper.navigation?.init?.();
            swiper.navigation?.update?.();
          } catch (err) {
            console.warn("swiper navigation init error", err);
          }
        }}
        onSlideChange={(swiper: SwiperClass) => {
          setIsAtBeginning(swiper.isBeginning);
          setIsAtEnd(swiper.isEnd);
        }}
        onReachBeginning={() => setIsAtBeginning(true)}
        onReachEnd={() => setIsAtEnd(true)}
        onFromEdge={(swiper: SwiperClass) => {
          setIsAtBeginning(swiper.isBeginning);
          setIsAtEnd(swiper.isEnd);
        }}
      >
        {journals?.map((journal) => (
          <SwiperSlide
            key={journal.id}
            style={{
              width: "280px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <JournalItem
              journal={journal}
              onClick={() => handleJournalClick(journal)}
              isListView={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default JournalList;
