export function removeEmpties(form) {
	const newForm = Object.assign({}, form);

	for (const key in newForm) {
		if (newForm.hasOwnProperty(key)) {
			if (newForm[key] === '') {
				delete newForm[key];
			} else if (Array.isArray(newForm[key])) {
				for (const arrayElem of newForm[key]) {
					removeEmpties(arrayElem);
				}
			} else if (typeof newForm[key] === 'object') {
				removeEmpties(newForm[key]);
			}
		}
	}

	return newForm;
}