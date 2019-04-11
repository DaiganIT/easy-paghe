import { renderHook, cleanup, act } from 'react-hooks-testing-library'
import useLoadable from '../useLoadable';

afterEach(cleanup)

test('doesn\'t load on startup when no id provided', async () => {
  const promise = MockPromise({ data: { name: 'Pietro' } });

  const { result } = renderHook(() => useLoadable({ loadPromise: promise }));
  const [isLoading] = result.current;
  expect(isLoading).toBe(false);
});

test('loads on startup when id provided', async () => {
  const promise = MockPromise({ data: { name: 'Pietro' } });
  const setForm = jest.fn();

  const { result, waitForNextUpdate } = renderHook(() => useLoadable({ id: 1, loadPromise: promise, setForm }));
  let [isLoading] = result.current;
  expect(isLoading).toBe(true);
  
  await waitForNextUpdate();

  [isLoading] = result.current;
  expect(isLoading).toBe(false);
  expect(setForm).toHaveBeenCalledWith({ name: 'Pietro' });
});
