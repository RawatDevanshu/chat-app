import React from "react";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Stack,
} from "@mui/material";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";
import { MagnifyingGlass } from "phosphor-react";
import { CallElement } from "../../components/CallElement";
import { MembersList } from "../../data";

const Transition = React.forwardRef(function Transistion(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StartCall = ({ open, handleClose }) => {
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      TransitionComponent={Transition}
      sx={{ p: 4 }}
    >
      <DialogTitle sx={{ mb: 3 }}>Start Call</DialogTitle>
      <DialogContent>
        {/*Search Bar*/}
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
        {/*Call list*/}
        {MembersList.map((el) => (
          <CallElement {...el} />
        ))}
        <CallElement online={true} />
      </DialogContent>
    </Dialog>
  );
};

export default StartCall;
