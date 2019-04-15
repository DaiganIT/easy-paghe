export default (companyDetails, bases, summary) => ({
  0: {
    gridProps: {
      lg: 4,
      md: 12
    },
    template: companyDetails
  },
  1: {
    gridProps: {
      lg: 6,
      md: 12
    },
    template: bases
  },
  2: {
    gridProps: {
      lg: 4,
      md: 12
    },
    template: summary
  }
});
