import { merge } from '../../api.js';
import { enhanceArgTypes } from'../../../node_modules/@storybook/docs-tools/dist/esm/index.js';
import { parameters as previewParameters, renderToDOM } from '../../../node_modules/@storybook/html/dist/esm/client/preview/config.js';
import { parameters as docsParameters } from '../../../node_modules/@storybook/addon-docs/dist/esm/preview.js';

export const parameters = merge(previewParameters, docsParameters);
export const argTypesEnhancers = [enhanceArgTypes];
export { renderToDOM };
