import {
  Box,
  IconButton,
  SxProps,
  TextField,
  Theme,
  Typography,
} from "@mui/material";
import { deepmerge } from "@mui/utils";
import { ChangeEvent, useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import defaultImage from "../img/default_imageUpload2.png";
import { useTranslation } from "react-i18next";

interface CustomImageUploadProps {
  label?: string;
  icon?: React.ReactNode;
  sx?: SxProps<Theme>;
  value?: string; // 預設圖片 URL
  onChange?: (file: File | null) => void;
  onUpload?: (url: string | null) => void;
}

const CustomImageUpload: React.FC<CustomImageUploadProps> = ({
  label,
  icon,
  sx = {},
  value = "",
  onChange,
  onUpload,
}) => {
  const [image, setImage] = useState<string>(value);
  const { t } = useTranslation();

  useEffect(() => {
    setImage(value);
  }, [value]);

  // 處理上傳
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          const imageUrl = reader.result as string;
          setImage(imageUrl);
          onChange?.(file);
          onUpload?.(imageUrl);
        }
      };
      reader.readAsDataURL(file);
    } else {
      alert(t("global.imageUploadError"));
    }
  };

  // ✅ 取消上傳
  const handleRemoveImage = () => {
    setImage(""); // 清空預覽
    onChange?.(null);
    onUpload?.(null);
  };

  // 样式合併
  const mergedSx: SxProps<Theme> = deepmerge(
    {
      position: "relative", // ✅ 為取消按鈕定位
      width: 260,
      height: 250,
      borderRadius: "4px",
      backgroundColor: "#404040",
      overflow: "hidden",
      cursor: "pointer",
      img: {
        width: "100%",
        height: "100%",
        objectFit: "cover",
      },
    },
    sx
  );

  return (
    <Box display="flex" alignItems="start">
      {(label || icon) && (
        <Box
          sx={{ display: "flex", alignItems: "center", marginRight: "12px" }}
        >
          {icon}
          {label && <Typography sx={{ mx: "5px" }}>{label}</Typography>}
        </Box>
      )}

      <Box sx={mergedSx}>
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          style={{ display: "none" }}
          id="custom-image-upload"
          onChange={handleFileChange}
        />
        <label htmlFor="custom-image-upload">
          {image ? (
            <img src={image} alt="upload" />
          ) : (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#aaa",
              }}
            >
              {t("global.clickToUploadImage")}
            </Box>
          )}
        </label>

        {/* ✅ 右上角取消按鈕 */}
        {image && (
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              top: 4,
              right: 4,
              backgroundColor: "rgba(0,0,0,0.5)",
              color: "#fff",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.8)" },
            }}
            onClick={(e) => {
              e.preventDefault(); // 避免觸發 input 點擊
              handleRemoveImage();
            }}
          >
            <CancelIcon fontSize="small" />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default CustomImageUpload;
