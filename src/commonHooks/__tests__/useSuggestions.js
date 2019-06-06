import { renderHook, cleanup, act } from 'react-hooks-testing-library'
import useSuggestions from '../useSuggestions'

afterEach(cleanup)

test('creates list', async () => {
  const promise = MockPromise({ data: { items: ['hello', 'hi'], length: 2 } });

  const { result, waitForNextUpdate } = renderHook(() => useSuggestions({ getPromise: promise, loadOnStart: true }));
  let [isLoading, suggestions, loadSuggestions, clearSuggestions] = result.current;
  expect(isLoading).toBe(true);

  await waitForNextUpdate();

  [isLoading, suggestions, loadSuggestions, clearSuggestions] = result.current;
  expect(isLoading).toBe(false);
  expect(suggestions).toEqual({ items: ['hello', 'hi'], length: 2 });
});

test('does not load on startup', async () => {
  const promise = MockPromise({ data: { items: ['hello', 'hi'], length: 2 } });

  const { result, waitForNextUpdate } = renderHook(() => useSuggestions({ getPromise: promise }));
  let [isLoading, suggestions, loadSuggestions, clearSuggestions] = result.current;
  expect(isLoading).toBe(false);
});

test('calls the promise when load invoked', async () => {
  const promise = jest.fn(MockPromise({ data: { items: ['hello', 'hi'], length: 2 } }));

  const { result, waitForNextUpdate } = renderHook(() => useSuggestions({ getPromise: promise, loadOnStart: true }));
  
  await waitForNextUpdate();

  let [isLoading, suggestions, loadSuggestions, clearSuggestions] = result.current;
  expect(isLoading).toBe(false);

  jest.clearAllMocks();
  act(() => {
    loadSuggestions({ search: 'hi there' });
  });

  expect(promise).toHaveBeenCalledWith({ page: 0, pageLimit: 15, search: 'hi there'});

  [isLoading, suggestions, loadSuggestions, clearSuggestions] = result.current;
  expect(isLoading).toBe(true);
  
  await waitForNextUpdate();

  [isLoading, suggestions, loadSuggestions, clearSuggestions] = result.current;
  expect(isLoading).toBe(false);
});