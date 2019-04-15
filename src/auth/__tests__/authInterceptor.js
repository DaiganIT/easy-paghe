import { expect } from 'chai';
import axios from 'axios';
import auth from '../auth';

describe('GIVEN The app starts', () => {
  test('THEN The 401 interceptor is attached', () => {
    expect(axios.interceptors.response.use).to.be.ok;
    expect(axios.interceptors.response.use.mock.calls[0][0].toString()).to.equal(`function (response) {\n  return response;\n}`);
    expect(axios.interceptors.response.use.mock.calls[0][1].toString()).to.equal(`function (error) {\n  if (error.response && error.response.status === 401) {\n    localStorage.removeItem(\'user\');\n    window.location.href = \'/login\';\n  }\n\n  return Promise.reject(error);\n}`);
  });
});