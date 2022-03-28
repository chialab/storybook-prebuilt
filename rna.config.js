/* eslint-env node */

import { dirname, resolve } from 'path';

process.env.NODE_ENV = 'production';

const ROOT = dirname(import.meta.url.replace('file://', ''));

/**
 * @type {import('@chialab/rna-config-loader').Config}
 */
const config = {
    root: ROOT,
    entrypoints: [
        {
            input: [
                './src/react.js',
                './src/jsx-runtime.js',
                './src/react-dom.js',
                './src/react-is.js',
                './src/mdx.js',
                './src/channel-postmessage.js',
                './src/core-events.js',
                './src/core-client.js',
                './src/client-logger.js',
                './src/client-api.js',
                './src/api.js',
                './src/channels.js',
                './src/csf.js',
                './src/docs-tools.js',
                './src/addons.js',
                './src/components.js',
                './src/ui.js',
                './src/preview-web.js',
                './src/router.js',
                './src/semver.js',
                './src/store.js',
                './src/theming.js',
                './src/manager/manager.js',
                './src/addons/docs/docs.js',
                './src/addons/essentials/essentials.js',
                './src/addons/essentials/essentials.register.js',
                './src/addons/storysource/storysource.register.js',
                './src/addons/storybook-design-token/storybook-design-token.js',
                './src/addons/storybook-design-token/storybook-design-token.register.js',
                './src/frameworks/web-components/web-components.js',
                './src/frameworks/dna/dna.js',
            ],
            alias: {
                'fs': false,
                'path': false,
                'core-js': false,
                'crypto': false,
                'global': resolve(ROOT, './src/global.js'),
                'react': resolve(ROOT, './src/react.js'),
                'react/jsx-runtime': resolve(ROOT, './src/jsx-runtime.js'),
                'react-is': resolve(ROOT, './src/react-is.js'),
                'react-dom': resolve(ROOT, './src/react-dom.js'),
                'react-sizeme': resolve(ROOT, './src/react-sizeme.js'),
                '@mdx-js/react': resolve(ROOT, './src/mdx.js'),
                '@storybook/api': resolve(ROOT, './src/api.js'),
                '@storybook/api/shortcut': resolve(ROOT, './src/api.shortcut.js'),
                '@storybook/csf': resolve(ROOT, './src/csf.js'),
                '@storybook/addons': resolve(ROOT, './src/addons.js'),
                '@storybook/channels': resolve(ROOT, './src/channels.js'),
                '@storybook/channel-postmessage': resolve(ROOT, './src/channel-postmessage.js'),
                '@storybook/core-events': resolve(ROOT, './src/core-events.js'),
                '@storybook/core/client': resolve(ROOT, './src/core-client.js'),
                '@storybook/client-logger': resolve(ROOT, './src/client-logger.js'),
                '@storybook/client-api': resolve(ROOT, './src/client-api.js'),
                '@storybook/docs-tools': resolve(ROOT, './src/docs-tools.js'),
                '@storybook/preview-web': resolve(ROOT, './src/preview-web.js'),
                '@storybook/components': resolve(ROOT, './src/components.js'),
                '@storybook/ui': resolve(ROOT, './src/ui.js'),
                '@storybook/router': resolve(ROOT, './src/router.js'),
                '@storybook/semver': resolve(ROOT, './src/semver.js'),
                '@storybook/store': resolve(ROOT, './src/store.js'),
                '@storybook/theming': resolve(ROOT, './src/theming.js'),
                '@storybook/addon-docs/blocks': resolve(ROOT, './src/addons/docs/docs.js'),
                '@storybook/addon-docs': resolve(ROOT, './src/addons/docs/docs.js'),
                '@storybook/web-components': resolve(ROOT, './src/frameworks/web-components/web-components.js'),
            },
            external: [
                'lit-html',
                '@chialab/dna',
            ],
            output: './dist/',
        },
    ],
    clean: true,
    format: 'esm',
    platform: 'browser',
    chunkNames: '[hash]',
    bundle: true,
    minify: true,
    sourcemap: true,
};

export default config;
