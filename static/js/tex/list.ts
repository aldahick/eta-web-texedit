import "es6-shim";

function deleteNote(id: number): void {
    $.post("/api/tex/delete", {
        noteId: id
    }, () => {
        window.location.reload();
    });
}

$(document).ready(() => {
    $(".btn-delete").on("click", function() {
        if (confirm("Are you sure you want to delete this note?")) {
            deleteNote($(this).closest(".note-row").data("id"));
        }
    });
});
