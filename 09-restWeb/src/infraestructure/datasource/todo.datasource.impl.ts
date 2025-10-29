import { prisma } from "../../data/index.js";
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain/index.js";


export class TodoDatasourceImpl implements TodoDatasource {

    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
          data: createTodoDto!,
        });

        return TodoEntity.fromObject( todo );
    }

    async getAll(): Promise<TodoEntity[]> {
        const todo = await prisma.todo.findMany();

        return todo.map( todo => TodoEntity.fromObject( todo ) );
    }

    async findById(id: number): Promise<TodoEntity | null> {
        const todo = await prisma.todo.findFirst({
            where: { id }
        });

        if ( !todo ) throw `Todo with id ${id} not found`;
        return TodoEntity.fromObject( todo );
    }

    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        await this.findById( updateTodoDto.id );

        const updated = await prisma.todo.update({
            where: { id: updateTodoDto.id },
            data: updateTodoDto!.values
        });

        return TodoEntity.fromObject( updated );
    }

    async deleteById(id: number): Promise<TodoEntity> {
        await this.findById( id );

        const deleted = await prisma.todo.delete({
            where: { id }
        });

        return TodoEntity.fromObject( deleted );
    }

}