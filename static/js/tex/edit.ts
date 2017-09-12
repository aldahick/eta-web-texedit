/// <reference path="../def/katex-autorender.d.ts" />
import * as katex from "katex";
(<any>window).katex = (<any>katex).default;
import renderMathInElement from "katex-autorender";

function render(): void {
    const output: HTMLElement = document.getElementById("output");
    output.innerText = $("#input").val().toString();
    renderMathInElement(output, {
        delimiters: [{
            left: "$",
            right: "$",
            display: true
        }]
    });
    $.post("/api/tex/updateNote", {
        noteId: $("#note-id").val(),
        body: $("#input").val()
    }, response => {
        console.log(response);
    }).fail(err => {
        console.log(err);
    });
}

$(document).ready(() => {
    $("#render").on("click", render);
    $(window).on("keydown", evt => {
        if (!(evt.ctrlKey && evt.which === JQuery.Key.S) && evt.which !== 19) return true;
        evt.preventDefault();
        render();
        return false;
    });
});
