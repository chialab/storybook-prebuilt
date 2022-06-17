import { enhanceArgTypes } from'../../node_modules/@storybook/docs-tools/dist/esm/index.js';
import { merge } from '../../node_modules/@storybook/api/dist/esm/index.js';
import { parameters as docsCommonParameters } from '../../node_modules/@storybook/addon-docs/dist/esm/preview.js';
import { parameters as docsParameters } from './docs/config.js';
import { parameters as frameworkParameters, renderToDOM } from './preview/config.js';

export * from '../../node_modules/@storybook/web-components/dist/esm/client/customElements.js';
export { decorators } from './docs/config.js';
export const parameters = merge(merge(merge({
    framework: 'web-components'
}, docsCommonParameters), docsParameters), frameworkParameters);
export const argTypesEnhancers = [enhanceArgTypes];
export { renderToDOM };
