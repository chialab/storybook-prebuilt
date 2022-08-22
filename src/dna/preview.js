import { parameters as docsParameters, decorators, argTypesEnhancers } from './docs/config.js';

export { renderToDOM } from './render.js';
export { decorators, argTypesEnhancers };
export const parameters = { framework: 'dna', ...docsParameters };
