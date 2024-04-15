import { Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectConversation, showSnackbar } from "../../redux/slices/app";
import {
  addDirectConversations,
  updateDirectConversations,
} from "../../redux/slices/conversation";
import { connectSocket, socket } from "../../socket";
import Sidebar from "./Sidebar";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { conversations } = useSelector(
    (state) => state.conversation.direct_chat,
  );

  const user_id = window.localStorage.getItem("user_id");

  useEffect(() => {
    if (isLoggedIn) {
      window.onload = function () {
        if (!window.location.hash) {
          window.location = window.location + "#loaded";
          window.location.reload();
        }
      };

      window.onload();

      if (!socket) {
        connectSocket(user_id);
      }

      // "new_friend_request"
      socket.on("new_friend_request", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      });
      socket.on("request_accepted", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      });
      socket.on("request_sent", (data) => {
        dispatch(showSnackbar({ severity: "success", message: data.message }));
      });

      socket.on("start_chat", (data) => {
        console.log(data);

        const existing_conversation = conversations.find(
          (el) => el.id === data._id,
        );

        if (existing_conversation) {
          dispatch(updateDirectConversations({ conversation: data }));
        } else {
          // add direct conversation
          dispatch(addDirectConversations({ conversation: data }));
        }
        dispatch(selectConversation({ room_id: data._id }));
      });
    }
    return () => {
      socket?.off("new_friend_request");
      socket?.off("request_accepted");
      socket?.off("request.sent");
      socket?.off("start_chat");
    };
  }, [isLoggedIn, socket]);
  if (!isLoggedIn) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <Stack direction="row">
      <Sidebar />
      <Outlet />
    </Stack>
  );
};

export default DashboardLayout;
