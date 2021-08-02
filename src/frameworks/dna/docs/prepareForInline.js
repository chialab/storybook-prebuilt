import React from 'react';
import { render } from '@chialab/dna';

export const prepareForInline = (storyFn) => {
    class Story extends React.Component {
        constructor(...args) {
            super(...args);
            this.wrapperRef = React.createRef();
        }

        componentDidMount() {
            render(storyFn(), this.wrapperRef.current);
        }

        render() {
            return React.createElement('div', {
                ref: this.wrapperRef,
            });
        }
    }

    return React.createElement(Story);
};
