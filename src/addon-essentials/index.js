import { parameters as docsParameters } from '../addon-docs/preview.js';
import { decorators as actionsDecorators } from '../addon-actions/preview.js';
import { parameters as backgroundParameters, decorators as backgroundDecorators } from '../addon-backgrounds/preview.js';
import { decorators as measureDecorators } from '../addon-measure/preview.js';
import { decorators as outlineDecorators } from '../addon-outline/preview.js';
import '../addon-a11y/preview.js';

export const parameters = {
    ...docsParameters,
    ...backgroundParameters,
};

export const decorators = [
    ...actionsDecorators,
    ...backgroundDecorators,
    ...measureDecorators,
    ...outlineDecorators,
];
