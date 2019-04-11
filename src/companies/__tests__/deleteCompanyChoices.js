import { buildDeleteCompanyChoices, buildDeleteCompanyBaseChoices } from '../deleteCompanyChoices';

test('delete company choices is built correctly', () => {
	const setIsDeleting = jest.fn();
	const deleteCompanyChoices = buildDeleteCompanyChoices({ setIsDeleting });

  expect(deleteCompanyChoices[0].text).toEqual('Annulla');
  expect(deleteCompanyChoices[0].action).toBeFalsy();
	expect(deleteCompanyChoices[0].autoFocus).toBeFalsy();
	
	expect(deleteCompanyChoices[1].text).toEqual('Elimina');
  expect(deleteCompanyChoices[1].action).toBeTruthy();
	expect(deleteCompanyChoices[1].autoFocus).toBe(true);
	deleteCompanyChoices[1].action();
	expect(setIsDeleting).toHaveBeenCalledWith({ withEmployees: true });
	jest.clearAllMocks();
	
	expect(deleteCompanyChoices[2].text).toEqual('Licenzia');
  expect(deleteCompanyChoices[2].action).toBeTruthy();
	expect(deleteCompanyChoices[2].autoFocus).toBeFalsy();
	deleteCompanyChoices[2].action();
	expect(setIsDeleting).toHaveBeenCalledWith();
	jest.clearAllMocks();
});

test('delete company bases choices is built correctly', () => {
	const setIsDeletingBase = jest.fn();
	const deleteCompanyBaseChoices = buildDeleteCompanyBaseChoices({ setIsDeletingBase });

  expect(deleteCompanyBaseChoices[0].text).toEqual('Annulla');
  expect(deleteCompanyBaseChoices[0].action).toBeFalsy();
	expect(deleteCompanyBaseChoices[0].autoFocus).toBeFalsy();
	
	expect(deleteCompanyBaseChoices[1].text).toEqual('Elimina');
  expect(deleteCompanyBaseChoices[1].action).toBeTruthy();
	expect(deleteCompanyBaseChoices[1].autoFocus).toBe(true);
	deleteCompanyBaseChoices[1].action({ baseId: 3});
	expect(setIsDeletingBase).toHaveBeenCalledWith({ baseId: 3, withEmployees: true });
	jest.clearAllMocks();
	
	expect(deleteCompanyBaseChoices[2].text).toEqual('Licenzia');
  expect(deleteCompanyBaseChoices[2].action).toBeTruthy();
	expect(deleteCompanyBaseChoices[2].autoFocus).toBeFalsy();
	deleteCompanyBaseChoices[2].action({ baseId: 3 });
	expect(setIsDeletingBase).toHaveBeenCalledWith({ baseId: 3 });
	jest.clearAllMocks();
});