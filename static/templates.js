import { readFile } from 'fs/promises';
import _ from 'lodash';

async function read(filePath) {
    const url = new URL(`./${filePath}`, import.meta.url);
    return readFile(url, 'utf-8');
}

async function template(filePath, data) {
    const content = await read(filePath);
    return _.template(content)(data);
}

export const indexHtml = (data) => template('index.html', data);
export const iframeHtml = (data) => template('iframe.html', data);
export const managerCss = () => read('manager.css');
export const previewCss = () => read('preview.css');

