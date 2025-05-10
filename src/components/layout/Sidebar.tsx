import React from "react";
import { SidebarContainer } from "./Sidebar.styles";
import { Channel } from "../../types/types";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface SidebarProps {
  channels: Channel[];
  onSelectChannel: (channel: Channel) => void;
  selectedChannel: Channel;
}

const Sidebar: React.FC<SidebarProps> = ({
  channels,
  onSelectChannel,
  selectedChannel,
}) => {
  const theme = useTheme();

  return (
    <SidebarContainer style={{ backgroundColor: theme.palette.secondary.main }}>
      <List>
        {channels?.map((channel) => (
          <ListItem key={channel.id} disablePadding>
            <ListItemButton
              selected={selectedChannel.id === channel.id}
              onClick={() => onSelectChannel(channel)}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: theme.palette.primary.main,
                  color: "#fff",
                },
              }}
            >
              <ListItemText primary={`#${channel.name}`} />
            </ListItemButton>
          </ListItem>
        )) || <>Brak</>}
      </List>
    </SidebarContainer>
  );
};

export default Sidebar;
