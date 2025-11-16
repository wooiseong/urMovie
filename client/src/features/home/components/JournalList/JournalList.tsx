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

interface JournalListProps {
  journals: NonNullable<GetJournalsQuery["journals"]>;
}

const JournalList = ({ journals }: JournalListProps) => {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);

  // indicate begin or end of the list
  const [isAtBeginning, setIsAtBeginning] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  return (
    <Box position="relative" width="100%" sx={{ py: 2 }}>
      {/* prev button */}
      <IconButton
        ref={prevRef}
        className="journal-prev-btn"
        sx={{
          position: "absolute",
          left: -8,
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

      {/* next button */}
      <IconButton
        ref={nextRef}
        className="journal-next-btn"
        sx={{
          position: "absolute",
          right: -8,
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
        // 在 Swiper 初始化前，把 ref 裝回 swiper.params.navigation，然後 init & update
        onBeforeInit={(swiper: any) => {
          if (!swiper.params) return;
          if (!swiper.params.navigation) swiper.params.navigation = {};
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          // 必須呼叫 init/update 才會綁定上去
          try {
            // navigation 可能存在於 swiper
            swiper.navigation &&
              swiper.navigation.init &&
              swiper.navigation.init();
            swiper.navigation &&
              swiper.navigation.update &&
              swiper.navigation.update();
          } catch (err) {
            // 忽略初始化錯誤（防禦式）
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
            <JournalItem journal={journal} />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default JournalList;
