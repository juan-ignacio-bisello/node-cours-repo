import type { Request, Response } from "express";
import { prisma } from "../../data/index.js";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/index.js";


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
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if (error) return res.status(400).json({ error });

        const todo = await prisma.todo.create({
          data: createTodoDto!,
        });

        res.status(201).json(todo);
    }

    public updateTodo = async( req:Request, res:Response ) => {
        const idStr = req.params.id;
        if (!idStr) return res.status(400).json({ error: 'Missing id param' });

        const id = Number(idStr);
        if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' });

        const [ error, updateTodoDto ] = UpdateTodoDto.create({ ...req.body, id });
        if ( error ) return res.status( 400 ).json({ error });

        const todo = await prisma.todo.findFirst({
            where: { id }
        })

        if ( !todo ) return res.status( 404 ).json({ error: `Todo ${ id } not found` });

        const updated = await prisma.todo.update({
            where: { id },
            data: updateTodoDto!.values
        })

        res.status( 200 ).json({ updated });
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