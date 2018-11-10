import { useState, useEffect } from 'react';
import EventBus from 'eventbusjs';

function useNotification() {
	const [isOpen, setIsOpen] = useState(false);
	const [message, setMessage] = useState('');

	const openNotification = (event, args) => {
		setMessage(args);
		setIsOpen(true);
	};

	const closeNotification = () => {
		setMessage('');
		setIsOpen(false);
	};

	useEffect(() => {
		EventBus.addEventListener('global-notification-show', openNotification);
		return function cleanup() {
			EventBus.removeEventListener('global-notification-show', openNotification);
		};
	});

	return [isOpen, message, closeNotification];
}

export default useNotification;
