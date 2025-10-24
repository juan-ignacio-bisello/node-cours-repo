import { Router } from "express";
import { TodoController } from "./todos/controller.js";
import { TodoRoutes } from "./todos/routes.js";


export class appRoutes {

    static get routes(): Router {

        const router = Router();
        const todoController = new TodoController();

        router.use( '/api/todos', TodoRoutes.routes );
        
        return router;
    }

}