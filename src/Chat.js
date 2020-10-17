import React, { useEffect, useState } from "react";
import "./Chat.css";
import Message from "./Message";
import SendRoundedIcon from "@material-ui/icons/SendRounded";
import { useSelector } from "react-redux";
import { selectRoomInfo, selectRoomId } from "./features/appSlice";
import { selectUser } from "./features/userSlice";
import db from "./firebase";
import { Avatar, Fab, List } from "@material-ui/core";

function Chat() {
  const user = useSelector(selectUser);
  const roomId = useSelector(selectRoomId);
  const roomInfo = useSelector(selectRoomInfo);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (roomId != null) {
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() === 0) {
      console.log(user.displayName + " message send: " + input);
      db.collection("rooms").doc(roomId).collection("messages").add({
        message: input,
        toId: user.id,
        fromId: user.id,
      });
    }

    setInput("");
  };

  return (
    <div className="chat">
      <List className="chat__messages">
        {messages.map((message) => {
          if (message == null) return <h1>No messages.</h1>;
          if (message.fromId === user.id || message.toId === user.id)
            return (
              <Message
                toId={message.toId}
                fromId={message.fromId}
                message={message.message}
              />
            );
          return null;
        })}
      </List>

      <div className="chat__input">
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Send raven to ...`}
          />
        </form>

        <Fab
          className="chat__sendButton"
          aria-label="add"
          color="default"
          size="large"
          type="submit"
          component="button"
          onClick={sendMessage}>
          <Avatar src="/images/raven-logo-500x500.png" />
        </Fab>
      </div>
    </div>
  );
}

export default Chat;
