import { Box, IconButton, Menu, Typography } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import DynamicMenu, {
  DynamicMenuItem,
} from "src/globalComponents/DynamicMenuItem";
import { useDeleteJournalMutation } from "src/generated/graphql";
import FullScreenLoader from "src/globalComponents/FullScreenLoader";
import { useDelayedLoading } from "src/globalHooks/useDelayedLoading";
import { useGraphQLErrorMessage } from "src/globalHooks/useGraphQLErrorMessage";
import toast from "react-hot-toast";

interface JournalMenuProps {
  journalId: string;
}

const JournalMenu: React.FC<JournalMenuProps> = ({ journalId }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  // const [toastMessage, setToastMessage] = useState<string | null>(null);
  // const [toastType, setToastType] = useState<"success" | "error" | null>(null);
  const { t } = useTranslation();
  const getGraphQLErrorMessage = useGraphQLErrorMessage();
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [deleteJournal] = useDeleteJournalMutation({
    onCompleted: () => {
      toast.success("日誌已成功刪除！");
    },
    onError: (err) => {
      const msg = getGraphQLErrorMessage(err);
      toast.error("發生物質錯誤，請重試！");
    },
  });

  const handleClose = () => setAnchorEl(null);

  const handleDelete = () => {
    deleteJournal({ variables: { id: journalId } });
  };

  const menuItems: DynamicMenuItem[] = [
    {
      icon: <EditIcon />,
      label: t("home.edit"),
      to: "editJournal",
    },
    {
      icon: <DeleteOutlineIcon />,
      label: t("home.delete"),
      onClick: handleDelete,
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
