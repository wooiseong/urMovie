import { Box, IconButton, Menu } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useNavigate } from "react-router-dom";
import DynamicMenu, {
  DynamicMenuItem,
} from "src/globalComponents/DynamicMenuItem";
import {
  useDeleteJournalMutation,
  GetJournalsQuery,
} from "src/generated/graphql";
import { useAppDispatch } from "src/store/hook";
import { setSelectedJournal } from "src/store/modules/journalSlice";

import { useGraphQLErrorMessage } from "src/globalHooks/useGraphQLErrorMessage";
import toast from "react-hot-toast";
import ConfirmDialog from "src/globalComponents/ConfirmDialog";

interface JournalMenuProps {
  journal: NonNullable<GetJournalsQuery["journals"]>[number];
}

const JournalMenu: React.FC<JournalMenuProps> = ({ journal }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const { t } = useTranslation();
  const getGraphQLErrorMessage = useGraphQLErrorMessage();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const [deleteJournal] = useDeleteJournalMutation({
    onCompleted: () => {
      toast.success("日誌已成功刪除！");
    },
    onError: (err) => {
      const msg = getGraphQLErrorMessage(err);
      toast.error(msg);
    },
  });

  const handleClose = () => setAnchorEl(null);

  const handleEdit = () => {
    dispatch(setSelectedJournal(journal));
    navigate("/editJournal");
    handleClose();
  };

  const handleDelete = () => {
    setConfirmDialogOpen(true);
    handleClose();
  };

  const handleConfirmDelete = () => {
    deleteJournal({
      variables: { id: journal.id },
      update(cache) {
        const normalizedId = cache.identify({
          id: journal.id,
          __typename: "Journal",
        });
        cache.evict({ id: normalizedId });
        cache.gc();
      },
    });
    setConfirmDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setConfirmDialogOpen(false);
  };

  const menuItems: DynamicMenuItem[] = [
    {
      icon: <EditIcon />,
      label: t("home.edit"),
      onClick: handleEdit,
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
            zIndex: 1,
            "&:hover": { backgroundColor: "rgba(0,0,0,0.1)" },
          }}
          onClick={(e) => {
            e.stopPropagation();
            handleOpen(e);
          }}
        >
          <MoreHorizIcon />
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          onClick={(e) => e.stopPropagation()}
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

      <ConfirmDialog
        open={confirmDialogOpen}
        title={t("home.deleteJournalTitle") || "Delete Journal"}
        message={
          t("home.deleteJournalMessage") ||
          "Are you sure you want to delete this journal? This action cannot be undone."
        }
        confirmText={t("home.delete") || "Delete"}
        cancelText={t("home.cancel") || "Cancel"}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmColor="error"
      />
    </>
  );
};

export default JournalMenu;
