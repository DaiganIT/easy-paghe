import defaultCompany from '../defaultNewCompany';

const expectedDefaultCompany = {
	id: 0,
	name: '',
	fiscalCode: '',
	ivaCode: '',
	inpsRegistrationNumber: '',
	inailRegistrationNumber: '',
	bases: [{
		name: 'Sede principale',
		address: ''
	}]
};

test('default company is correct', () => {
  expect(defaultCompany).toEqual(expectedDefaultCompany);
});