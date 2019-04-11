import { renderHook, cleanup, act } from 'react-hooks-testing-library'
import useList from '../useList'

afterEach(cleanup)

test('creates list', async () => {
  const promise = MockPromise({ data: ['hello', 'hi'] });

  const { result, waitForNextUpdate } = renderHook(() => useList({ getPromise: promise }));
  expect(result.current.loadData).toBe(true);
  expect(result.current.page).toBe(0);
  expect(result.current.pageLimit).toBe(10);
  expect(result.current.search).toBe('');

  await waitForNextUpdate();

  expect(result.current.loadData).toBe(false);
  expect(result.current.data).toEqual(['hello', 'hi']);
});

test('calls the promise again when changing page', async () => {
  const promise = MockPromise({ data: ['hello', 'hi'] });

  const { result, waitForNextUpdate } = renderHook(() => useList({ getPromise: promise }));
  await waitForNextUpdate();

  act(() => {
    result.current.setPage(1);
  });

  expect(result.current.loadData).toBe(true);
  await waitForNextUpdate();
  expect(result.current.loadData).toBe(false);
});

test('calls the promise again when forcing reload', async () => {
  const promise = MockPromise({ data: ['hello', 'hi'] });

  const { result, waitForNextUpdate } = renderHook(() => useList({ getPromise: promise }));
  await waitForNextUpdate();

  act(() => {
    result.current.reloadData();
  });

  expect(result.current.loadData).toBe(true);
  await waitForNextUpdate();
  expect(result.current.loadData).toBe(false);
});