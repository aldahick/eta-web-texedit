import * as orm from "typeorm";
import Person from "../../cre-db-shared/models/Person";
import TexNoteType from "./enums/TexNoteType";

@orm.Index(["author", "title"], { unique: true })
@orm.Entity()
export default class TexNote {
    @orm.PrimaryGeneratedColumn()
    public id: number;

    @orm.ManyToOne(t => Person, { nullable: false })
    public author: Person;

    @orm.Column({ type: "varchar", nullable: false })
    public title: string;

    @orm.Column({ type: "int", nullable: false })
    public type: TexNoteType;

    @orm.Column({ type: "text", nullable: false })
    public body = "";
}
