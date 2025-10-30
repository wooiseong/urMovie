import { Box, IconButton, Menu, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import DynamicMenu, {
  DynamicMenuItem,
} from "src/globalComponents/DynamicMenuItem";

interface JournalMenuProps {
  // defaultAvatar: string;
}

const JournalMenu: React.FC<JournalMenuProps> = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { t } = useTranslation();
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  const menuItems: DynamicMenuItem[] = [
    {
      icon: <EditIcon />,
      label: t("home.edit"),
      // to: "/adminStatistics",
    },
    {
      icon: <DeleteOutlineIcon />,
      label: t("home.delete"),
      // onClick: handleLogout,
    },
  ];

  return (
    <>
      <Box>
        <IconButton
          size="small"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            "&:hover": { backgroundColor: "rgba(0,0,0,0.1)" },
          }}
          onClick={handleOpen}
        >
          <MoreHorizIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          slotProps={{
            paper: {
              sx: {
                mt: 1.5,
                borderRadius: "12px",
                minWidth: 120,
                overflow: "visible",
              },
            },
          }}
        >
          {/* menu items */}
          <DynamicMenu menuItems={menuItems} onClose={handleClose} />
        </Menu>
      </Box>
    </>
  );
};

export default JournalMenu;
