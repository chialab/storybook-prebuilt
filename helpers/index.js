import path from 'path';
import { mkdir, readFile, writeFile } from 'fs/promises';
import glob from 'fast-glob';

/**
 * @param {string} root
 * @param {string|string[]} cssFiles
 */
export async function createDesignTokens(root, cssFiles) {
    const patterns = Array.isArray(cssFiles) ? cssFiles : [cssFiles];
    const designTokensConfig = {
        files: (await Promise.all(
            patterns
                .map((pattern) =>
                    glob(pattern).then((files) =>
                        Promise.all(
                            files.map((async (filename) => ({
                                filename: path.relative(root, filename),
                                content: (await readFile(filename, 'utf-8'))
                                    .replace(/\\/g, '\\\\')
                                    .replace(/\n/g, '\\n'),
                            })))
                        )
                    )
                )
        )).flat(),
        options: {
            hideMatchingHardCodedValues: true,
        },
    };

    return designTokensConfig;
}

/**
 * @param {string} root
 * @param {string[]} cssFiles
 */
export async function createDesignTokensEntry(root, cssFiles) {
    const designTokensConfig = await createDesignTokens(root, cssFiles);
    const content = JSON.stringify(designTokensConfig)
        .replace(/"/g, '\\"')
        .replace(/'/g, '\\\'');

    return `export const parameters = { designToken: JSON.parse('${content}'), };`;
}

/**
 * @param {string} root
 * @param {string[]} cssFiles
 */
export async function createDesignTokensFile(root, cssFiles) {
    const content = await createDesignTokensEntry(root, cssFiles);
    const file = path.resolve(root, './node_modules/.cache/@chialab/storybook-prebuilt/design-tokens.js');
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, content);

    return file;
}

/**
 * Generate a map of modules available in their prebuilt version.
 * @param {string} type
 */
export function createBuildMap(type) {
    const modules = {
        'react': '@chialab/storybook-prebuilt/react',
        'react-dom': '@chialab/storybook-prebuilt/react',
        'react-is': '@chialab/storybook-prebuilt/react',
        '@mdx-js/react': '@chialab/storybook-prebuilt/mdx',
        '@storybook/manager': '@chialab/storybook-prebuilt/manager',
        [`@storybook/${type}`]: `@chialab/storybook-prebuilt/${type}`,
        [`@storybook/${type}/preset.js`]: `@chialab/storybook-prebuilt/${type}/preset.js`,
        '@storybook/api': '@chialab/storybook-prebuilt/api',
        '@storybook/addons': '@chialab/storybook-prebuilt/addons',
        '@storybook/channel-postmessage': '@chialab/storybook-prebuilt/channel-postmessage',
        '@storybook/client-api': '@chialab/storybook-prebuilt/client-api',
        '@storybook/client-logger': '@chialab/storybook-prebuilt/client-logger',
        '@storybook/core-events': '@chialab/storybook-prebuilt/core-events',
        '@storybook/preview-web': '@chialab/storybook-prebuilt/preview-web',
        '@storybook/components': '@chialab/storybook-prebuilt/components',
        '@storybook/theming': '@chialab/storybook-prebuilt/theming',
        '@storybook/addon-docs': '@chialab/storybook-prebuilt/docs',
        '@storybook/addon-docs/blocks': '@chialab/storybook-prebuilt/docs',
        '@storybook/addon-essentials/register': '@chialab/storybook-prebuilt/essentials/register',
        '@storybook/addon-essentials': '@chialab/storybook-prebuilt/essentials',
        'storybook-design-token': '@chialab/storybook-prebuilt/storybook-design-token',
        'storybook-design-token/dist/doc-blocks.js': '@chialab/storybook-prebuilt/storybook-design-token',
        'storybook-design-token/register': '@chialab/storybook-prebuilt/storybook-design-token/register',
    };

    const resolutions = [];
    if (type === 'web-components') {
        resolutions.push('lit-html');
    }
    if (type === 'dna') {
        resolutions.push('lit-html', '@chialab/dna');
    }

    return {
        manager: '@storybook/manager',
        modules,
        resolutions,
    };
}
