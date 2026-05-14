import "./ChatInteractivo.css";
import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import type { EmojiClickData } from "emoji-picker-react";

interface Message {
  id: number;
  user: string;
  avatar: string;
  text?: string;
  image?: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    user: "Andrea",
    avatar: "https://i.pravatar.cc/100?img=32",
    text: "Who’s going to the concert tonight?",
  },

  {
    id: 2,
    user: "Mateo",
    avatar: "https://i.pravatar.cc/100?img=12",
    text: "Meeee 😭🔥",
  },

  {
    id: 3,
    user: "Luna",
    avatar: "https://i.pravatar.cc/100?img=15",
    text: "I already bought my tickettt",
  },

  {
    id: 4,
    user: "Sara",
    avatar: "https://i.pravatar.cc/100?img=47",
    text: "Sameeee 💚",
  },
];

function ChatInteractivo() {

  const [messages, setMessages] =
    useState<Message[]>(initialMessages);

  const [input, setInput] = useState("");

  const [showEmojiPicker, setShowEmojiPicker] =
    useState(false);

  const messagesEndRef =
    useRef<HTMLDivElement | null>(null);

  const fileInputRef =
    useRef<HTMLInputElement | null>(null);

  /* AUTO SCROLL */

  useEffect(() => {

    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });

  }, [messages]);

  /* SEND TEXT MESSAGE */

  const sendMessage = () => {

    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now(),
      user: "You",
      avatar: "https://i.pravatar.cc/100?img=5",
      text: input,
    };

    setMessages((prev) => [
      ...prev,
      newMessage,
    ]);

    setInput("");

    autoResponse();
  };

  /* AUTO RESPONSE */

  const autoResponse = () => {

    setTimeout(() => {

      const responses = [
        "OMG SAME 😭",
        "That sounds amazing 🔥",
        "Who else is going?",
        "I can’t waittt",
        "Yessss 💜",
      ];

      const random =
        responses[
          Math.floor(
            Math.random() * responses.length
          )
        ];

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          user: "Community",
          avatar:
            "https://i.pravatar.cc/100?img=32",
          text: random,
        },
      ]);

    }, 1200);
  };

  /* EMOJIS */

  const handleEmojiClick = (
    emojiData: EmojiClickData
  ) => {

    setInput((prev) =>
      prev + emojiData.emoji
    );

  };

  /* IMAGE UPLOAD */

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file = event.target.files?.[0];

    if (!file) return;

    const imageUrl =
      URL.createObjectURL(file);

    const newMessage: Message = {
      id: Date.now(),
      user: "You",
      avatar: "https://i.pravatar.cc/100?img=5",
      image: imageUrl,
    };

    setMessages((prev) => [
      ...prev,
      newMessage,
    ]);

    autoResponse();

  };

  return (

    <div className="chat-screen">

      {/* STATUS BAR */}

      <div className="status-bar">

        <span>9:41</span>

        <div className="status-icons">

          <i className="fas fa-signal"></i>
          <i className="fas fa-wifi"></i>
          <i className="fas fa-battery-full"></i>

        </div>

      </div>

      {/* HEADER */}

      <div className="top-bar">

        <i className="fas fa-chevron-left back"></i>

        <h1>community</h1>

        <div className="avatars">

          <img
            src="https://i.pravatar.cc/100?img=32"
            alt=""
          />

          <img
            src="https://i.pravatar.cc/100?img=12"
            alt=""
          />

          <img
            src="https://i.pravatar.cc/100?img=15"
            alt=""
          />

          <img
            src="https://i.pravatar.cc/100?img=47"
            alt=""
          />

        </div>

      </div>

      {/* MENSAJES */}

      <div className="messages">

        {messages.map((msg) => (

          <div
            className={`message-row ${
              msg.user === "You"
                ? "message-you"
                : ""
            }`}
            key={msg.id}
          >

            <img
              src={msg.avatar}
              alt=""
              className="avatar"
            />

            <div className="message-content">

              <span className="message-user">
                {msg.user}
              </span>

              {/* TEXT */}

              {msg.text && (

                <div
                  className={`bubble ${
                    msg.text.length < 18
                      ? "bubble-small"
                      : msg.text.length < 40
                      ? "bubble-medium"
                      : "bubble-big"
                  }`}
                >

                  <p>{msg.text}</p>

                </div>

              )}

              {/* IMAGE */}

              {msg.image && (

                <img
                  src={msg.image}
                  alt="uploaded"
                  className="chat-image"
                />

              )}

            </div>

          </div>

        ))}

        <div ref={messagesEndRef}></div>

      </div>

      {/* EMOJI PICKER */}

      {showEmojiPicker && (

        <div className="emoji-picker">

          <EmojiPicker
            onEmojiClick={handleEmojiClick}
          />

        </div>

      )}

      {/* INPUT */}

      <div className="chat-input">

        {/* CAMERA */}

        <div
          className="camera-btn"
          onClick={() =>
            fileInputRef.current?.click()
          }
        >

          <i className="fas fa-camera"></i>

        </div>

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageUpload}
        />

        {/* TEXT INPUT */}

        <input
          type="text"
          placeholder="message......"
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={(e) => {

            if (e.key === "Enter") {
              sendMessage();
            }

          }}
        />

        <div className="right-icons">

          <i className="fas fa-microphone"></i>

          {/* EMOJI */}

          <i
            className="far fa-grin"
            onClick={() =>
              setShowEmojiPicker(
                !showEmojiPicker
              )
            }
          ></i>

          {/* SEND */}

          <i
            className="fas fa-paper-plane"
            onClick={sendMessage}
          ></i>

        </div>

      </div>

    </div>
  );
}

export default ChatInteractivo;