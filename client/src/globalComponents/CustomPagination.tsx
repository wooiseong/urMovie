import { Box, Pagination, Typography } from "@mui/material";

interface CustomPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const CustomPagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}: CustomPaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalItems === 0) {
    return null;
  }

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mt: 3,
        flexDirection: { xs: "column", sm: "row" },
        gap: 2,
      }}
    >
      <Typography variant="body2" color="text.secondary">
        Showing {startItem} - {endItem} of {totalItems} items
      </Typography>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, page) => onPageChange(page)}
        color="primary"
        shape="rounded"
        showFirstButton
        showLastButton
      />
    </Box>
  );
};

export default CustomPagination;
