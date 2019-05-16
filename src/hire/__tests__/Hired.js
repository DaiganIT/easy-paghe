import React from 'react';
import { MemoryRouter } from 'react-router-dom'
import {
  render,
  cleanup,
  fireEvent,
  waitForDomChange
} from 'react-testing-library';
import 'jest-dom/extend-expect';
import mockHttp from '../http';
import Hired from '../Hired';

const mockHistory = {
  push: jest.fn()
};
const defaultProps = {
  history: mockHistory
};

jest.mock('../http', () => ({
  getHiredPeople: jest.fn(MockPromise({ data: { items: [], length: 0 } }))
}));

afterEach(cleanup)
afterEach(jest.clearAllMocks);

test('has the correct title', () => {
  const { container } = render(<MemoryRouter>
    <Hired {...defaultProps} />
  </MemoryRouter>);

  const title = container.firstChild.querySelector('#page-title');
  expect(title.textContent).toBe('Gestione Assunzioni');
});

test('has the correct table headers', () => {
  const { container } = render(<MemoryRouter>
    <Hired {...defaultProps} />
  </MemoryRouter>);

  const headers = container.firstChild.querySelectorAll('thead th');
  expect(headers.length).toBe(6);
  expect(headers[0].textContent).toBe('Azienda');
  expect(headers[1].textContent).toBe('Nome');
  expect(headers[2].textContent).toBe('Data Assunzione');
  expect(headers[3].textContent).toBe('CCNL');
  expect(headers[4].textContent).toBe('Livello');
  expect(headers[5].textContent).toBe('');
});

test('has the add person button', () => {
  const { container } = render(<MemoryRouter>
    <Hired {...defaultProps} />
  </MemoryRouter>);

  const addCompanyButton = container.firstChild.querySelector('button#hire-person-button');
  expect(addCompanyButton.textContent).toBe('Nuova Assunzione');
});

test('has the search box', () => {
  const { container } = render(<MemoryRouter>
    <Hired {...defaultProps} />
  </MemoryRouter>);

  const searchBox = container.firstChild.querySelector('input#search-box');
  expect(searchBox).toBeInTheDocument();
});

test('loads poeple at startup', async () => {
  mockHttp.getHiredPeople = jest.fn(MockPromise({ data: { items: [{ id: 10, startDate: '2018', person: { firstName: 'Pietro', lastName: 'Carta'}, companyBase: { company: { name: 'The company' } }, ccnl: { name: 'ccnl test' }, salaryTable: { level: 'the level' } }], length: 1 } }));
  const { container } = render(<MemoryRouter>
    <Hired {...defaultProps} />
  </MemoryRouter>);
  expect(container.firstChild.querySelector('#loader-hired-people')).toBeInTheDocument();
  expect(mockHttp.getHiredPeople).toHaveBeenCalledWith({ page: 0, pageLimit: 10, search: '' });

  await waitForDomChange();
  expect(container.firstChild.querySelector('#loader-hired-people')).not.toBeInTheDocument();
});

test('loaded people show up in the table', async () => {
  mockHttp.getHiredPeople = jest.fn(MockPromise({ data: { items: [{ id: 10, startDate: '2018', person: { firstName: 'Pietro', lastName: 'Carta'}, companyBase: { company: { name: 'The company' } }, ccnl: { name: 'ccnl test' }, salaryTable: { level: 'the level' } }], length: 1 } }));
  const { container } = render(<MemoryRouter>
    <Hired {...defaultProps} />
  </MemoryRouter>);

  await waitForDomChange();

  const columns = container.firstChild.querySelectorAll('tbody td');
  expect(columns.length).toBe(6);
  expect(columns[0].textContent).toBe('The company');
  expect(columns[1].textContent).toBe('Pietro Carta');
  expect(columns[2].textContent).toBe('2018');
  expect(columns[3].textContent).toBe('ccnl test');
  expect(columns[4].textContent).toBe('the level');
  expect(columns[5].textContent).toBe('');
});

test('click on columns triggers navigation', async () => {
  mockHttp.getHiredPeople = jest.fn(MockPromise({ data: { items: [{ id: 10, startDate: '2018', person: { firstName: 'Pietro', lastName: 'Carta'}, companyBase: { company: { name: 'The company' } }, ccnl: { name: 'ccnl test' }, salaryTable: { level: 'the level' } }], length: 1 } }));
  const { container } = render(<MemoryRouter>
    <Hired {...defaultProps} />
  </MemoryRouter>);

  await waitForDomChange();
  const columns = container.firstChild.querySelectorAll('tbody td');

  fireEvent.click(columns[0]);
  expect(mockHistory.push).toHaveBeenCalledWith('/index/hired/10');
  jest.clearAllMocks();

  fireEvent.click(columns[1]);
  expect(mockHistory.push).toHaveBeenCalledWith('/index/hired/10');
  jest.clearAllMocks();

  fireEvent.click(columns[2]);
  expect(mockHistory.push).toHaveBeenCalledWith('/index/hired/10');
  jest.clearAllMocks();

  fireEvent.click(columns[3]);
  expect(mockHistory.push).toHaveBeenCalledWith('/index/hired/10');
  jest.clearAllMocks();

  fireEvent.click(columns[4]);
  expect(mockHistory.push).toHaveBeenCalledWith('/index/hired/10');
  jest.clearAllMocks();

  fireEvent.click(columns[5]);
  expect(mockHistory.push).not.toHaveBeenCalledWith('/index/hired/10');
  jest.clearAllMocks();
});

