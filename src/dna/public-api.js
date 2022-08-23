import { start } from '@storybook/core-client';
import { renderToDOM } from './render.js';

const FRAMEWORK = 'dna';

const api = start(renderToDOM);

export const storiesOf = (kind, m) => api.clientApi.storiesOf(kind, m).addParameters({ framework: FRAMEWORK });
export const configure = (...args) => api.configure(FRAMEWORK, ...args);
export const addDecorator = api.clientApi.addDecorator;
export const addParameters = api.clientApi.addParameters;
export const clearDecorators = api.clientApi.clearDecorators;
export const setAddon = api.clientApi.setAddon;
export const forceReRender = api.forceReRender;
export const getStorybook = api.clientApi.getStorybook;
export const raw = api.clientApi.raw;
