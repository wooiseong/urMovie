import {
  Box,
  IconButton,
  SxProps,
  TextField,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { deepmerge } from "@mui/utils";
import { ChangeEvent, useEffect, useState } from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import defaultImage from "../img/default_imageUpload2.png";
import { useTranslation } from "react-i18next";
import { uploadToCloudinary } from "src/utils/cloudinaryUpload";
import toast from "react-hot-toast";

interface CustomImageUploadProps {
  label?: string;
  icon?: React.ReactNode;
  sx?: SxProps<Theme>;
  value?: string; // 預設圖片 URL
  onChange?: (file: File | null) => void;
  onUpload?: (url: string | null) => void;
  folder?: string; // Optional folder path in Cloudinary (e.g., "journals", "avatars")
}

const CustomImageUpload: React.FC<CustomImageUploadProps> = ({
  label,
  icon,
  sx = {},
  value = "",
  onChange,
  onUpload,
  folder,
}) => {
  const [image, setImage] = useState<string>(value);
  const [uploading, setUploading] = useState<boolean>(false);
  const { t } = useTranslation();
  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setImage(value);
  }, [value]);

  // 處理上傳 - Upload to Cloudinary
  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      try {
        setUploading(true);

        // Show preview immediately using local URL
        const localPreview = URL.createObjectURL(file);
        setImage(localPreview);

        // Upload to Cloudinary
        const cloudinaryUrl = await uploadToCloudinary(file, folder);

        // Update with Cloudinary URL
        setImage(cloudinaryUrl);
        onChange?.(file);
        onUpload?.(cloudinaryUrl);

        toast.success(t("global.imageUploadSuccess") || "Image uploaded successfully!");

        // Clean up local preview URL
        URL.revokeObjectURL(localPreview);
      } catch (error) {
        console.error("Image upload error:", error);
        toast.error(t("global.imageUploadError") || "Failed to upload image");
        setImage(value); // Revert to previous image
      } finally {
        setUploading(false);
      }
    } else {
      toast.error(t("global.imageUploadError") || "Please select a valid image file (JPEG, JPG, or PNG)");
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
      width: isSmDown ? 200 : 260,
      height: isSmDown ? 200 : 250,
      borderRadius: "4px",
      backgroundColor: "background.paper",
      overflow: "hidden",
      cursor: "pointer",
      img: {
        width: "100%",
        height: "100%",
        objectFit: "contain",
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
          disabled={uploading}
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
                color: "text.secondary",
              }}
            >
              {t("global.clickToUploadImage")}
            </Box>
          )}
        </label>

        {/* Loading indicator */}
        {uploading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
          >
            <CircularProgress />
          </Box>
        )}

        {/* ✅ 右上角取消按鈕 */}
        {image && !uploading && (
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              top: 4,
              right: 4,
              backgroundColor: "background.default",
              color: "text.primary",
              "&:hover": { backgroundColor: "background.paper" },
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
