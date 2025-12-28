import { Box, MenuItem, MenuList, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export interface DynamicMenuItem {
  label: string;
  icon?: React.ReactNode;
  prefix?: string;
  to?: string;
  onClick?: () => void;
  submenu?: DynamicMenuItem[];
  isActive?: boolean;
  sx?: object;
}

interface DynamicMenuProps {
  menuItems: DynamicMenuItem[];
  isSubmenu?: boolean;
  onClose?: () => void;
}

const DynamicMenu: React.FC<DynamicMenuProps> = ({
  menuItems,
  isSubmenu,
  onClose,
}) => {
  const navigate = useNavigate();
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null);

  const handleItemClick = (item: DynamicMenuItem) => {
    if (item.onClick) item.onClick();
    if (item.to) navigate(item.to);
  };

  return (
    <>
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          onMouseEnter={() => setOpenSubMenu(index)}
          sx={{
            position: "relative",
            px: 2,
            ...item.sx,
          }}
          onClick={() => handleItemClick(item)}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: isSubmenu ? "space-between" : "center",
              gap: 1,
              width: "100%",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {item.submenu?.length ? (
                <ChevronLeftIcon
                  sx={{
                    position: "absolute",
                    left: 8,
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
              ) : null}
              {item.icon}
              {item.prefix && (
                <Box component="span" sx={{ fontSize: "1rem", mr: "5px" }}>
                  {item.prefix}
                </Box>
              )}
              <Typography>{item.label}</Typography>
            </Box>

            {item.isActive && (
              <CheckCircleIcon
                sx={{
                  color: "success.main",
                  ml: 1,
                  fontSize: 20,
                }}
              />
            )}
          </Box>

          {/* submenu item */}
          {item.submenu && openSubMenu === index && (
            <MenuList
              sx={{
                position: "absolute",
                right: "100%",
                top: 0,
                borderRadius: "12px",
                minWidth: 160,
                boxShadow: 3,
                bgcolor: "background.paper",
              }}
              onMouseEnter={() => setOpenSubMenu(index)}
            >
              <DynamicMenu
                menuItems={item.submenu}
                onClose={onClose}
                isSubmenu
              />
            </MenuList>
          )}
        </MenuItem>
      ))}
    </>
  );
};

export default DynamicMenu;
