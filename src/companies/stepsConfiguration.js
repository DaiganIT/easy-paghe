import { StepData } from '../commonHooks/useSteps';
import { companyDetailsValidation, basesValidation } from './validation';

export const stepsConfiguration = [
	new StepData({ label: 'Dettagli azienda', validator: companyDetailsValidation }),
	new StepData({ label: 'Sedi azienda', validator: basesValidation, validatorPath: 'bases' }),
	new StepData({ label: 'Sommario', isSummary: true })
];

export const stepErrorMap = {
	0: ['name', 'fiscalCode', 'ivaCode', 'inpsRegistrationNumber', 'inailRegistrationNumber'],
	1: ['bases']
};
