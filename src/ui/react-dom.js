import global from 'global';

const ReactDOM = global.__REACTDOM__.default;

export const {
    createPortal,
    findDOMNode,
    flushSync,
    hydrate,
    render,
    unmountComponentAtNode,
    unstable_batchedUpdates,
    unstable_createPortal,
    unstable_renderSubtreeIntoContainer,
    version,
} = ReactDOM;
export default ReactDOM;
