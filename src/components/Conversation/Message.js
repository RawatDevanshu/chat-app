import { Stack, Box } from "@mui/material";
import { Chat_History } from "../../data/index";
import React, { useEffect } from "react";
import {
  DocMsg,
  LinkMsg,
  MediaMsg,
  ReplyMsg,
  TextMsg,
  Timeline,
} from "./MsgTypes";
import { useDispatch, useSelector } from "react-redux";
import {
  FetchCurrentMessages,
  SetCurrentConversation,
} from "../../redux/slices/conversation";
import { socket } from "../../socket";

const Message = ({ menu }) => {
  const dispatch = useDispatch();

  const { conversations, current_messages } = useSelector(
    (state) => state.conversation.direct_chat,
  );

  const { room_id } = useSelector((state) => state.app);

  useEffect(() => {
    const current = conversations.find((el) => el?.id === room_id);
    socket.emit("get_messages", { conversation_id: current?.id }, (data) => {
      dispatch(FetchCurrentMessages({ messages: data }));
    });

    dispatch(SetCurrentConversation({ current_conversation: current }));
  }, []);
  return (
    <Box p={3}>
      <Stack spacing={3}>
        {current_messages.map((el) => {
          switch (el.type) {
            case "divider":
              return <Timeline el={el} menu={menu} />;
            case "msg":
              switch (el.subtype) {
                case "img":
                  return <MediaMsg el={el} menu={menu} />;
                case "doc":
                  return <DocMsg el={el} menu={menu} />;
                case "link":
                  return <LinkMsg el={el} menu={menu} />;
                case "reply":
                  return <ReplyMsg el={el} menu={menu} />;
                default:
                  return <TextMsg el={el} menu={menu} />;
              }
            default:
              return <></>;
          }
        })}
      </Stack>
    </Box>
  );
};

export default Message;
