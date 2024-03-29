import { window, customElements } from '@chialab/dna';
import { SNIPPET_RENDERED } from '@storybook/docs-tools';
import { addons, useEffect } from '@storybook/addons';
import { STORY_PREPARED } from '@storybook/core-events';

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
        return vnode.map(vnodeToString).join('\n');
    }
    if (vnode instanceof window.Element) {
        return vnode.outerHTML;
    }
    if (vnode instanceof window.Node) {
        return vnode.textContent;
    }

    const hyperObject = /** @type {import('@chialab/dna').VObject} */ (vnode);

    const is = (typeof hyperObject.type === 'function' && hyperObject.type.prototype.is) ||
        (hyperObject.type instanceof window.Node && hyperObject.type.is) ||
        undefined;
    const tag = (typeof hyperObject.type === 'string' && hyperObject.type) ||
        (is && customElements.tagNames[is]) ||
        (hyperObject.type instanceof window.Node && hyperObject.type.tagName) ||
        undefined;
    let properties = hyperObject.properties || {};
    if (is && tag && is.toLowerCase() !== tag.toLowerCase()) {
        properties = { is, ...properties };
    }

    const attrs = Object.keys(properties).map((prop) => {
        if (prop === 'is' && is) {
            return `is="${is}"`;
        }
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

    if (typeof hyperObject.type === 'function' && !is) {
        return `<${hyperObject.type.name}${attrs ? ` ${attrs}` : ''} />`;
    }

    if (voidElements.indexOf(tag) !== -1) {
        return `<${tag}${attrs ? ` ${attrs}` : ''} />`;
    }

    if (!hyperObject.children || !hyperObject.children.length) {
        return `<${tag}${attrs ? ` ${attrs}` : ''}></${tag}>`;
    }

    let hasNodes = false;
    const prefix = ''.padStart(4, ' ');
    const childContents = (hyperObject.children || [])
        .reduce((acc, child) => {
            if (typeof child !== 'object') {
                child = vnodeToString(child);
            } else if (child instanceof window.Node) {
                hasNodes = true;
                child = vnodeToString(child);
            } else {
                hasNodes = true;
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
            vnodeToString(child).replace(/\n/g, `\n${prefix}`)
        );

    let childContentsHtml = '';
    if (childContents.length === 1 && !hasNodes) {
        childContentsHtml = childContents[0];
    } else if (childContents.length) {
        childContentsHtml = `\n${prefix}${childContents.join(`\n${prefix}`)}\n`;
    }

    return `<${tag}${attrs ? ` ${attrs}` : ''}>${childContentsHtml}</${tag}>`;
}

/**
 * @param {import('@storybook/addons').StoryFn} Story
 * @param {import('@storybook/addons').StoryContext} context
 */
export function sourceDecorator(Story, context) {
    const channel = addons.getChannel();
    const vnode = /** @type {import('@chialab/dna').Template} */ (Story());
    const source = (() => {
        try {
            return vnodeToString(vnode);
        } catch {
            return '';
        }
    })();

    useEffect(() => {
        channel.emit(SNIPPET_RENDERED, context.id, source);
    });

    const storySource = context.parameters.storySource = context.parameters.storySource || {};
    const currentSource = storySource.source;
    storySource.source = source;

    if (currentSource === source) {
        return vnode;
    }

    channel.emit(STORY_PREPARED, {
        id: context.id,
        argTypes: context.argTypes,
        args: context.args,
        initialArgs: context.initialArgs,
        parameters: context.parameters,
    });

    return vnode;
}
