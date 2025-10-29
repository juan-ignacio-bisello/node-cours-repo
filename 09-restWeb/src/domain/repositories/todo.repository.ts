import type { CreateTodoDto, UpdateTodoDto } from '../dtos/index.js';
import type { TodoEntity } from '../entities/todo.entity.js';


export abstract class TodoRepository {

    abstract create( createTodoDto: CreateTodoDto ): Promise<TodoEntity>;
    abstract getAll(): Promise<TodoEntity[]>;
    abstract findById( id: number ): Promise<TodoEntity | null>;
    abstract updateById( updateTodoDto: UpdateTodoDto ): Promise<TodoEntity>;
    abstract deleteById( id: number ): Promise<TodoEntity>;
}