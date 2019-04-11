import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
} from 'react-testing-library';
import 'jest-dom/extend-expect';
import CompanyBases from '../CompanyBases';

afterEach(cleanup)

const defaultProps = {
  addBase: jest.fn(),
  deleteBase: jest.fn(),
  isSaving: false,
  bases: [
    {
      name: 'Main Base',
      address: 'The address'
    }
  ],
  updateBaseField: jest.fn(),
  errors: {}
}

test('Company Bases structure snapshot is correct', () => {
  const { container } = render(<CompanyBases {...defaultProps} />);
  expect(container.firstChild).toMatchSnapshot();
});

const testCases = [
  {
    name: 'name',
    inputId: 'name'
  },
  {
    name: 'address',
    inputId: 'address'
  },
]

testCases.forEach(testCase => {
  afterEach(jest.clearAllMocks);

  test(`Company Bases ${testCase.name} input is rendered`, () => {
    const { container } = render(<CompanyBases {...defaultProps} />);

    expect(container.querySelector(`input#company-base-0-${testCase.inputId}`).value).toBe(defaultProps.bases[0][testCase.name]);
  });

  test(`Company Bases ${testCase.name} input change is catched`, () => {
    const { container } = render(<CompanyBases {...defaultProps} />);

    fireEvent.change(container.querySelector(`input#company-base-0-${testCase.inputId}`), { target: { value: 'Changed' } });
    expect(defaultProps.updateBaseField).toHaveBeenCalledWith(testCase.name, 0, 'Changed');
  });
});

test('Company Details inputs are disabled when isSaving is true', () => {
  const props = Object.assign({}, defaultProps, { isSaving: true });
  const { container } = render(<CompanyBases {...props} />);

  const allInputs = container.querySelectorAll('input');
  for (const input of allInputs) {
    expect(input).toBeDisabled();
  }
});

const testCases2 = [
  {
    name: 'name',
    inputId: 'name'
  },
  {
    name: 'address',
    inputId: 'address'
  },
]

testCases2.forEach(testCase => {
  test(`Company Bases ${testCase.name} input is rendered with errors`, () => {
    const props = Object.assign({}, defaultProps, { errors: { bases: [{ [testCase.name]: ['error'] }] } });
    const { container } = render(<CompanyBases {...props} />);

    expect(container.querySelector(`label[for=company-base-0-${testCase.inputId}]`).className).toContain('MuiFormLabel-error');
  });
});

test('Company Bases first company base has no delete button', () => {
  const { container } = render(<CompanyBases {...defaultProps} />);

  const deleteButton = container.querySelector(`#company-base-0-delete`);
  expect(deleteButton).not.toBeInTheDocument();
});

test('Company Bases second company base has delete button', () => {
  const props = Object.assign({}, defaultProps, {
    bases: [
      { name: 'Main Base', address: 'The address' },
      { name: 'Main Base 2', address: 'The address 2' }
    ]
  });
  const { container } = render(<CompanyBases {...props} />);

  const deleteButton = container.querySelector(`#company-base-1-delete`);
  expect(deleteButton).toBeInTheDocument();
});

test('Company Bases first company base has no delete button', () => {
  const props = Object.assign({}, defaultProps, {
    bases: [
      { id: 5, name: 'Main Base', address: 'The address' },
      { id: 10, name: 'Main Base 2', address: 'The address 2' }
    ]
  });
  const { container } = render(<CompanyBases {...props} />);

  const deleteButton = container.querySelector(`#company-base-1-delete`);
  fireEvent.click(deleteButton);
  expect(props.deleteBase).toHaveBeenCalledWith({ baseId: 10, index: 1 });
});

test('Company Bases add new company button triggers the event', () => {
  const { container } = render(<CompanyBases {...defaultProps} />);

  const addButton = container.querySelector(`#add-company-button`);
  fireEvent.click(addButton);
  expect(defaultProps.addBase).toHaveBeenCalled();
});