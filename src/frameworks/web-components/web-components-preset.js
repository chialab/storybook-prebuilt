import { merge } from '../../../node_modules/@storybook/api';
import { parameters as docsCommonParameters, argTypesEnhancers as docsArgTypesEnhancers } from '../../../node_modules/@storybook/addon-docs/dist/esm/frameworks/common/config.js';
import { decorators as docsDecorators, parameters as docsParameters } from '../../../node_modules/@storybook/addon-docs/dist/esm/frameworks/web-components/config.js';

export const parameters = merge(docsCommonParameters, docsParameters);

export const argTypesEnhancers = [
    ...docsArgTypesEnhancers,
];

export const decorators = [
    ...docsDecorators,
];
