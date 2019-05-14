import defaultPerson from '../defaultPerson';

const expectedDefaultPerson = {
  firstName: '',
  lastName: '',
  phone: '',
  address: '',
  email: ''
};

test('the default person is correct', () => {
  expect(defaultPerson).toEqual(expectedDefaultPerson);
});