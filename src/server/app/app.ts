/**
 *
 *  USERS ADMIN INTERFACE
 *  Main application file.
 *
 *  Create and launch server here
 *
 */

import "reflect-metadata";
import {createExpressServer} from "routing-controllers";

import {UsersCtrl} from "./controllers/UsersCtrl.ts";

createExpressServer({
    cors: true,
    controllers: [
        UsersCtrl
    ]
}).listen(3000);