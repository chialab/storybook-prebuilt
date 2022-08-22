import { SourceType, enhanceArgTypes } from '@storybook/docs-tools';
import { extractArgTypes, extractComponentDescription } from './customElements.js';
import { sourceDecorator } from './sourceDecorator.js';
import { prepareForInline } from './prepareForInline.js';

export const argTypesEnhancers = [enhanceArgTypes];
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
