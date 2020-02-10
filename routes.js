"use strict";
import user from "./src/api/router/user.route";

export default function (app)  {
    app.use("/api/users", user);
}