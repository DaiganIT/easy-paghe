import { CancellableQueryablePromise } from '../common/PromiseHelpers';

jest.mock('axios', () => ({
  get: jest.fn(() => new Promise((resolve, reject) => {
    process.nextTick(() => resolve());
  })),
  post: jest.fn(() => new Promise((resolve, reject) => {
    process.nextTick(() => resolve());
  })),
  put: jest.fn(() => new Promise((resolve, reject) => {
    process.nextTick(() => resolve());
  })),
  delete: jest.fn(() => new Promise((resolve, reject) => {
    process.nextTick(() => resolve());
  })),
  interceptors: {
    response: {
      use: jest.fn()
    }
  },
  isCancel: jest.fn(() => false)
}));

global.MockPromise = (resolveWith) => () => CancellableQueryablePromise({
  promise: new Promise(r => r(resolveWith)),
  tokenSource: { cancel: jest.fn() }
});

global.MockPromiseReject = (rejectWith) => () => CancellableQueryablePromise({
  promise: new Promise((_,r) => r(rejectWith)),
  tokenSource: { cancel: jest.fn() }
});
