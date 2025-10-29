import type { Request, Response } from "express";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/index.js";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain/index.js";


export class TodoController {

    constructor(
        private readonly todoRepository: TodoRepository
    ) {}

    public getTodos = ( req:Request, res:Response ) => {

        new GetTodos( this.todoRepository )
            .execute()
            .then( todos => res.json( todos ) )
            .catch( error => res.status( 500 ).json({ error }) );
    }

    public getTodoById = ( req:Request, res:Response ) => {

        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Missing id param' });
        }
        new GetTodo( this.todoRepository )
            .execute( Number( id ) )
            .then( todo => res.json( todo ) )
            .catch( error => res.status( 500 ).json({ error }) );
    }

    public createTodo = ( req:Request, res:Response ) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ error });

        new CreateTodo( this.todoRepository )
            .execute( createTodoDto! )
            .then( todo => res.status( 201 ).json( todo ) )
            .catch( error => res.status( 500 ).json({ error }) );
    }

    public updateTodo = ( req:Request, res:Response ) => {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Missing id param' });
        }
        const numericId = Number(id);
        if (isNaN(numericId)) {
            return res.status(400).json({ error: 'Invalid id' });
        }

        const [ error, updateTodoDto ] = UpdateTodoDto.create({ ...req.body, id });
        if ( error ) return res.status( 400 ).json({ error });

        new UpdateTodo( this.todoRepository )
            .execute( updateTodoDto! )
            .then( todo => res.json( todo ) )
            .catch( error => res.status( 500 ).json({ error }) );
    }

    public deleteTodo = ( req:Request, res:Response ) => {

        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Missing id param' });
        }
        const numericId = Number(id);
        if (isNaN(numericId)) {
            return res.status(400).json({ error: 'Invalid id' });
        }

        new DeleteTodo( this.todoRepository )
            .execute( numericId )
            .then( todo => res.json( todo ) )
            .catch( error => res.status( 400 ).json({ error }) );
    }
}