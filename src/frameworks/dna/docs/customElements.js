import { getCustomElements, isValidComponent, isValidMetaData } from '../../../../node_modules/@storybook/web-components/dist/esm/client/customElements.js';
import { logger } from '../../../client-logger.js';

function mapData(data, category) {
    return data && data.filter((item) => !!item).reduce((acc, item) => {
        let item$type, item$type2;

        const type = category === 'properties' ? {
            name: ((item$type = item.type) === null || item$type === void 0 ? void 0 : item$type.text) || item.type,
        } : {
            name: 'void',
        };
        acc[item.name] = {
            name: item.name,
            required: false,
            description: item.description,
            type,
            table: {
                category,
                type: {
                    summary: ((item$type2 = item.type) === null || item$type2 === void 0 ? void 0 : item$type2.text) || item.type,
                },
                defaultValue: {
                    summary: item.default !== undefined ? item.default : item.defaultValue,
                },
            },
        };
        return acc;
    }, {});
}

const getMetaDataExperimental = (tagName, customElements) => {
    if (!isValidComponent(tagName) || !isValidMetaData(customElements)) {
        return null;
    }

    const metaData = customElements.tags.find(tag => tag.name.toUpperCase() === tagName.toUpperCase());

    if (!metaData) {
        logger.warn(`Component not found in custom-elements.json: ${tagName}`);
    }

    return metaData;
};

const getMetaDataV1 = (tagName, customElements) => {
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

export const extractArgTypesFromElements = (tagName, customElements) => {
    const metaData = getMetaData(tagName, customElements);
    return metaData && Object.assign({}, mapData(metaData.attributes, 'attributes'), mapData(metaData.members, 'properties'), mapData(metaData.properties, 'properties'), mapData(metaData.events, 'events'), mapData(metaData.slots, 'slots'), mapData(metaData.cssProperties, 'css custom properties'), mapData(metaData.cssParts, 'css shadow parts'));
};

const getMetaData = (tagName, manifest) => {
    if (manifest.version === 'experimental') {
        return getMetaDataExperimental(tagName, manifest);
    }

    return getMetaDataV1(tagName, manifest);
};

export const extractArgTypes = (tagName) => {
    const cem = getCustomElements();
    return extractArgTypesFromElements(tagName, cem);
};

export const extractComponentDescription = (tagName) => {
    const metaData = getMetaData(tagName, getCustomElements());
    return metaData && metaData.description;
};
