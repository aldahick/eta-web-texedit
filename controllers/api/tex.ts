import * as eta from "../../eta";
import * as db from "../../db";

@eta.mvc.route("/api/tex")
@eta.mvc.controller()
export default class ApiTexController extends eta.IHttpController {
    @eta.mvc.post()
    @eta.mvc.authorize([db.TexPermission.CreateNote])
    @eta.mvc.raw()
    public async createNote({ type, title }: { type: db.TexNoteType, title: string }): Promise<void> {
        const note: db.TexNote = await db.texNote().createQueryBuilder("note")
            .leftJoinAndSelect("note.author", "author")
            .where(`"author"."id" = :personId`, { personId: this.req.session.userid })
                .andWhere(`"note"."title" = :title`, { title })
            .getOne();
        if (note) {
            return this.error(db.TexApiError.NoteNameAlreadyExists);
        }
        // TODO Finish
    }

    @eta.mvc.post()
    @eta.mvc.authorize([db.TexPermission.UpdateNote])
    @eta.mvc.raw()
    public async updateNote({ noteId, body }: { noteId: number, body: string }): Promise<void> {
        await db.texNote().updateById(noteId, { body });
    }
}
