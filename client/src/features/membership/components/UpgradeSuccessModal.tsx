import React from "react";
import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface UpgradeSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 520,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 2,
  outline: "none",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

const swiperSlideStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  padding: "20px 40px",
  height: "100%", // <-- Fill modal height so centering works
  boxSizing: "border-box",
};

const UpgradeSuccessModal: React.FC<UpgradeSuccessModalProps> = ({
  open,
  onClose,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="upgrade-success-title"
      aria-describedby="upgrade-success-description"
    >
      <Box sx={modalStyle}>
        <style>
          {`
            .swiper-pagination-bullet {
              background-color: #aaa !important;
              width: 8px;
              height: 8px;
              opacity: 0.8;
            }
            .swiper-pagination-bullet-active {
              background-color: #720e9e !important;
              opacity: 1;
            }
            .swiper-button-prev-custom, .swiper-button-next-custom {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                z-index: 10;
                cursor: pointer;
                color: #720e9e;
                background-color: rgba(255,255,255,0.5);
                border-radius: 50%;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .swiper-button-prev-custom:hover, .swiper-button-next-custom:hover {
                background-color: rgba(255,255,255,0.8);
            }
            .swiper-button-prev-custom {
                left: 15px;
            }
            .swiper-button-next-custom {
                right: 15px;
            }
            .swiper-button-disabled {
                opacity: 0.35 !important;
                cursor: auto !important;
            }
          `}
        </style>

        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            zIndex: 20,
          }}
        >
          <CloseIcon />
        </IconButton>

        <Swiper
          modules={[Pagination, Navigation]}
          pagination={{ clickable: true }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          spaceBetween={0}
          slidesPerView={1}
          style={{ width: "100%", height: "100%" }} // <-- Fill modal
        >
          <SwiperSlide style={swiperSlideStyle}>
            <Typography variant="h5" sx={{ mb: 2, color: "#333" }}>
              Upgrade Successful!
            </Typography>
            <img
              src="https://www.freevector.com/uploads/vector/preview/15506/FreeVector.com-Design-Pack-08.jpg"
              alt="Congratulations"
              style={{
                width: "100%",
                maxWidth: "300px",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            />
            <Typography sx={{ color: "#555" }}>
              Congratulations! You have successfully upgraded your membership.
            </Typography>
          </SwiperSlide>

          <SwiperSlide style={swiperSlideStyle}>
            <Typography variant="h5" sx={{ mb: 2, color: "#333" }}>
              New Features Unlocked
            </Typography>
            <img
              src="https://www.freevector.com/uploads/vector/preview/15506/FreeVector.com-Design-Pack-08.jpg"
              alt="New Feature 1"
              style={{
                width: "100%",
                maxWidth: "300px",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            />
            <Typography sx={{ color: "#555" }}>
              Explore unlimited movie journal entries and more.
            </Typography>
          </SwiperSlide>

          <SwiperSlide style={swiperSlideStyle}>
            <Typography variant="h5" sx={{ mb: 2, color: "#333" }}>
              Enjoy Your Premium Access
            </Typography>
            <img
              src="https://www.freevector.com/uploads/vector/preview/15506/FreeVector.com-Design-Pack-08.jpg"
              alt="Get Started"
              style={{
                width: "100%",
                maxWidth: "300px",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            />
            <Typography sx={{ color: "#555", mb: 2 }}>
              Start creating and exploring without limits.
            </Typography>
            <Button
              variant="contained"
              onClick={onClose}
              sx={{
                backgroundColor: "#720e9e",
                mt: 1,
                "&:hover": { backgroundColor: "#4B0082" },
              }}
            >
              Get Started
            </Button>
          </SwiperSlide>
        </Swiper>

        <div className="swiper-button-prev-custom">
          <ArrowBackIosNewIcon fontSize="small" />
        </div>
        <div className="swiper-button-next-custom">
          <ArrowForwardIosIcon fontSize="small" />
        </div>
      </Box>
    </Modal>
  );
};

export default UpgradeSuccessModal;
