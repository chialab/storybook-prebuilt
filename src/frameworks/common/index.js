export function createRegisterPreviewEntry({ addDecorator, addParameters }) {
    return (entry) => {
        if (entry.decorators) {
            entry.decorators.forEach((decorator) => {
                addDecorator(decorator, false);
            });
        }

        if (entry.parameters || entry.globals || entry.globalTypes) {
            addParameters({
                ...(entry.parameters || {}),
                globals: entry.globals,
                globalTypes: entry.globalTypes,
            }, false);
        }
    };
}
