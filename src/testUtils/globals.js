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
  }
}));

global.MockPromise = (resolveWith) => () => CancellableQueryablePromise({
  promise: new Promise(r => r(resolveWith)),
  tokenSource: { cancel: jest.fn() }
});