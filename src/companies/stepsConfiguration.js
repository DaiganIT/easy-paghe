import { StepData } from '../commonHooks/useSteps';

export const stepsConfiguration = [
	new StepData({ label: 'Dettagli azienda' }),
	new StepData({ label: 'Sedi azienda' }),
	new StepData({ label: 'Sommario', isSummary: true })
];

export const stepErrorMap = {
	0: ['name', 'fiscalCode', 'ivaCode', 'inpsRegistrationNumber', 'inailRegistrationNumber'],
	1: ['bases']
};