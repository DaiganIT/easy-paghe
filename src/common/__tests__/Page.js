import React from 'react';
import {
  render,
  cleanup,
} from 'react-testing-library';
import 'jest-dom/extend-expect';
import Page from '../Page';

afterEach(cleanup)

it('renders its content inside a paper', () => {
  const { container } = render(<Page>
    This is a page
    </Page>);

  expect(container.querySelector('.MuiPaper-root-40')).toBeTruthy();
  expect(container.textContent).toBe('This is a page');
});

it('renders the title', () => {
  const { container } = render(<Page title="Page title">
    This is a page
    </Page>);

  expect(container.querySelector('#page-title').textContent).toBe('Page title');
});

it('renders its content without a paper', () => {
  const { container } = render(<Page noPaper>
    This is a page
    </Page>);

  expect(container.querySelector('.MuiPaper-root-40')).toBeFalsy();
  expect(container.textContent).toBe('This is a page');
});

it('renders an optional component', () => {
  const { container } = render(<Page menuComponent={<div id="optional">Optional</div>}>
    This is a page
    </Page>);

  expect(container.querySelector('#optional').textContent).toBe('Optional');
});