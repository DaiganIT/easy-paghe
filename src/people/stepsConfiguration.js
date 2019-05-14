import { StepData } from '../commonHooks/useSteps';
import { personValidator } from './validators';

export const stepsConfiguration = [
	new StepData({ label: 'Dettagli persona', validator: personValidator }),
	new StepData({ label: 'Sommario', isSummary: true })
];

export const stepErrorMap = {
	0: ['firstName', 'lastName', 'address', 'phone', 'email']
};
