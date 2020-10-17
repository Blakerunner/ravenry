import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, login, logout } from "./features/userSlice";
import { setRoomInfo, setRoomId } from "./features/appSlice";
import db, { auth } from "./firebase";
import Chat from "./Chat";
import Login from "./Login";
import Sidebar from "./Sidebar";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            id: authUser.uid,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
          })
        );
        console.log("User: " + authUser.uid);

        // needs error checking
        db.collection("rooms")
          .where("id", "==", authUser.uid)
          .get()
          .then((room) => {
            room.forEach((doc) => {
              dispatch(setRoomId(doc.id));
              dispatch(setRoomInfo(doc.data()));
            })
          });
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
