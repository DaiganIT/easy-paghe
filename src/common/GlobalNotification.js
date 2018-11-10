import React from 'react';
import Notification from './Notification';
import useNotification from '../commonHooks/useNotification';

function GlobalNotification() {
  const [isNotificationOpen, message, closeNotification] = useNotification();
  
  return <Notification open={isNotificationOpen} message={message} onClose={closeNotification} />;
}

export default GlobalNotification;
