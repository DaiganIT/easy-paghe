import validate from 'validate.js';
import { useState } from 'react';

import { removeEmpties } from '../utils';

const cleanObject = obj => {
  const cleanedErrors = Object.assign({}, obj);
  for (const key in cleanedErrors) {
    const propertyErrorsArray = cleanedErrors[key];

    if (Array.isArray(propertyErrorsArray)) {
      const cleanedErrorsArray = [];
      for (const propertyError of propertyErrorsArray) {
        if (propertyError.indexOf(';') >= 0) {
          cleanedErrorsArray.push(propertyError.split(';')[1]);
        } else {
          cleanedErrorsArray.push(propertyError);
        }
      }
      cleanedErrors[key] = cleanedErrorsArray;
    } else {
      // nested object validation.
      cleanedErrors[key] = cleanObject(cleanedErrors[key]);
    }
  }
  return cleanedErrors;
}

function useValidation() {
  const [errors, setErrors] = useState({});

  const onError = err => {
    if (err.response && err.response.status && err.response.status === 400) {
      // we have a validation error
      const validationErrors = err.response.data;
      const cleanedErrors = cleanObject(validationErrors);
      setErrors(cleanedErrors);
    } else {
      // show a modal dialog common error
    }
  };

  const doValidate = (form, validator) => {
    let errors;
    if (Array.isArray(form)) {
      let groupErrors;
      let index = 0;
      for (const formItem of form) {
        groupErrors = validate(removeEmpties(formItem), validator);
        if (groupErrors) errors = Object.assign({}, errors, { bases: { [index]: groupErrors } });
        index++;
      }
    } else {
      errors = validate(removeEmpties(form), validator);
    }
    if (errors) {
      setErrors(cleanObject(errors));
    }

    return errors;
  }

  return [errors, onError, doValidate];
}

export default useValidation;