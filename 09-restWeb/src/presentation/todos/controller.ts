import type { Request, Response } from "express";

export class TodoController {

    constructor() {}

    public getTodos = ( req:Request, res:Response ) => {
            res.json([
                { id: 1, title: 'Learn TypeScript', createAt: new Date(), completed: false },
                { id: 2, title: 'Build a REST API', createAt: null, completed: true },
                { id: 3, title: 'Write unit tests', createAt: new Date(), completed: false },
            ]);
        }
}