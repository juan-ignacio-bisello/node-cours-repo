import type { Request, Response } from "express";

const todo = [
    { id: 1, title: 'Learn TypeScript', completedAt: new Date() },
    { id: 2, title: 'Build a REST API', completedAt: null },
    { id: 3, title: 'Write unit tests', completedAt: new Date() },
];

export class TodoController {

    constructor() {}

    public getTodos = ( req:Request, res:Response ) => {
            res.json( todo );
    }

    public getTodoById = ( req:Request, res:Response ) => {

        const idStr = req.params?.id;
        if ( !idStr ) return res.status( 400 ).json({ error: 'Invalid ID' });

        const id = Number( idStr );
        
        if ( isNaN( id ) ) return res.status( 400 ).json({ error: 'Invalid ID' });

        const found = todo.find( t => t.id === id );
        
        if ( found ) {
            return res.json( found );
        }

        return res.status( 404 ).json({ message: 'Todo not found' });
    }

    public createTodo = ( req:Request, res:Response ) => {

        const { title, createdAt } = req.body;

        if ( !title ) {
            return res.status( 400 ).json({ error: 'title is required' });
        }

        const newTodo = {
            id: todo.length + 1,
            title: title,
            completedAt: createdAt ? new Date( createdAt ) : null,
        };

        todo.push( newTodo );

        return res.status( 201 ).json( newTodo );
    }

    public updateTodo = ( req:Request, res:Response ) => {
        const idStr = req.params?.id;
        if ( !idStr ) return res.status( 400 ).json({ error: 'Invalid ID' });

        const id = Number( idStr );

        if ( isNaN( id ) ) return res.status( 400 ).json({ error: 'Invalid ID' });
        const found = todo.find( t => t.id === id );
        if ( !found ) return res.status( 404 ).json({ message: 'Todo not found' });
        const { title, completedAt } = req.body;
        if ( !title ) return res.status( 400 ).json({ error: 'option is required' });
        
        (completedAt === 'null' )
            ? found.completedAt = null
            : found.completedAt = new Date( completedAt || found.completedAt );

        found.title = title || found.title;
        found.completedAt = completedAt ? new Date( completedAt ) : found.completedAt;

        res.json( found );
    }

    public deleteTodo = ( req:Request, res:Response ) => {

        const idStr = req.params?.id;
        if ( !idStr ) return res.status( 400 ).json({ error: 'Invalid ID' });

        const id = Number( idStr );
        if ( isNaN( id ) ) return res.status( 400 ).json({ error: 'Invalid ID' });

        const found = todo.find( t => t.id === id );

        if ( !found ) return res.status( 404 ).json({ message: 'Todo not found' });
        
        todo.splice( todo.indexOf( found ), 1 );
        res.status( 200 ).json( found );
    }
}