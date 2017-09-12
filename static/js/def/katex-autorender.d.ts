declare module "katex-autorender" {
    const renderMathInElement: (element: HTMLElement, options?: {
        delimiters?: {
            left: string;
            right: string;
            display: boolean;
        }[];
        ignoredTags?: string[];
    }) => void;
    export = renderMathInElement;
}
