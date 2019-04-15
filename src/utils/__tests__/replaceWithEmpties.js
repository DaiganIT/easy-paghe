import { replaceWithEmpties } from '../';

test('can remove empties', () => {
  const form = {
    name: 'hello',
    address: null,
    phone: null,
    other: undefined,
    forms: [{
      name: 'done',
      address: undefined
    },{
      name: 'done2',
      address: undefined
    }],
    subForm: {
      name: 'sub',
      address: undefined
    }
  };

  const expected = {
    name: 'hello',
    address: '',
    phone: '',
    other: '',
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

  expect(replaceWithEmpties(form)).toEqual(expected);
})