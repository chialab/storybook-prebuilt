import { window } from '@chialab/dna';
import { logger } from '@storybook/client-logger';

export function getCustomElements() {
    return window.__STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__;
}

export function setCustomElementsManifest(customElements) {
    window.__STORYBOOK_CUSTOM_ELEMENTS_MANIFEST__ = customElements;
}

export function isValidComponent(tagName) {
    if (!tagName) {
        return false;
    }
    if (typeof tagName === 'string') {
        return true;
    }
    throw new Error('Provided component needs to be a string. e.g. component: "my-element"');
}

export function isValidMetaData(customElements) {
    if (!customElements) {
        return false;
    }

    if (
        (customElements.tags && Array.isArray(customElements.tags)) ||
        (customElements.modules && Array.isArray(customElements.modules))
    ) {
        return true;
    }
    throw new Error(`You need to setup valid meta data in your config.js via setCustomElements().
      See the readme of addon-docs for web components for more details.`);
}

export const getMetaDataExperimental = (tagName, customElements) => {
    if (!isValidComponent(tagName) || !isValidMetaData(customElements)) {
        return null;
    }

    const metaData = customElements.tags.find(tag => tag.name.toUpperCase() === tagName.toUpperCase());

    if (!metaData) {
        logger.warn(`Component not found in custom-elements.json: ${tagName}`);
    }

    return metaData;
};

export const getMetaDataV1 = (tagName, customElements) => {
    let _customElements$modul;

    if (!isValidComponent(tagName) || !isValidMetaData(customElements)) {
        return null;
    }

    let metadata;
    customElements === null || customElements === void 0 ? void 0 : (_customElements$modul = customElements.modules) === null || _customElements$modul === void 0 ? void 0 : _customElements$modul.forEach(_module => {
        let _module$declarations;

        _module === null || _module === void 0 ? void 0 : (_module$declarations = _module.declarations) === null || _module$declarations === void 0 ? void 0 : _module$declarations.forEach(declaration => {
            if (declaration.tagName === tagName) {
                metadata = declaration;
            }
        });
    });

    if (!metadata) {
        logger.warn(`Component not found in custom-elements.json: ${tagName}`);
    }

    return metadata;
};

export const getMetaData = (tagName, manifest) => {
    if (manifest.version === 'experimental') {
        return getMetaDataExperimental(tagName, manifest);
    }

    return getMetaDataV1(tagName, manifest);
};
