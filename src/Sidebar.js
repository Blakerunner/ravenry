import React, { useState, useEffect, setState } from "react";
import { useDispatch } from "react-redux";
import "./Sidebar.css";
import { Avatar, Fab, ListItemAvatar } from "@material-ui/core";
import SettingsIcon from "@material-ui/icons/Settings";
import { selectUser, logout } from "./features/userSlice";
import { setRoomId, selectPlayers } from "./features/appSlice";
import { useSelector } from "react-redux";
import db, { auth } from "./firebase.js";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

function Sidebar() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const players = useSelector(selectPlayers);
  const anchor = "left";
  const [drawerState, setDrawerState] = useState({ left: false });

  const toggleDrawer = (anchor, open) => (event) => {
    setDrawerState({ ...drawerState, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        {players?.map((player) => (
          <ListItem
            button
            key={player.id}
            // onClick={() =>
            //   dispatch(
            //     setChannelInfo({
            //       channelId: players.id
            //     })
            //   )
            // }
          >
            <ListItemAvatar>
              <Avatar src={player.photo} />
            </ListItemAvatar>
            <ListItemText primary={player.displayName} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button className="sidebar__gameOptions">
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText>game options</ListItemText>
        </ListItem>
        <ListItem
          button
          className="sidebar__signout"
          onClick={() => dispatch(logout())}>
          <ListItemIcon>
            <ExitToAppIcon />
          </ListItemIcon>
          <ListItemText>sign out</ListItemText>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className="sidebar">
      <Fab
        className="sidebar__menuIcon"
        aria-label="sidebar menu"
        size="medium"
        onClick={toggleDrawer(anchor, true)}>
        <MenuIcon />
      </Fab>
      <SwipeableDrawer
        className="sidebar__drawer"
        anchor={anchor}
        open={drawerState[anchor]}
        onClose={toggleDrawer(anchor, false)}
        onOpen={toggleDrawer(anchor, true)}>
        {list(anchor)}
      </SwipeableDrawer>
    </div>
  );
}

export default Sidebar;
