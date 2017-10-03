import * as eta from "../eta";
import * as db from "../db";
import * as moment from "moment";
import GenericTexController from "../lib/GenericTexController";

@eta.mvc.route("/tex")
@eta.mvc.controller()
export default class TexController extends GenericTexController {
    private global(): void {
        this.res.view["navbarPages"] = {
            "create": "Create",
            "edit": "Edit",
            "list": "List"
        };
        this.res.view["NoteType"] = db.TexNoteType;
        this.res.view["moment"] = moment;
    }

    @eta.mvc.get()
    @eta.mvc.authorize([db.TexPermission.CreateNote])
    public async create(): Promise<void> {
        this.global();
    }

    @eta.mvc.get()
    @eta.mvc.authorize([db.TexPermission.UpdateNote])
    public async edit({ id }: { id: number }): Promise<void> {
        if (!id) {
            return this.redirect("/tex/list");
        }
        const note: db.TexNote = await db.texNote().createQueryBuilder("note")
            .leftJoinAndSelect("note.author", "author")
            .where(`"note"."id" = :id`, { id })
            .getOne();
        if (!this.check(note)) return;
        this.global();
        this.res.view["note"] = note;
    }

    @eta.mvc.get()
    @eta.mvc.authorize([db.TexPermission.ListNotes])
    public async list(): Promise<void> {
        this.global();
        this.res.view["notes"] = await db.texNote().createQueryBuilder("note")
            .leftJoinAndSelect("note.author", "author")
            .where(`"author"."id" = :personId`, { personId: this.req.session.userid })
            .orderBy(`"note"."created"`, "DESC")
            .addOrderBy(`"note"."title"`, "DESC")
            .getMany();
    }
}
