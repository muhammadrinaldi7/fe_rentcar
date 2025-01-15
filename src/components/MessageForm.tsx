import React, { useState } from "react";

// Definisikan tipe props menggunakan interface
interface MessageFormProps {
  onSend: (content: string, userId: number) => void;
}

const MessageForm: React.FC<MessageFormProps> = ({ onSend }) => {
  const [content, setContent] = useState<string>("");
  const [userId, setUserId] = useState<number>(2);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Mencegah form reload
    if (content.trim()) {
      onSend(content, userId); // Kirim pesan melalui onSend
      setContent(""); // Reset input
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
      <label htmlFor="userId">User ID:</label>
      <input
        type="number"
        id="userId"
        value={userId}
        onChange={(e) => setUserId(Number(e.target.value))}
        style={{ marginRight: "10px" }}
      />
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type your message"
        style={{ width: "80%", padding: "5px" }}
      />
      <button type="submit" style={{ padding: "5px" }}>
        Send
      </button>
    </form>
  );
};

export default MessageForm;
