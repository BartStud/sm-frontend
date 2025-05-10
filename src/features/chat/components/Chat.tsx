import React, { useState, useEffect } from "react";
import {
  MessageList,
  Message,
  MessageInput as ChatInput,
  Conversation,
  ConversationList,
  Avatar,
  ConversationHeader,
} from "@chatscope/chat-ui-kit-react";
import { CircularProgress, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import defaultPicture from "../../../assets/dog-paw.svg";
import {
  ChatContainer,
  ChatContent,
  ChatHeader,
  ChatListContainer,
  ChatWindowContainer,
} from "./Chat.styles";
import {
  useCreateChatMutation,
  useFetchChatHistoryQuery,
  useFetchChatsQuery,
} from "../chatApi";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { useChatWebSocket } from "../useChatWebSocket";
import { useDispatch } from "react-redux";
import { clearSelectedChat, selectChat } from "../chatSlice";
import { ChatMessage } from "../Chat.types";

interface ChatProps {
  onClose: () => void;
}

const ChatComponent: React.FC<ChatProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { profile, id: currentUserId } = useSelector(
    (state: RootState) => state.currentUser
  );
  const selectedChat = useSelector(
    (state: RootState) => state.chat.selectedChat
  );
  const { username } = profile;
  const {
    data: chats,
    isLoading,
    error,
  } = useFetchChatsQuery({ currentUserId });
  const [createChat] = useCreateChatMutation();
  const { data: chatHistory } = useFetchChatHistoryQuery(
    { chatId: selectedChat?.id ?? "" },
    { skip: !selectedChat }
  );

  const { messages: wsMessages, sendMessage } = useChatWebSocket(
    selectedChat ? String(selectedChat.id) : ""
  );
  useEffect(() => {
    if (wsMessages.length > 0) {
      setMessages((prev) => [...wsMessages]);
    }
  }, [wsMessages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;
    sendMessage(newMessage);
    setNewMessage("");
  };
  if (isLoading) return <CircularProgress />;

  return (
    <ChatContainer>
      <ChatHeader>
        <div>Chat</div>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </ChatHeader>
      <ChatContent>
        <ChatListContainer>
          {error ? (
            <div>Błąd ładowania czatów: {(error as Error).message}</div>
          ) : (
            !selectedChat && (
              <ConversationList>
                {chats && chats.length > 0 ? (
                  chats.map((chat) => (
                    <Conversation
                      key={chat.id}
                      name={
                        chat.name.length ? chat.name : chat.partner?.username
                      }
                      onClick={() => dispatch(selectChat(chat))}
                    >
                      <Avatar
                        name={chat.partner?.username || ""}
                        src={chat.partner?.picture || defaultPicture}
                      />
                    </Conversation>
                  ))
                ) : (
                  <div style={{ padding: "1rem" }}>Brak czatów</div>
                )}
              </ConversationList>
            )
          )}
        </ChatListContainer>
        {selectedChat && (
          <ChatWindowContainer>
            <>
              <ConversationHeader>
                <ConversationHeader.Back
                  key="1"
                  onClick={() => dispatch(clearSelectedChat())}
                />
                <Avatar
                  key="2"
                  src={selectedChat.partner?.picture || defaultPicture}
                  name={selectedChat.partner?.username}
                />
                <ConversationHeader.Content
                  key="3"
                  userName={
                    selectedChat.name.length > 0
                      ? selectedChat.name
                      : selectedChat.partner?.username
                  }
                />
              </ConversationHeader>

              <div style={{ flex: 1, overflowY: "auto" }}>
                <MessageList>
                  {chatHistory?.map((msg) => (
                    <Message
                      key={msg.id}
                      model={{
                        message: msg.content,
                        sender: msg.sender,
                        direction:
                          msg.sender === username ? "outgoing" : "incoming",
                        position: "normal",
                      }}
                    />
                  ))}
                  {messages.map((msg) => (
                    <Message
                      key={msg.id}
                      model={{
                        message: msg.content,
                        sender: msg.sender,
                        direction:
                          msg.sender === username ? "outgoing" : "incoming",
                        position: "normal",
                      }}
                    />
                  ))}
                </MessageList>
              </div>
              <div style={{ padding: "0.1rem" }}>
                <ChatInput
                  value={newMessage}
                  onChange={(msg) => setNewMessage(msg)}
                  onSend={handleSendMessage}
                />
              </div>
            </>
          </ChatWindowContainer>
        )}
      </ChatContent>
    </ChatContainer>
  );
};

export default ChatComponent;
