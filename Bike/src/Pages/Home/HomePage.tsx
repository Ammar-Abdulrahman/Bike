import useBikes from "@Hooks/useBikes";
import {
  Box,
  Grid,
  Card,
  Typography,
  CardContent,
  MenuItem,
  TextField,
  IconButton,
} from "@mui/material";
//import { Bike, BikeItem } from "@Types/Bike";
import { useState } from "react";
import imageNotFound from "@Assets/images/image.png";
import PaginationControls from "@Components/Pagination/PaginationControl";
import PageLoader from "@Components/Loader/PageLoader";
import { useSearchParams } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
import HeaderTitle from "@Components/Header/HeaderTitle";

const HomePage = () => {
  const [isRefetching, setIsRefetching] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const stolenness = searchParams.get("stolenness") || "all";
  const query = searchParams.get("query") || "";
  // const [page, setPage] = useState(1);
  const limit = 10;
  const { getBike, getBikes, getBikesCount } = useBikes(
    limit,
    page,
    stolenness,
    query
  );
  //const { getBikes, getBikesCount } = useBikes(pageSize, page, stolenness, query);
  const { data: CountsData, isLoading: countsLoading } = getBikesCount();
  const { data, isLoading, refetch } = getBikes();
  const totalPages = Math.ceil((CountsData?.non || 0) / limit);
  console.log(data?.bikes[0]);

  const handleFilterChange = (filterName: string, value: string) => {
    setSearchParams((prev) => {
      const updatedParams = new URLSearchParams(prev);
      updatedParams.set(filterName, value);
      if (filterName === "page") updatedParams.set("page", "1"); // Reset to page 1 on filter change
      return updatedParams;
    });
  };

  const handleRefetch = async () => {
    setIsRefetching(true);
    await refetch();
    setIsRefetching(false);
  };

  return (
    <div>
      <Box sx={{ display: "flex", p: 3 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={6} md={4}>
            <HeaderTitle title={"Bikes Page"} />
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
      {isLoading || countsLoading || isRefetching ? (
        <PageLoader />
      ) : (
        <Box sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {data?.bikes.map((bike) => (
              <Grid item xs={12} key={bike.id}>
                <Card sx={{ display: "flex", flexDirection: "row", p: 2 }}>
                  {/* Bike Image */}
                  <Box
                    sx={{
                      width: 150,
                      height: 150,
                      backgroundColor: "#f5f5f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {bike.large_img ? (
                      <img
                        src={bike.large_img}
                        alt={bike.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <Typography variant="h6" color="textSecondary">
                        <img
                          src={imageNotFound}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Typography>
                    )}
                  </Box>

                  {/* Bike Details */}
                  <CardContent sx={{ flex: 1, ml: 2 }}>
                    <Typography variant="h6" sx={{ color: "#1976d2" }}>
                      {bike.title}
                    </Typography>
                    <Typography>
                      <strong>Serial:</strong> {bike.serial}
                    </Typography>
                    <Typography>
                      <strong>Primary Colors:</strong>{" "}
                      {bike.frame_colors.join(", ")}
                    </Typography>
                    <Typography
                      sx={{
                        color: bike.status === "STOLEN" ? "red" : "green",
                        fontWeight: "bold",
                      }}
                    >
                      {bike.status}: {bike.status}
                    </Typography>
                    <Typography>
                      <strong>Location:</strong> {bike.location_found}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          {data?.bikes.length && data.bikes.length > 0 ? (
            <PaginationControls
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
              totalCount={CountsData?.non}
            />
          ) : (
            ""
          )}
        </Box>
      )}
    </div>
  );
};

export default HomePage;
