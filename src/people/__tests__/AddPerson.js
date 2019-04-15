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

// test('validation is showing for name after hitting next', () => {
//   const { container } = render(<AddCompany {...defaultProps} />);

//   const nextButton = container.firstChild.querySelector('#button-step-next');
//   fireEvent.click(nextButton);

//   expect(container.firstChild.querySelector('input#company-name').parentElement.className).toContain('MuiInputBase-error');
//   expect(container.firstChild.querySelector('input#company-fiscal-code').parentElement.className).not.toContain('MuiInputBase-error');
//   expect(container.firstChild.querySelector('input#company-iva-code').parentElement.className).not.toContain('MuiInputBase-error');
//   expect(container.firstChild.querySelector('input#company-inps').parentElement.className).not.toContain('MuiInputBase-error');
//   expect(container.firstChild.querySelector('input#company-inail').parentElement.className).not.toContain('MuiInputBase-error');

//   const steps = container.firstChild.querySelectorAll('.step-header');
//   expect((steps[0].querySelectorAll('.step-label span'))[1].firstChild.className).toContain('MuiStepLabel-error');
//   expect((steps[0].querySelectorAll('.step-label span'))[1].firstChild.className).toContain('MuiStepLabel-active');
//   expect((steps[1].querySelectorAll('.step-label span'))[1].firstChild.className).not.toContain('MuiStepLabel-active');
//   expect((steps[2].querySelectorAll('.step-label span'))[1].firstChild.className).not.toContain('MuiStepLabel-active');
// });

// test('goes to second page', () => {
//   const { container } = render(<AddCompany {...defaultProps} />);

//   const inputName = container.firstChild.querySelector('input#company-name');
//   fireEvent.change(inputName, { target: { value: 'name' } });

//   const nextButton = container.firstChild.querySelector('#button-step-next');
//   fireEvent.click(nextButton);

//   const steps = container.firstChild.querySelectorAll('.step-header');
//   expect((steps[0].querySelectorAll('.step-label span'))[1].firstChild.className).not.toContain('MuiStepLabel-active');
//   expect((steps[1].querySelectorAll('.step-label span'))[1].firstChild.className).toContain('MuiStepLabel-active');
//   expect((steps[2].querySelectorAll('.step-label span'))[1].firstChild.className).not.toContain('MuiStepLabel-active');
// });

// test('is showing bases form', () => {
//   const { container } = render(<AddCompany {...defaultProps} />);

//   const inputName = container.firstChild.querySelector('input#company-name');
//   fireEvent.change(inputName, { target: { value: 'name' } });

//   const nextButton = container.firstChild.querySelector('#button-step-next');
//   fireEvent.click(nextButton);

//   expect(container.firstChild.querySelector('input#company-base-0-name')).toBeInTheDocument();
//   expect(container.firstChild.querySelector('input#company-base-0-address')).toBeInTheDocument();
//   expect(container.firstChild.querySelector('input#company-base-1-name')).not.toBeInTheDocument();
//   expect(container.firstChild.querySelector('input#company-base-1-address')).not.toBeInTheDocument();
// });

// test('default bases are correct', () => {
//   const { container } = render(<AddCompany {...defaultProps} />);

//   const inputName = container.firstChild.querySelector('input#company-name');
//   fireEvent.change(inputName, { target: { value: 'name' } });

//   const nextButton = container.firstChild.querySelector('#button-step-next');
//   fireEvent.click(nextButton);

//   expect(container.firstChild.querySelector('input#company-base-0-name').value).toBe('Sede principale');
//   expect(container.firstChild.querySelector('input#company-base-0-address').value).toBe('');
// });

// test('adds a new company base with default value', () => {
//   const { container } = render(<AddCompany {...defaultProps} />);

//   const inputName = container.firstChild.querySelector('input#company-name');
//   fireEvent.change(inputName, { target: { value: 'name' } });

//   const nextButton = container.firstChild.querySelector('#button-step-next');
//   fireEvent.click(nextButton);

//   // add a new base
//   const addBaseButton = container.firstChild.querySelector('#add-company-button');
//   fireEvent.click(addBaseButton);

//   // remove name from second company base
//   expect(container.firstChild.querySelector('input#company-base-1-name')).toBeInTheDocument();
//   expect(container.firstChild.querySelector('input#company-base-1-address')).toBeInTheDocument();
//   expect(container.firstChild.querySelector('input#company-base-1-name').value).toBe('Nuova sede');
// });

// test('validation is showing for first company base name after hitting next', () => {
//   const { container } = render(<AddCompany {...defaultProps} />);

//   const inputName = container.firstChild.querySelector('input#company-name');
//   fireEvent.change(inputName, { target: { value: 'name' } });

//   let nextButton = container.firstChild.querySelector('#button-step-next');
//   fireEvent.click(nextButton);

//   // remove name from company base
//   const firstBaseName = container.firstChild.querySelector('input#company-base-0-name');
//   fireEvent.change(firstBaseName, { target: { value: '' } });

