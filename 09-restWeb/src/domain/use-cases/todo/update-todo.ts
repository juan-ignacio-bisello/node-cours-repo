import { UpdateTodoDto } from "../../dtos/index.js";
import { TodoEntity } from "../../entities/todo.entity.js";
import { TodoRepository } from "../../repositories/todo.repository.js";



export interface UpdateTodoUseCase {
    execute( dto: UpdateTodoDto ): Promise<TodoEntity>
}

export class UpdateTodo implements UpdateTodoUseCase {

    constructor(
        private readonly todoRepository: TodoRepository,
    ) {}
    execute(dto: UpdateTodoDto): Promise<TodoEntity> {
        return this.todoRepository.updateById( dto );
    }

}