import axiosMock from 'axios';
import http from '../http';

afterEach(jest.clearAllMocks);

test('getPeople has the correct url', () => {
  axiosMock.get.mockResolvedValueOnce();
  const search = 'hi';
  const page = 0;
  const pageLimit = 10;

  jest.useFakeTimers();
  const promise = http.getPeople({ search, page, pageLimit });
  jest.runAllTimers();

  expect(axiosMock.get.mock.calls.length).toEqual(1);
  expect(axiosMock.get.mock.calls[0][0]).toEqual('/api/people?filter=hi&page=1&pageLimit=10');
  expect(axiosMock.get.mock.calls[0][1]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});

test('getPeople is called just once inside the same timer window', () => {
  axiosMock.get.mockResolvedValueOnce();
  const search = 'hi';
  const page = 0;
  const pageLimit = 10;

  jest.useFakeTimers();
  const promise = http.getPeople({ search, page, pageLimit });
  http.getPeople({ search, page, pageLimit });
  http.getPeople({ search, page, pageLimit });
  jest.runAllTimers();

  expect(axiosMock.get.mock.calls.length).toEqual(1);
  expect(axiosMock.get.mock.calls[0][0]).toEqual('/api/people?filter=hi&page=1&pageLimit=10');
  expect(axiosMock.get.mock.calls[0][1]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});

test('createPerson has the correct url', () => {
  axiosMock.post.mockResolvedValueOnce();
  const promise = http.createPerson({ name: 'Pietro' });

  expect(axiosMock.post.mock.calls.length).toEqual(1);
  expect(axiosMock.post.mock.calls[0][0]).toEqual('/api/people');
  expect(axiosMock.post.mock.calls[0][1]).toEqual({ name: 'Pietro' });
  expect(axiosMock.post.mock.calls[0][2]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});

test('updatePerson has the correct url', () => {
  axiosMock.put.mockResolvedValueOnce();
  const promise = http.updatePerson(20, { name: 'Pietro' });

  expect(axiosMock.put.mock.calls.length).toEqual(1);
  expect(axiosMock.put.mock.calls[0][0]).toEqual('/api/people/20');
  expect(axiosMock.put.mock.calls[0][1]).toEqual({ name: 'Pietro' });
  expect(axiosMock.put.mock.calls[0][2]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});

test('loadPerson has the correct url', () => {
  axiosMock.get.mockResolvedValueOnce();
  const promise = http.loadPerson(20);

  expect(axiosMock.get.mock.calls.length).toEqual(1);
  expect(axiosMock.get.mock.calls[0][0]).toEqual('/api/people/20');
  expect(axiosMock.get.mock.calls[0][1]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});

test('deletePerson has the correct url', () => {
  axiosMock.delete.mockResolvedValueOnce();
  const promise = http.deletePerson(20);

  expect(axiosMock.delete.mock.calls.length).toEqual(1);
  expect(axiosMock.delete.mock.calls[0][0]).toEqual('/api/people/20');
  expect(axiosMock.delete.mock.calls[0][1]).toEqual({ cancelToken: 'token' });
  expect(promise[1]).toBeTruthy();
});
