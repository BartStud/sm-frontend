import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
  Button,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import styled from "styled-components";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import logo from "../../assets/logo4.svg";
import { setChatOpen } from "../../features/chat/chatSlice";

const StyledAppBar = styled(AppBar)`
  width: 100%;
`;

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const userRole = useSelector((state: RootState) => state.currentUser?.role);
  const isChatOpen = useSelector((state: RootState) => state.chat.isOpen);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleUserMenuClose();
    auth.signoutRedirect();
  };

  const handleProfileClicked = () => {
    handleUserMenuClose();
    navigate("/profil");
  };

  const handleChatToggle = () => {
    dispatch(setChatOpen(!isChatOpen));
  };

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            marginRight: "20px",
          }}
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ height: "64px", marginRight: "8px" }}
          />
          <Typography
            variant="h6"
            component="div"
            fontFamily={"Tahoma"}
            letterSpacing={2}
          >
            School Money
          </Typography>
        </Box>
        <Box sx={{ marginLeft: "auto", display: "flex", gap: 2 }}>
          <>
            <Button color="inherit" onClick={() => navigate("/klasy")}>
              Klasy
            </Button>
            <Button color="inherit" onClick={() => navigate("/zbiorki")}>
              Zbiórki
            </Button>
            <Button color="inherit" onClick={() => handleChatToggle()}>
              Czat
            </Button>
            {/* <Button color="inherit" onClick={() => navigate("/kalendarz")}>
                Kalendarz
              </Button> */}
          </>
        </Box>
        <IconButton color="inherit" onClick={handleUserMenuOpen}>
          <AccountCircle />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleUserMenuClose}
        >
          <MenuItem onClick={handleProfileClicked}>Pokaż profil</MenuItem>
          <MenuItem onClick={handleLogout}>Wyloguj</MenuItem>
        </Menu>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;
