import React from 'react';
import {
  render,
  cleanup,
} from 'react-testing-library';
import 'jest-dom/extend-expect';
import SummaryItem from '../SummaryItem';

afterEach(cleanup)

test('Summary Item structure snapshot is correct', () => {
  const { container } = render(<SummaryItem name="Title" value="Hello" />);
  expect(container.firstChild).toMatchSnapshot();
});

test('Summary Item name and value are rendered', () => {
  const { container } = render(<SummaryItem name="Title" value="Hello" />);
  
  expect(container.querySelector('h6').textContent).toBe('Title:');
  expect(container.querySelector('p').textContent).toBe('Hello');

  const errorsP = container.querySelectorAll('.summary-errors p');
  expect(errorsP.length).toBe(0);
});

test('Summary Item renders errors', () => {
  const { container } = render(<SummaryItem name="Title" value="Hello" errors={['error1', 'error2']} />);
  
  expect(container.querySelector('h6').textContent).toBe('Title:');
  expect(container.querySelector('h6').className).toContain('MuiTypography-colorError-401');
  expect(container.querySelector('p').textContent).toBe('Hello');

  const errorsP = container.querySelectorAll('.summary-errors p');
  expect(errorsP.length).toBe(2);
  expect(errorsP[0].textContent).toBe('error1');
  expect(errorsP[1].textContent).toBe('error2');
});