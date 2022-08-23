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
                './src/global/index.js',
                './src/react/index.js',
                './src/react/jsx-runtime.js',
                './src/react-dom/index.js',
                './src/react-is/index.js',
                './src/mdx-js/react.js',
                './src/channel-postmessage/index.js',
                './src/core-events/index.js',
                './src/core-client/index.js',
                './src/client-logger/index.js',
                './src/client-api/index.js',
                './src/api/index.js',
                './src/channels/index.js',
                './src/csf/index.js',
                './src/docs-tools/index.js',
                './src/addons/index.js',
                './src/components/index.js',
                './src/ui/index.js',
                './src/ui/runtime.js',
                './src/preview-web/index.js',
                './src/router/index.js',
                './src/semver/index.js',
                './src/store/index.js',
                './src/theming/index.js',
                './src/addon-docs/index.js',
                './src/addon-docs/preview.js',
                './src/addon-a11y/index.js',
                './src/addon-a11y/preview.js',
                './src/addon-actions/index.js',
                './src/addon-actions/preview.js',
                './src/addon-backgrounds/index.js',
                './src/addon-backgrounds/preview.js',
                './src/addon-controls/index.js',
                './src/addon-measure/index.js',
                './src/addon-measure/preview.js',
                './src/addon-outline/index.js',
                './src/addon-outline/preview.js',
                './src/addon-links/index.js',
                './src/addon-links/preview.js',
                './src/addon-links/react.js',
                './src/addon-storysource/index.js',
                './src/addon-essentials/index.js',
                './src/web-components/index.js',
                './src/web-components/preview.js',
                './src/html/index.js',
                './src/html/preview.js',
                './src/dna/index.js',
                './src/dna/preview.js',
            ],
            alias: {
                'fs': false,
                'path': false,
                'core-js': false,
                'crypto': false,
                'assert': false,
                'global': resolve(ROOT, './src/global/index.js'),
                'react': resolve(ROOT, './src/react/index.js'),
                'react/jsx-runtime': resolve(ROOT, './src/react/jsx-runtime.js'),
                'react-is': resolve(ROOT, './src/react-is/index.js'),
                'react-dom': resolve(ROOT, './src/react-dom/index.js'),
                '@mdx-js/react': resolve(ROOT, './src/mdx-js/react.js'),
                '@storybook/api': resolve(ROOT, './src/api/index.js'),
                '@storybook/api/shortcut': resolve(ROOT, './src/api/shortcut.js'),
                '@storybook/csf': resolve(ROOT, './src/csf/index.js'),
                '@storybook/addons': resolve(ROOT, './src/addons/index.js'),
                '@storybook/channels': resolve(ROOT, './src/channels/index.js'),
                '@storybook/channel-postmessage': resolve(ROOT, './src/channel-postmessage/index.js'),
                '@storybook/core-events': resolve(ROOT, './src/core-events/index.js'),
                '@storybook/core/client': resolve(ROOT, './src/core-client/index.js'),
                '@storybook/client-logger': resolve(ROOT, './src/client-logger/index.js'),
                '@storybook/client-api': resolve(ROOT, './src/client-api/index.js'),
                '@storybook/docs-tools': resolve(ROOT, './src/docs-tools/index.js'),
                '@storybook/preview-web': resolve(ROOT, './src/preview-web/index.js'),
                '@storybook/components': resolve(ROOT, './src/components/index.js'),
                '@storybook/ui': resolve(ROOT, './src/ui/index.js'),
                '@storybook/router': resolve(ROOT, './src/router/index.js'),
                '@storybook/semver': resolve(ROOT, './src/semver/index.js'),
                '@storybook/store': resolve(ROOT, './src/store/index.js'),
                '@storybook/theming': resolve(ROOT, './src/theming/index.js'),
                '@storybook/addon-docs/blocks': resolve(ROOT, './src/addon-docs/index.js'),
                '@storybook/addon-docs': resolve(ROOT, './src/addon-docs/index.js'),
                '@storybook/addon-a11y': resolve(ROOT, './src/addon-a11y/index.js'),
                '@storybook/addon-actions': resolve(ROOT, './src/addon-actions/index.js'),
                '@storybook/addon-backgrounds': resolve(ROOT, './src/addon-backgrounds/index.js'),
                '@storybook/addon-links': resolve(ROOT, './src/addon-links/index.js'),
                '@storybook/addon-links/react': resolve(ROOT, './src/addon-links/react.js'),
                '@storybook/addon-measure': resolve(ROOT, './src/addon-measure/index.js'),
                '@storybook/addon-outline': resolve(ROOT, './src/addon-outline/index.js'),
                '@storybook/addon-essentials': resolve(ROOT, './src/addon-essentials/index.js'),
                '@storybook/web-components': resolve(ROOT, './src/web-components/index.js'),
                '@storybook/html': resolve(ROOT, './src/html/index.js'),
            },
            external: [
                'lit-html',
                '@chialab/dna',
            ],
            output: './dist/',
        },
        {
            input: [
                './src/addon-a11y/manager.js',
                './src/addon-backgrounds/manager.js',
                './src/addon-controls/manager.js',
                './src/addon-measure/manager.js',
                './src/addon-outline/manager.js',
                './src/addon-toolbars/manager.js',
                './src/addon-viewport/manager.js',
                './src/addon-links/manager.js',
                './src/addon-storysource/manager.js',
                './src/addon-essentials/manager.js',
            ],
            alias: {
                'fs': false,
                'path': false,
                'core-js': false,
                'crypto': false,
                'assert': false,
                'global': resolve(ROOT, './src/global/index.js'),
                'react-sizeme': resolve(ROOT, './src/react-sizeme/index.js'),
            },
            output: './dist/',
            external: [
                'react',
                'react-dom',
                '@storybook/api',
                '@storybook/addons',
                '@storybook/channels',
                '@storybook/client-logger',
                '@storybook/components',
                '@storybook/core-events',
                '@storybook/router',
                '@storybook/theming',
            ],
        },
    ],
    clean: true,
    format: 'esm',
    platform: 'browser',
    entryNames: '[dir]/[name]',
    chunkNames: '[hash]',
    bundle: true,
    minify: false,
    sourcemap: true,
};

export default config;
