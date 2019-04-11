export function removeEmpties(form) {
	const newForm = Object.assign({}, form);

	for (const key in newForm) {
		if (newForm.hasOwnProperty(key)) {
			if (newForm[key] === '') {
				delete newForm[key];
			} else if (Array.isArray(newForm[key])) {
				const newArray = [];
				for (let arrayElem of newForm[key]) {
					newArray.push(removeEmpties(arrayElem));
				}
				newForm[key] = newArray;
			} else if (newForm[key] && typeof newForm[key] === 'object') {
				newForm[key] = removeEmpties(newForm[key]);
			}
		}
	}

	return newForm;
}