import Markdown from "react-markdown";
import { ChatMessageType } from "../../../types/chatWidget";
import remarkGfm from "remark-gfm";
import rehypeMathjax from "rehype-mathjax";

export default function ChatMessage({
  message,
  isSend,
  error,
  user_message_style,
  bot_message_style,
  error_message_style,
}: ChatMessageType) {

  // Encode image URLs and convert to Markdown format
  const encodeAndConvertImageURLs = (text: string): string => {
    return text.replace(/<img src="([^"]+)">/g, (match, url) => {
      // Encode the URL using encodeURI
      const encodedURL = encodeURI(url);

      // Convert the encoded URL to Markdown format
      return `![Image](${encodedURL})`;
    });
  };

  const markdownMessage = encodeAndConvertImageURLs(message);

  return (
    <div
      className={
        "cl-chat-message " + (isSend ? " cl-justify-end" : " cl-justify-start")
      }
    >
      {isSend ? (
        <div style={user_message_style} className="cl-user_message">
          {message}
        </div>
      ) : error ? (
        <div style={error_message_style} className={"cl-error_message"}>
          {message}
        </div>
      ) : (
        <div style={bot_message_style} className={"cl-bot_message"}>
          <Markdown
            className={"markdown-body prose flex flex-col word-break-break-word"}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeMathjax]}
          >
            {markdownMessage}
          </Markdown>
        </div>
      )}
    </div>
  );
}
