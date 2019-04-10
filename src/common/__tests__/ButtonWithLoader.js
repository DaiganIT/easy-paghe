import React from 'react';
import {
  render,
  fireEvent,
  cleanup,
  waitForElement,
} from 'react-testing-library';
import 'jest-dom/extend-expect';
import ButtonWithLoader from '../ButtonWithLoader';

afterEach(cleanup)

describe('GIVEN I have a button', () => {
  test('THEN The inside is rendered as the button text', () => {
    const { container } = render(<ButtonWithLoader>
      Save
    </ButtonWithLoader>)

    const button = container.querySelector('button');
    expect(button).toBeTruthy();
    expect(button.textContent).toBe('Save');
  });
  test('THEN The circular progress is not showing', () => {
    const { container } = render(<ButtonWithLoader>
      Save
    </ButtonWithLoader>)

    const circularProgress = container.querySelector('.MuiCircularProgress-root-142');
    expect(circularProgress).toBeFalsy();
  });
  test('THEN The button is not disabled', () => {
    const { container } = render(<ButtonWithLoader>
      Save
    </ButtonWithLoader>)

    const button = container.querySelector('button');
    expect(button).not.toHaveAttribute('disabled');
  });
});

describe('GIVEN I have a button that is loading', () => {
  test('THEN The circular progress is showing', () => {
    const { container } = render(<ButtonWithLoader isLoading={true}>
      Save
    </ButtonWithLoader>)

    const circularProgress = container.querySelector('.MuiCircularProgress-root-142');
    expect(circularProgress).toBeTruthy();
  });
  test('THEN The button is disabled', () => {
    const { container } = render(<ButtonWithLoader isLoading={true}>
      Save
    </ButtonWithLoader>)

    const button = container.querySelector('button');
    expect(button).toHaveAttribute('disabled');
  });
});

describe('GIVEN I have a button that is disabled', () => {
  test('THEN The button is disabled', () => {
    const { container } = render(<ButtonWithLoader isLoading={true}>
      Save
    </ButtonWithLoader>)

    const button = container.querySelector('button');
    expect(button).toHaveAttribute('disabled');
  });
});