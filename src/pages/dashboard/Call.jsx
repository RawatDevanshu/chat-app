import {
  Box,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material";
import { MagnifyingGlass, PhoneCall, Plus } from "phosphor-react";
import React, { useState } from "react";
import { CallLogElement } from "../../components/CallElement";
import { SimpleBarStyle } from "../../components/Scrollbar";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import { CallLogs } from "../../data";
import StartCall from "../../sections/main/StartCall";

const Call = () => {
  const theme = useTheme();
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <Stack direction={"row"} sx={{ width: "100%" }}>
        {/*left*/}
        <Box
          sx={{
            height: "100vh",
            backgroundColor:
              theme.palette.mode === "light"
                ? "#f8faff"
                : theme.palette.background.paper,
            width: 320,
            boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
          }}
        >
          <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
            <Stack>
              <Typography variant="h5">Groups</Typography>
            </Stack>
            <Stack sx={{ width: "100%" }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#709ce6" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search..."
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Stack>
            <Stack
              direction={"row"}
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle2" component={Link}>
                Start new conversation
              </Typography>
              <IconButton
                onClick={() => {
                  setOpenDialog(true);
                }}
              >
                <PhoneCall style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />
            <Stack
              direction="column"
              sx={{ flexGrow: 1, overflowY: "scroll", height: "100%" }}
              spacing={3}
            >
              <SimpleBarStyle timeout={500} clickOnTrack={false}>
                <Stack spacing={2.5}>
                  <Typography variant="subtitle2" sx={{ color: "#676667" }}>
                    Call Logs
                  </Typography>

                  {/*call logs*/}
                  {CallLogs.map((log) => {
                    return <CallLogElement {...log} />;
                  })}
                </Stack>
              </SimpleBarStyle>
            </Stack>
          </Stack>
        </Box>
        {/*right*/}
        {/*//Todo => Reuse  Conversation Component*/}
      </Stack>
      {openDialog && (
        <StartCall open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default Call;
