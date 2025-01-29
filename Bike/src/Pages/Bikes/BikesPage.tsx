import HeaderTitle from "@Components/Header/HeaderTitle";
import PageLoader from "@Components/Loader/PageLoader";
import StatisticCard from "@Components/StatisticCard";
import useBikes from "@Hooks/useBikes";
import { Box, Grid, useTheme } from "@mui/material";

const BikesPage = () => {
  const { getBikesCount } = useBikes();
  const { data, isLoading } = getBikesCount();
  const theme = useTheme();

  if (isLoading) return <PageLoader />;

  return (
    <div>
      <HeaderTitle title={"Statistics Page"} />
      <Box
        sx={{
          padding: "16px",
          margin: "16px",
        }}
      >
        <Grid container spacing={3}>
          <Grid container spacing={2}>
            <Grid item md={4} xs={3}>
              <StatisticCard
                title={"Stolen Bikes Non"}
                value={data?.non}
                color={theme.palette.secondary.contrastText}
              />
            </Grid>
            <Grid item md={4} xs={6}>
              <StatisticCard
                title={"Stolen Bikes Proximity"}
                value={data?.proximity}
                color={theme.palette.success.main}
              />
            </Grid>
            <Grid item md={4} xs={6}>
              <StatisticCard
                title={"Stolen Bikes"}
                value={data?.stolen}
                color={theme.palette.success.main}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default BikesPage;
