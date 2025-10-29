import type { Request, Response } from "express";
import { prisma } from "../../data/index.js";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/index.js";
import { TodoRepository } from "../../domain/index.js";


export class TodoController {

    constructor(
        private readonly todoRepository: TodoRepository
    ) {}

    public getTodos = async( req:Request, res:Response ) => {
        
        const todos = await this.todoRepository.getAll();
        return res.json( todos );
    }

    public getTodoById = async( req:Request, res:Response ) => {

        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Missing id param' });
        }
        const numericId = Number(id);
        if (isNaN(numericId)) {
            return res.status(400).json({ error: 'Invalid id' });
        }

        try {
            const todo = await this.todoRepository.findById( Number( id ) );
            res.json( todo );
        } catch (error) {
            res.status( 404 ).json({ error });
        }
    }

    public createTodo = async( req:Request, res:Response ) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ error });

        const todo = await this.todoRepository.create( createTodoDto! );
        return res.status(201).json( todo );
    }

    public updateTodo = async( req:Request, res:Response ) => {
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

        const todo = await this.todoRepository.updateById( updateTodoDto! );
        return res.json( todo );
    }

    public deleteTodo = async( req:Request, res:Response ) => {

        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ error: 'Missing id param' });
        }
        const numericId = Number(id);
        if (isNaN(numericId)) {
            return res.status(400).json({ error: 'Invalid id' });
        }

        const deletedTodo = await this.todoRepository.deleteById( Number( id ) );
        return res.json( deletedTodo );
    }
}