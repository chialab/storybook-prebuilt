import { withActions as actionsDecorator } from '../addon-actions/index.js';
import { parameters as backgroundParameters, decorators as backgroundDecorators } from '../addon-backgrounds/index.js';
import { decorators as measureDecorators } from '../addon-measure/index.js';
import { decorators as outlineDecorators } from '../addon-outline/index.js';
import '../addon-a11y/index.js';

export const parameters = {
    ...backgroundParameters,
};

export const decorators = [
    actionsDecorator,
    ...backgroundDecorators,
    ...measureDecorators,
    ...outlineDecorators,
];
