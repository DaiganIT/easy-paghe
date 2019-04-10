import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
} from 'react-testing-library';
import 'jest-dom/extend-expect';
import SearchField from '../SearchField';

afterEach(cleanup)

it('renders an input with the given value', () => {
  const { container } = render(<SearchField search="hello"/>);

  const input = container.querySelector('input');
  expect(input).toBeTruthy();
  expect(input.value).toBe('hello');
});

it('renders an input with the given value', () => {
  const setSearch = jest.fn();
  const { container } = render(<SearchField value="hello" setSearch={setSearch}/>);

  const input = container.querySelector('input');
  fireEvent.change(input, { target: { value: 'a' }});

  expect(setSearch).toHaveBeenCalledWith('a');
});