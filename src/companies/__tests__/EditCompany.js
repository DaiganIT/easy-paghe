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
import EditCompany from '../EditCompany';

const mockHistory = {
  push: jest.fn()
};
const defaultProps = {
  history: mockHistory,
  match: {
    params: {
      companyId: 35
    }
  }
};

jest.mock('eventbusjs');

afterEach(cleanup)
afterEach(jest.clearAllMocks);

const dbCompany = {
  id: 35,
  name: 'Company name',
  fiscalCode: 'fiscal',
  ivaCode: '654',
  inpsRegistrationNumber: '65412300',
  inailRegistrationNumber: '84561',
  bases: [
    { id: 50, name: 'main base', address: 'inkerman road' },
    { id: 51, name: 'additional base', address: 'guildford road' },
  ]
};

test('has the correct title', () => {
  axiosMock.get.mockResolvedValueOnce({ data: dbCompany });
  const { container } = render(<EditCompany {...defaultProps} />);

  const title = container.firstChild.querySelector('#page-title');
  expect(title.textContent).toBe('Modifica Azienda');
});

test('loads the company', async () => {
  axiosMock.get.mockResolvedValueOnce({ data: dbCompany });
  const { container } = render(<EditCompany {...defaultProps} />);

  expect(container.firstChild.querySelector('#edit-company-progress')).toBeInTheDocument();
  expect(axiosMock.get).toHaveBeenCalledWith('/api/companies/35', expect.anything());

  await waitForDomChange();

  expect(container.firstChild.querySelector('#edit-company-progress')).not.toBeInTheDocument();
  const steps = container.firstChild.querySelectorAll('.step-header');
  expect((steps[0].querySelectorAll('.step-label span'))[1].firstChild.className).not.toContain('MuiStepLabel-active');
  expect((steps[1].querySelectorAll('.step-label span'))[1].firstChild.className).not.toContain('MuiStepLabel-active');
  expect((steps[2].querySelectorAll('.step-label span'))[1].firstChild.className).toContain('MuiStepLabel-active');

  // check data is all showing correctly
  expect(container.querySelector('#company-summary-edit-details')).toBeInTheDocument();
  expect(container.querySelector('#company-summary-edit-bases')).toBeInTheDocument();

  const summaryItems = container.querySelectorAll('.summary-item');
  expect(summaryItems.length).toBe(9);

  expect(summaryItems[0].textContent).toBe('Nome:Company name');
  expect(summaryItems[1].textContent).toBe('Codice Fiscale:fiscal');
  expect(summaryItems[2].textContent).toBe('Partita IVA:654');
  expect(summaryItems[3].textContent).toBe('Codice INPS:65412300');
  expect(summaryItems[4].textContent).toBe('Codice INAIL:84561');
  expect(summaryItems[5].textContent).toBe('Nome:main base');
  expect(summaryItems[6].textContent).toBe('Indirizzo:inkerman road');
  expect(summaryItems[7].textContent).toBe('Nome:additional base');
  expect(summaryItems[8].textContent).toBe('Indirizzo:guildford road');

  expect(container.querySelector('#button-step-save')).toBeInTheDocument();
  expect(container.querySelector('#button-step-save')).not.toBeDisabled();
});

test('can go to company details', async () => {
  axiosMock.get.mockResolvedValueOnce({ data: dbCompany });
  const { container } = render(<EditCompany {...defaultProps} />);

  expect(container.firstChild.querySelector('#edit-company-progress')).toBeInTheDocument();
  expect(axiosMock.get).toHaveBeenCalledWith('/api/companies/35', expect.anything());

  await waitForDomChange();

  const editCompanyDetailsButton = container.querySelector('#company-summary-edit-details');
  fireEvent.click(editCompanyDetailsButton);

  const steps = container.firstChild.querySelectorAll('.step-header');
  expect((steps[0].querySelectorAll('.step-label span'))[1].firstChild.className).toContain('MuiStepLabel-active');
  expect((steps[1].querySelectorAll('.step-label span'))[1].firstChild.className).not.toContain('MuiStepLabel-active');
  expect((steps[2].querySelectorAll('.step-label span'))[1].firstChild.className).not.toContain('MuiStepLabel-active');
});

test('can go to company bases', async () => {
  axiosMock.get.mockResolvedValueOnce({ data: dbCompany });
  const { container } = render(<EditCompany {...defaultProps} />);

  expect(container.firstChild.querySelector('#edit-company-progress')).toBeInTheDocument();
  expect(axiosMock.get).toHaveBeenCalledWith('/api/companies/35', expect.anything());

  await waitForDomChange();

  const editCompanyDetailsButton = container.querySelector('#company-summary-edit-bases');
  fireEvent.click(editCompanyDetailsButton);

  const steps = container.firstChild.querySelectorAll('.step-header');
  expect((steps[0].querySelectorAll('.step-label span'))[1].firstChild.className).not.toContain('MuiStepLabel-active');
  expect((steps[1].querySelectorAll('.step-label span'))[1].firstChild.className).toContain('MuiStepLabel-active');
  expect((steps[2].querySelectorAll('.step-label span'))[1].firstChild.className).not.toContain('MuiStepLabel-active');
});

test('saves the company', async () => {
  axiosMock.get.mockResolvedValueOnce({ data: dbCompany });
  const { container } = render(<EditCompany {...defaultProps} />);

  expect(container.firstChild.querySelector('#edit-company-progress')).toBeInTheDocument();
  expect(axiosMock.get).toHaveBeenCalledWith('/api/companies/35', expect.anything());

  await waitForDomChange();

  let saveButton = container.firstChild.querySelector('#button-step-save');

  axiosMock.put.mockResolvedValueOnce({ data: { id: 35, bases: [{ id: 50 }, { id: 51 }] } });
  fireEvent.click(saveButton);

  expect(saveButton).toBeDisabled();

  await waitForDomChange();
  expect(saveButton).not.toBeDisabled();

  expect(axiosMock.put).toHaveBeenCalledWith('/api/companies/35', {
    id: 35,
    name: 'Company name',
    fiscalCode: 'fiscal',
    ivaCode: '654',
    inpsRegistrationNumber: '65412300',
    inailRegistrationNumber: '84561',
    bases: [
      { id: 50, name: 'main base', address: 'inkerman road' },
      { id: 51, name: 'additional base', address: 'guildford road' },
    ]
  }, expect.anything());

  expect(EventBus.dispatch).toHaveBeenCalledWith('global-notification-show', undefined, { message: 'Azienda aggiornata' });
});