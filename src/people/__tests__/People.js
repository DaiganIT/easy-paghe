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
import People from '../People';

const mockHistory = {
  push: jest.fn()
};
const defaultProps = {
  history: mockHistory
};

jest.mock('../http', () => ({
  getPeople: jest.fn(MockPromise({ data: { items: [], length: 0 } }))
}));

afterEach(cleanup)
afterEach(jest.clearAllMocks);

test('has the correct title', () => {
  const { container } = render(<MemoryRouter>
    <People {...defaultProps} />
  </MemoryRouter>);

  const title = container.firstChild.querySelector('#page-title');
  expect(title.textContent).toBe('Gestione Persone');
});

test('has the correct table headers', () => {
  const { container } = render(<MemoryRouter>
    <People {...defaultProps} />
  </MemoryRouter>);

  const headers = container.firstChild.querySelectorAll('thead th');
  expect(headers.length).toBe(3);
  expect(headers[0].textContent).toBe('Nome');
  expect(headers[1].textContent).toBe('Indirizzo');
  expect(headers[2].textContent).toBe('Telefono');
});

test('has the add person button', () => {
  const { container } = render(<MemoryRouter>
    <People {...defaultProps} />
  </MemoryRouter>);

  const addCompanyButton = container.firstChild.querySelector('button#add-person-button');
  expect(addCompanyButton.textContent).toBe('Nuova Persona');
});

test('has the search box', () => {
  const { container } = render(<MemoryRouter>
    <People {...defaultProps} />
  </MemoryRouter>);

  const searchBox = container.firstChild.querySelector('input#search-box');
  expect(searchBox).toBeInTheDocument();
});

test('loads poeple at startup', async () => {
  mockHttp.getPeople = jest.fn(MockPromise({ data: { items: [{ id: 10, firstName: 'Pietro', lastName: 'Carta', phone: '546', address: 'inkerman' }], length: 1 } }));
  const { container } = render(<MemoryRouter>
    <People {...defaultProps} />
  </MemoryRouter>);
  expect(container.firstChild.querySelector('#loader-people')).toBeInTheDocument();
  expect(mockHttp.getPeople).toHaveBeenCalledWith({ page: 0, pageLimit: 10, search: '' });

  await waitForDomChange();
  expect(container.firstChild.querySelector('#loader-people')).not.toBeInTheDocument();
});

test('loaded people show up in the table', async () => {
  mockHttp.getPeople = jest.fn(MockPromise({ data: { items: [{ id: 10, firstName: 'Pietro', lastName: 'Carta', phone: '546', address: 'inkerman' }], length: 1 } }));
  const { container } = render(<MemoryRouter>
    <People {...defaultProps} />
  </MemoryRouter>);

  await waitForDomChange();

  const columns = container.firstChild.querySelectorAll('tbody td');
  expect(columns.length).toBe(3);
  expect(columns[0].textContent).toBe('Pietro Carta');
  expect(columns[1].textContent).toBe('inkerman');
  expect(columns[2].textContent).toBe('546');
});

test('click on columns triggers navigation', async () => {
  mockHttp.getPeople = jest.fn(MockPromise({ data: { items: [{ id: 10, firstName: 'Pietro', lastName: 'Carta', phone: '546', address: 'inkerman' }], length: 1 } }));
  const { container } = render(<MemoryRouter>
    <People {...defaultProps} />
  </MemoryRouter>);

  await waitForDomChange();
  const columns = container.firstChild.querySelectorAll('tbody td');

  fireEvent.click(columns[0]);
  expect(mockHistory.push).toHaveBeenCalledWith('/index/people/10');
  jest.clearAllMocks();

  fireEvent.click(columns[1]);
  expect(mockHistory.push).toHaveBeenCalledWith('/index/people/10');
  jest.clearAllMocks();

  fireEvent.click(columns[2]);
  expect(mockHistory.push).toHaveBeenCalledWith('/index/people/10');
  jest.clearAllMocks();
});

