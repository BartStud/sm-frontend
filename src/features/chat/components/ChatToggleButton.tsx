import React from "react";
import styled from "styled-components";
import ChatIcon from "@mui/icons-material/Chat";

const ToggleButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: ${({ theme }) => theme.palette.primary.main};
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  color: white;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface ChatToggleButtonProps {
  onToggle: () => void;
}

const ChatToggleButton: React.FC<ChatToggleButtonProps> = ({ onToggle }) => {
  return (
    <ToggleButton onClick={onToggle}>
      <ChatIcon />
    </ToggleButton>
  );
};

export default ChatToggleButton;
