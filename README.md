# Storbyook Prebuilt

## Why

[Storybook](https://storybook.js.org/) is a fantastic tool used by thousand of developers. The project is composed by a lot of modules and it covers all the developer experience, from the webpack-based bundler setup to visual debugging helpers. In order to mantein both its stability and flexibility, the growth of complexity was inevitable. This reflects to large `node_modules` folders and long CI build times.

The scope of this project is to provide a not-so-opinioneted build of the Storybook manager (its client part and common addons) in order to simplify the dependencies tree and to allow developers to use tools such as [esbuild](https://esbuild.github.io/) to serve and bundle theirs stories.

## How it works

Core and addon Storybook modules are downloaded as dev dependencies, bundled, optimized and redistribuited as single package.

The setup is based on [RNA](https://github.com/chialab/rna), a toolchain based on esbuild and Web Dev Server. The build uses multiple entrypoints and code splitting, so each module of the bundle has its own entrypoint that shares common chunks with the others. Preserving single entrypoints enables the interoperability with other addons that the developer may want to install and use in their instance. For example, Storybook modules can be aliased to their bundled version:

```json
{
    "@storybook/addons": "@chialab/storybook-prebuilt/addons",
    "@storybook/api": "@chialab/storybook-prebuilt/api",
    "@storybook/client-api": "@chialab/storybook-prebuilt/client-api",
    "@storybook/client-logger": "@chialab/storybook-prebuilt/client-logger",
    "@storybook/components": "@chialab/storybook-prebuilt/components",
    "@storybook/core-client": "@chialab/storybook-prebuilt/core-client",
    "@storybook/core-events": "@chialab/storybook-prebuilt/core-events",
    "@storybook/mdx": "@chialab/storybook-prebuilt/mdx",
    "@storybook/react": "@chialab/storybook-prebuilt/react",
    "@storybook/theming": "@chialab/storybook-prebuilt/theming",
    "@storybook/ui": "@chialab/storybook-prebuilt/ui",
    "@storybook/preview-web": "@chialab/storybook-prebuilt/preview-web",
    "@storybook/docs": "@chialab/storybook-prebuilt/docs",
    "@storybook/addon-a11y": "@chialab/storybook-prebuilt/addon-a11y",
    "@storybook/addon-a11y/preview": "@chialab/storybook-prebuilt/addon-a11y/preview",
    "@storybook/addon-a11y/manager": "@chialab/storybook-prebuilt/addon-a11y/manager",
    "@storybook/addon-actions": "@chialab/storybook-prebuilt/addon-actions",
    "@storybook/addon-actions/preview": "@chialab/storybook-prebuilt/addon-actions/preview",
    "@storybook/addon-backgrounds": "@chialab/storybook-prebuilt/addon-backgrounds",
    "@storybook/addon-backgrounds/preview": "@chialab/storybook-prebuilt/addon-backgrounds/preview",
    "@storybook/addon-backgrounds/manager": "@chialab/storybook-prebuilt/addon-backgrounds/manager",
    "@storybook/addon-controls": "@chialab/storybook-prebuilt/addon-controls",
    "@storybook/addon-controls/manager": "@chialab/storybook-prebuilt/addon-controls/manager",
    "@storybook/addon-measure": "@chialab/storybook-prebuilt/addon-measure",
    "@storybook/addon-measure/preview": "@chialab/storybook-prebuilt/addon-measure/preview",
    "@storybook/addon-measure/manager": "@chialab/storybook-prebuilt/addon-measure/manager",
    "@storybook/addon-outline": "@chialab/storybook-prebuilt/addon-outline",
    "@storybook/addon-outline/preview": "@chialab/storybook-prebuilt/addon-outline/preview",
    "@storybook/addon-outline/manager": "@chialab/storybook-prebuilt/addon-outline/manager",
    "@storybook/addon-toolbars/manager": "@chialab/storybook-prebuilt/addon-toolbars/manager",
    "@storybook/addon-viewport/manager": "@chialab/storybook-prebuilt/addon-viewport/manager",
    "@storybook/addon-links": "@chialab/storybook-prebuilt/addon-links",
    "@storybook/addon-links/react": "@chialab/storybook-prebuilt/addon-links/react",
    "@storybook/addon-links/preview": "@chialab/storybook-prebuilt/addon-links/preview",
    "@storybook/addon-links/manager": "@chialab/storybook-prebuilt/addon-links/manager",
    "@storybook/addon-storysource": "@chialab/storybook-prebuilt/addon-storysource",
    "@storybook/addon-storysource/manager": "@chialab/storybook-prebuilt/addon-storysource/manager",
    "@storybook/essentials": "@chialab/storybook-prebuilt/addon-essentials",
    "@storybook/essentials/manager": "@chialab/storybook-prebuilt/addon-essentials/manager",
    "@storybook/html": "@chialab/storybook-prebuilt/html",
    "@storybook/html/preview": "@chialab/storybook-prebuilt/html/preview",
    "@storybook/web-components": "@chialab/storybook-prebuilt/web-components",
    "@storybook/web-components/preview": "@chialab/storybook-prebuilt/web-components/preview"
}
```

Since each entrypoint exposes the original module interface, third party addons can still access all Storybook apis.

## Available modules

* Manager with Docs addon
* Essentials addons
* Storysource addons
* Links addons
* Html framework
* Web Components framework
* DNA framework

## Usage

First of all, you need to install the package:

```sh
$ npm i -D @chialab/storybook-prebuilt
$ yarn add -D @chialab/storybook-prebuilt
```

Then, you can create the two entrypoints of the Storybook:

**manager.js**
```js
import '@chialab/storybook-prebuilt/manager';
import 'path/to/my/addon/register.js';
```

**preview.js**
```js
import { configure, registerPreviewEntry } from '@chialab/storybook-prebuilt/web-components';
import * as addon from 'path/to/my/addon/config.js';
import * as story1 from 'path/to/my/story.js';

registerPreviewEntry(addon);
setTimeout(() => {
    configure(() => [story1], {}, false);
});
```

## Development

Steps to follow to release a new build:

* Install dependencies:

    ```sh
    $ yarn
    ```

* Update Storybook packages:

    ```sh
    $ yarn update
    ```

* Build packages:

    ```sh
    $ yarn build
    ```

* Update package.json version using the same version of Storybook core modules.

* Publish to NPM

---

## License

Storybook Prebuilt is released under the [MIT](https://github.com/chialab/storybook-prebuilt/blob/main/LICENSE) license.
