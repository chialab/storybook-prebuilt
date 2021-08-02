import * as common from '../common/index.js';
import * as framework from '../../../node_modules/@storybook/web-components/dist/esm/client/index.js';
import * as commonConfig from '../../../node_modules/@storybook/addon-docs/dist/esm/frameworks/common/config.js';
import * as wcConfig from '../../../node_modules/@storybook/addon-docs/dist/esm/frameworks/web-components/config.js';

export const registerPreviewEntry = common.createRegisterPreviewEntry(framework);
registerPreviewEntry(commonConfig);
registerPreviewEntry(wcConfig);

export * from '../common/index.js';
export * from '../../../node_modules/@storybook/web-components/dist/esm/client/index.js';
