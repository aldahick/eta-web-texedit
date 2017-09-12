/// <reference path="../def/katex-autorender.d.ts" />
import "ace";
import * as katex from "katex";
(<any>window).katex = (<any>katex).default;
import renderMathInElement from "katex-autorender";

let editor: AceAjax.Editor;
function render(): void {
    const output: HTMLElement = document.getElementById("output");
    const value: string = editor.getValue();
    output.innerText = value;
    renderMathInElement(output, {
        delimiters: [{
            left: "$",
            right: "$",
            display: true
        }]
    });
    $.post("/api/tex/updateNote", {
        noteId: $("#note-id").val(),
        body: value
    });
}

$(document).ready(() => {
    editor = ace.edit("editor");
    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/latex");
    $("#render").on("click", render);
    $(window).on("keydown", evt => {
        if (!(evt.ctrlKey && evt.which === JQuery.Key.S) && evt.which !== 19) return true;
        evt.preventDefault();
        render();
        return false;
    });
});
