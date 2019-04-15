import { companyHasEmployees } from '../utils';

test('can get number of employees for company with no bases', () => {
  const company = {
    bases: []
  };

  expect(companyHasEmployees(company)).toBe(false);
});

test('can get number of employees for company with 1 bases', () => {
  const company = {
    bases: [
      {
        employees: [{}, {}, {}]
      }
    ]
  };

  expect(companyHasEmployees(company)).toBe(true);
});

test('can get number of employees for company with 2 bases', () => {
  const company = {
    bases: [
      {
        employees: [{}, {}, {}]
      },
      {
        employees: [{}, {}]
      }
    ]
  };

  expect(companyHasEmployees(company)).toBe(true);
});

test('can get number of employees for company with 2 bases but one has no employees', () => {
  const company = {
    bases: [
      {
        employees: [{}, {}, {}]
      },
      {
      }
    ]
  };

  expect(companyHasEmployees(company)).toBe(true);
});