import useUpdate from '../useUpdate';

test('can update property', () => {
  let company = { name: 'Pietro' };
  const setCompany = (c) => company = c;
  const [updateField] = useUpdate(company, setCompany);

  updateField('name', 'Giuseppe');
  expect(company.name).toBe('Giuseppe');
});
