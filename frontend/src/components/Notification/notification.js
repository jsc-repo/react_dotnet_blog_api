import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Notification = ({ notification, setNotification, redirectPath }) => {
  const navigate = useNavigate();
  const handleClose = (event, reason) => {
    setNotification({ ...notification, isOpen: false });
    navigate("/");
  };

  return (
    <Snackbar
      open={notification.isOpen}
      autoHideDuration={1000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={notification.severity}>
        {notification.message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
