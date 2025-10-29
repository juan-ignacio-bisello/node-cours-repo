import type { CreateTodoDto } from "../../dtos/index.js";
import type { TodoEntity } from "../../entities/todo.entity.js";
import type { TodoRepository } from "../../repositories/todo.repository.js";



export interface CreateTodoUseCase {
    execute( dto: CreateTodoDto ): Promise<TodoEntity>
}

export class CreateTodo implements CreateTodoUseCase {

    constructor(
        private readonly todoRepository: TodoRepository,
    ) {}
    execute(dto: CreateTodoDto): Promise<TodoEntity> {
        return this.todoRepository.create( dto );
    }

}