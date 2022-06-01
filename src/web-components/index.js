import { merge } from '../api/index.js';
import { enhanceArgTypes } from'../../node_modules/@storybook/docs-tools/dist/esm/index.js';
import { parameters as previewParameters, renderToDOM } from '../../node_modules/@storybook/web-components/dist/esm/client/preview/config.js';
import { parameters as docsParameters } from '../../node_modules/@storybook/addon-docs/dist/esm/preview.js';

export * from '../../node_modules/@storybook/web-components/dist/esm/client/customElements.js';
export const parameters = merge(previewParameters, docsParameters);
export const argTypesEnhancers = [enhanceArgTypes];
export { renderToDOM };
