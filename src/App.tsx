import React, { useEffect } from "react";
import { CircularProgress, CssBaseline } from "@mui/material";
import { useAuth, hasAuthParams } from "react-oidc-context";
import { useDispatch } from "react-redux";

import { AppContainer, MainContent } from "./App.styles";
import { theme } from "./theme";
import { GlobalStyles } from "./GlobalStyles";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

import Header from "./components/layout/Header";
import { Route, Routes } from "react-router";
import Home from "./pages/Home";
import { useGetCurrentUserQuery } from "./features/user/userApi";
import { setCurrentUser, setUserProfile } from "./features/user/userSlice";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import UserProfile from "./pages/UserProfile";
import ChatComponent from "./features/chat/components/Chat";
import { setChatOpen } from "./features/chat/chatSlice";

const App: React.FC = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.currentUser.token);
  const isChatOpen = useSelector((state: RootState) => state.chat.isOpen);
  const { data: currentUser } = useGetCurrentUserQuery(undefined, {
    skip: !token,
  });

  useEffect(() => {
    if (auth.user) {
      const user = auth.user.profile;
      dispatch(
        setCurrentUser({
          id: user.sub,
          token: auth.user.access_token,
        })
      );
    }
  }, [auth.user, dispatch]);

  useEffect(() => {
    if (currentUser) {
      dispatch(setUserProfile(currentUser));
    }
  }, [currentUser, dispatch]);

  useEffect(() => {
    if (
      !(
        hasAuthParams() ||
        auth.isAuthenticated ||
        auth.activeNavigator ||
        auth.isLoading
      )
    ) {
      auth.signinRedirect();
    }
  }, [auth]);

  return (
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />
        <GlobalStyles />
        {auth.isLoading || (auth.isAuthenticated && !token) ? (
          <CircularProgress />
        ) : (
          <>
            {!auth.isAuthenticated && <div>Brak dostępu</div>}
            {auth.isAuthenticated && (
              <AppContainer>
                <Header />
                <MainContent>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/profil" element={<UserProfile />} />
                    {/* <Route path="/blog" element={<Blog />}>
                      <Route index element={<BlogList />} />
                      <Route path="drafts" element={<BlogList />} />
                      <Route path="new" element={<PostEditor />} />
                      <Route path="edit/:postId" element={<PostEditor />} />
                      <Route path="/blog/:postId" element={<Post />} />
                    </Route> */}
                  </Routes>
                </MainContent>
                {isChatOpen && (
                  <ChatComponent onClose={() => dispatch(setChatOpen(false))} />
                )}
                {/*{!isChatOpen && (
                  <ChatToggleButton
                    onToggle={() => dispatch(setChatOpen(!isChatOpen))}
                  />
                )} */}
              </AppContainer>
            )}
          </>
        )}
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
};

export default App;
