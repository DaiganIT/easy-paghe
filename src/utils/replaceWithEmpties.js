export function replaceWithEmpties(form) {
	const newForm = Object.assign({}, form);

	for (const key in newForm) {
		if (newForm.hasOwnProperty(key)) {
			if (newForm[key] === null || typeof newForm[key] === 'undefined') {
				newForm[key] = '';
			} else if (Array.isArray(newForm[key])) {
				const newArray = [];
				for (let arrayElem of newForm[key]) {
					newArray.push(replaceWithEmpties(arrayElem));
				}
				newForm[key] = newArray;
			} else if (typeof newForm[key] === 'object') {
				newForm[key] = replaceWithEmpties(newForm[key]);
			}
		}
	}

	return newForm;
}