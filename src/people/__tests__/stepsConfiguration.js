import { stepsConfiguration, stepErrorMap } from '../stepsConfiguration';

test('step configuration is correct', () => {
  expect(stepsConfiguration.length).toBe(2);

  expect(stepsConfiguration[0].label).toBe('Dettagli persona');
  expect(stepsConfiguration[0].validator).toBeTruthy();

  expect(stepsConfiguration[1].label).toBe('Sommario');
  expect(stepsConfiguration[1].isSummary).toBe(true);
})

test('step error map is correct', () => {
  const expectedErrorMap = {
	  0: ['firstName', 'lastName', 'address', 'phone', 'email']
  };

  expect(stepErrorMap).toEqual(expectedErrorMap);
})