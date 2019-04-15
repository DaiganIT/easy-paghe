import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
} from 'react-testing-library';
import 'jest-dom/extend-expect';
import PersonDetails from '../PersonDetails';

afterEach(cleanup)

const defaultProps = {
  isSaving: false,
  person: {
    firstName: 'Pietro',
    lastName: 'Carta',
    phone: '65654',
    address: 'inkerman road',
    email: 'test@test.it',
  },
  updateField: jest.fn(),
  errors: {}
}

test('Company Details structure snapshot is correct', () => {
  const { container } = render(<PersonDetails {...defaultProps} />);
  expect(container.firstChild).toMatchSnapshot();
});

const testCases = [
  {
    name: 'firstName',
    inputId: 'first-name'
  },
  {
    name: 'lastName',
    inputId: 'last-name'
  },
  {
    name: 'phone',
    inputId: 'phone',
  },
  {
    name: 'address',
    inputId: 'address',
  },
  {
    name: 'email',
    inputId: 'email',
  },
]

testCases.forEach(testCase => {
  afterEach(jest.clearAllMocks);

  test(`Person Details ${testCase.name} input is rendered`, () => {
    const { container } = render(<PersonDetails {...defaultProps} />);

    expect(container.querySelector(`input#person-${testCase.inputId}`).value).toBe(defaultProps.person[testCase.name]);
  });

  test(`Person Details ${testCase.name} input change is catched`, () => {
    const { container } = render(<PersonDetails {...defaultProps} />);

    fireEvent.change(container.querySelector(`input#person-${testCase.inputId}`), { target: { value: 'Changed' } });
    expect(defaultProps.updateField).toHaveBeenCalledWith(testCase.name, 'Changed');
  });
});

test('Person Details inputs are disabled when isSaving is true', () => {
  const props = Object.assign({}, defaultProps, { isSaving: true });
  const { container } = render(<PersonDetails {...props} />);

  const allInputs = container.querySelectorAll('input');
  for(const input of allInputs) {
    expect(input).toBeDisabled();
  }
});

testCases.forEach(testCase => {
  test(`Person Details ${testCase.name} input is rendered with errors`, () => {
    const props = Object.assign({}, defaultProps, { errors: { [testCase.name]: ['error'] }});
    const { container } = render(<PersonDetails {...props} />);

    expect(container.querySelector(`label[for=person-${testCase.inputId}]`).className).toContain('MuiFormLabel-error');
  });
});