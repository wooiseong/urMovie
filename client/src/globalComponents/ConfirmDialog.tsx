import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmColor?: "primary" | "error" | "warning";
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  confirmColor = "primary",
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      onClick={(e) => e.stopPropagation()}
      PaperProps={{
        sx: {
          borderRadius: 2,
          minWidth: { xs: "320px", sm: "480px" },
          maxWidth: "600px",
          width: "100%",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          pb: 1,
        }}
      >
        {confirmColor === "error" && (
          <WarningAmberIcon color="error" fontSize="medium" />
        )}
        <Typography variant="h6" component="span" fontWeight={600}>
          {title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body1" color="text.secondary" sx={{ fontSize: "1.1rem", lineHeight: 1.6 }}>
          {message}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2.5, pt: 2, gap: 1.5 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          size="large"
          sx={{
            borderRadius: 1.5,
            textTransform: "none",
            fontWeight: 500,
            px: 3,
          }}
        >
          {cancelText}
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color={confirmColor}
          size="large"
          sx={{
            borderRadius: 1.5,
            textTransform: "none",
            fontWeight: 500,
            px: 3,
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
