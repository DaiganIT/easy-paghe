import { stepsConfiguration, stepErrorMap } from '../stepsConfiguration';

test('step configuration is correct', () => {
  expect(stepsConfiguration.length).toBe(3);

  expect(stepsConfiguration[0].label).toBe('Dettagli azienda');
  expect(stepsConfiguration[0].validator).toBeTruthy();

  expect(stepsConfiguration[1].label).toBe('Sedi azienda');
  expect(stepsConfiguration[1].validator).toBeTruthy();
  expect(stepsConfiguration[1].validatorPath).toBe('bases');

  expect(stepsConfiguration[2].label).toBe('Sommario');
  expect(stepsConfiguration[2].isSummary).toBe(true);
})

test('step error map is correct', () => {
  const expectedErrorMap = {
    0: ['name', 'fiscalCode', 'ivaCode', 'inpsRegistrationNumber', 'inailRegistrationNumber'],
    1: ['bases']
  };

  expect(stepErrorMap).toEqual(expectedErrorMap);
})