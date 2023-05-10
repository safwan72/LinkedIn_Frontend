import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  ListItemIcon,
  ListItemText,
  Tooltip,
  MenuItem,
  Grid,
  InputBase,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { AiFillHome, AiFillMessage } from "react-icons/ai";
import { BsFillPeopleFill, BsBriefcaseFill } from "react-icons/bs";

import BusinessCenterSharpIcon from "@mui/icons-material/BusinessCenterSharp";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  box: {
    marginLeft: "120px",
    [theme.breakpoints.down(1050)]: {
      marginLeft: "90px",
    },
    [theme.breakpoints.down(950)]: {
      marginLeft: "65px",
    },
  },
  icondiv: {
    [theme.breakpoints.down("sm")]: {
      marginRight: "10px",
    },
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#bbc0c5",
  "&:hover": {
    backgroundColor: "#c2cfdd",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.down(620)]: {
    marginLeft: "12px",
    width: "auto",
  },
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.down(620)]: {
      width: "13ch",
      "&:focus": {
        width: "18ch",
      },
    },

    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));
const pages = [
  {
    name: "Home",
    icon: <AiFillHome />,
    link: "/",
  },
  {
    name: "My Network",
    icon: <BsFillPeopleFill />,
    link: "/network",
  },
  {
    name: "Pages",
    icon: <BusinessCenterSharpIcon />,
    link: "/organization-posts",
  },
  {
    name: "Jobs",
    icon: <BsBriefcaseFill />,
    link: "/jobs",
  },
  {
    name: "Messaging",
    icon: <AiFillMessage />,
    link: "/messaging",
  },
];

const Navbar = ({ details }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [myprofile_pic, setmyprofile_pic] = React.useState(null);
  React.useEffect(() => {
    async function fetchData() {
      if (details) {
        setmyprofile_pic(details?.profile_pic);
      }
    }
    fetchData();
  }, [details]);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position="fixed" sx={{ backgroundColor: "white", color: "black" }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Link to="/">
            <Box sx={{ marginRight: "10px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                width="35"
                height="35"
              >
                <path
                  d="M29.63.001H2.362C1.06.001 0 1.034 0 2.306V29.69C0 30.965 1.06 32 2.362 32h27.27C30.937 32 32 30.965 32 29.69V2.306C32 1.034 30.937.001 29.63.001z"
                  fill="#0177b5"
                />
                <path
                  d="M4.745 11.997H9.5v15.27H4.745zm2.374-7.6c1.517 0 2.75 1.233 2.75 2.75S8.636 9.9 7.12 9.9a2.76 2.76 0 0 1-2.754-2.753 2.75 2.75 0 0 1 2.753-2.75m5.35 7.6h4.552v2.087h.063c.634-1.2 2.182-2.466 4.5-2.466 4.806 0 5.693 3.163 5.693 7.274v8.376h-4.743V19.84c0-1.77-.032-4.05-2.466-4.05-2.47 0-2.85 1.93-2.85 3.92v7.554h-4.742v-15.27z"
                  fill="#fff"
                />
              </svg>
            </Box>
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box
            sx={{ display: { sm: "flex", xs: "none" }, flexGrow: 1 }}
            className={classes.box}
          >
            {pages.map((page, i) => (
              //   <Link to={page?.link}>
              <Grid
                key={i}
                container
                component={Link}
                to={page?.link}
                title={page.name}
                justifyItems="center"
                className={classes.icondiv}
                sx={{
                  mr: "5px",
                  color: "black",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                <Grid item xs={12} sx={{ fontSize: "18px" }}>
                  {page.icon}
                </Grid>
                <Grid
                  item
                  xs={12}
                  minWidth="100%"
                  sx={{ display: { xs: "none", sm: "none", md: "block" } }}
                >
                  <Typography variant="p" sx={{ fontSize: "12px" }}>
                    {page.name}
                  </Typography>
                </Grid>
              </Grid>
              //   </Link>
            ))}
          </Box>
          <Box sx={{ display: { sm: "flex" } }}>
            <Grid
              container
              justifyItems="center"
              id="basic-profile"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              className={classes.icondiv}
              sx={{ color: "black", textAlign: "center", alignItems: "center" }}
            >
              <Grid
                item
                xs={12}
                title={details?.user?.username}
                sx={{
                  cursor: "pointer",
                }}
              >
                <Avatar
                  alt={details?.user?.username}
                  src={myprofile_pic}
                  sx={{
                    margin: "auto",
                    width: 26,
                    height: 26,
                  }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                minWidth="100%"
                sx={{
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "block",
                    cursor: "pointer",
                  },
                }}
              >
                <Typography variant="p" sx={{ fontSize: "12px" }}>
                  Me
                </Typography>
              </Grid>
            </Grid>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleClose}>
                <Link to="/profile" title="Profile">
                  Profile
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/create-company" title="Create Your Company">
                  Create Company
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/logout" title="Logout">
                  Logout
                </Link>
              </MenuItem>
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: "block", sm: "none" } }}>
            <Tooltip title="Open settings">
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleOpenUserMenu}
                sx={{ p: 0, marginLeft: "10px" }}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {pages.map((page, i) => (
                <MenuItem
                  key={i}
                  onClick={handleCloseUserMenu}
                  component={Link}
                  to={page?.link}
                  title={page.name}
                >
                  <ListItemIcon>{page.icon}</ListItemIcon>
                  <ListItemText>{page.name}</ListItemText>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
