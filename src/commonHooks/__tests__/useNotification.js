import { renderHook, cleanup, act } from 'react-hooks-testing-library'
import useNotification from '../useNotification';
import EventBus from 'eventbusjs';

afterEach(cleanup)

test('default state is correct', async () => {
  const { result } = renderHook(() => useNotification());
  const [isOpen, message] = result.current;
  expect(isOpen).toBe(false);
  expect(message).toBe('');
});

test('receives event', async () => {
  const { result } = renderHook(() => useNotification());
  EventBus.dispatch('global-notification-show', undefined, { message: 'Test' });

  const [isOpen, message] = result.current;
  expect(isOpen).toBe(true);
  expect(message).toBe('Test');
});