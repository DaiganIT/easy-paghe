import React from 'react';
import {
  render,
  cleanup,
  act,
} from 'react-testing-library';
import 'jest-dom/extend-expect';
import GlobalNotification from '../GlobalNotification';
import EventBus from 'eventbusjs';

afterEach(cleanup)

describe('GIVEN I have a Global Notification', () => {
  test('THEN The component is not rendered', () => {
    const { container } = render(<GlobalNotification>
      Save
    </GlobalNotification>)

    expect(container.outerHTML).toBe('<div></div>');
  });
  describe('WHEN A notification event is emitted', () => {
    test('THEN The component is rendered', () => {
      const { container } = render(<GlobalNotification>
        Save
      </GlobalNotification>);

      act(() => {
        EventBus.dispatch('global-notification-show', undefined, { message: 'Azienda creata' });
      });

      expect(container.querySelector('.MuiSnackbar-root-10')).toBeTruthy();
      expect(container.textContent).toBe('Azienda creata');
    });
  });
});