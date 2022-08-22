import { getCustomElements, getMetaData } from '../framework-api.js';

function mapData(data, category) {
    return data && data.filter((item) => !!item).reduce((acc, item) => {
        let item$type, item$type2;

        const type = category === 'properties' ? {
            name: ((item$type = item.type) === null || item$type === void 0 ? void 0 : item$type.text) || item.type,
        } : {
            name: 'void',
        };
        acc[`${category} - ${item.name}`] = {
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

export const extractArgTypesFromElements = (tagName, customElements) => {
    const metaData = getMetaData(tagName, customElements);
    if (!metaData) {
        return;
    }

    const result = {};
    if (metaData.superclass) {
        const mod = customElements.modules?.find((m) =>
            m.declarations?.find((d) => d.kind === 'class' && d.name === metaData.superclass.name)
        );
        const decl = mod?.declarations?.find((d) => d.kind === 'class' && d.name === metaData.superclass.name);
        if (decl?.tagName) {
            const metaData = getMetaData(decl.tagName, customElements);
            Object.assign(
                result,
                mapData(metaData.attributes, 'attributes'),
                mapData(metaData.members.filter((m) => m.kind === 'field' && !m.static), 'properties'),
                mapData(metaData.properties, 'properties'),
                mapData(metaData.events, 'events'),
                mapData(metaData.slots, 'slots'),
                mapData(metaData.cssProperties, 'css custom properties'),
                mapData(metaData.cssParts, 'css shadow parts'),
                mapData(metaData.members.filter((m) => m.kind === 'method' && !m.static), 'methods'),
                mapData(metaData.members.filter((m) => m.kind === 'field' && m.static), 'static properties'),
                mapData(metaData.members.filter((m) => m.kind === 'method' && m.static), 'static methods')
            );
        }
    }
    Object.assign(
        result,
        mapData(metaData.attributes, 'attributes'),
        mapData(metaData.members.filter((m) => m.kind === 'field' && !m.static), 'properties'),
        mapData(metaData.properties, 'properties'),
        mapData(metaData.events, 'events'),
        mapData(metaData.slots, 'slots'),
        mapData(metaData.cssProperties, 'css custom properties'),
        mapData(metaData.cssParts, 'css shadow parts'),
        mapData(metaData.members.filter((m) => m.kind === 'method' && !m.static), 'methods'),
        mapData(metaData.members.filter((m) => m.kind === 'field' && m.static), 'static properties'),
        mapData(metaData.members.filter((m) => m.kind === 'method' && m.static), 'static methods')
    );

    return result;
};

export const extractArgTypes = (tagName) => {
    const cem = getCustomElements();
    return extractArgTypesFromElements(tagName, cem);
};

export const extractComponentDescription = (tagName) => {
    const metaData = getMetaData(tagName, getCustomElements());
    return metaData && metaData.description;
};
