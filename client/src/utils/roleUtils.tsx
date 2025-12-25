import { Box } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import ShieldIcon from "@mui/icons-material/Shield";
import React from "react";

export type UserRole = "admin" | "user" | "premiumUser";

/**
 * Get avatar styling based on user role
 */
export const getRoleAvatarStyle = (role: UserRole) => {
  switch (role) {
    case "admin":
      return {
        boxShadow: "0 0 0 3px rgba(239, 68, 68, 0.6)",
        border: "3px solid",
        borderColor: "error.main",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 0 0 4px rgba(239, 68, 68, 0.8)",
        },
      };
    case "premiumUser":
      return {
        boxShadow: "0 0 12px 3px rgba(139, 92, 246, 0.6)",
        border: "3px solid",
        borderColor: "secondary.main",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 0 16px 4px rgba(139, 92, 246, 0.8)",
        },
      };
    default:
      return {
        border: "2px solid",
        borderColor: "divider",
        transition: "all 0.3s ease",
      };
  }
};

/**
 * Get chip color based on user role
 */
export const getRoleChipColor = (
  role: UserRole
): "default" | "primary" | "secondary" | "error" => {
  switch (role) {
    case "admin":
      return "error";
    case "premiumUser":
      return "secondary";
    default:
      return "default";
  }
};

/**
 * Get role display label
 */
export const getRoleLabel = (role: UserRole): string => {
  switch (role) {
    case "admin":
      return "Admin";
    case "premiumUser":
      return "Premium User";
    default:
      return "User";
  }
};

/**
 * Get role icon
 */
export const getRoleIcon = (role: UserRole): React.ReactNode => {
  switch (role) {
    case "admin":
      return <ShieldIcon sx={{ fontSize: 16 }} />;
    case "premiumUser":
      return <StarIcon sx={{ fontSize: 16 }} />;
    default:
      return null;
  }
};

/**
 * Role Badge Component - displays on avatar
 */
interface RoleBadgeProps {
  role: UserRole;
  size?: "small" | "medium" | "large";
}

export const RoleBadge: React.FC<RoleBadgeProps> = ({ role, size = "medium" }) => {
  const sizeMap = {
    small: { iconSize: 14, padding: 0.3, badgeSize: 20 },
    medium: { iconSize: 16, padding: 0.4, badgeSize: 24 },
    large: { iconSize: 18, padding: 0.5, badgeSize: 28 },
  };

  const { iconSize, padding, badgeSize } = sizeMap[size];

  if (role === "admin") {
    return (
      <Box
        sx={{
          position: "absolute",
          bottom: -4,
          right: -4,
          bgcolor: "error.main",
          borderRadius: "50%",
          p: padding,
          border: "2px solid",
          borderColor: "background.paper",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: badgeSize,
          height: badgeSize,
          boxShadow: 2,
          transition: "transform 0.2s ease",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <ShieldIcon sx={{ fontSize: iconSize, color: "white" }} />
      </Box>
    );
  }

  if (role === "premiumUser") {
    return (
      <Box
        sx={{
          position: "absolute",
          bottom: -4,
          right: -4,
          bgcolor: "secondary.main",
          borderRadius: "50%",
          p: padding,
          border: "2px solid",
          borderColor: "background.paper",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: badgeSize,
          height: badgeSize,
          boxShadow: 2,
          transition: "transform 0.2s ease",
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <StarIcon sx={{ fontSize: iconSize, color: "white" }} />
      </Box>
    );
  }

  return null;
};

/**
 * Get role-based description text
 */
export const getRoleDescription = (role: UserRole): string => {
  switch (role) {
    case "admin":
      return "System Administrator";
    case "premiumUser":
      return "Premium Member";
    default:
      return "Free Member";
  }
};
