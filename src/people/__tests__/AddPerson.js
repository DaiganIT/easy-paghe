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
import AddPerson from '../AddPerson';

const mockHistory = {
  push: jest.fn()
};
const defaultProps = {
  history: mockHistory
};

jest.mock('eventbusjs');

afterEach(cleanup)
afterEach(jest.clearAllMocks);

test('has the correct title', () => {
  const { container } = render(<AddPerson {...defaultProps} />);

  const title = container.firstChild.querySelector('#page-title');
  expect(title.textContent).toBe('Aggiungi Persona');
});

test('is showing company details', () => {
  const { container } = render(<AddPerson {...defaultProps} />);

  const inputs = container.firstChild.querySelectorAll('input');
  expect(inputs.length).toBe(5);

  expect(container.firstChild.querySelector('input#person-first-name')).toBeInTheDocument();
  expect(container.firstChild.querySelector('input#person-last-name')).toBeInTheDocument();
  expect(container.firstChild.querySelector('input#person-address')).toBeInTheDocument();
  expect(container.firstChild.querySelector('input#person-phone')).toBeInTheDocument();
  expect(container.firstChild.querySelector('input#person-email')).toBeInTheDocument();
});

test('default company details are correct', () => {
  const { container } = render(<AddPerson {...defaultProps} />);

  const inputs = container.firstChild.querySelectorAll('input');
  expect(inputs.length).toBe(5);

  expect(container.firstChild.querySelector('input#person-first-name').value).toBe('');
  expect(container.firstChild.querySelector('input#person-last-name').value).toBe('');
  expect(container.firstChild.querySelector('input#person-address').value).toBe('');
  expect(container.firstChild.querySelector('input#person-phone').value).toBe('');
  expect(container.firstChild.querySelector('input#person-email').value).toBe('');
});

test('first step is active', () => {
  const { container } = render(<AddPerson {...defaultProps} />);

  const steps = container.firstChild.querySelectorAll('.step-header');
  expect((steps[0].querySelectorAll('.step-label span'))[1].firstChild.className).toContain('MuiStepLabel-active');
  expect((steps[1].querySelectorAll('.step-label span'))[1].firstChild.className).not.toContain('MuiStepLabel-active');
});

test('validation is showing for first name and last name after hitting next', () => {
  const { container } = render(<AddPerson {...defaultProps} />);

  const nextButton = container.firstChild.querySelector('#button-step-next');
  fireEvent.click(nextButton);

  expect(container.firstChild.querySelector('input#person-first-name').parentElement.className).toContain('MuiInputBase-error');
  expect(container.firstChild.querySelector('input#person-last-name').parentElement.className).toContain('MuiInputBase-error');
  expect(container.firstChild.querySelector('input#person-address').parentElement.className).not.toContain('MuiInputBase-error');
  expect(container.firstChild.querySelector('input#person-phone').parentElement.className).not.toContain('MuiInputBase-error');
  expect(container.firstChild.querySelector('input#person-email').parentElement.className).not.toContain('MuiInputBase-error');

  const steps = container.firstChild.querySelectorAll('.step-header');
  expect((steps[0].querySelectorAll('.step-label span'))[1].firstChild.className).toContain('MuiStepLabel-error');
  expect((steps[0].querySelectorAll('.step-label span'))[1].firstChild.className).toContain('MuiStepLabel-active');
  expect((steps[1].querySelectorAll('.step-label span'))[1].firstChild.className).not.toContain('MuiStepLabel-active');
});

test('goes to second page', () => {
  const { container } = render(<AddPerson {...defaultProps} />);

  const inputFirstName = container.firstChild.querySelector('input#person-first-name');
  const inputLastName = container.firstChild.querySelector('input#person-last-name');
  fireEvent.change(inputFirstName, { target: { value: 'Pietro' } });
  fireEvent.change(inputLastName, { target: { value: 'Carta' } });

  const nextButton = container.firstChild.querySelector('#button-step-next');
  fireEvent.click(nextButton);

  const steps = container.firstChild.querySelectorAll('.step-header');
  expect((steps[0].querySelectorAll('.step-label span'))[1].firstChild.className).not.toContain('MuiStepLabel-active');
  expect((steps[1].querySelectorAll('.step-label span'))[1].firstChild.className).toContain('MuiStepLabel-active');
});

test('saves the person', async () => {
  const { container } = render(<AddPerson {...defaultProps} />);

  const inputFirstName = container.firstChild.querySelector('input#person-first-name');
  const inputLastName = container.firstChild.querySelector('input#person-last-name');
  fireEvent.change(inputFirstName, { target: { value: 'Pietro' } });
  fireEvent.change(inputLastName, { target: { value: 'Carta' } });

  let nextButton = container.firstChild.querySelector('#button-step-next');
  fireEvent.click(nextButton);

  let saveButton = container.firstChild.querySelector('#button-step-save');

  axiosMock.post.mockResolvedValueOnce({ data: { id: 20 } });
  fireEvent.click(saveButton);

  expect(saveButton).toBeDisabled();

  await waitForDomChange();
  expect(saveButton).not.toBeDisabled();

  expect(axiosMock.post).toHaveBeenCalledWith('/api/people', {
    id: 0,
    firstName: 'Pietro',
    lastName: 'Carta'
  }, expect.anything());

  expect(mockHistory.push).toHaveBeenCalledWith('/index/people/20');
  expect(EventBus.dispatch).toHaveBeenCalledWith('global-notification-show', undefined, { message: 'Persona creata' });
});