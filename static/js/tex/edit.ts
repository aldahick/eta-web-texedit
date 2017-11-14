/// <reference path="../def/desmos.d.ts" />
/// <reference path="../def/katex-autorender.d.ts" />
import * as Desmos from "desmos";
import * as katex from "katex";
import marked from "marked";
(<any>window).katex = (<any>katex).default;
import renderMathInElement from "katex-autorender";

let editor: AceAjax.Editor;
let errorFadeTimeout: number;

function save(): void {
    render();
    $.post("/api/tex/update", {
        noteId: $("#note-id").val(),
        title: $("#title").val(),
        body: editor.getValue()
    });
}

function render(): void {
    const element: HTMLElement = document.getElementById("output");
    let output = editor.getValue();
    const tokens: string[] = output.replace(/\`/g, "&#96;").replace(/\n/g, "\n\n").split("$");
    if (tokens.length > 1) {
        tokens[0] += "`";
        for (let i = 2; i < tokens.length; i += 2) {
            tokens[i] = "`" + tokens[i] + "`";
        }
    }
    output = tokens.join("$");
    output = output.slice(0, -1);
    element.innerHTML = marked(output);
    renderMathInElement(element, {
        delimiters: [{
            left: "$",
            right: "$",
            display: true,
        }],
        ignoredTags: ["script", "noscript", "style", "textarea", "pre"],
        errorCallback: onLatexRenderError
    });
}

function onLatexRenderError(err: katex.ParseError): void {
    $("#error").text(err.message);
    if (errorFadeTimeout !== undefined) {
        window.clearTimeout(errorFadeTimeout);
    }
    errorFadeTimeout = window.setTimeout(() => {
        $("#error").fadeOut(250, () => errorFadeTimeout = undefined);
    }, 500);
}

$(document).ready(() => {
    $("#body-content").attr("class", "");
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/latex");
    editor.getSession().setUseWrapMode(false);
    editor.setFontSize("14px");
    editor.setWrapBehavioursEnabled(true);
    $(window).on("keydown", evt => {
        if (!(evt.ctrlKey && evt.which === JQuery.Key.S) && evt.which !== 19) return true;
        evt.preventDefault();
        render();
        save();
        return false;
    });
    $("#input").on("keypress", evt => {
        if (evt.which === JQuery.Key.Enter) {
            save();
        }
    });
    render();
    // const calculator: Desmos.GraphingCalculator = new Desmos.GraphingCalculator();
});
