import { Router } from "express";
import { TodoRoutes } from "./todos/routes.js";


export class appRoutes {

    static get routes(): Router {

        const router = Router();

        router.use( '/api/todos', TodoRoutes.routes );
        
        return router;
    }

}