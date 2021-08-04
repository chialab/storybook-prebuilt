export function indexHtml(data: {
    managerHead: string,
    css: { path: string },
    js: { path: string, type: 'module' | 'text/javascript' },
}): Promise<string>;

export function iframeHtml(data: {
    previewHead: string,
    previewBody: string,
    css: { path: string },
    js: { path: string, type: 'module' | 'text/javascript' },
}): Promise<string>;

export function managerCss(): Promise<string>;

export function previewCss(): Promise<string>;
