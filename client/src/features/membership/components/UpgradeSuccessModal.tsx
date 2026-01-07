import React from "react";
import { Modal, Box, Typography, IconButton, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useTranslation } from "react-i18next";

// Import images
import moreQuote from "../../../assets/images/membership/moreQuote.png";
import moreColor from "../../../assets/images/membership/moreColor.png";

interface UpgradeSuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 500 },
  height: { xs: "80vh", sm: 520 },
  maxWidth: "90vw",
  maxHeight: "90vh",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: { xs: 1.5, sm: 2 },
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
  height: "100%", // <-- Fill modal height so centering works
  boxSizing: "border-box",
};

const UpgradeSuccessModal: React.FC<UpgradeSuccessModalProps> = ({
  open,
  onClose,
}) => {
  const { t } = useTranslation();
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
              background-color: #555555 !important;
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
                background-color: #f5f5f5;
                border-radius: 50%;
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .swiper-button-prev-custom:hover, .swiper-button-next-custom:hover {
                background-color: #e0e0e0;
            }
            .swiper-button-prev-custom {
                left: 8px;
            }
            .swiper-button-next-custom {
                right: 8px;
            }
            @media (min-width: 600px) {
                .swiper-button-prev-custom {
                    left: 15px;
                }
                .swiper-button-next-custom {
                    right: 15px;
                }
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
            <Box sx={{ px: { xs: 2, sm: 4 }, py: { xs: 1, sm: 2 } }}>
              <Typography
                variant="h5"
                sx={{
                  mb: { xs: 2, sm: 3 },
                  color: "text.primary",
                  fontWeight: 600,
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                }}
              >
                {t("membership.modalUpgradeSuccessTitle")}
              </Typography>
              <CheckCircleIcon
                sx={{
                  fontSize: { xs: 80, sm: 120 },
                  color: "#4caf50",
                  mb: { xs: 2, sm: 3 },
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  px: { xs: 1, sm: 2 },
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              >
                {t("membership.modalUpgradeSuccessMessage")}
              </Typography>
            </Box>
          </SwiperSlide>

          <SwiperSlide style={swiperSlideStyle}>
            <Box sx={{ px: { xs: 2, sm: 4 }, py: { xs: 1, sm: 2 } }}>
              <Typography
                variant="h5"
                sx={{
                  mb: { xs: 2, sm: 3 },
                  color: "text.primary",
                  fontWeight: 600,
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                }}
              >
                {t("membership.modalUnlimitedQuoteTitle")}
              </Typography>
              <img
                src={moreQuote}
                alt="Unlimited Quotes"
                style={{
                  width: "100%",
                  maxWidth: "250px",
                  borderRadius: "8px",
                  marginBottom: "16px",
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  px: { xs: 1, sm: 2 },
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              >
                {t("membership.modalUnlimitedQuoteMessage")}
              </Typography>
            </Box>
          </SwiperSlide>

          <SwiperSlide style={swiperSlideStyle}>
            <Box sx={{ px: { xs: 2, sm: 4 }, py: { xs: 1, sm: 2 } }}>
              <Typography
                variant="h5"
                sx={{
                  mb: { xs: 2, sm: 3 },
                  color: "text.primary",
                  fontWeight: 600,
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                }}
              >
                {t("membership.modalUnlimitedColorsTitle")}
              </Typography>
              <img
                src={moreColor}
                alt="Unlimited Colors"
                style={{
                  width: "100%",
                  maxWidth: "250px",
                  borderRadius: "8px",
                  marginBottom: "16px",
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: "text.secondary",
                  mb: { xs: 2, sm: 3 },
                  px: { xs: 1, sm: 2 },
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              >
                {t("membership.modalUnlimitedColorsMessage")}
              </Typography>
              <Button
                variant="contained"
                onClick={onClose}
                sx={{
                  backgroundColor: "secondary.main",
                  mt: { xs: 0.5, sm: 1 },
                  px: { xs: 3, sm: 4 },
                  py: { xs: 0.75, sm: 1 },
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  "&:hover": { backgroundColor: "secondary.dark" },
                }}
              >
                {t("membership.modalGetStartedButton")}
              </Button>
            </Box>
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
