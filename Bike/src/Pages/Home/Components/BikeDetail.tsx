import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import useBike from "@Hooks/useBikes";
import BikeCard from "@Pages/Home/Components/BikeItem";
import PageLoader from "@Components/Loader/PageLoader";

const BikeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getOneBike } = useBike();

  const { data: bike, isLoading } = getOneBike(Number(id));
  if (isLoading) return <PageLoader />;
  if (!bike) return <Typography>Bike not found.</Typography>;

  console.log(bike.bike);
  return (
    <Box sx={{ p: 3 }}>
      <BikeCard bike={bike.bike} />
    </Box>
  );
};

export default BikeDetailPage;
