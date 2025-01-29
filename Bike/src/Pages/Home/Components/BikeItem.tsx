import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
  useTheme,
} from "@mui/material";
import imageNotFound from "@Assets/images/image.png";
import { motion } from "framer-motion";
import { format } from "date-fns";

const BikeCard = ({ bike }: { bike: any }) => {
  const theme = useTheme();
  return (
    <>
      <motion.div transition={{ duration: 0.5 }} whileHover={{ scale: 1.1 }}>
        <Card sx={{ display: "flex", flexDirection: "row", p: 2 }}>
          <Box
            sx={{
              width: 150,
              height: 150,
              backgroundColor: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "8px",
            }}
          >
            <img
              src={bike.large_img || imageNotFound}
              alt={bike.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Box>

          {/* Bike Details */}
          <CardContent sx={{ flex: 1, ml: 2 }}>
            <Typography
              variant="h6"
              sx={{ color: theme.palette.primary.dark, marginTop: "8px" }}
            >
              {bike.title}
            </Typography>
            <Typography sx={{ marginTop: "8px" }}>
              <strong>Serial:</strong> {bike.serial}
            </Typography>
            <Typography sx={{ marginTop: "8px" }}>
              <strong>Primary Colors:</strong> {bike.frame_colors.join(", ")}
            </Typography>
            <Typography style={{ marginTop: "8px" }}>
              <strong>Location:</strong>{" "}
              <span style={{ color: !bike.location_found ? "red" : "" }}>
                {bike.location_found ? bike.location_found : "Not available"}
              </span>
            </Typography>
          </CardContent>

          <CardContent sx={{ flex: 1, ml: 2 }}>
            <Typography sx={{ fontWeight: "bold", marginTop: "8px" }}>
              Status:{" "}
              <Chip
                style={{
                  color: "white",
                  backgroundColor: bike.status === "stolen" ? "red" : "green",
                }}
                label={bike.status}
              />
            </Typography>
            <Typography style={{ marginTop: "8px" }}>
              <strong>Stolen Date:</strong>{" "}
              <span>
                <span>
                  {format(new Date(bike.date_stolen), "MMM/ dd/ yyyy")}
                </span>
              </span>
            </Typography>
            <Typography style={{ marginTop: "8px" }}>
              <strong>Time Stolen Date:</strong>{" "}
              <span>{format(new Date(bike.date_stolen), "  aaa hh:mm ")}</span>
            </Typography>
            <Typography style={{ marginTop: "8px" }}>
              <strong>Discruption:</strong>{" "}
              <span>
                <span style={{ color: !bike.description ? "red" : "" }}>
                  {bike.description ? bike.description : "Not available"}
                </span>
              </span>
            </Typography>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
};

export default BikeCard;
