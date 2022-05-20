import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import React, { useRef, useState } from "react";
import { Confirm, MenuItemLink, useDelete, useRedirect } from "react-admin";
import { useLocation } from "react-router-dom";

// ------------------------------------------------

const PostActionButton = ({ postId, setIsEditing }) => {
  const location = useLocation();
  const redirect = useRedirect();
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleteOne, { isLoading }] = useDelete();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  // ------------------------------------------------

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // ------------------------------------------------

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  // ------------------------------------------------

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  // ------------------------------------------------

  const showClick = (event) => {
    redirect("/post/" + postId + "/show");
    handleClose(event);
  };

  // ------------------------------------------------

  const editClick = (event) => {
    setIsEditing(true);
    handleClose(event);
  };

  // ------------------------------------------------

  const deleteClick = () => {
    setConfirmDeleteOpen(true);
  };

  const handleDeleteDialogClose = (event) => {
    setConfirmDeleteOpen(false);
    handleClose(event);
  };

  const handleDeleteConfirm = (event) => {
    deleteOne("post", { id: postId });
    setConfirmDeleteOpen(false);
    handleClose(event);
    if (location.pathname === "/post/" + postId + "/show") redirect("/post");
  };

  // ------------------------------------------------

  return (
    <div>
      <IconButton
        ref={anchorRef}
        id="composition-button"
        aria-controls={open ? "composition-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <MoreVertIcon />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        placement="bottom-start"
        transition
        disablePortal
        sx={{zIndex:2}}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom-start" ? "left top" : "left bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem={open}
                  id="composition-menu"
                  aria-labelledby="composition-button"
                  onKeyDown={handleListKeyDown}
                >
                  {location.pathname === "/post/" + postId + "/show" ? null : (
                    <MenuItem onClick={showClick}>
                      <ListItemIcon>
                        <VisibilityIcon
                          fontSize="small"
                          sx={{ color: "#1976d2" }}
                        />
                      </ListItemIcon>
                      <ListItemText sx={{ color: "#1976d2" }}>
                        Show
                      </ListItemText>
                    </MenuItem>
                    // <MenuItemLink
                    //   sx={{ color: "#1976d2" }}
                    //   to={"/post/" + postId + "/show"}
                    //   primaryText="Show"
                    //   leftIcon={
                    //     <VisibilityIcon
                    //       fontSize="small"
                    //       sx={{ color: "#1976d2" }}
                    //     />
                    //   }
                    // />
                  )}
                  <MenuItem onClick={editClick}>
                    <ListItemIcon>
                      <EditIcon sx={{ color: "#1976d2" }} fontSize="small" />
                    </ListItemIcon>
                    <ListItemText sx={{ color: "#1976d2" }}>Edit</ListItemText>
                  </MenuItem>
                  <MenuItem onClick={deleteClick}>
                    <ListItemIcon>
                      <DeleteIcon sx={{ color: "#d32f2f" }} fontSize="small" />
                    </ListItemIcon>
                    <ListItemText sx={{ color: "#d32f2f" }}>
                      Delete
                    </ListItemText>
                    <Confirm
                      isOpen={confirmDeleteOpen}
                      loading={isLoading}
                      title="Delete Post"
                      content="Are you sure you want to delete this post?"
                      onConfirm={handleDeleteConfirm}
                      onClose={handleDeleteDialogClose}
                    />
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
};

// ------------------------------------------------

export default PostActionButton;
