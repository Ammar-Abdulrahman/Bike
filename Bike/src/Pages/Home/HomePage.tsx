import useBikes from "@Hooks/useBikes";
import { Box, Grid, TextField, IconButton, MenuItem } from "@mui/material";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import HeaderTitle from "@Components/Header/HeaderTitle";
import PaginationControls from "@Components/Pagination/PaginationControl";
import PageLoader from "@Components/Loader/PageLoader";
import BikeCard from "@Pages/Home/Components/BikeItem";
import { getCountValue } from "@Pages/Home/Helper/index";

const HomePage = () => {
  const navigate = useNavigate();
  const [isRefetching, setIsRefetching] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);

  const stolenness = searchParams.get("stolenness") || "all";
  const query = searchParams.get("query") || "";
  const limit = 10;
  const { getBikes, getBikesCount } = useBikes(limit, page, stolenness, query);
  const { data: CountsData, isLoading: countsLoading } = getBikesCount();
  const { data, isLoading, refetch } = getBikes();
  const totalPages = Math.ceil((CountsData?.non || 0) / limit);
  const count = getCountValue(searchParams.get("status"), CountsData);

  const handleBikeClick = (id: number) => {
    navigate(`/home/${id}`);
  };

  const handleFilterChange = (filterName: string, value: string) => {
    setSearchParams((prev) => {
      const updatedParams = new URLSearchParams(prev);
      updatedParams.set(filterName, value);
      if (filterName === "page") updatedParams.set("page", "1");
      return updatedParams;
    });
  };

  const handleRefetch = async () => {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  };

  if (isLoading || countsLoading || isRefetching) return <PageLoader />;

  return (
    <div>
      <Box sx={{ display: "flex", p: 3 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={6} md={4}>
            <HeaderTitle title="Bikes Page" />
          </Grid>
          <Grid item xs={6} md={4}>
            <TextField
              label="Search for a bike"
              variant="filled"
              size="small"
              fullWidth
              value={query}
              onChange={(e) => handleFilterChange("query", e.target.value)}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <TextField
              label="Filter by Status"
              variant="filled"
              size="small"
              fullWidth
              select
              value={stolenness}
              onChange={(e) => handleFilterChange("stolenness", e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="proximity">Proximity</MenuItem>
              <MenuItem value="stolen">Stolen</MenuItem>
              <MenuItem value="non">Non</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6} md={0.5}>
            <IconButton onClick={handleRefetch}>
              <RefreshIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {data?.bikes && data?.bikes?.length > 0 ? (
            data?.bikes.map((bike) => (
              <Grid item xs={12} key={bike.id}>
                <BikeCard
                  bike={bike}
                  onClick={() => handleBikeClick(bike.id)}
                />
              </Grid>
            ))
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              No items to display
            </Box>
          )}
        </Grid>

        {data?.bikes && data?.bikes?.length > 0 && (
          <PaginationControls
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
            totalCount={count}
          />
        )}
      </Box>
    </div>
  );
};

export default HomePage;
