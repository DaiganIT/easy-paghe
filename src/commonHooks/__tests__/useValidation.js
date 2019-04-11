import { renderHook, cleanup, act } from 'react-hooks-testing-library';
import useValidation from '../useValidation';

afterEach(cleanup);

test('has correct default state', () => {
  const { result } = renderHook(() => useValidation());

  let [errors] = result.current;

  expect(errors).toEqual({});
});

test('can set errors from an api call', () => {
  const { result } = renderHook(() => useValidation());

  let [errors, onError] = result.current;

  act(() => {
    onError({
      response: {
        data: {
          name: ['name;Name is required'],
          address: ['address;Address is required']
        },
        status: 400
      }
    })
  });

  [errors] = result.current;
  expect(errors).toEqual({name: ['Name is required'], address: ['Address is required']});
});

test('can trigger manual validation', () => {
  const { result } = renderHook(() => useValidation());

  let [errors, _, doValidate] = result.current;

  act(() => {
    doValidate({ name: 'Pietro' }, { address: { presence: true } });
  });

  [errors] = result.current;
  expect(errors).toEqual({address: ['Address can\'t be blank']});
});