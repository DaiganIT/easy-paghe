import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
  waitForDomChange
} from 'react-testing-library';
import axiosMock from 'axios';
import EventBus from 'eventbusjs';
import 'jest-dom/extend-expect';
import EditPerson from '../EditPerson';

const mockHistory = {
  push: jest.fn()
};
const defaultProps = {
  history: mockHistory,
  match: {
    params: {
      personId: 35
    }
  }
};

jest.mock('eventbusjs');

afterEach(cleanup)
afterEach(jest.clearAllMocks);

const dbPerson = {
  id: 35,
  firstName: 'Pietro',
  lastName: 'Carta',
  address: 'inkerman',
  phone: '5546',
  email: 'test@pietro.co.uk'
};

test('has the correct title', () => {
  axiosMock.get.mockResolvedValueOnce({ data: dbPerson });
  const { container } = render(<EditPerson {...defaultProps} />);

  const title = container.firstChild.querySelector('#page-title');
  expect(title.textContent).toBe('Modifica Persona');
});

test('loads the person', async () => {
  axiosMock.get.mockResolvedValueOnce({ data: dbPerson });
  const { container } = render(<EditPerson {...defaultProps} />);

  expect(container.firstChild.querySelector('#edit-person-progress')).toBeInTheDocument();
  expect(axiosMock.get).toHaveBeenCalledWith('/api/people/35', expect.anything());

  await waitForDomChange();

  expect(container.firstChild.querySelector('#edit-person-progress')).not.toBeInTheDocument();
  const steps = container.firstChild.querySelectorAll('.step-header');
  expect((steps[0].querySelectorAll('.step-label span'))[1].firstChild.className).not.toContain('MuiStepLabel-active');
  expect((steps[1].querySelectorAll('.step-label span'))[1].firstChild.className).toContain('MuiStepLabel-active');

  // check data is all showing correctly
  expect(container.querySelector('#person-summary-edit-details')).toBeInTheDocument();

  const summaryItems = container.querySelectorAll('.summary-item');
  expect(summaryItems.length).toBe(5);

  expect(summaryItems[0].textContent).toBe('Nome:Pietro');
  expect(summaryItems[1].textContent).toBe('Cognome:Carta');
  expect(summaryItems[2].textContent).toBe('Indirizzo:inkerman');
  expect(summaryItems[3].textContent).toBe('Telefono:5546');
  expect(summaryItems[4].textContent).toBe('Email:test@pietro.co.uk');

  expect(container.querySelector('#button-step-save')).toBeInTheDocument();
  expect(container.querySelector('#button-step-save')).not.toBeDisabled();
});

test('can go to person details', async () => {
  axiosMock.get.mockResolvedValueOnce({ data: dbPerson });
  const { container } = render(<EditPerson {...defaultProps} />);

  expect(container.firstChild.querySelector('#edit-person-progress')).toBeInTheDocument();
  expect(axiosMock.get).toHaveBeenCalledWith('/api/people/35', expect.anything());

  await waitForDomChange();

  const editPersonDetailsButton = container.querySelector('#person-summary-edit-details');
  fireEvent.click(editPersonDetailsButton);

  const steps = container.firstChild.querySelectorAll('.step-header');
  expect((steps[0].querySelectorAll('.step-label span'))[1].firstChild.className).toContain('MuiStepLabel-active');
  expect((steps[1].querySelectorAll('.step-label span'))[1].firstChild.className).not.toContain('MuiStepLabel-active');
});

test('saves the person', async () => {
  axiosMock.get.mockResolvedValueOnce({ data: dbPerson });
  const { container } = render(<EditPerson {...defaultProps} />);

  expect(container.firstChild.querySelector('#edit-person-progress')).toBeInTheDocument();
  expect(axiosMock.get).toHaveBeenCalledWith('/api/people/35', expect.anything());

  await waitForDomChange();

  let saveButton = container.firstChild.querySelector('#button-step-save');

  axiosMock.put.mockResolvedValueOnce({ data: { id: 35 } });
  fireEvent.click(saveButton);

  expect(saveButton).toBeDisabled();

  await waitForDomChange();
  expect(saveButton).not.toBeDisabled();

  expect(axiosMock.put).toHaveBeenCalledWith('/api/people/35', {
    id: 35,
    firstName: 'Pietro',
    lastName: 'Carta',
    address: 'inkerman',
    phone: '5546',
    email: 'test@pietro.co.uk'
  }, expect.anything());

  expect(EventBus.dispatch).toHaveBeenCalledWith('global-notification-show', undefined, { message: 'Persona aggiornata' });
});