import { useEffect, useState, useRef } from "react";
import io from "socket.io-client";
import { Grid, Divider } from "@mui/material";

import UserList from "./UserList";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import ChatHeader from "./ChatHeader";
import "./chat.css";
function ChatTest() {
  const [dataUser, setDataUser] = useState([]);
  const [dataChat, setDataChat] = useState({
    userSelected: null,
    messages: [],
  });
  const [sender, setActualUser] = useState({});
  const [selectedUser, setSelectedUser] = useState(null);
  const [messageBody, setMessage] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const messageListRef = useRef(null);

  useEffect(() => {
    const socket = io("http://localhost:4000");

    socket.on("init", (msgArray) => {
      setDataChat((prevDataChat) => ({
        ...prevDataChat,
        messages: msgArray,
      }));
    });

    socket.on("message", (msg) => {
      setDataChat((prevDataChat) => ({
        ...prevDataChat,
        messages: [...prevDataChat.messages, msg],
      }));
    });

    return () => {
      socket.off("init");
      socket.off("message");
    };
  }, [sender]);

  useEffect(() => {
    fetchDataUser();
    fetchActualUser();
  }, []);

  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [dataChat.messages]);

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth >= 1200);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fetchActualUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/actual-user", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setActualUser(userData);
      } else {
        console.error(
          "Error en la respuesta:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error en la solicitud fetch:", error);
    }
  };

  const fetchDataUser = async () => {
    try {
      const response = await fetch("http://localhost:8080/getAllUser", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setDataUser(data.users);
      } else {
        console.error(
          "Error en la respuesta:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error en la solicitud fetch:", error);
    }
  };

  const handleUserConversation = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/getChatRoom/?receiver=${id}`,
        {
          credentials: "include",
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const chatData = await response.json();
        setDataChat(chatData);
        setSelectedUser(chatData.userSelected);
      } else {
        console.error("Error en conseguir los datos");
      }
    } catch (error) {
      console.error("Error en la solicitud fetch:", error);
    }
  };

  const handleSendMessage = async () => {
    try {
      const socket = io("http://localhost:4000");

      socket.emit("message", {
        sender: sender._id,
        receiver: selectedUser,
        body: messageBody,
      });

      setMessage("");
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  return (
    <div style={{ overflow: "hidden" }}>
      <ChatHeader isVisible={isVisible} setIsVisible={setIsVisible} />
      <Grid container style={{ marginTop: 40, flexGrow: 1, height: "80vh" }}>
        {isVisible && (
          <UserList
            dataUser={dataUser}
            sender={sender}
            handleUserConversation={handleUserConversation}
          />
        )}
        <Grid
          item
          xs={isVisible ? 9 : 12}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <MessageList
            dataChat={dataChat}
            sender={sender}
            messageListRef={messageListRef}
          />
          <Divider />
          <MessageInput
            messageBody={messageBody}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default ChatTest;
