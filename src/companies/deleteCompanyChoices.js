export const buildDeleteCompanyChoices = ({ setIsDeleting }) => ([
  {
    text: 'Annulla',
  },
  {
    text: 'Elimina',
    action: () => setIsDeleting({ withEmployees: true }),
    autoFocus: true
  },
  {
    text: 'Licenzia',
    action: () => setIsDeleting()
  }
]);

export const buildDeleteCompanyBaseChoices = ({ setIsDeletingBase }) => ([
  {
    text: 'Annulla',
  },
  {
    text: 'Elimina',
    action: (options) => setIsDeletingBase({ baseId: options.baseId, withEmployees: true }),
    autoFocus: true
  },
  {
    text: 'Licenzia',
    action: (options) => setIsDeletingBase({ baseId: options.baseId })
  }
]);