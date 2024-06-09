import * as React from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "./ToggleColorMode";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../auth/useUser";
import { useToken } from "../auth/useToken";
import { useEffect } from "react";
import { Avatar, IconButton, Menu, Tooltip } from "@mui/material";

const logoStyle = {
  width: "60px",
  height: "auto",
  cursor: "pointer",
};
function AppAppBar({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const { user, loading, error, setUser } = useUser();
  const [token, setToken] = useToken();
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  useEffect(() => {}, [user, loading]);
  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };
  const navigate = useNavigate();
  const handleLogout = () => {
    // Clear token from local storage
    handleCloseUserMenu();
    setUser(null);
    localStorage.removeItem("token");

    // Redirect to homepage
    navigate("/");
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          bgcolor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              bgcolor:
                theme.palette.mode === "light"
                  ? "rgba(255, 255, 255, 0.4)"
                  : "rgba(0, 0, 0, 0.4)",
              backdropFilter: "blur(24px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                  : "0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <Link to="/">
                <img
                  src={"/imgs/logo.png"}
                  style={logoStyle}
                  alt="logo of sitemark"
                />
              </Link>
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <MenuItem sx={{ py: "6px", px: "12px" }}>
                  <Link to="/searchDoctor" style={{ textDecoration: "none" }}>
                    <Typography variant="body2" color="text.primary">
                      Buscar medico
                    </Typography>
                  </Link>
                </MenuItem>
                <MenuItem sx={{ py: "6px", px: "12px" }}>
                  <Link to="/aboutUs" style={{ textDecoration: "none" }}>
                    <Typography variant="body2" color="text.primary">
                      Sobre Medimatch
                    </Typography>
                  </Link>
                </MenuItem>
                {user && (
                  <MenuItem sx={{ py: "6px", px: "12px" }}>
                    <Link
                      to="/myAppointments"
                      style={{ textDecoration: "none" }}
                    >
                      <Typography variant="body2" color="text.primary">
                        Historial de citas
                      </Typography>
                    </Link>
                  </MenuItem>
                )}
                {user?.role === "Doctor" && (
                  <MenuItem sx={{ py: "6px", px: "12px" }}>
                    <Link
                      to="/myAppoinmentsDoctor"
                      style={{ textDecoration: "none" }}
                    >
                      <Typography variant="body2" color="text.primary">
                        Citas de mis pacientes
                      </Typography>
                    </Link>
                  </MenuItem>
                )}
                {user?.role === "Doctor" && (
                  <MenuItem sx={{ py: "6px", px: "12px" }}>
                    <Link
                      to="/searchPatient"
                      style={{ textDecoration: "none" }}
                    >
                      <Typography variant="body2" color="text.primary">
                        Buscar Paciente
                      </Typography>
                    </Link>
                  </MenuItem>
                )}
                {user?.role === "Admin" && (
                  <MenuItem sx={{ py: "6px", px: "12px" }}>
                    <Link to="/adminUsers" style={{ textDecoration: "none" }}>
                      <Typography variant="body2" color="text.primary">
                        Administrar Usuarios
                      </Typography>
                    </Link>
                  </MenuItem>
                )}
              </Box>
            </Box>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              {!user ? (
                <>
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <Button color="primary" variant="text" size="small">
                      Inicia sesion
                    </Button>
                  </Link>
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    <Button color="primary" variant="contained" size="small">
                      Registrate
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Tooltip title="Opciones de usuario">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="avatar user" src={user?.avatar} />
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
                    <Link to="/profile" style={{ textDecoration: "none" }}>
                      <MenuItem key="perfil">
                        <Typography
                          sx={(theme) => ({
                            color:
                              theme.palette.mode === "light"
                                ? "black"
                                : "white",
                            textDecoration: "none",
                          })}
                          onClick={handleCloseUserMenu}
                          textAlign="center"
                        >
                          Perfil
                        </Typography>
                      </MenuItem>
                    </Link>
                    <MenuItem key="cerrar sesion" onClick={handleLogout}>
                      <Typography textAlign="center">Cerrar Sesion</Typography>
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>

            <Box sx={{ display: { sm: "", md: "none" } }}>
              <Button
                variant="text"
                color="primary"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{ minWidth: "30px", p: "4px" }}
              >
                <MenuIcon />
              </Button>
              <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <Box
                  sx={{
                    minWidth: "60dvw",
                    p: 2,
                    backgroundColor: "background.paper",
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode
                      mode={mode}
                      toggleColorMode={toggleColorMode}
                    />
                  </Box>
                  <MenuItem sx={{ py: "6px", px: "12px" }}>
                    <Link to="/searchDoctor" style={{ textDecoration: "none" }}>
                      <Typography variant="body2" color="text.primary">
                        Buscar medico
                      </Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem sx={{ py: "6px", px: "12px" }}>
                    <Link to="/aboutUs" style={{ textDecoration: "none" }}>
                      <Typography variant="body2" color="text.primary">
                        Sobre Medimatch
                      </Typography>
                    </Link>
                  </MenuItem>
                  {user && (
                    <MenuItem sx={{ py: "6px", px: "12px" }}>
                      <Link
                        to="/myAppointments"
                        style={{ textDecoration: "none" }}
                      >
                        <Typography variant="body2" color="text.primary">
                          Historial de citas
                        </Typography>
                      </Link>
                    </MenuItem>
                  )}
                  {user?.role === "Doctor" && (
                    <MenuItem sx={{ py: "6px", px: "12px" }}>
                      <Link
                        to="/myAppoinmentsDoctor"
                        style={{ textDecoration: "none" }}
                      >
                        <Typography variant="body2" color="text.primary">
                          Citas de mis pacientes
                        </Typography>
                      </Link>
                    </MenuItem>
                  )}
                  {user?.role === "Doctor" && (
                    <MenuItem sx={{ py: "6px", px: "12px" }}>
                      <Link
                        to="/searchPatient"
                        style={{ textDecoration: "none" }}
                      >
                        <Typography variant="body2" color="text.primary">
                          Buscar Paciente
                        </Typography>
                      </Link>
                    </MenuItem>
                  )}
                  {user?.role === "Admin" && (
                    <MenuItem sx={{ py: "6px", px: "12px" }}>
                      <Link to="/adminUsers" style={{ textDecoration: "none" }}>
                        <Typography variant="body2" color="text.primary">
                          Administrar Usuarios
                        </Typography>
                      </Link>
                    </MenuItem>
                  )}
                  <Divider />
                  {!user ? (
                    <>
                      <Link to="/login" style={{ textDecoration: "none" }}>
                        <Button
                          sx={{ mt: 3 }}
                          color="primary"
                          variant="text"
                          size="small"
                        >
                          Inicia sesion
                        </Button>
                      </Link>
                      <Link to="/signup" style={{ textDecoration: "none" }}>
                        <Button
                          sx={{ mt: 3 }}
                          color="primary"
                          variant="contained"
                          size="small"
                        >
                          Registrate
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <Tooltip title="Opciones de usuario">
                        <IconButton onClick={handleOpenUserMenu} sx={{ m: 2 }}>
                          <Avatar alt="avatar user" src={user?.avatar} />
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
                        <Link to="/profile" style={{ textDecoration: "none" }}>
                          <MenuItem key="perfil">
                            <Typography
                              sx={(theme) => ({
                                color:
                                  theme.palette.mode === "light"
                                    ? "black"
                                    : "white",
                                textDecoration: "none",
                              })}
                              onClick={handleCloseUserMenu}
                              textAlign="center"
                            >
                              Perfil
                            </Typography>
                          </MenuItem>{" "}
                        </Link>
                        <MenuItem key="cerrar sesion" onClick={handleLogout}>
                          <Typography textAlign="center">
                            Cerrar Sesion
                          </Typography>
                        </MenuItem>
                      </Menu>
                    </>
                  )}
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

AppAppBar.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default AppAppBar;
