import * as orm from "typeorm";
import User from "../../cre-db-shared/models/User";
import TexNoteType from "./enums/TexNoteType";

@orm.Index(["author", "title"], { unique: true })
@orm.Entity()
export default class TexNote {
    @orm.PrimaryGeneratedColumn()
    public id: number;

    @orm.ManyToOne(t => User, { nullable: false })
    public author: User;

    @orm.Column({ type: "varchar", nullable: false })
    public title: string;

    @orm.Column({ type: "int", nullable: false })
    public type: TexNoteType;

    @orm.Column({ type: "date", nullable: false, name: "created" })
    public _created: Date = new Date();

    public get created(): Date {
        if (typeof(this._created) === "string") {
            this._created = new Date(this._created);
        }
        return this._created;
    }

    @orm.Column({ type: "text", nullable: false })
    public body = "";
}
