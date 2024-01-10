import { useNotificationCenter } from "react-toastify/addons/use-notification-center";
import { useState } from "react";
import {
  Alert,
  AlertColor,
  Badge,
  Box,
  IconButton,
  Popper,
  Fade,
  Button,
  Stack,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";

export default function DescriptionAlerts() {
  const { notifications, clear, markAllAsRead, markAsRead, unreadCount } =
    useNotificationCenter();
  const [showUnreadOnly] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const toggleNotificationCenter = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(!isOpen);
  };

  return (
    <Box sx={{ margin: "8px" }}>
      <IconButton size="large" onClick={toggleNotificationCenter}>
        <Badge badgeContent={unreadCount} color="primary">
          <MailIcon color="action" />
        </Badge>
      </IconButton>

      <Popper open={isOpen} anchorEl={anchorEl} transition placement="top-end">
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box>
              <Stack
                sx={{
                  height: "400px",
                  width: "min(30ch, 100ch)",
                  padding: "12px",
                  background: "black",
                  borderRadius: "8px",
                  overflowY: "auto",
                  opacity: "0.8",
                }}
                spacing={2}
              >
                {(!notifications.length ||
                  (unreadCount === 0 && showUnreadOnly)) && (
                  <h4 style={{ textAlign: "center", margin: "auto 0" }}>
                    알림이 없습니다 <span role="img">🎉</span>
                  </h4>
                )}
                {(showUnreadOnly
                  ? notifications.filter((v) => !v.read)
                  : notifications
                ).map((notification) => {
                  return (
                    <Alert
                      severity={(notification.type as AlertColor) || "info"}
                      action={
                        notification.read ? (
                          <CheckIcon />
                        ) : (
                          <IconButton
                            color="primary"
                            aria-label="upload picture"
                            component="span"
                            onClick={() => markAsRead(notification.id)}
                          >
                            <MarkChatReadIcon />
                          </IconButton>
                        )
                      }
                    >
                      {notification.content as React.ReactNode}
                    </Alert>
                  );
                })}
                {notifications.length > 0 && (
                  <Box
                    sx={{
                      background: "#666",
                      padding: "8px",
                      display: "flex",
                      justifyContent: "space-between",
                      borderRadius: "8px",
                      alignItems: "center",
                      opacity: "0.8",
                    }}
                  >
                    <Button variant="contained" onClick={clear}>
                      <DeleteIcon color="action" />
                    </Button>
                    <Button variant="contained" onClick={markAllAsRead}>
                      <MarkEmailReadIcon color="action" />
                    </Button>
                  </Box>
                )}
              </Stack>
            </Box>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}
