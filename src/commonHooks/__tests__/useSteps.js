import { renderHook, cleanup, act } from 'react-hooks-testing-library';
import useSteps, { StepData } from '../useSteps';

afterEach(cleanup);

let defaultStep = [
  new StepData({ label: 'First' }),
  new StepData({ label: 'Second' }),
  new StepData({ label: 'Third' })
];
let beginningStep = 0;

test('has the correct default state', () => {
  const { result } = renderHook(() => useSteps(defaultStep, beginningStep));

  expect(result.current.steps).toEqual(defaultStep);
  expect(result.current.activeStep).toEqual(0);
  expect(result.current.previousStep).toEqual(0);
});

test('goes to next step', () => {
  beginningStep = 0;
  const onNext = jest.fn(() => true);
  const { result } = renderHook(() => useSteps(defaultStep, beginningStep, onNext));

  act(() => {
    result.current.next();
  });

  expect(result.current.activeStep).toEqual(1);
  expect(result.current.previousStep).toEqual(0);
  expect(onNext).toHaveBeenCalled();
  expect(onNext).toHaveBeenCalledWith(defaultStep, 0);
});

test('doesn\'t go to next step', () => {
  beginningStep = 0;
  const onNext = jest.fn(() => false);
  const { result } = renderHook(() => useSteps(defaultStep, beginningStep, onNext));

  act(() => {
    result.current.next();
  });

  expect(result.current.activeStep).toEqual(0);
  expect(result.current.previousStep).toEqual(0);
  expect(onNext).toHaveBeenCalled();
  expect(onNext).toHaveBeenCalledWith(defaultStep, 0);
});

test('goes to previous step', () => {
  beginningStep = 1;
  const { result } = renderHook(() => useSteps(defaultStep, beginningStep));

  act(() => {
    result.current.prev();
  });

  expect(result.current.activeStep).toEqual(0);
  expect(result.current.previousStep).toEqual(1);
});

test('goes to N step', () => {
  beginningStep = 0;
  const { result } = renderHook(() => useSteps(defaultStep, beginningStep));

  act(() => {
    result.current.moveToStep(2);
  });

  expect(result.current.activeStep).toEqual(2);
  expect(result.current.previousStep).toEqual(0);
});

test('doesn\'t go below step 0', () => {
  beginningStep = 0;
  const { result } = renderHook(() => useSteps(defaultStep, beginningStep));

  act(() => {
    result.current.prev();
  });

  expect(result.current.activeStep).toEqual(0);
  expect(result.current.previousStep).toEqual(0);
});

test('doesn\'t go over step max', () => {
  beginningStep = 2;
  const { result } = renderHook(() => useSteps(defaultStep, beginningStep));

  act(() => {
    result.current.next();
  });

  expect(result.current.activeStep).toEqual(2);
  expect(result.current.previousStep).toEqual(2);
});

test('first step has errors', () => {
  beginningStep = 0;
  errors = { name: 'error' };
  let { result } = renderHook(() => useSteps(defaultStep, beginningStep));

  act(() => {
    result.current.setStepError(0, true);
  });

  expect(result.current.steps[0].hasErrors).toBe(true);
});