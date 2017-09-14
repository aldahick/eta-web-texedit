import * as eta from "../eta";
import * as db from "../db";

export default abstract class GenericTexController extends eta.IHttpController {
    protected check(note: db.TexNote): boolean {
        if (!note) {
            this.res.statusCode = eta.constants.http.NotFound;
            return false;
        }
        if (note.author.id !== this.req.session.userid) {
            this.res.statusCode = eta.constants.http.AccessDenied;
            return false;
        }
        return true;
    }
}
