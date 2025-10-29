import type { CreateTodoDto, TodoDatasource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain/index.js";



export class TodoRepositoryImpl implements TodoRepository {

    constructor( private readonly datasource: TodoDatasource ) {}

    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.datasource.create( createTodoDto );
    }
    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll();
    }
    findById(id: number): Promise<TodoEntity | null> {
        return this.datasource.findById( id );
    }
    updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.datasource.updateById( updateTodoDto );
    }
    deleteById(id: number): Promise<TodoEntity> {
        return this.datasource.deleteById( id );
    }

}