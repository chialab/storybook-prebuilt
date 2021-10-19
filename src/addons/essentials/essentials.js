import { decorators as actionsDecorators } from '../../../node_modules/@storybook/addon-actions/dist/esm/preset/addDecorator.js';
import { decorators as backgroundDecorators } from '../../../node_modules/@storybook/addon-backgrounds/dist/esm/preset/addDecorator.js';
import { parameters as backgroundParameters } from '../../../node_modules/@storybook/addon-backgrounds/dist/esm/preset/addParameter.js';
import { decorators as measureDecorators } from '../../../node_modules/@storybook/addon-measure/dist/esm/preset/addDecorator.js';
import { decorators as outlineDecorators } from '../../../node_modules/@storybook/addon-outline/dist/esm/preset/addDecorator.js';
import '../../../node_modules/@storybook/addon-a11y/dist/esm/a11yRunner.js';
import '../../../node_modules/@storybook/addon-a11y/dist/esm/a11yHighlight.js';

export const parameters = {
    ...backgroundParameters,
};

export const decorators = [
    ...actionsDecorators,
    ...backgroundDecorators,
    ...measureDecorators,
    ...outlineDecorators,
];
