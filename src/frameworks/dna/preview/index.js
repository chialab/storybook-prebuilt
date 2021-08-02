import global from 'global';
import { start } from '@storybook/core-client';
import render from './render.js';

const { window: globalWindow } = global;
const framework = globalWindow.STORYBOOK_ENV = 'dna';
const api = start(render);

export const storiesOf = (kind, m) => api.clientApi.storiesOf(kind, m).addParameters({
    framework,
});

export const configure = (...args) => api.configure(framework, ...args);
export const addDecorator = api.clientApi.addDecorator;
export const addParameters = api.clientApi.addParameters;
export const clearDecorators = api.clientApi.clearDecorators;
export const setAddon = api.clientApi.setAddon;
export const forceReRender = api.forceReRender;
export const getStorybook = api.clientApi.getStorybook;
export const raw = api.clientApi.raw;
