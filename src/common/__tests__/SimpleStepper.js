import React from 'react';
import {
  render,
  cleanup,
  fireEvent,
} from 'react-testing-library';
import 'jest-dom/extend-expect';
import SimpleStepper from '../SimpleStepper';
import { StepData } from '../../commonHooks/useSteps';

afterEach(cleanup)

const props = {
  previousStep: 0,
  activeStep: 0,
  steps: [new StepData({ label: 'test' }), new StepData({ label: 'second step' })],
  stepMap: { 
    0: {
      gridProps: {

      },
      template: <div>First Step</div>
    },
    1: {
      gridProps: {

      },
      template: <div>Second Step</div>
    }
  },
  next: jest.fn(),
  prev: jest.fn(),
  save: jest.fn(),
  isLoading: false
};

it('renders the step headers', () => {
  const { container } = render(<SimpleStepper {...props} />);

  const stepHeaders = container.querySelectorAll('#step-header .step-header');
  expect(stepHeaders.length).toBe(2);
  expect(stepHeaders[0].textContent).toBe('1test');
  expect(stepHeaders[1].textContent).toBe('2second step');
});

it('renders the step headers with the error icon', () => {
  const p = Object.assign({}, props, { steps: [new StepData({ label: 'test', hasErrors: true }), new StepData({ label: 'second step' })] });
  const { container } = render(<SimpleStepper {...p} />);

  const stepHeaders = container.querySelectorAll('#step-header .step-header');
  expect(stepHeaders.length).toBe(2);
  expect(stepHeaders[0].querySelector('.MuiStepLabel-error-287')).toBeTruthy();
  expect(stepHeaders[0].textContent).toBe('test');
});

it('renders the active first step', () => {
  const { container } = render(<SimpleStepper {...props} />);

  const stepContent = container.querySelector('#step-content');
  expect(stepContent.textContent).toBe('First Step');
});

it('renders the first step with a slide right', () => {
  const { container } = render(<SimpleStepper {...props} />);

  const stepContent = container.querySelector('#step-content');
  expect(stepContent.className).toContain('slide-in-right');
});

it('renders the active second step', () => {
  const p = Object.assign({}, props, { activeStep: 1 });
  const { container } = render(<SimpleStepper {...p} />);

  const stepContent = container.querySelector('#step-content');
  expect(stepContent.textContent).toBe('Second Step');
});

it('renders the second step with a slide right', () => {
  const p = Object.assign({}, props, { activeStep: 1 });
  const { container } = render(<SimpleStepper {...props} />);

  const stepContent = container.querySelector('#step-content');
  expect(stepContent.className).toContain('slide-in-right');
});

it('renders the first step with a slide left', () => {
  const p = Object.assign({}, props, { previousStep: 1, activeStep: 0 });
  const { container } = render(<SimpleStepper {...p} />);

  const stepContent = container.querySelector('#step-content');
  expect(stepContent.className).toContain('slide-in-left');
});

it('renders the next button for the first step and the previous as disabled', () => {
  const { container } = render(<SimpleStepper {...props} />);

  expect(container.querySelector('#button-step-previous')).toHaveAttribute('disabled');
  expect(container.querySelector('#button-step-next')).not.toHaveAttribute('disabled');
  expect(container.querySelector('#button-step-save')).toBeFalsy();
});

it('renders the next button and the preiovus as disabled when isLoading', () => {
  const p = Object.assign({}, props, { isLoading: true });
  const { container } = render(<SimpleStepper {...p} />);

  expect(container.querySelector('#button-step-previous')).toHaveAttribute('disabled');
  expect(container.querySelector('#button-step-next')).toHaveAttribute('disabled');
  expect(container.querySelector('#button-step-save')).toBeFalsy();
});

it('renders the save button for the second step and the previous', () => {
  const p = Object.assign({}, props, { activeStep: 1 });
  const { container } = render(<SimpleStepper {...p} />);

  expect(container.querySelector('#button-step-previous')).not.toHaveAttribute('disabled');
  expect(container.querySelector('#button-step-save')).not.toHaveAttribute('disabled');
  expect(container.querySelector('#button-step-next')).toBeFalsy();
});

it('renders the save button and the previous as disabled when isLoading', () => {
  const p = Object.assign({}, props, { activeStep: 1, isLoading: true });
  const { container } = render(<SimpleStepper {...p} />);

  expect(container.querySelector('#button-step-previous')).toHaveAttribute('disabled');
  expect(container.querySelector('#button-step-save')).toHaveAttribute('disabled');
  expect(container.querySelector('#button-step-next')).toBeFalsy();
});

it('renders the save button if all steps are done', () => {
  const p = Object.assign({}, props, { steps: [new StepData({ label: 'test', isCompleted: true }), new StepData({ label: 'second step', isCompleted: true })] });
  const { container } = render(<SimpleStepper {...p} />);

  expect(container.querySelector('#button-step-previous')).toHaveAttribute('disabled');
  expect(container.querySelector('#button-step-next')).not.toHaveAttribute('disabled');
  expect(container.querySelector('#button-step-save')).not.toHaveAttribute('disabled');
});

it('renders the save button if all steps except summary are done', () => {
  const p = Object.assign({}, props, { steps: [new StepData({ label: 'test', isCompleted: true }), new StepData({ label: 'second step', isCompleted: true }), new StepData({ label: 'summary step', isSummary: true })] });
  const { container } = render(<SimpleStepper {...p} />);

  expect(container.querySelector('#button-step-previous')).toHaveAttribute('disabled');
  expect(container.querySelector('#button-step-next')).not.toHaveAttribute('disabled');
  expect(container.querySelector('#button-step-save')).not.toHaveAttribute('disabled');
});

it('triggers the next event', () => {
  const { container } = render(<SimpleStepper {...props} />);

  fireEvent.click(container.querySelector('#button-step-next'));
  expect(props.next).toHaveBeenCalled();
});

it('triggers the prev event', () => {
  const p = Object.assign({}, props, { activeStep: 1 });
  const { container } = render(<SimpleStepper {...p} />);

  fireEvent.click(container.querySelector('#button-step-previous'));
  expect(props.prev).toHaveBeenCalled();
});

it('triggers the save event', () => {
  const p = Object.assign({}, props, { activeStep: 1 });
  const { container } = render(<SimpleStepper {...p} />);

  fireEvent.click(container.querySelector('#button-step-save'));
  expect(props.save).toHaveBeenCalled();
});