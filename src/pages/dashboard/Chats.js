import {
  Typography,
  Stack,
  Box,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import {
  ArchiveBox,
  CircleDashed,
  MagnifyingGlass,
  User,
} from "phosphor-react";
import { ChatList } from "../../data/index";
import { SimpleBarStyle } from "../../components/Scrollbar";
import React, { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import ChatElement from "../../components/ChatElement";
import Friends from "../../sections/main/Friends";
import { socket } from "../../socket";
import { useSelector } from "react-redux";

const user_id = window.localStorage.getItem("user_id");

const Chats = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme();

  const { conversations } = useSelector(
    (state) => state.conversation.direct_chat,
  );

  useEffect(() => {
    socket.emit("get_direct_conversations", { user_id }, (data) => {
      // data => list of conversations
    });
  }, []);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  return (
    <>
      <Box
        sx={{
          position: "relative",
          width: 320,
          backgroundColor:
            theme.palette.mode === "light"
              ? "#f8faff"
              : theme.palette.background.paper,
          boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
        }}
      >
        <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
          <Stack
            direction="row"
            alignItems={"center"}
            justifyContent="space-between"
          >
            <Typography variant="h5">Chats</Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <IconButton
                onClick={() => {
                  handleOpenDialog();
                }}
              >
                <User />
              </IconButton>
              <IconButton>
                <CircleDashed />
              </IconButton>
            </Stack>
          </Stack>
          <Stack sx={{ width: "100%" }}>
            <Search>
              <SearchIconWrapper>
                <MagnifyingGlass color="#709CE6" />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search" />
            </Search>
          </Stack>
          <Stack spacing={1}>
            <Stack direction="row" alignItems={"center"} spacing={1.5}>
              <ArchiveBox size={24} />
              <Button>Archive</Button>
            </Stack>
            <Divider flexItem />
          </Stack>
          <Stack
            spacing={2}
            direction="column"
            sx={{ flexGrow: 1, overflow: "scroll", height: "100%" }}
          >
            <SimpleBarStyle timeout={500} clickOnTrack={false}>
              <Stack spacing={2.4}>
                {/* <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                  Pinned
                </Typography>
                {ChatList.filter((el) => el.pinned).map((el) => {
                  return <ChatElement key={el.id} {...el} />;
                })}*/}
              </Stack>
              <Stack spacing={2.4}>
                <Typography variant="subtitle2" sx={{ color: "#676767" }}>
                  All Chats
                </Typography>
                {conversations
                  .filter((el) => !el.pinned)
                  .map((el) => {
                    return <ChatElement key={el.id} {...el} />;
                  })}
              </Stack>
            </SimpleBarStyle>
          </Stack>
        </Stack>
      </Box>
      {openDialog && (
        <Friends open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default Chats;
