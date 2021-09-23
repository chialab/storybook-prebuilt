import global from 'global';
import { html, customElements, DOM, render } from '@chialab/dna';
import { simulatePageLoad, simulateDOMContentLoaded } from '@storybook/preview-web';

const { document, Node } = global;
const rootElement = document.getElementById('root');

export default function renderMain({
    storyFn,
    kind,
    name,
    showMain,
    showError,
    forceRender,
}) {
    const element = storyFn();

    showMain();

    try {
        if (typeof element === 'string') {
            rootElement.innerHTML = element;
            customElements.upgrade(rootElement);
            simulatePageLoad(rootElement);
        } else if (element instanceof Node) {
            // Don't re-mount the element if it didn't change and neither did the story
            if (rootElement.firstChild === element && forceRender === true) {
                return;
            }

            rootElement.innerHTML = '';
            DOM.appendChild(rootElement, element);
            simulateDOMContentLoaded();
        } else {
            render(html`<div key=${name}>${element}</div>`, rootElement);
            simulatePageLoad(rootElement);
        }
    } catch (err) {
        showError({
            title: `An error occurred rendering the story: "${name}" of "${kind}".`,
            description: err.message,
        });
    }
}
