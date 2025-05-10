import styled from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.palette.background.default};
`;
