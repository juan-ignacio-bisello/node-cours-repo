import { TodoEntity } from "../../entities/todo.entity.js";
import { TodoRepository } from "../../repositories/todo.repository.js";



export interface GetTodosByIdUseCase {
    execute(): Promise<TodoEntity[]>
}

export class GetTodos implements GetTodosByIdUseCase {

    constructor(
        private readonly todoRepository: TodoRepository,
    ) {}

    async execute(): Promise<TodoEntity[]> {
        return await this.todoRepository.getAll();
    }

}