import React from 'react';
import { MemoryRouter } from 'react-router-dom'
import {
  render,
  cleanup,
  fireEvent,
} from 'react-testing-library';
import axiosMock from 'axios';
import 'jest-dom/extend-expect';
import Companies from '../Companies';

afterEach(cleanup)

// test('loads companies at startup', () => {
//   const { container } = render(<MemoryRouter>
//     <Companies />
//   </MemoryRouter>);

//   expect(axiosMock.get).toHaveBeenCalledWith('/api/companies?filter=&page=1&pageLimit=10');
// });