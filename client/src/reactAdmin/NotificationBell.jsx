import NotificationsIcon from "@mui/icons-material/Notifications";
import { IconButton } from "@mui/material";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import * as React from "react";
import { useGetList, useRedirect, useTranslate } from "react-admin";

// ------------------------------------------------

const NotificationBell = () => {
  const translate = useTranslate();
  const redirect = useRedirect();
  const { total } = useGetList("request", {
    filter: {
      /*unreadNotification and pendingRequests*/
    },
  });

  return (
    <Tooltip title={translate("other.notifications")}>
      <IconButton
        size="large"
        color="inherit"
        onClick={() => {
          redirect("/request");
        }}
      >
        <Badge color="primary" badgeContent={total} max={999}>
          <NotificationsIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};

export default NotificationBell;
