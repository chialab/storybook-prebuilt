import { merge } from '../../../node_modules/@storybook/api/dist/esm/index.js';
import { parameters as docsCommonParameters, argTypesEnhancers as docsArgTypesEnhancers } from '../../../node_modules/@storybook/addon-docs/dist/esm/frameworks/common/config.js';
import { decorators as docsDecorators, parameters as docsParameters } from './docs/config.js';
import { parameters as frameworkParameters, renderToDOM } from './preview/config.js';

export * from '../../../node_modules/@storybook/web-components/dist/esm/client/preview/config.js';
export * from '../../../node_modules/@storybook/web-components/dist/esm/client/customElements.js';
export const parameters = merge(docsCommonParameters, docsParameters, frameworkParameters);
export const argTypesEnhancers = [
    ...docsArgTypesEnhancers,
];
export const decorators = [
    ...docsDecorators,
];
export { renderToDOM };
