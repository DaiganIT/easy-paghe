import { StepData } from '../commonHooks/useSteps';
import { hirePersonValidator } from './validators';

export const stepsConfiguration = [
	new StepData({ label: 'Dettagli Assunzione', validator: hirePersonValidator }),
	new StepData({ label: 'Sommario', isSummary: true })
];

export const stepErrorMap = {
	0: ['companyBaseId', 'personId', 'ccnlId', 'salaryTableId', 'startDate', 'endDate', 'weekHours', 'holidays']
};
