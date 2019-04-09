export function replaceWithEmpties(form) {
	const newForm = Object.assign({}, form);

	for (const key in newForm) {
		if (newForm.hasOwnProperty(key)) {
			if (newForm[key] === null || typeof newForm[key] === 'undefined') {
				newForm[key] = '';
			} else if (Array.isArray(newForm[key])) {
				for (const arrayElem of newForm[key]) {
					replaceWithEmpties(arrayElem);
				}
			} else if (typeof newForm[key] === 'object') {
				replaceWithEmpties(newForm[key]);
			}
		}
	}

	return newForm;
}