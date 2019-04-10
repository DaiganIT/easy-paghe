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