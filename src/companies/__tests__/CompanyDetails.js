import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
} from 'react-testing-library';
import 'jest-dom/extend-expect';
import CompanyDetails from '../CompanyDetails';

afterEach(cleanup)

const defaultProps = {
  isSaving: false,
  company: {
    name: 'The name',
    fiscalCode: 'TheFiscalCode',
    ivaCode: '5645',
    inpsRegistrationNumber: '54756',
    inailRegistrationNumber: '46854695',
  },
  updateField: jest.fn(),
  errors: {}
}

test('Company Details structure snapshot is correct', () => {
  const { container } = render(<CompanyDetails {...defaultProps} />);
  expect(container.firstChild).toMatchSnapshot();
});

const testCases = [
  {
    name: 'name',
    inputId: 'name'
  },
  {
    name: 'fiscalCode',
    inputId: 'fiscal-code'
  },
  {
    name: 'ivaCode',
    inputId: 'iva-code',
    isNumeric: true
  },
  {
    name: 'inpsRegistrationNumber',
    inputId: 'inps',
    isNumeric: true
  },
  {
    name: 'inailRegistrationNumber',
    inputId: 'inail',
    isNumeric: true
  },
]

testCases.forEach(testCase => {
  afterEach(jest.clearAllMocks);

  test(`Company Details ${testCase.name} input is rendered`, () => {
    const { container } = render(<CompanyDetails {...defaultProps} />);

    expect(container.querySelector(`input#company-${testCase.inputId}`).value).toBe(defaultProps.company[testCase.name]);
  });

  test(`Company Details ${testCase.name} input change is catched`, () => {
    const { container } = render(<CompanyDetails {...defaultProps} />);

    fireEvent.change(container.querySelector(`input#company-${testCase.inputId}`), { target: { value: testCase.isNumeric ? '54556' : 'Changed' } });
    expect(defaultProps.updateField).toHaveBeenCalledWith(testCase.name, testCase.isNumeric ? '54556' : 'Changed');
  });
});

test('Company Details inputs are disabled when isSaving is true', () => {
  const props = Object.assign({}, defaultProps, { isSaving: true });
  const { container } = render(<CompanyDetails {...props} />);

  const allInputs = container.querySelectorAll('input');
  for(const input of allInputs) {
    expect(input).toBeDisabled();
  }
});

const testCases2 = [
  {
    name: 'name',
    inputId: 'name'
  },
  {
    name: 'fiscalCode',
    inputId: 'fiscal-code'
  },
  {
    name: 'ivaCode',
    inputId: 'iva-code',
  },
  {
    name: 'inpsRegistrationNumber',
    inputId: 'inps',
  },
  {
    name: 'inailRegistrationNumber',
    inputId: 'inail',
  },
]

testCases2.forEach(testCase => {
  test(`Company Details ${testCase.name} input is rendered with errors`, () => {
    const props = Object.assign({}, defaultProps, { errors: { [testCase.name]: ['error'] }});
    const { container } = render(<CompanyDetails {...props} />);

    expect(container.querySelector(`label[for=company-${testCase.inputId}]`).className).toContain('MuiFormLabel-error');
  });
});