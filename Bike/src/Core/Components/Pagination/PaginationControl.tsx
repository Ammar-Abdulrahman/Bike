import React from "react";
import { Pagination, Typography, Box } from "@mui/material";

interface paginationProps {
  currentPage?: number;
  totalPages?: number;
  onPageChange?: any;
  totalCount?: number;
}

const PaginationControls: React.FC<paginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalCount,
}) => (
  <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
    <Typography variant="body1">Total Items: {totalCount}</Typography>
    <Pagination
      count={totalPages}
      page={currentPage}
      onChange={(_, page) => onPageChange(page)}
      variant="outlined"
      shape="rounded"
      color="secondary"
    />
  </Box>
);

export default PaginationControls;
