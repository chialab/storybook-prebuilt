import { window, customElements } from '@chialab/dna';
import { addons } from '@storybook/addons';

/**
 * @param {*} value
 * @return {boolean}
 */
function isObject(value) {
    if (typeof value === 'object') {
        return true;
    }
    if (typeof value !== 'string') {
        return false;
    }
    value = value.trim();
    if (value[0] !== '{' && value[0] !== '[') {
        return false;
    }
    try {
        return typeof JSON.parse(value) === 'object';
    } catch {
        return false;
    }
}

/**
 * @param {*} value
 * @return {boolean}
 */
function isArray(value) {
    if (Array.isArray(value)) {
        return true;
    }
    if (typeof value !== 'string') {
        return false;
    }
    value = value.trim();
    if (value[0] !== '[') {
        return false;
    }
    try {
        return Array.isArray(JSON.parse(value));
    } catch {
        return false;
    }
}

const voidElements = [
    'area',
    'base',
    'basefont',
    'bgsound',
    'br',
    'col',
    'command',
    'embed',
    'frame',
    'hr',
    'image',
    'img',
    'input',
    'isindex',
    'keygen',
    'link',
    'menuitem',
    'meta',
    'nextid',
    'param',
    'source',
    'track',
    'wbr',
];

function getIndent(level) {
    let result = '', i = level * 4;
    while (i--) {
        result += ' ';
    }

    return result;
}

function format(html) {
    const tokens = html.trim().split(/</);

    let result = '',
        indentLevel = 0;
    for (let i = 0, l = tokens.length; i < l; i++) {
        const parts = tokens[i].split(/>/);
        if (parts.length === 2) {
            if (tokens[i][0] === '/') {
                indentLevel = Math.max(indentLevel - 1, 0);
            }
            result += getIndent(indentLevel);
            if (tokens[i][0] !== '/') {
                indentLevel++;
            }

            if (i > 0) {
                result += '<';
            }

            result += `${parts[0].trim()}>\n`;
            if (parts[1].trim() !== '') {
                result += `${getIndent(indentLevel) + parts[1].trim().replace(/\s+/g, ' ')}\n`;
            }

            if (parts[0].match(new RegExp(`^(${voidElements.join('|')})`))) {
                indentLevel = Math.max(indentLevel - 1, 0);
            }
        } else {
            result += `${getIndent(indentLevel) + parts[0]}\n`;
        }
    }

    return result;
}

/**
 * @param {import('@chialab/dna').Template} vnode
 * @return {string}
 */
function vnodeToNode(vnode) {
    if (typeof vnode !== 'object') {
        return vnode.toString();
    }
    if (Array.isArray(vnode)) {
        return vnode.map(vnodeToNode).join('');
    }
    if (vnode instanceof window.Element) {
        return vnode.outerHTML;
    }
    if (vnode instanceof window.Node) {
        return vnode.textContent;
    }

    const hyperObject = /** @type {any} */ (vnode);
    const is = (hyperObject.Component && hyperObject.Component.prototype.is);
    const tag = hyperObject.tag || (is ? customElements.tagNames[is] : undefined);
    const properties = hyperObject.properties || {};
    const attrs = Object.keys(properties).map((prop) => {
        let value = properties[prop];
        if (isObject(value)) {
            value = '{...}';
        }
        if (isArray(value)) {
            value = '[...]';
        }
        return `${prop}="${value}"`;
    }).join(' ');

    if (voidElements.indexOf(tag) !== -1) {
        return `<${tag}${attrs ? ` ${attrs}` : ''}>`;
    }

    return `<${tag}${attrs ? ` ${attrs}` : ''}>${(hyperObject.children || []).map(vnodeToNode).join('')}</${tag}>`;
}

/**
 * @param {import('@storybook/addons').StoryFn} storyFn
 * @param {import('@storybook/addons').StoryContext} context
 */
export function sourceDecorator(storyFn, context) {
    const vnode = /** @type {import('@chialab/dna').Template} */ (storyFn());
    const source = vnodeToNode(vnode);
    const code = format(source);

    context.parameters.storySource.source = code;

    try {
        /* @ts-ignore */
        addons.getChannel().emit('storybook/docs/snippet-rendered', context.id, code);
    } catch {
        //
    }

    return vnode;
}
