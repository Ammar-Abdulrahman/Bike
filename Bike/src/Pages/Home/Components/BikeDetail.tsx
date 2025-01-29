import { useParams } from "react-router-dom";
import { Box, CircularProgress, Typography } from "@mui/material";
import useBike from "@Hooks/useBikes";
import BikeCard from "@Pages/Home/Components/BikeItem";

const BikeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getOneBike } = useBike();

  const { data: bike, isLoading, error } = getOneBike(Number(id));
  if (isLoading) return <CircularProgress />;
  if (error) return <Typography>Error loading bike details.</Typography>;
  if (!bike) return <Typography>Bike not found.</Typography>;

  console.log(bike.bike);
  return (
    <Box sx={{ p: 3 }}>
      <BikeCard bike={bike.bike} />
    </Box>
  );
};

export default BikeDetailPage;
