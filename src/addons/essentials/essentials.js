import { decorators as actionsDecorators } from '@storybook/addon-actions/dist/esm/preset/addDecorator.js';
import { decorators as backgroundDecorators } from '@storybook/addon-backgrounds/dist/esm/preset/addDecorator.js';
import { parameters as backgroundParameters } from '@storybook/addon-backgrounds/dist/esm/preset/addParameter.js';
import { decorators as measureDecorators } from '@storybook/addon-measure/dist/esm/preset/addDecorator.js';
import { decorators as outlineDecorators } from '@storybook/addon-outline/dist/esm/preset/addDecorator.js';
import '@storybook/addon-a11y/dist/esm/a11yRunner.js';
import '@storybook/addon-a11y/dist/esm/a11yHighlight.js';

export const parameters = {
    ...backgroundParameters,
};

export const decorators = [
    ...actionsDecorators,
    ...backgroundDecorators,
    ...measureDecorators,
    ...outlineDecorators,
];
