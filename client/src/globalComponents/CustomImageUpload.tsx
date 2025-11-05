import { Box, SxProps, TextField, Theme, Typography } from "@mui/material";
import { deepmerge } from "@mui/utils";
import { ChangeEvent, useState } from "react";
import defaultImage from "../img/default_imageUpload2.png";
interface CustomImageUploadProps {
  label?: string;
  icon?: React.ReactNode;
  sx?: SxProps<Theme>;
  defaultImage?: string; // 預設圖片 URL
  onChange?: (file: File | null) => void; // 上傳回調
}

const CustomImageUpload: React.FC<CustomImageUploadProps> = ({
  label,
  icon,
  sx = {},
  defaultImage: defaultImg = defaultImage,
  onChange,
}) => {
  const [image, setImage] = useState<string>(defaultImage);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && ["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImage(reader.result as string);
          onChange?.(file);
        }
      };
      reader.readAsDataURL(file);
    } else {
      // 非圖片格式可忽略或提示
      alert("請上傳 jpg、jpeg 或 png 圖片");
    }
  };

  const mergedSx: SxProps<Theme> = deepmerge(
    {
      img: {
        width: 260,
        height: 250,
        objectFit: "cover",
        borderRadius: "4px",
        cursor: "pointer",
        backgroundColor: "#404040",
        // opacity: 0.5,
      },
      // "&:hover img": {
      //   opacity: 0.8,
      // },
    },
    sx
  );

  return (
    <Box display="flex">
      {(label || icon) && (
        <Box sx={{ display: "flex", marginRight: "12px" }}>
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
          <img src={image} alt="upload" />
        </label>
      </Box>
    </Box>
  );
};

export default CustomImageUpload;
