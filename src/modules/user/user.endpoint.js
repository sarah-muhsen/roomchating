import { userroles } from "../../middleware/auth.middleware.js";

export const endpoint={
    profile:[userroles.admin,userroles.user]
}