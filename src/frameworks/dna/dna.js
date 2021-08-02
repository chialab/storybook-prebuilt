import * as common from '../common/index.js';
import * as framework from './client.js';
import * as commonConfig from '../../../node_modules/@storybook/addon-docs/dist/esm/frameworks/common/config.js';
import * as wcConfig from './docs/config.js';

export const registerPreviewEntry = common.createRegisterPreviewEntry(framework);
registerPreviewEntry(commonConfig);
registerPreviewEntry(wcConfig);

export * from '../common/index.js';
export * from './client.js';
