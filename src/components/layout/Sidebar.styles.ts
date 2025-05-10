import styled from "styled-components";

export const SidebarContainer = styled.div`
  width: 250px;
  background-color: ${({ theme }) => theme.palette.secondary.main};
  color: ${({ theme }) => theme.palette.text.primary};
  padding: 20px;
  overflow-y: auto;
  height: 100vh;
  position: fixed;
  top: 64px; /* Adjust for AppBar height */
  left: 0;
  z-index: 1000;
`;

export const SidebarHeader = styled.h2`
  margin-top: 0;
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const SidebarItem = styled.li<{ active: boolean }>`
  padding: 10px;
  cursor: pointer;
  background-color: ${({ theme, active }) =>
    active ? theme.palette.secondary.dark : "transparent"};
  color: ${({ theme }) => theme.palette.text.primary};

  &:hover {
    background-color: ${({ theme }) => theme.palette.action.hover};
  }
`;
