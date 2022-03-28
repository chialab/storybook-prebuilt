import { merge } from '../../api.js';
import { enhanceArgTypes } from'../../../node_modules/@storybook/docs-tools/dist/esm/index.js';
import { parameters as previewParameters } from '../../../node_modules/@storybook/web-components/dist/esm/client/preview/config.js';
import { parameters as docsParameters } from '../../../node_modules/@storybook/addon-docs/dist/esm/frameworks/common/config.js';

export * from '../../../node_modules/@storybook/web-components/dist/esm/client/customElements.js';
export const parameters = merge(previewParameters, docsParameters);
export const argTypesEnhancers = [enhanceArgTypes];
