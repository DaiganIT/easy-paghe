import React from 'react';
import { MemoryRouter } from 'react-router-dom'
import {
  render,
  cleanup,
  fireEvent,
  waitForElement
} from 'react-testing-library';
import 'jest-dom/extend-expect';
import { Companies } from '../Companies';

const mockHistory = jest.fn();
const defaultProps = {
  data: { items: [], length: 0 },
  loadData: true,
  reloadData: jest.fn(),
  search: '',
  setSearch: jest.fn(),
  page: 0,
  setPage: jest.fn(),
  pageLimit: 10,
  classes: {},
  isDeleteCompanyDialogOpen: false,
  isDeleteCompanyChoiceDialogOpen: false,
  deleteCompanyChoices: [],
  history: {
    push: mockHistory
  },
  onDeleteCompany: jest.fn()
};

afterEach(cleanup)
afterEach(jest.clearAllMocks);

test('has the correct title', () => {
  const { container } = render(<MemoryRouter>
    <Companies {...defaultProps} />
  </MemoryRouter>);

  const title = container.firstChild.querySelector('#page-title');
  expect(title.textContent).toBe('Gestione Aziende');
});

test('has the correct table headers', () => {
  const { container } = render(<MemoryRouter>
    <Companies {...defaultProps} />
  </MemoryRouter>);

  const headers = container.firstChild.querySelectorAll('thead th');
  expect(headers.length).toBe(6);
  expect(headers[0].textContent).toBe('Nome');
  expect(headers[1].textContent).toBe('Codice Fiscale');
  expect(headers[2].textContent).toBe('Partita IVA');
  expect(headers[3].textContent).toBe('Codice INPS');
  expect(headers[4].textContent).toBe('Codice INAIL');
  expect(headers[5].textContent).toBe('');
});

test('has the add company button', () => {
  const { container } = render(<MemoryRouter>
    <Companies {...defaultProps} />
  </MemoryRouter>);

  const addCompanyButton = container.firstChild.querySelector('button#add-company-button');
  expect(addCompanyButton.textContent).toBe('Nuova azienda');
});

test('has the search box', () => {
  const { container } = render(<MemoryRouter>
    <Companies {...defaultProps} />
  </MemoryRouter>);

  const searchBox = container.firstChild.querySelector('input#search-box');
  expect(searchBox).toBeInTheDocument();
});

test('loads companies at startup', () => {
  const { container } = render(<MemoryRouter>
    <Companies {...defaultProps} />
  </MemoryRouter>);
  expect(container.firstChild.querySelector('#loader-companies')).toBeInTheDocument();
});

test('loaded companies show up in the table', () => {
  const props = Object.assign({}, defaultProps, { data: { items: [{ id: 20, name: 'Pietro', fiscalCode: 'test', ivaCode: '86451', inpsRegistrationNumber: '68456', inailRegistrationNumber: '6546' }], length: 1 }, loadData: false });

  const { container } = render(<MemoryRouter>
    <Companies {...props} />
  </MemoryRouter>);
  expect(container.firstChild.querySelector('#loader-companies')).not.toBeInTheDocument();

  const columns = container.firstChild.querySelectorAll('tbody td');
  expect(columns.length).toBe(6);
  expect(columns[0].textContent).toBe('Pietro');
  expect(columns[1].textContent).toBe('test');
  expect(columns[2].textContent).toBe('86451');
  expect(columns[3].textContent).toBe('68456');
  expect(columns[4].textContent).toBe('6546');
  expect(columns[5].textContent).toBe('');
});

test('click on columns triggers navigation', () => {
  const props = Object.assign({}, defaultProps, { data: { items: [{ id: 20, name: 'Pietro', fiscalCode: 'test', ivaCode: '86451', inpsRegistrationNumber: '68456', inailRegistrationNumber: '6546' }], length: 1 }, loadData: false });

  const { container } = render(<MemoryRouter>
    <Companies {...props} />
  </MemoryRouter>);
  expect(container.firstChild.querySelector('#loader-companies')).not.toBeInTheDocument();

  const columns = container.firstChild.querySelectorAll('tbody td');

  fireEvent.click(columns[0]);
  expect(mockHistory).toHaveBeenCalledWith('/index/companies/20');
  jest.clearAllMocks();

  fireEvent.click(columns[1]);
  expect(mockHistory).toHaveBeenCalledWith('/index/companies/20');
  jest.clearAllMocks();

  fireEvent.click(columns[2]);
  expect(mockHistory).toHaveBeenCalledWith('/index/companies/20');
  jest.clearAllMocks();

  fireEvent.click(columns[3]);
  expect(mockHistory).toHaveBeenCalledWith('/index/companies/20');
  jest.clearAllMocks();

  fireEvent.click(columns[4]);
  expect(mockHistory).toHaveBeenCalledWith('/index/companies/20');
  jest.clearAllMocks();

  fireEvent.click(columns[5]);
  expect(mockHistory).not.toHaveBeenCalled();
  jest.clearAllMocks();
});

