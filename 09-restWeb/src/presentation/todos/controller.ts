import type { Request, Response } from "express";
import { prisma } from "../../data/index.js";


export class TodoController {

    constructor() {}

    public getTodos = async( req:Request, res:Response ) => {
        const todo = await prisma.todo.findMany();
        
        return res.json( todo );
    }

    public getTodoById = async( req:Request, res:Response ) => {

        const idStr = req.params?.id;
        if ( !idStr ) return res.status( 400 ).json({ error: 'Invalid ID' });

        const id = Number( idStr );
        
        if ( isNaN( id ) ) return res.status( 400 ).json({ error: 'Invalid ID' });

        const todo = await prisma.todo.findFirst({
            where: { id }
        })

        return (
            ( todo )
                ? res.status(200).json( todo )
                : res.status(404).json({ error: 'Todo not found' })
        );
    }

    public createTodo = async( req:Request, res:Response ) => {

        const { text, createdAt } = req.body;

        if ( !text ) return res.status( 400 ).json({ error: 'text is required' });

        const todo = await prisma.todo.create({
            data: { text }
        });

        res.status( 201 ).json( todo );
    }

    public updateTodo = async( req:Request, res:Response ) => {
        const idStr = req.params?.id;
        if ( !idStr ) return res.status( 400 ).json({ error: 'Invalid ID' });

        const id = Number( idStr );

        if ( isNaN( id ) ) return res.status( 400 ).json({ error: 'Invalid ID' });
        const { text, completedAt = null } = req.body;
        if ( !text ) return res.status( 400 ).json({ error: 'option is required' });

        const todos = await prisma.todo.update({
            where: { id },
            data: { 
                text, 
                completedAt: ( completedAt ) ? new Date( completedAt ) : null 
            }
        })

        res.json( todos );
    }

    public deleteTodo = async( req:Request, res:Response ) => {

        const idStr = req.params?.id;
        if ( !idStr ) return res.status( 400 ).json({ error: 'Invalid ID' });

        const id = Number( idStr );
        if ( isNaN( id ) ) return res.status( 400 ).json({ error: 'Invalid ID' });
        
        const todos = await prisma.todo.findFirst({
            where: { id }
        })
        
        if ( !todos ) return res.status( 404 ).json({ error: `Todo ${ id } not found` });

        const deleted = await prisma.todo.delete({
            where: { id }
        })

        return (
            ( deleted )
                ? res.json( deleted )
                : res.status( 400 ).json({ error: 'Todo not deleted' })
            );
        res.status( 200 ).json({ deleted });
    }
}