/// <reference path="../def/katex-autorender.d.ts" />
import * as katex from "katex";
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
    element.innerText = editor.getValue();
    renderMathInElement(element, {
        delimiters: [{
            left: "$",
            right: "$",
            display: true
        }],
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
});