test('searching triggers setSearch', () => {
  const props = Object.assign({}, defaultProps, { data: { items: [{ id: 20, name: 'Pietro', fiscalCode: 'test', ivaCode: '86451', inpsRegistrationNumber: '68456', inailRegistrationNumber: '6546' }], length: 1 }, loadData: false });

  const { container } = render(<MemoryRouter>
    <Companies {...props} />
  </MemoryRouter>);
  
  const searchBox = container.firstChild.querySelector('input#search-box');
  fireEvent.change(searchBox, { target: { value: 'test' } });

  expect(props.setSearch).toHaveBeenCalledWith('test');
});

test('next page triggers setPage', () => {
  const props = Object.assign({}, defaultProps, { data: { items: [
    { id: 20, name: 'Pietro', fiscalCode: 'test', ivaCode: '86451', inpsRegistrationNumber: '68456', inailRegistrationNumber: '6546' },
    { id: 21, name: 'Pietro', fiscalCode: 'test', ivaCode: '86451', inpsRegistrationNumber: '68456', inailRegistrationNumber: '6546' },
  ], length: 30 }, loadData: false });

  const { container } = render(<MemoryRouter>
    <Companies {...props} />
  </MemoryRouter>);
  
  const nextPage = container.firstChild.querySelector('#page-next-button');
  fireEvent.click(nextPage);

  expect(props.setPage).toHaveBeenCalledWith(1);
});

test('prev page triggers setPage', () => {
  const props = Object.assign({}, defaultProps, { data: { items: [
    { id: 20, name: 'Pietro', fiscalCode: 'test', ivaCode: '86451', inpsRegistrationNumber: '68456', inailRegistrationNumber: '6546' },
    { id: 21, name: 'Pietro', fiscalCode: 'test', ivaCode: '86451', inpsRegistrationNumber: '68456', inailRegistrationNumber: '6546' },
  ], length: 30 }, loadData: false, page: 1 });

  const { container } = render(<MemoryRouter>
    <Companies {...props} />
  </MemoryRouter>);
  
  const prevPage = container.firstChild.querySelector('#page-back-button');
  fireEvent.click(prevPage);

  expect(props.setPage).toHaveBeenCalledWith(0);
});

test('next page is not available on last page', () => {
  const props = Object.assign({}, defaultProps, { data: { items: [
    { id: 20, name: 'Pietro', fiscalCode: 'test', ivaCode: '86451', inpsRegistrationNumber: '68456', inailRegistrationNumber: '6546' },
    { id: 21, name: 'Pietro', fiscalCode: 'test', ivaCode: '86451', inpsRegistrationNumber: '68456', inailRegistrationNumber: '6546' },
  ], length: 22 }, loadData: false, page: 2 });

  const { container } = render(<MemoryRouter>
    <Companies {...props} />
  </MemoryRouter>);
  
  const nextPage = container.firstChild.querySelector('#page-next-button');
  expect(nextPage).toBeDisabled();
});

test('prev page is not available on first page', () => {
  const props = Object.assign({}, defaultProps, { data: { items: [
    { id: 20, name: 'Pietro', fiscalCode: 'test', ivaCode: '86451', inpsRegistrationNumber: '68456', inailRegistrationNumber: '6546' },
    { id: 21, name: 'Pietro', fiscalCode: 'test', ivaCode: '86451', inpsRegistrationNumber: '68456', inailRegistrationNumber: '6546' },
  ], length: 30 }, loadData: false });

  const { container } = render(<MemoryRouter>
    <Companies {...props} />
  </MemoryRouter>);
  
  const prevPage = container.firstChild.querySelector('#page-back-button');
  expect(prevPage).toBeDisabled();
});

test('triggers company delete', () => {
  const props = Object.assign({}, defaultProps, { data: { items: [
    { id: 20, name: 'Pietro', fiscalCode: 'test', ivaCode: '86451', inpsRegistrationNumber: '68456', inailRegistrationNumber: '6546' },
  ], length: 30 }, loadData: false });

  const { container } = render(<MemoryRouter>
    <Companies {...props} />
  </MemoryRouter>);
  
  const columns = container.firstChild.querySelectorAll('tbody td');
  fireEvent.click(columns[5].firstChild);
  expect(props.onDeleteCompany).toHaveBeenCalledWith({ company: { id: 20, name: 'Pietro', fiscalCode: 'test', ivaCode: '86451', inpsRegistrationNumber: '68456', inailRegistrationNumber: '6546' } });
});
