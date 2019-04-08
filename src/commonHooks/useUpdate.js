import update from 'immutability-helper';

function useUpdate(field, setField) {
  const updateProperty = (propertyName, value) => {
    setField(update(field, {
      [propertyName]: { $set: value }
    }));
  };

  return [updateProperty];
};

export default useUpdate;
