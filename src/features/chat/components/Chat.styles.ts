import styled from "styled-components";

export const ChatContainer = styled.div`
  position: fixed;
  right: 0;
  top: 64px; /* poniżej nagłówka */
  bottom: 0;
  width: 350px;
  background-color: ${({ theme }) => theme.palette.background.default};
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

export const ChatHeader = styled.div`
  padding: 0.5rem;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ChatContent = styled.div`
  flex: 1;
  display: flex;
  overflow: hidden;
`;

export const ChatListContainer = styled.div`
  overflow-y: auto;
`;

export const ChatWindowContainer = styled.div`
  border-left: 1px solid #ccc;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;