test('searching triggers setSearch', async () => {
  mockHttp.getHiredPeople = jest.fn(MockPromise({ data: { items: [{ id: 10, startDate: '2018', person: { firstName: 'Pietro', lastName: 'Carta'}, companyBase: { company: { name: 'The company' } }, ccnl: { name: 'ccnl test' }, salaryTable: { level: 'the level' } }], length: 1 } }));
  const { container } = render(<MemoryRouter>
    <Hired {...defaultProps} />
  </MemoryRouter>);

  expect(mockHttp.getHiredPeople).toHaveBeenCalledWith({ page: 0, pageLimit: 10, search: '' });
  await waitForDomChange();
  jest.clearAllMocks();

  const searchBox = container.firstChild.querySelector('input#search-box');
  fireEvent.change(searchBox, { target: { value: 'test' } });

  expect(mockHttp.getHiredPeople).toHaveBeenCalledWith({ page: 0, pageLimit: 10, search: 'test' });
});

test('next page triggers setPage', async () => {
  mockHttp.getHiredPeople = jest.fn(MockPromise({ data: { items: [{ id: 10, startDate: '2018', person: { firstName: 'Pietro', lastName: 'Carta'}, companyBase: { company: { name: 'The company' } }, ccnl: { name: 'ccnl test' }, salaryTable: { level: 'the level' } }], length: 25 } }));
  const { container } = render(<MemoryRouter>
    <Hired {...defaultProps} />
  </MemoryRouter>);

  expect(mockHttp.getHiredPeople).toHaveBeenCalledWith({ page: 0, pageLimit: 10, search: '' });
  await waitForDomChange();
  jest.clearAllMocks();

  const nextPage = container.firstChild.querySelector('#page-next-button');
  fireEvent.click(nextPage);

  expect(mockHttp.getHiredPeople).toHaveBeenCalledWith({ page: 1, pageLimit: 10, search: '' });
});

test('prev page triggers setPage', async () => {
  mockHttp.getHiredPeople = jest.fn(MockPromise({ data: { items: [{ id: 10, startDate: '2018', person: { firstName: 'Pietro', lastName: 'Carta'}, companyBase: { company: { name: 'The company' } }, ccnl: { name: 'ccnl test' }, salaryTable: { level: 'the level' } }], length: 25 } }));
  const { container } = render(<MemoryRouter>
    <Hired {...defaultProps} />
  </MemoryRouter>);

  expect(mockHttp.getHiredPeople).toHaveBeenCalledWith({ page: 0, pageLimit: 10, search: '' });
  await waitForDomChange();
  jest.clearAllMocks();

  const nextPage = container.firstChild.querySelector('#page-next-button');
  fireEvent.click(nextPage);

  expect(mockHttp.getHiredPeople).toHaveBeenCalledWith({ page: 1, pageLimit: 10, search: '' });
  await waitForDomChange();
  jest.clearAllMocks();

  const prevPage = container.firstChild.querySelector('#page-back-button');
  fireEvent.click(prevPage);

  expect(mockHttp.getHiredPeople).toHaveBeenCalledWith({ page: 0, pageLimit: 10, search: '' });
});

test('next page is not available on last page', async () => {
  mockHttp.getHiredPeople = jest.fn(MockPromise({ data: { items: [{ id: 10, startDate: '2018', person: { firstName: 'Pietro', lastName: 'Carta'}, companyBase: { company: { name: 'The company' } }, ccnl: { name: 'ccnl test' }, salaryTable: { level: 'the level' } }], length: 15 } }));
  const { container } = render(<MemoryRouter>
    <Hired {...defaultProps} />
  </MemoryRouter>);

  await waitForDomChange();

  const nextPage = container.firstChild.querySelector('#page-next-button');
  fireEvent.click(nextPage);

  await waitForDomChange();

  expect(container.firstChild.querySelector('#page-next-button')).toBeDisabled();
});

test('prev page is not available on first page', async () => {
  mockHttp.getHiredPeople = jest.fn(MockPromise({ data: { items: [{ id: 10, startDate: '2018', person: { firstName: 'Pietro', lastName: 'Carta'}, companyBase: { company: { name: 'The company' } }, ccnl: { name: 'ccnl test' }, salaryTable: { level: 'the level' } }], length: 15 } }));
  const { container } = render(<MemoryRouter>
    <Hired {...defaultProps} />
  </MemoryRouter>);

  await waitForDomChange();
  
  const prevPage = container.firstChild.querySelector('#page-back-button');
  expect(prevPage).toBeDisabled();
});
