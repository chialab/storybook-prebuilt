import { window, customElements } from '@chialab/dna';
import addons from '../../../../node_modules/@storybook/addons/dist/esm/public_api.js';

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
function vnodeToString(vnode) {
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

    const hyperObject = /** @type {import('@chialab/dna').VObject} */ (vnode);
    const is = (hyperObject.Component && hyperObject.Component.prototype.is) || (hyperObject.node && hyperObject.node.is);
    const tag = hyperObject.tag ||
        (is && customElements.tagNames[is]) ||
        (hyperObject.node && hyperObject.node.tagName) ||
        undefined;
    const properties = hyperObject.properties || {};
    const attrs = Object.keys(properties).map((prop) => {
        if (prop === 'ref') {
            return false;
        }

        let value = properties[prop];
        if (isObject(value)) {
            value = '{...}';
        }
        if (isArray(value)) {
            value = '[...]';
        }
        if (typeof value === 'function') {
            value = value.name || 'function() { ... }';
        }
        if (value == null || value === false) {
            return false;
        }
        if (value === true) {
            return prop;
        }

        return `${prop}="${escapeHtml(`${value}`)}"`;
    }).filter(Boolean).join(' ');

    if (voidElements.indexOf(tag) !== -1) {
        return `<${tag}${attrs ? ` ${attrs}` : ''} />`;
    }

    if (!hyperObject.children || !hyperObject.children.length) {
        return `<${tag}${attrs ? ` ${attrs}` : ''}></${tag}>`;
    }

    const prefix = ''.padStart(4, ' ');
    const childContent = (hyperObject.children || [])
        .reduce((acc, child) => {
            if (typeof child !== 'object' || child instanceof window.Node) {
                child = vnodeToString(child);
            }

            if (typeof child === 'string' &&
                typeof acc[acc.length - 1] === 'string') {
                acc[acc.length - 1] += child;
            } else {
                acc.push(child);
            }

            return acc;
        }, [])
        .map((child) =>
            vnodeToString(child)
                .replace(/\n/g, `\n${prefix}`)
        )
        .join(`\n${prefix}`);
    return `<${tag}${attrs ? ` ${attrs}` : ''}>
${prefix}${childContent}
</${tag}>`;
}

/**
 * @param {import('@storybook/addons').StoryFn} Story
 * @param {import('@storybook/addons').StoryContext} context
 */
export function sourceDecorator(Story, context) {
    const channel = addons.getChannel();
    const vnode = /** @type {import('@chialab/dna').Template} */ (Story());
    const source = vnodeToString(vnode);

    channel.emit('storybook/docs/snippet-rendered', context.id, source);

    const storySource = context.parameters.storySource = context.parameters.storySource || {};
    if (storySource.source === source) {
        return vnode;
    }

    storySource.source = source;
    channel.emit('storyPrepared', {
        id: context.id,
        argTypes: context.argTypes,
        args: context.args,
        initialArgs: context.initialArgs,
        parameters: context.parameters,
    });

    return vnode;
}
