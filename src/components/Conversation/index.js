import { Box, Stack } from "@mui/material";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Message from "./Message";

const ChatComponent = () => {
  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      <Header />
      {/* Conversation body*/}
      <Box
        width={"100%"}
        sx={{ flexGrow: 1, height: "100%", overflow: "scroll" }}
      >
        <Message menu={true} />
      </Box>
      <Footer />
    </Stack>
  );
};

export default ChatComponent;
