import { merge } from '../../api.js';
import { parameters as previewParameters } from '../../../node_modules/@storybook/web-components/dist/esm/client/preview/config.js';
import { parameters as docsParameters } from '../../../node_modules/@storybook/addon-docs/dist/esm/frameworks/common/config.js';

export { decorators } from '../../../node_modules/@storybook/addon-docs/dist/esm/frameworks/common/config.js';
export * from '../../../node_modules/@storybook/web-components/dist/esm/client/customElements.js';
export const parameters = merge(previewParameters, docsParameters);
