import { TodoEntity } from "../../entities/todo.entity.js";
import { TodoRepository } from "../../repositories/todo.repository.js";



export interface GetTodoByIdUseCase {
    execute( id: number ): Promise<TodoEntity>
}

export class GetTodo implements GetTodoByIdUseCase {

    constructor(
        private readonly todoRepository: TodoRepository,
    ) {}

    async execute( id: number ): Promise<TodoEntity> {
        const todo = await this.todoRepository.findById( id );
        if (!todo) throw new Error(`Todo with id ${id} not found`);
        return todo;
    }

}