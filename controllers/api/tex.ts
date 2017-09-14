import * as eta from "../../eta";
import * as db from "../../db";
import GenericTexController from "../../lib/GenericTexController";

@eta.mvc.route("/api/tex")
@eta.mvc.controller()
export default class ApiTexController extends GenericTexController {
    @eta.mvc.post()
    @eta.mvc.authorize([db.TexPermission.CreateNote])
    @eta.mvc.raw()
    public async create({ type, title }: { type: db.TexNoteType, title: string }): Promise<void> {
        let note: db.TexNote = await db.texNote().createQueryBuilder("note")
            .leftJoinAndSelect("note.author", "author")
            .where(`"author"."id" = :personId`, { personId: this.req.session.userid })
                .andWhere(`"note"."title" = :title`, { title })
            .getOne();
        if (note) {
            return this.error(db.TexApiError.NoteNameAlreadyExists);
        }
        note = await db.texNote().save(db.texNote().create({
            body: "", title, type,
            author: db.person().create({ id: this.req.session.userid })
        }));
        this.redirect("/tex/edit?id=" + note.id);
    }

    @eta.mvc.post()
    @eta.mvc.authorize([db.TexPermission.UpdateNote])
    @eta.mvc.raw()
    public async update({ noteId, body, title }: { noteId: number, body: string, title: string }): Promise<void> {
        const note: db.TexNote = await db.texNote().createQueryBuilder("note")
            .leftJoinAndSelect("note.author", "author")
            .where(`"note"."id" = :noteId`, { noteId })
            .getOne();
        if (!this.check(note)) return;
        await db.texNote().updateById(noteId, { body, title });
        return this.result(db.GenericApiResult.Success);
    }

    @eta.mvc.post()
    @eta.mvc.authorize([db.TexPermission.DeleteNote])
    @eta.mvc.raw()
    public async delete({ noteId }: { noteId: number }): Promise<void> {
        const note: db.TexNote = await db.texNote().createQueryBuilder("note")
            .leftJoinAndSelect("note.author", "author")
            .where(`"note"."id" = :noteId`, { noteId })
            .getOne();
        if (!this.check(note)) return;
        await db.texNote().removeById(noteId);
        return this.result(db.GenericApiResult.Success);
    }
}
