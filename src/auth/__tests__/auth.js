import { expect } from 'chai';
import axiosMock from 'axios';
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
    jest.clearAllMocks();
    authentication.isAuthenticated = null;
  });

  describe('WHEN I login', () => {
    beforeAll(() => {
      axiosMock.post.mockResolvedValueOnce({ name: 'Pietro' });
      authentication.login('username', 'password');
    });

    test('THEN The login url is called with the correct data', () => {
      expect(axiosMock.post.mock.calls.length).to.equal(1);
      expect(axiosMock.post.mock.calls[0][0]).to.equal('/api/auth/login');
      expect(axiosMock.post.mock.calls[0][1]).to.deep.equal({ username: 'username', password: 'password' });
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
  });

  describe('WHEN I login', () => {
    beforeAll(() => {
      axiosMock.post.mockRejectedValueOnce();
      authentication.login('username', 'password')
        .catch(() => { });
    });

    test('THEN The login url is called with the correct data', () => {
      expect(axiosMock.post.mock.calls.length).to.equal(1);
      expect(axiosMock.post.mock.calls[0][0]).to.equal('/api/auth/login');
      expect(axiosMock.post.mock.calls[0][1]).to.deep.equal({ username: 'username', password: 'password' });
    });

    test('THEN The user is not authenticated', () => {
      expect(authentication.isAuthenticated).to.not.be.ok;
    });
  });
});

describe('GIVEN I\'m logged in', () => {
  beforeAll(() => {
    jest.clearAllMocks();
    authentication.isAuthenticated = null;
    localStorage.setItem('user', { name: 'Pietro' });
  });

  describe('WHEN I logout', () => {
    beforeAll(() => {
      axiosMock.post.mockResolvedValueOnce();
      authentication.logout();
    });

    test('THEN The logout url is called', () => {
      expect(axiosMock.post.mock.calls.length).to.equal(1);
      expect(axiosMock.post.mock.calls[0][0]).to.equal('/api/auth/logout');
    });

    test('THEN The user is not authenticated', () => {
      expect(authentication.isAuthenticated).to.be.false;
    });
  });
});