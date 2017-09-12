import * as eta from "../eta";
import * as db from "../db";

@eta.mvc.route("/tex")
@eta.mvc.controller()
export default class TexController extends eta.IHttpController {
    private global(): void {
        this.res.view["navbarPages"] = {
            "edit": "Edit"
        };
    }

    // TODO Implement "create" page
    // TODO Implement "read" page
    // TODO Implement "list" page

    @eta.mvc.get()
    @eta.mvc.authorize([db.TexPermission.UpdateNote])
    public async edit({ id }: { id: number }): Promise<void> {
        // TODO Check user perms and such
        this.global();
        this.res.view["note"] = await db.texNote().findOneById(id);
        console.log(id);
    }
}
