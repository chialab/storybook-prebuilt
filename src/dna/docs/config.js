import { extractArgTypes, extractComponentDescription } from './customElements.js';
import { sourceDecorator } from './sourceDecorator.js';
import { prepareForInline } from './prepareForInline.js';
import { SourceType } from '../../../node_modules/@storybook/docs-tools/dist/esm/index.js';

export const decorators = [sourceDecorator];
export const parameters = {
    docs: {
        extractArgTypes,
        extractComponentDescription,
        inlineStories: true,
        prepareForInline,
        source: {
            type: SourceType.DYNAMIC,
            language: 'html',
        },
    },
};
