import { toast } from 'react-toastify'; // Notification message container

export const showNotification = (message, type, timeOut, position) => toast(
  message,
  {
    type, // allowed types ["info","success","warning","error","default"]
    autoClose: timeOut,
    hideProgressBar: true,
    position,
  },
);

export const dismissNotification = toastId => toast.dismiss(toastId);
