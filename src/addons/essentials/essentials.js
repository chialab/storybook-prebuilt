import '@storybook/addon-a11y/dist/cjs/a11yRunner.js';
import '@storybook/addon-a11y/dist/cjs/a11yHighlight.js';
import { decorators as actionsDecorators } from '@storybook/addon-actions/dist/cjs/preset/addDecorator.js';
import { decorators as backgroundDecorators } from '@storybook/addon-backgrounds/dist/cjs/preset/addDecorator.js';
import { parameters as backgroundParameters } from '@storybook/addon-backgrounds/dist/cjs/preset/addParameter.js';
import { decorators as measureDecorators } from '@storybook/addon-measure/dist/cjs/preset/addDecorator.js';
import { decorators as outlineDecorators } from '@storybook/addon-outline/dist/cjs/preset/addDecorator.js';

export const parameters = {
    ...backgroundParameters,
};

export const decorators = [
    ...actionsDecorators,
    ...backgroundDecorators,
    ...measureDecorators,
    ...outlineDecorators,
];
