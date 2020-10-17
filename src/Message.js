import { Avatar, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import React from "react";
import "./Message.css";

function Message({ user, message }) {
  return (
    <ListItem alignItems="flex-start">
      <ListItemAvatar>
        <Avatar alt={user.firstName} src={user.photoURL} />
      </ListItemAvatar>
      <ListItemText
        primary={user.firstName}
        secondary={message}
      />
    </ListItem>
  );
}

export default Message;
