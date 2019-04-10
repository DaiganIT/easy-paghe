import { expect } from 'chai';
import axios from 'axios';
import authentication from '../auth';

describe('GIVEN the local storage has no user', () => {
  beforeAll(() => {
    authentication.isAuthenticated = null;
    jest.clearAllMocks();
    localStorage.removeItem('user');
  });

  test('THEN User is not authenticated', () => {
    expect(authentication.isAuthenticated).to.not.be.ok;
  });
});

describe('GIVEN I have correct username and password', () => {
  beforeAll(() => {
    authentication.isAuthenticated = null;
    jest.clearAllMocks();
    axios.post = jest.fn(() => new Promise((resolve, reject) => {
      resolve({ name: 'Pietro' });
    }));
  });

  describe('WHEN I login', () => {
    beforeAll(async () => {
      await authentication.login('username', 'password');
    });

    test('THEN The login url is called with the correct data', () => {
      expect(axios.post.mock.calls.length).to.equal(1);
      expect(axios.post.mock.calls[0][0]).to.equal('/api/auth/login');
      expect(axios.post.mock.calls[0][1]).to.deep.equal({ username: 'username', password: 'password' });
    });

    test('THEN The user is authenticated', () => {
      expect(authentication.isAuthenticated).to.be.true;
    });
  });
});

describe('GIVEN I have wrong username and password', () => {
  beforeAll(() => {
    jest.clearAllMocks();
    authentication.isAuthenticated = null;
    axios.post = jest.fn(() => new Promise((resolve, reject) => {
      reject();
    }));
  });

  describe('WHEN I login', () => {
    beforeAll(async () => {
      await authentication.login('username', 'password')
        .catch(() => {});
    });

    test('THEN The login url is called with the correct data', () => {
      expect(axios.post.mock.calls.length).to.equal(1);
      expect(axios.post.mock.calls[0][0]).to.equal('/api/auth/login');
      expect(axios.post.mock.calls[0][1]).to.deep.equal({ username: 'username', password: 'password' });
    });

    test('THEN The user is not authenticated', () => {
      expect(authentication.isAuthenticated).to.not.be.ok;
    });
  });
});

describe('GIVEN I\'m logged in', () => {
  beforeAll(() => {
    authentication.isAuthenticated = null;
    jest.clearAllMocks();
    localStorage.setItem('user', { name: 'Pietro' });
    axios.post = jest.fn(() => new Promise((resolve, reject) => {
      resolve();
    }));
  });

  describe('WHEN I logout', () => {
    beforeAll(async () => {
      await authentication.logout();
    });

    test('THEN The logout url is called', () => {
      expect(axios.post.mock.calls.length).to.equal(1);
      expect(axios.post.mock.calls[0][0]).to.equal('/api/auth/logout');
    });

    test('THEN The user is not authenticated', () => {
      expect(authentication.isAuthenticated).to.be.false;
    });
  });
});