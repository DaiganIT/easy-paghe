import axiosMock from 'axios';
import http from '../http';

afterEach(jest.clearAllMocks);

test('getCompanies has the correct url', () => {
  axiosMock.get.mockResolvedValueOnce();
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

test('getCompanies is called just once inside the same timer window', () => {
  axiosMock.get.mockResolvedValueOnce();
  const search = 'hi';
  const page = 0;
  const pageLimit = 10;

  jest.useFakeTimers();
  const promise = http.getCompanies({ search, page, pageLimit });
  http.getCompanies({ search, page, pageLimit });
  http.getCompanies({ search, page, pageLimit });
  jest.runAllTimers();

  expect(axiosMock.get.mock.calls.length).toEqual(1);
  expect(axiosMock.get.mock.calls[0][0]).toEqual('/api/companies?filter=hi&page=1&pageLimit=10');
  expect(axiosMock.get.mock.calls[0][1]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});

test('getCompanyBases has the correct url', () => {
  axiosMock.get.mockResolvedValueOnce();
  const companyId = 10;
  const search = 'hi';
  const page = 0;
  const pageLimit = 10;

  jest.useFakeTimers();
  const promise = http.getCompanyBases({ companyId, search, page, pageLimit });
  jest.runAllTimers();

  expect(axiosMock.get.mock.calls.length).toEqual(1);
  expect(axiosMock.get.mock.calls[0][0]).toEqual('/api/companies/10/bases?filter=hi&page=1&pageLimit=10');
  expect(axiosMock.get.mock.calls[0][1]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});

test('getCompanyBases is called just once inside the same timer window', () => {
  axiosMock.get.mockResolvedValueOnce();
  const companyId = 10;
  const search = 'hi';
  const page = 0;
  const pageLimit = 10;

  jest.useFakeTimers();
  const promise = http.getCompanyBases({ companyId, search, page, pageLimit });
  http.getCompanyBases({ companyId, search, page, pageLimit });
  http.getCompanyBases({ companyId, search, page, pageLimit });
  jest.runAllTimers();

  expect(axiosMock.get.mock.calls.length).toEqual(1);
  expect(axiosMock.get.mock.calls[0][0]).toEqual('/api/companies/10/bases?filter=hi&page=1&pageLimit=10');
  expect(axiosMock.get.mock.calls[0][1]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});

test('createCompany has the correct url', () => {
  axiosMock.post.mockResolvedValueOnce();
  const promise = http.createCompany({ name: 'Pietro' });

  expect(axiosMock.post.mock.calls.length).toEqual(1);
  expect(axiosMock.post.mock.calls[0][0]).toEqual('/api/companies');
  expect(axiosMock.post.mock.calls[0][1]).toEqual({ name: 'Pietro' });
  expect(axiosMock.post.mock.calls[0][2]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});

test('updateCompany has the correct url', () => {
  axiosMock.put.mockResolvedValueOnce();
  const promise = http.updateCompany(20, { name: 'Pietro' });

  expect(axiosMock.put.mock.calls.length).toEqual(1);
  expect(axiosMock.put.mock.calls[0][0]).toEqual('/api/companies/20');
  expect(axiosMock.put.mock.calls[0][1]).toEqual({ name: 'Pietro' });
  expect(axiosMock.put.mock.calls[0][2]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});

test('loadCompany has the correct url', () => {
  axiosMock.get.mockResolvedValueOnce();
  const promise = http.loadCompany(20);

  expect(axiosMock.get.mock.calls.length).toEqual(1);
  expect(axiosMock.get.mock.calls[0][0]).toEqual('/api/companies/20');
  expect(axiosMock.get.mock.calls[0][1]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});

test('deleteCompany has the correct url', () => {
  axiosMock.delete.mockResolvedValueOnce();
  const promise = http.deleteCompany(20);

  expect(axiosMock.delete.mock.calls.length).toEqual(1);
  expect(axiosMock.delete.mock.calls[0][0]).toEqual('/api/companies/20');
  expect(axiosMock.delete.mock.calls[0][1]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});

test('deleteCompany has the correct url without employees', () => {
  axiosMock.delete.mockResolvedValueOnce();
  const promise = http.deleteCompany(20, false);

  expect(axiosMock.delete.mock.calls.length).toEqual(1);
  expect(axiosMock.delete.mock.calls[0][0]).toEqual('/api/companies/20');
  expect(axiosMock.delete.mock.calls[0][1]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});

test('deleteCompany has the correct url with employees', () => {
  axiosMock.delete.mockResolvedValueOnce();
  const promise = http.deleteCompany(20, true);

  expect(axiosMock.delete.mock.calls.length).toEqual(1);
  expect(axiosMock.delete.mock.calls[0][0]).toEqual('/api/companies/20?employees=true');
  expect(axiosMock.delete.mock.calls[0][1]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});

test('deleteCompanyBase has the correct url', () => {
  axiosMock.delete.mockResolvedValueOnce();
  const promise = http.deleteBase(20, 30);

  expect(axiosMock.delete.mock.calls.length).toEqual(1);
  expect(axiosMock.delete.mock.calls[0][0]).toEqual('/api/companies/20/bases/30');
  expect(axiosMock.delete.mock.calls[0][1]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});

test('deleteCompanyBase has the correct url without employees', () => {
  axiosMock.delete.mockResolvedValueOnce();
  const promise = http.deleteBase(20, 30, false);

  expect(axiosMock.delete.mock.calls.length).toEqual(1);
  expect(axiosMock.delete.mock.calls[0][0]).toEqual('/api/companies/20/bases/30');
  expect(axiosMock.delete.mock.calls[0][1]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});

test('deleteCompanyBase has the correct url with employees', () => {
  axiosMock.delete.mockResolvedValueOnce();
  const promise = http.deleteBase(20, 30, true);

  expect(axiosMock.delete.mock.calls.length).toEqual(1);
  expect(axiosMock.delete.mock.calls[0][0]).toEqual('/api/companies/20/bases/30?employees=true');
  expect(axiosMock.delete.mock.calls[0][1]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});