test('searching triggers setSearch', async () => {
  mockHttp.getPeople = jest.fn(MockPromise({ data: { items: [{ id: 10, firstName: 'Pietro', lastName: 'Carta', phone: '546', address: 'inkerman' }], length: 1 } }));
  const { container } = render(<MemoryRouter>
    <People {...defaultProps} />
  </MemoryRouter>);

  expect(mockHttp.getPeople).toHaveBeenCalledWith({ page: 0, pageLimit: 10, search: '' });
  await waitForDomChange();
  jest.clearAllMocks();

  const searchBox = container.firstChild.querySelector('input#search-box');
  fireEvent.change(searchBox, { target: { value: 'test' } });

  expect(mockHttp.getPeople).toHaveBeenCalledWith({ page: 0, pageLimit: 10, search: 'test' });
});

test('next page triggers setPage', async () => {
  mockHttp.getPeople = jest.fn(MockPromise({ data: { items: [{ id: 10, firstName: 'Pietro', lastName: 'Carta', phone: '546', address: 'inkerman' }], length: 25 } }));
  const { container } = render(<MemoryRouter>
    <People {...defaultProps} />
  </MemoryRouter>);

  expect(mockHttp.getPeople).toHaveBeenCalledWith({ page: 0, pageLimit: 10, search: '' });
  await waitForDomChange();
  jest.clearAllMocks();

  const nextPage = container.firstChild.querySelector('#page-next-button');
  fireEvent.click(nextPage);

  expect(mockHttp.getPeople).toHaveBeenCalledWith({ page: 1, pageLimit: 10, search: '' });
});

test('prev page triggers setPage', async () => {
  mockHttp.getPeople = jest.fn(MockPromise({ data: { items: [{ id: 10, firstName: 'Pietro', lastName: 'Carta', phone: '546', address: 'inkerman' }], length: 25 } }));
  const { container } = render(<MemoryRouter>
    <People {...defaultProps} />
  </MemoryRouter>);

  expect(mockHttp.getPeople).toHaveBeenCalledWith({ page: 0, pageLimit: 10, search: '' });
  await waitForDomChange();
  jest.clearAllMocks();

  const nextPage = container.firstChild.querySelector('#page-next-button');
  fireEvent.click(nextPage);

  expect(mockHttp.getPeople).toHaveBeenCalledWith({ page: 1, pageLimit: 10, search: '' });
  await waitForDomChange();
  jest.clearAllMocks();

  const prevPage = container.firstChild.querySelector('#page-back-button');
  fireEvent.click(prevPage);

  expect(mockHttp.getPeople).toHaveBeenCalledWith({ page: 0, pageLimit: 10, search: '' });
});

test('next page is not available on last page', async () => {
  mockHttp.getPeople = jest.fn(MockPromise({ data: { items: [{ id: 10, firstName: 'Pietro', lastName: 'Carta', phone: '546', address: 'inkerman' }], length: 15 } }));
  const { container } = render(<MemoryRouter>
    <People {...defaultProps} />
  </MemoryRouter>);

  await waitForDomChange();

  const nextPage = container.firstChild.querySelector('#page-next-button');
  fireEvent.click(nextPage);

  await waitForDomChange();

  expect(container.firstChild.querySelector('#page-next-button')).toBeDisabled();
});

test('prev page is not available on first page', async () => {
  mockHttp.getPeople = jest.fn(MockPromise({ data: { items: [{ id: 10, firstName: 'Pietro', lastName: 'Carta', phone: '546', address: 'inkerman' }], length: 15 } }));
  const { container } = render(<MemoryRouter>
    <People {...defaultProps} />
  </MemoryRouter>);

  await waitForDomChange();
  
  const prevPage = container.firstChild.querySelector('#page-back-button');
  expect(prevPage).toBeDisabled();
});

// test('triggers company delete', () => {
//   const props = Object.assign({}, defaultProps, { data: { items: [
//     { id: 20, name: 'Pietro', fiscalCode: 'test', ivaCode: '86451', inpsRegistrationNumber: '68456', inailRegistrationNumber: '6546' },
//   ], length: 30 }, loadData: false });

//   const { container } = render(<MemoryRouter>
//     <Companies {...props} />
//   </MemoryRouter>);

//   const columns = container.firstChild.querySelectorAll('tbody td');
//   fireEvent.click(columns[5].firstChild);
//   expect(props.onDeleteCompany).toHaveBeenCalledWith({ company: { id: 20, name: 'Pietro', fiscalCode: 'test', ivaCode: '86451', inpsRegistrationNumber: '68456', inailRegistrationNumber: '6546' } });
// });
