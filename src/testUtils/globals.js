import { CancellableQueryablePromise } from '../common/PromiseHelpers';

jest.mock('axios', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  interceptors: {
    response: {
      use: jest.fn()
    }
  },
  isCancel: jest.fn(() => false),
  CancelToken: {
    source: () => ({
      token: 'token',
      cancel: jest.fn()
    })
  }
}));

global.MockPromise = (resolveWith) => () => CancellableQueryablePromise({
  promise: new Promise(r => r(resolveWith)),
  tokenSource: { cancel: jest.fn() }
});

global.MockPromiseReject = (rejectWith) => () => CancellableQueryablePromise({
  promise: new Promise((_, r) => r(rejectWith)),
  tokenSource: { cancel: jest.fn() }
});