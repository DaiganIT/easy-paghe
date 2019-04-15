import { removeEmpties } from '../';

test('can remove empties', () => {
  const form = {
    name: 'hello',
    address: '',
    phone: null,
    other: undefined,
    forms: [{
      name: 'done',
      address: ''
    },{
      name: 'done2',
      address: ''
    }],
    subForm: {
      name: 'sub',
      address: ''
    }
  };

  const expected = {
    name: 'hello',
    phone: null,
    other: undefined,
    forms: [{
      name: 'done',
    },{
      name: 'done2',
    }],
    subForm: {
      name: 'sub',
    }
  };

  expect(removeEmpties(form)).toEqual(expected);
})