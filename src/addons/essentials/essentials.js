import { withActions as actionsDecorator } from '../actions/actions.js';
import { parameters as backgroundParameters, decorators as backgroundDecorators } from '../backgrounds/backgrounds.js';
import { decorators as measureDecorators } from '../measure/measure.js';
import { decorators as outlineDecorators } from '../outline/outline.js';
import '../a11y/a11y.js';

export const parameters = {
    ...backgroundParameters,
};

export const decorators = [
    actionsDecorator,
    ...backgroundDecorators,
    ...measureDecorators,
    ...outlineDecorators,
];
