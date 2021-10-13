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

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

/**
 * @param {import('@chialab/dna').Template} vnode
 * @return {string}
 */
function vnodeToString(vnode, indent = 0) {
    if (typeof vnode !== 'object') {
        return vnode.toString();
    }
    if (Array.isArray(vnode)) {
        return vnode.map(vnodeToString).join('');
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
        if (value == null) {
            return false;
        }
        if (value === true) {
            return prop;
        }
        return `${prop}="${escapeHtml(`${value}`)}"`;
    }).filter(Boolean).join(' ');

    const prefix = ''.padStart(indent * 4, ' ');
    if (voidElements.indexOf(tag) !== -1) {
        return `${prefix}<${tag}${attrs ? ` ${attrs}` : ''} />`;
    }

    if (!hyperObject.children || !hyperObject.children.length) {
        return `${prefix}<${tag}${attrs ? ` ${attrs}` : ''}></${tag}>`;
    }

    return `${prefix}<${tag}${attrs ? ` ${attrs}` : ''}>
${(hyperObject.children || []).map((child) => vnodeToString(child, indent + 1)).join('\n')}
</${tag}>`;
}

/**
 * @param {import('@storybook/addons').StoryFn} storyFn
 * @param {import('@storybook/addons').StoryContext} context
 */
export function sourceDecorator(storyFn, context) {
    const vnode = /** @type {import('@chialab/dna').Template} */ (storyFn());
    const source = vnodeToString(vnode);

    context.parameters.storySource.source = source;

    try {
        /* @ts-ignore */
        addons.getChannel().emit('storybook/docs/snippet-rendered', context.id, source);
    } catch {
        //
    }

    return vnode;
}
