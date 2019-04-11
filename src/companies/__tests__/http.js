import axiosMock from 'axios';
import http from '../http';

afterEach(jest.clearAllMocks);

test('getCompanies has the correct url', () => {
  const search = 'hi';
  const page = 0;
  const pageLimit = 10;

  jest.useFakeTimers();
  const promise = http.getCompanies({ search, page, pageLimit });
  jest.runAllTimers();

  expect(axiosMock.get.mock.calls.length).toEqual(1);
  expect(axiosMock.get.mock.calls[0][0]).toEqual('/api/companies?filter=hi&page=1&pageLimit=10');
  expect(axiosMock.get.mock.calls[0][1]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});

test('createCompany has the correct url', () => {
  const promise = http.createCompany({ name: 'Pietro' });

  expect(axiosMock.post.mock.calls.length).toEqual(1);
  expect(axiosMock.post.mock.calls[0][0]).toEqual('/api/companies');
  expect(axiosMock.post.mock.calls[0][1]).toEqual({ name: 'Pietro' });
  expect(axiosMock.post.mock.calls[0][2]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});

test('updateCompany has the correct url', () => {
  const promise = http.updateCompany(20, { name: 'Pietro' });

  expect(axiosMock.put.mock.calls.length).toEqual(1);
  expect(axiosMock.put.mock.calls[0][0]).toEqual('/api/companies/20');
  expect(axiosMock.put.mock.calls[0][1]).toEqual({ name: 'Pietro' });
  expect(axiosMock.put.mock.calls[0][2]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});

test('loadCompany has the correct url', () => {
  const promise = http.loadCompany(20);

  expect(axiosMock.get.mock.calls.length).toEqual(1);
  expect(axiosMock.get.mock.calls[0][0]).toEqual('/api/companies/20');
  expect(axiosMock.get.mock.calls[0][1]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});

test('deleteCompany has the correct url', () => {
  const promise = http.deleteCompany(20);

  expect(axiosMock.delete.mock.calls.length).toEqual(1);
  expect(axiosMock.delete.mock.calls[0][0]).toEqual('/api/companies/20');
  expect(axiosMock.delete.mock.calls[0][1]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});

test('deleteCompany has the correct url without employees', () => {
  const promise = http.deleteCompany(20, false);

  expect(axiosMock.delete.mock.calls.length).toEqual(1);
  expect(axiosMock.delete.mock.calls[0][0]).toEqual('/api/companies/20');
  expect(axiosMock.delete.mock.calls[0][1]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});

test('deleteCompany has the correct url with employees', () => {
  const promise = http.deleteCompany(20, true);

  expect(axiosMock.delete.mock.calls.length).toEqual(1);
  expect(axiosMock.delete.mock.calls[0][0]).toEqual('/api/companies/20?employees=true');
  expect(axiosMock.delete.mock.calls[0][1]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});

test('deleteCompanyBase has the correct url', () => {
  const promise = http.deleteBase(20, 30);

  expect(axiosMock.delete.mock.calls.length).toEqual(1);
  expect(axiosMock.delete.mock.calls[0][0]).toEqual('/api/companies/20/bases/30');
  expect(axiosMock.delete.mock.calls[0][1]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});

test('deleteCompanyBase has the correct url without employees', () => {
  const promise = http.deleteBase(20, 30, false);

  expect(axiosMock.delete.mock.calls.length).toEqual(1);
  expect(axiosMock.delete.mock.calls[0][0]).toEqual('/api/companies/20/bases/30');
  expect(axiosMock.delete.mock.calls[0][1]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});

test('deleteCompanyBase has the correct url with employees', () => {
  const promise = http.deleteBase(20, 30, true);

  expect(axiosMock.delete.mock.calls.length).toEqual(1);
  expect(axiosMock.delete.mock.calls[0][0]).toEqual('/api/companies/20/bases/30?employees=true');
  expect(axiosMock.delete.mock.calls[0][1]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});