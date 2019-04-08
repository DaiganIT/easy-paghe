import { useState } from 'react';

const cleanObject = obj => {
  const cleanedErrors = Object.assign({}, obj);
    for (const key in cleanedErrors) {
      const propertyErrorsArray = cleanedErrors[key];

      if (Array.isArray(propertyErrorsArray)) {
        const cleanedErrorsArray = [];
        for (const propertyError of propertyErrorsArray) {
          cleanedErrorsArray.push(propertyError.split(';')[1]);
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

  return [errors, onError];
}

export default useValidation;