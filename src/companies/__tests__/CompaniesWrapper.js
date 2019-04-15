import React from 'react';
import { MemoryRouter } from 'react-router-dom'
import {
  render,
  cleanup,
  fireEvent,
  waitForElement
} from 'react-testing-library';
import 'jest-dom/extend-expect';
import axiosMock from 'axios';
import CompaniesWrapper from '../Companies';

afterEach(cleanup)
afterEach(jest.clearAllMocks);

test('loads companies at startup', () => {
  jest.useFakeTimers();
  const { container } = render(<MemoryRouter>
    <CompaniesWrapper />
  </MemoryRouter>);
  jest.runAllTimers();

  expect(axiosMock.get).toHaveBeenCalledWith('/api/companies?filter=&page=1&pageLimit=10', expect.anything());
});

test('loads companies when search changes', () => {
  jest.useFakeTimers();
  const { container } = render(<MemoryRouter>
    <CompaniesWrapper />
  </MemoryRouter>);
  jest.runAllTimers();

  jest.clearAllMocks();

  const searchBox = container.firstChild.querySelector('input#search-box');
  fireEvent.change(searchBox, { target: { value: 'test' } });
  jest.runAllTimers();

  expect(axiosMock.get).toHaveBeenCalledWith('/api/companies?filter=test&page=1&pageLimit=10', expect.anything());
});

test('loads companies when page changes', async () => {
  axiosMock.get.mockResolvedValueOnce({
    data: {
      items: [],
      length: 25
    }
  });
  jest.useFakeTimers();
  const { container } = render(<MemoryRouter>
    <CompaniesWrapper />
  </MemoryRouter>);
  jest.runAllTimers();

  jest.clearAllMocks();

  const nextPage = await waitForElement(() => container.firstChild.querySelector('#page-next-button'));
  fireEvent.click(nextPage);
  jest.runAllTimers();

  expect(axiosMock.get).toHaveBeenCalledWith('/api/companies?filter=&page=2&pageLimit=10', expect.anything());
});

test('loads companies when page changes', async () => {
  axiosMock.get.mockResolvedValueOnce({
    data: {
      items: [],
      length: 25
    }
  });
  jest.useFakeTimers();
  const { container } = render(<MemoryRouter>
    <CompaniesWrapper />
  </MemoryRouter>);
  jest.runAllTimers();

  jest.clearAllMocks();

  const nextPage = await waitForElement(() => container.firstChild.querySelector('#page-next-button'));
  fireEvent.click(nextPage);
  jest.runAllTimers();

  expect(axiosMock.get).toHaveBeenCalledWith('/api/companies?filter=&page=2&pageLimit=10', expect.anything());
});
