import { Box, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { CaretLeft } from "phosphor-react";
import React from "react";
import ProfileForm from "../../sections/settings/ProfileForm";

const Profile = () => {
  const theme = useTheme();
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
          <Stack p={4} spacing={5}>
            {/* Header */}
            <Stack direction="row" alignItems="center" spacing={3}>
              <IconButton>
                <CaretLeft size={24} color={"#4b4b4b"} />
              </IconButton>
              <Typography variant="h5">Profile</Typography>
            </Stack>
            {/* Profile form */}

            <ProfileForm />
          </Stack>
        </Box>
        {/*right*/}
        {/*//Todo =>*/}
      </Stack>
    </>
  );
};

export default Profile;
