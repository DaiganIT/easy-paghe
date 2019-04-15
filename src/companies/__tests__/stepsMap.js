import stepMap from '../stepsMap';

const expectedStepMap = {
  0: {
    gridProps: {
      lg: 4,
      md: 12
    },
    template: 'a'
  },
  1: {
    gridProps: {
      lg: 6,
      md: 12
    },
    template: 'b'
  },
  2: {
    gridProps: {
      lg: 4,
      md: 12
    },
    template: 'c'
  }
};

test('step map is correct', () => {
  expect(stepMap('a', 'b', 'c')).toEqual(expectedStepMap);
});