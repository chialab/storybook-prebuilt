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
                './src/mdx.js',
                './src/core-events.js',
                './src/core-client.js',
                './src/client-logger.js',
                './src/client-api.js',
                './src/api.js',
                './src/addons.js',
                './src/components.js',
                './src/ui.js',
                './src/theming.js',
                './src/manager/manager.js',
                './src/addons/docs/docs.js',
                './src/addons/essentials/essentials.js',
                './src/addons/essentials/essentials.register.js',
                './src/frameworks/web-components/web-components.js',
                './src/frameworks/dna/dna.js',
            ],
            alias: {
                'path': false,
                'core-js': false,
                '@storybook/core/client': '@storybook/core-client',
                'global': resolve(ROOT, './src/global.js'),
                'react': resolve(ROOT, './src/react.js'),
                'react-is': resolve(ROOT, './src/react.js'),
                'react-dom': resolve(ROOT, './src/react.js'),
                '@mdx-js/react': resolve(ROOT, './src/mdx.js'),
                '@storybook/api': resolve(ROOT, './src/api.js'),
                '@storybook/addons': resolve(ROOT, './src/addons.js'),
                '@storybook/core-events': resolve(ROOT, './src/core-events.js'),
                '@storybook/core-client': resolve(ROOT, './src/core-client.js'),
                '@storybook/client-logger': resolve(ROOT, './src/client-logger.js'),
                '@storybook/client-api': resolve(ROOT, './src/client-api.js'),
                '@storybook/components': resolve(ROOT, './src/components.js'),
                '@storybook/ui': resolve(ROOT, './src/ui.js'),
                '@storybook/theming': resolve(ROOT, './src/theming.js'),
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
    sourcemap: false,
};

export default config;
