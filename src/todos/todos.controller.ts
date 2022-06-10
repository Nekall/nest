import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TodosService } from './todos.service';
import { Logger } from '@nestjs/common';
import { Todo } from './interfaces/todo.interface';
import { CreateTodoDto } from './dto/create-todo.dto';

   Logger.log(TodosService);

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService){}

    @Get()
    findAll(): Todo[] {
        return this.todosService.findAll();
    }

    @Get(":id")
    findOne(@Param("id") id: string){
        return this.todosService.findOne(id);
    }

    @Post()
    creatTodo(@Body() newTodo: CreateTodoDto){
        this.todosService.creatTodo(newTodo)
    }

    @Patch(":id")
    updateOne(@Param("id") id: string, @Body() todo: CreateTodoDto){
        return this.todosService.updateOne(id, todo);
    }

    @Delete(":id")
    deleteOne(@Param("id") id: string){
        return this.todosService.deleteOne(id)
    }
}
