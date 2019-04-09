export const companyHasEmployees = (company) => {
  if (!company.bases) return false;
  return company.bases.reduce((agg, elem) => !!elem.employees ? agg + elem.employees.length : agg, 0) > 0;
}