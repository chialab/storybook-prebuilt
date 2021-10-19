import { Node, html, customElements, DOM, render } from '@chialab/dna';
import { simulatePageLoad, simulateDOMContentLoaded } from '../../../../node_modules/@storybook/preview-web';

export function renderToDOM({
    storyFn,
    kind,
    name,
    showMain,
    showError,
    forceRemount,
}, domElement) {
    const element = storyFn();

    showMain();

    try {
        if (typeof element === 'string') {
            domElement.innerHTML = element;
            customElements.upgrade(domElement);
            simulatePageLoad(domElement);
        } else if (element instanceof Node) {
            // Don't re-mount the element if it didn't change and neither did the story
            if (domElement.firstChild === element && forceRemount === true) {
                return;
            }

            domElement.innerHTML = '';
            DOM.appendChild(domElement, element);
            simulateDOMContentLoaded();
        } else {
            render(html`<div key=${name}>${element}</div>`, domElement);
            simulatePageLoad(domElement);
        }
    } catch (err) {
        showError({
            title: `An error occurred rendering the story: "${name}" of "${kind}".`,
            description: err.message,
        });
    }
}
