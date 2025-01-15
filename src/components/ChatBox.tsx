import React from "react";

// Definisikan tipe untuk pesan
interface MessageResponse {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
  updated_at?: string;
  user: {
    id: number;
    name: string;
  };
}

// Tipe properti komponen
interface ChatBoxProps {
  messages: MessageResponse[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ messages }) => {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        height: "300px",
        overflowY: "scroll",
      }}
    >
      {messages.map((msg) => (
        <div key={msg.id} style={{ marginBottom: "10px" }}>
          <strong>{msg.user.name}:</strong> {msg.content}
        </div>
      ))}
    </div>
  );
};

export default ChatBox;