//   nextButton = container.firstChild.querySelector('#button-step-next');
//   fireEvent.click(nextButton);

//   expect(firstBaseName.parentElement.className).toContain('MuiInputBase-error');
//   expect(container.firstChild.querySelector('input#company-base-0-address').parentElement.className).not.toContain('MuiInputBase-error');

//   const steps = container.firstChild.querySelectorAll('.step-header');
//   expect((steps[0].querySelectorAll('.step-label span'))[1].firstChild.className).not.toContain('MuiStepLabel-active');
//   expect((steps[1].querySelectorAll('.step-label span'))[1].firstChild.className).toContain('MuiStepLabel-error');
//   expect((steps[1].querySelectorAll('.step-label span'))[1].firstChild.className).toContain('MuiStepLabel-active');
//   expect((steps[2].querySelectorAll('.step-label span'))[1].firstChild.className).not.toContain('MuiStepLabel-active');
// });

// test('validation is showing for second company base name after hitting next', () => {
//   const { container } = render(<AddCompany {...defaultProps} />);

//   const inputName = container.firstChild.querySelector('input#company-name');
//   fireEvent.change(inputName, { target: { value: 'name' } });

//   let nextButton = container.firstChild.querySelector('#button-step-next');
//   fireEvent.click(nextButton);

//   // add a new base
//   const addBaseButton = container.firstChild.querySelector('#add-company-button');
//   fireEvent.click(addBaseButton);

//   // remove name from second company base
//   const secondBaseName = container.firstChild.querySelector('input#company-base-1-name');
//   fireEvent.change(secondBaseName, { target: { value: '' } });

//   nextButton = container.firstChild.querySelector('#button-step-next');
//   fireEvent.click(nextButton);

//   expect(container.firstChild.querySelector('input#company-base-0-name').parentElement.className).not.toContain('MuiInputBase-error');
//   expect(container.firstChild.querySelector('input#company-base-0-address').parentElement.className).not.toContain('MuiInputBase-error');
//   expect(container.firstChild.querySelector('input#company-base-1-name').parentElement.className).toContain('MuiInputBase-error');
//   expect(container.firstChild.querySelector('input#company-base-1-address').parentElement.className).not.toContain('MuiInputBase-error');

//   const steps = container.firstChild.querySelectorAll('.step-header');
//   expect((steps[0].querySelectorAll('.step-label span'))[1].firstChild.className).not.toContain('MuiStepLabel-active');
//   expect((steps[1].querySelectorAll('.step-label span'))[1].firstChild.className).toContain('MuiStepLabel-error');
//   expect((steps[1].querySelectorAll('.step-label span'))[1].firstChild.className).toContain('MuiStepLabel-active');
//   expect((steps[2].querySelectorAll('.step-label span'))[1].firstChild.className).not.toContain('MuiStepLabel-active');
// });

// test('goes to third page', () => {
//   const { container } = render(<AddCompany {...defaultProps} />);

//   const inputName = container.firstChild.querySelector('input#company-name');
//   fireEvent.change(inputName, { target: { value: 'name' } });

//   let nextButton = container.firstChild.querySelector('#button-step-next');
//   fireEvent.click(nextButton);
//   nextButton = container.firstChild.querySelector('#button-step-next');
//   fireEvent.click(nextButton);

//   const steps = container.firstChild.querySelectorAll('.step-header');
//   expect((steps[0].querySelectorAll('.step-label span'))[1].firstChild.className).not.toContain('MuiStepLabel-active');
//   expect((steps[1].querySelectorAll('.step-label span'))[1].firstChild.className).not.toContain('MuiStepLabel-active');
//   expect((steps[2].querySelectorAll('.step-label span'))[1].firstChild.className).toContain('MuiStepLabel-active');
// });

// test('saves the company', async () => {
//   const { container } = render(<AddCompany {...defaultProps} />);

//   const inputName = container.firstChild.querySelector('input#company-name');
//   fireEvent.change(inputName, { target: { value: 'name' } });

//   let nextButton = container.firstChild.querySelector('#button-step-next');
//   fireEvent.click(nextButton);
//   nextButton = container.firstChild.querySelector('#button-step-next');
//   fireEvent.click(nextButton);

//   let saveButton = container.firstChild.querySelector('#button-step-save');

//   axiosMock.post.mockResolvedValueOnce({ data: { id: 20, bases: [ { id: 50 }] } });
//   fireEvent.click(saveButton);

//   expect(saveButton).toBeDisabled();

//   await waitForDomChange();
//   expect(saveButton).not.toBeDisabled();

//   expect(axiosMock.post).toHaveBeenCalledWith('/api/companies', {
//     id: 0,
//     name: 'name',
//     bases: [
//       { name: 'Sede principale' }
//     ]
//   }, expect.anything());

//   expect(mockHistory.push).toHaveBeenCalledWith('/index/companies/20');
//   expect(EventBus.dispatch).toHaveBeenCalledWith('global-notification-show', undefined, { message: 'Azienda creata' });
// });