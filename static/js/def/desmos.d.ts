declare module "desmos" {
    export class GraphingCalculator {
        new (element: HTMLElement, options?: GraphingCalculatorOptions): GraphingCalculator;
        destroy(): void;
    }

    export interface ExpressionOptions {
        type: string;
        latex: string;
        color: string;
        style: number;
        hidden: boolean;
        secret: boolean;
        sliderBounds: {
            min: string;
            max: string;
            step: string;
        };
        domain: {
            min: string;
            max: string;
        };
        id: string;
        dragMode: any; // TODO fix
        label: string;
        showLabel: string;
    }

    export interface Styles {
        POINT: number;
        OPEN: number;
        CROSS: number;
        SOLID: number;
        DASHED: number;
        DOTTED: number;
    }

    export interface DragModes {
        X: number;
        Y: number;
        XY: number;
        NONE: number;
    }

    export interface GraphingCalculatorOptions {
        /**
         * Show the graphpaper
         */
        graphpaper: boolean;
        /**
         * Show the expressions list
         */
        expressions: boolean;
        /**
         * Show the settings wrench, for changing graph display
         */
        settingsMenu: boolean;
        /**
         * Show onscreen zoom buttons
         */
        zoomButtons: boolean;
        /**
         * Show the bar on top of the expressions list
         */
        expressionsTopbar: boolean;
        /**
         * Show Points of Interest (POIs) as gray dots that can be clicked on
         */
        pointsOfInterest: boolean;
        /**
         * [DEPRECATED] Show solutions to linear and quadratic equations like $2x^2-3x+1=0$2x2−3x+1=0​. Note: the default value has changed, and this option will be removed in future API versions.
         */
        singleVariableSolutions: boolean;
        /**
         * Allow tracing curves to inspect coordinates, and showing point coordinates when clicked
         */
        trace: boolean;
        /**
         * Add a subtle 1px gray border around the entire calculator
         */
        border: boolean;
        /**
         * Disable user panning and zooming graphpaper
         */
        lockViewport: boolean;
        /**
         * Collapse the expressions list
         */
        expressionsCollapsed: boolean;
        /**
         * Allow creating secret folders
         */
        administerSecretFolders: boolean;
        /**
         * Allow adding images
         */
        images: boolean;
        /**
         * Specify custom processing for user-uploaded images. See Image Uploads for more details.
         */
        imageUploadCallback: any;
        /**
         * Allow the creation of folders in the expressions list
         */
        folders: boolean;
        /**
         * Allow the creation of text notes in the expressions list
         */
        notes: boolean;
        /**
         * Allow hyperlinks in notes/folders, and links to help documentation in the expressions list (e.g. regressions with negative R2 values or plots with unresolved detail)
         */
        links: boolean;
        /**
         * Display the keypad in QWERTY layout (false shows an alphabetical layout)
         */
        qwertyKeyboard: boolean;
        /**
         * Show a restricted menu of available functions
         */
        restrictedFunctions: boolean;
        /**
         * Paste a valid desmos graph URL to import that graph
         */
        pasteGraphLink: boolean;
        /**
         * Paste validly formatted table data to create a table up to 50 rows
         */
        pasteTableData: boolean;
        /**
         * When true, trig functions assume arguments are in degrees. Otherwise, arguments are assumed to be in radians.
         */
        degreeMode: boolean;
        /**
         * The color palette that the calculator will cycle through. See the Colors section.
         */
        colors: string;
        /**
         * Determine whether the calculator should automatically resize whenever there are changes to element's dimensions. If set to false you will need to explicitly call .resize() in certain situations. See .resize().
         */
        autosize: boolean;
    }
}
