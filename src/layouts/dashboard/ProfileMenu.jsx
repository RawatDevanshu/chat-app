import { faker } from "@faker-js/faker";
import { Avatar, Menu, MenuItem, Stack } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Profile_Menu } from "../../data";
import { LogoutUser } from "../../redux/slices/auth";

const getMenuPath = (index) => {
  switch (index) {
    case 0:
      return "/profile";
    case 1:
      return "/settings";
    case 2:
      //TODO => update token and set isAuthenticated to false
      return "/auth/login";
    default:
      break;
  }
};

const ProfileMenu = () => {
  const { user } = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const user_id = window.localStorage.getItem("user_id");
  const user_name = user?.firstName;

  return (
    <>
      <Avatar
        id="basic-button"
        onClick={handleClick}
        alt={user_name}
        src={faker.image.avatar()}
      />
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Stack spacing={1} px={1}>
          {Profile_Menu.map((el, idx) => (
            <MenuItem
              onClick={() => {
                handleClick();
              }}
              key={idx}
            >
              <Stack
                onClick={() => {
                  if (idx === 2) {
                    dispatch(LogoutUser());
                  } else {
                    navigate(getMenuPath(idx));
                  }
                }}
                sx={{ width: 100 }}
                direction="row"
                alignItems={"center"}
                justifyContent="space-between"
              >
                <span>{el.title}</span>
                {el.icon}
              </Stack>
            </MenuItem>
          ))}
        </Stack>
      </Menu>
    </>
  );
};

export default ProfileMenu;
