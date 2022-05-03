import MoreVertIcon from "@mui/icons-material/MoreVert";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import IconButton from "@mui/material/IconButton";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import * as React from "react";
import { MenuItemLink } from "react-admin";

const PostActionButton = ({ postId }) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

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
                  <MenuItemLink
                    to={"/post/" + postId + "/show"}
                    primaryText="Show"
                  />
                  <MenuItemLink to={"/post/" + postId} primaryText="Edit" />
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