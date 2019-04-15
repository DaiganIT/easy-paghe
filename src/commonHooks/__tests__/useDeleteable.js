import { renderHook, cleanup, act } from 'react-hooks-testing-library'
import useDeleteable from '../useDeleteable'

afterEach(cleanup)

test('creates deleteable', () => {
  const promise = MockPromise();
  const onDelete = jest.fn();

  const { result } = renderHook(() => useDeleteable({ deletePromise: promise, onDelete }))
  const [isDeleting] = result.current;

  expect(isDeleting).toBe(false);
  expect(onDelete).not.toHaveBeenCalled();
});

test('calls delete promise', async () => {
  const promise = MockPromise();
  const onDelete = jest.fn();

  const { result, waitForNextUpdate } = renderHook(() => useDeleteable({ deletePromise: promise, onDelete }))
  let [isDeleting, actionDelete] = result.current;

  act(() => {
    actionDelete();
  });

  [isDeleting, actionDelete] = result.current;
  expect(isDeleting).toBe(true);
  expect(onDelete).not.toHaveBeenCalled();

  await waitForNextUpdate();

  [isDeleting, actionDelete] = result.current;
  expect(isDeleting).toBe(false);
  expect(onDelete).toHaveBeenCalled();
});

test('calls delete promise with options', async () => {
  const promise = MockPromise();
  const onDelete = jest.fn();

  const { result, waitForNextUpdate } = renderHook(() => useDeleteable({ deletePromise: promise, onDelete }))
  let [isDeleting, actionDelete] = result.current;

  act(() => {
    actionDelete({ option: 'a' });
  });

  [isDeleting, actionDelete] = result.current;
  expect(isDeleting).toBe(true);
  expect(onDelete).not.toHaveBeenCalled();

  await waitForNextUpdate();

  [isDeleting, actionDelete] = result.current;
  expect(isDeleting).toBe(false);
  expect(onDelete).toHaveBeenCalledWith({ option: 'a' });
});
