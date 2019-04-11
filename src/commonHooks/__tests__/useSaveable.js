import { renderHook, cleanup, act } from 'react-hooks-testing-library'
import useSaveable from '../useSaveable';

afterEach(cleanup);
beforeEach(() => {
  jest.clearAllMocks();
});

const createPromise = MockPromise({ data: { id: 10, name: 'Pietro' } });
const updatePromise = MockPromise({ data: { name: 'Pietro' } });
let id = 0;
const onSave = jest.fn();
const onError = jest.fn();

test('has the correct default state', async () => {
  const { result } = renderHook(() => useSaveable({ createPromise, updatePromise, id, onSave, onError }));
  const [isSaving] = result.current;
  expect(isSaving).toBe(false);
});

test('calls create promise when id is falsy', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useSaveable({ createPromise, updatePromise, id, onSave, onError }));
  let [isSaving, setIsSaving] = result.current;

  act(() => {
    setIsSaving(true);
  });

  [isSaving] = result.current;
  expect(isSaving).toBe(true);
  
  await waitForNextUpdate();

  [isSaving] = result.current;
  expect(isSaving).toBe(false);
  expect(onSave).toHaveBeenCalledTimes(1);
  expect(onSave).toHaveBeenCalledWith({ id: 10, name: 'Pietro' });
});

test('calls update promise when id is truthy', async () => {
  id = 10;
  const { result, waitForNextUpdate } = renderHook(() => useSaveable({ createPromise, updatePromise, id, onSave, onError }));
  let [isSaving, setIsSaving] = result.current;

  act(() => {
    setIsSaving(true);
  });

  [isSaving] = result.current;
  expect(isSaving).toBe(true);
  
  await waitForNextUpdate();

  [isSaving] = result.current;
  expect(isSaving).toBe(false);
  expect(onSave).toHaveBeenCalledTimes(1);
  expect(onSave).toHaveBeenCalledWith({ name: 'Pietro' });
});

