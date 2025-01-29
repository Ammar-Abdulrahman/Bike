import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import ProfileImage from "../Assets/images/profile.jpg";
//import BikeImage from "../Assets/images/bike.jpg";
import { teal, blue, orange, deepOrange } from "@mui/material/colors";
import { GrBike } from "react-icons/gr";
//import { MdHome } from "react-icons/md";
//import { MdBikeScooter } from "react-icons/md";
import { useThemeContext } from "@Context/themeContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

const Layout = () => {
  const { mode, toggleTheme } = useThemeContext();

  return (
    <>
      <AppBar
        position="fixed"
        style={{ backgroundColor: teal[900], color: "white" }}
      >
        <Toolbar>
          <GrBike style={{ width: "30px", height: "25px" }} />
          <Typography variant="h6" sx={{ flexGrow: 0.5, marginLeft: "8px" }}>
            Bikes
          </Typography>
          <Box sx={{ flexGrow: 0.5 }}>
            <Button color="inherit" component={Link} to={"/home"}>
              Home
            </Button>
            <Button color="inherit" component={Link} to={"/bikes"}>
              Products
            </Button>
          </Box>
          <Tooltip
            title={mode === "dark" ? "Light mode" : "Dark mode"}
            style={{ marginRight: "8px" }}
          >
            <IconButton
              sx={{ color: "white" }}
              onClick={toggleTheme}
              color="inherit"
            >
              {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Ammar Abdulrahman">
            <Avatar alt="Ammar Abd" src={ProfileImage} />
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 9 }}>
        <Outlet />
      </Box>
    </>
  );
};

export default Layout;
