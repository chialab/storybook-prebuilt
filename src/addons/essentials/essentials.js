import { withActions as actionsDecorator } from '../../../node_modules/@storybook/addon-actions/dist/esm/preview/index.js';
import { parameters as backgroundParameters, decorators as backgroundDecorators } from '../../../node_modules/@storybook/addon-backgrounds/dist/esm/preview.js';
import { decorators as measureDecorators } from '../../../node_modules/@storybook/addon-measure/dist/esm/preview.js';
import { decorators as outlineDecorators } from '../../../node_modules/@storybook/addon-outline/dist/esm/preset/preview.js';
import '../../../node_modules/@storybook/addon-a11y/dist/esm/a11yRunner.js';
import '../../../node_modules/@storybook/addon-a11y/dist/esm/a11yHighlight.js';

export const parameters = {
    ...backgroundParameters,
};

export const decorators = [
    actionsDecorator,
    ...backgroundDecorators,
    ...measureDecorators,
    ...outlineDecorators,
];
