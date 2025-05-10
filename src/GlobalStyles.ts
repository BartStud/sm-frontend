import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --chat-incoming-bg: ${({ theme }) => theme.palette.secondary.main};
    --chat-incoming-color: #ffffff;
    --chat-outgoing-bg: ${({ theme }) => theme.palette.primary.main};
    --chat-outgoing-color: #ffffff;
  }

  .chatscope__message--incoming {
    background-color: var(--chat-incoming-bg) !important;
    color: var(--chat-incoming-color) !important;
  }

  .chatscope__message--outgoing {
    background-color: var(--chat-outgoing-bg) !important;
    color: var(--chat-outgoing-color) !important;
  }

  .cs-message-input__content-editor-wrapper {
      background-color: transparent;
      div {
        background-color: transparent;
      }
  }
  
  .cs-conversation {
    background-color: ${({ theme }) => theme.palette.primary.light};
    border-radius: 0.5rem;
  }

  .MuiCircularProgress-root {
    color: ${({ theme }) => theme.palette.primary.main} !important;
  }

  .ck-editor__editable_inline {
    min-height: 55vh;
}
`;
